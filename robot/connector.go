package robot

import (
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/lonng/nano/internal/codec"
	"github.com/lonng/nano/internal/message"
	"github.com/lonng/nano/internal/packet"
	"github.com/lonng/nano/serialize/json"
	"github.com/lonng/nano/serialize/protobuf"
	"log"
	"net/url"
	"strings"
	"sync"
	"time"
)

// 连接服务器
var (
	hsd []byte // handshake data
	had []byte // handshake ack data
	hbd []byte // heartbeat
)

func init() {
	var err error
	hsd, err = codec.Encode(packet.Handshake, nil)
	if err != nil {
		panic(err)
	}

	had, err = codec.Encode(packet.HandshakeAck, nil)
	if err != nil {
		panic(err)
	}
	hbd, err = codec.Encode(packet.Heartbeat, nil)
	if err != nil {
		panic(err)
	}
}

// ws连接
type (
	// Callback 函数调用
	Callback func(data interface{})

	WsConnector struct {
		client *websocket.Conn
		codec  *codec.Decoder
		mid    uint64      // message id
		chSend chan []byte // send queue
		die    chan struct{}

		// events handler
		muEvents sync.RWMutex
		events   map[string]Callback

		// response handler
		muResponses sync.RWMutex
		responses   map[uint64]Callback

		// mid对应的router
		muRouter  sync.RWMutex
		midRouter map[uint64]string
		chanResp  chan interface{} // 服务器的响应数据
		chanPush  chan interface{} // 服务器推送的消息
		handler   HandleRobot
	}

	// HandleRobot 处理机器人接口
	HandleRobot interface {
		OnMessage(c *WsConnector, msg interface{})              // 收到消息
		OnConnected(c *WsConnector)                             // 首次连接成功后
		GetResponseInterfaceByRouter(router string) interface{} // 根据路由获取 response 类型
	}
)

// NewConnector 新建 robot connector
func NewConnector(handler HandleRobot) *WsConnector {
	return &WsConnector{
		client:    nil,
		codec:     codec.NewDecoder(),
		mid:       0,
		chSend:    make(chan []byte),
		die:       make(chan struct{}),
		events:    make(map[string]Callback),
		responses: make(map[uint64]Callback),
		midRouter: make(map[uint64]string),
		chanResp:  make(chan interface{}),
		handler:   handler,
	}
}

// Start 握手，连接，
func (c *WsConnector) Start(host string, port int, path string) {
	u := url.URL{
		Scheme: "ws",
		Host:   fmt.Sprintf("%s:%d", host, port),
		Path:   path,
	}
	fmt.Printf("connecting to %s\n", u.String())
	client, _, err := websocket.DefaultDialer.Dial(u.String(), nil)
	if err != nil {
		panic(err)
	}
	c.client = client
	go c.read()
	go c.write()

	// handShake
	c.send(hsd)
}

// Request 使用 chanResp 传输
func (c *WsConnector) Request(route string, data interface{}) {
	c.request(route, data, func(data interface{}) {
		c.chanResp <- data
	})
}

func (c *WsConnector) RequestWithCallback(route string, data interface{}, cb func(data interface{})) {
	c.request(route, data, cb)
}

func (c *WsConnector) onConnected() {
	go startRobot(c)
	c.handler.OnConnected(c)
}

func (c *WsConnector) request(route string, data interface{}, cb Callback) {
	// 接口名要小写
	route = strings.ToLower(route)
	c.mid++
	c.setResponseHandler(c.mid, cb)
	c.setMidRouter(c.mid, route)
	var bytes []byte
	var err error
	if data != nil {
		bytes, err = protobuf.NewSerializer().Marshal(data)
		if err != nil {
			panic(err)
		}
	}
	msg := &message.Message{
		Type:  message.Request,
		Route: route,
		ID:    c.mid,
		Data:  bytes,
	}
	if err := c.sendMessage(msg); err != nil {
		c.setResponseHandler(c.mid, nil)
		c.setMidRouter(c.mid, "")
		panic(err)
	}
}

func (c *WsConnector) sendMessage(msg *message.Message) error {
	msgEncode, err := msg.Encode()
	if err != nil {
		return err
	}
	payload, err := codec.Encode(packet.Data, msgEncode)
	if err != nil {
		return err
	}
	c.send(payload)
	return nil
}

func (c *WsConnector) read() {
	for {
		_, msg, err := c.client.ReadMessage()
		if err != nil {
			panic(err)
		}
		// logger.Println("receive", message)
		packets, err := c.codec.Decode(msg)
		if err != nil {
			panic(err)
		}
		c.processPacket(packets)
	}
}

func (c *WsConnector) write() {
	defer close(c.chSend)

	for {
		select {
		case data := <-c.chSend:
			if err := c.client.WriteMessage(websocket.BinaryMessage, data); err != nil {
				log.Println(err.Error())
				_ = c.client.Close()
			}
		case <-c.die:
			return
		}
	}
}

func (c *WsConnector) send(data []byte) {
	c.chSend <- data
}

func (c *WsConnector) heartbeat(times int) {
	ticker := time.NewTicker(time.Duration(times) * time.Second)
	defer ticker.Stop()
	// 永久发送心跳
	for {
		select {
		case <-ticker.C:
			c.send(hbd)
		}
	}
}

func (c *WsConnector) processPacket(packets []*packet.Packet) {
	for i := range packets {
		p := packets[i]
		switch p.Type {
		case packet.Handshake:
			// 握手包是json
			data := &HandShakeResp{}
			_ = json.NewSerializer().Unmarshal(p.Data, data)
			log.Println("handshake info", *data)
			// 启动定时器
			if data.Code == 200 {
				// handshake ack
				c.send(had)
				// 要使用协程,否则会死机,无法读取数据
				go c.heartbeat(data.Sys.Heartbeat)
				// 开始处理消息
				c.onConnected()
			}
		case packet.Data:
			msg, err := message.Decode(p.Data)
			if err != nil {
				log.Println(err.Error())
				return
			}
			log.Println(msg)
			c.processMessage(msg)
		case packet.Kick:
			// c.Close()
		case packet.Heartbeat:
			// 正常
		default:
			panic("unhandled type " + string(p.Type))
		}
	}
}

func (c *WsConnector) processMessage(msg *message.Message) {
	var msgId = uint64(0)
	switch msg.Type {
	case message.Push:
		msgId = 0
		protoTyp := c.handler.GetResponseInterfaceByRouter(msg.Route)
		if protoTyp != nil {
			// 推送到 chanResp
			err := protobuf.NewSerializer().Unmarshal(msg.Data, protoTyp)
			if err != nil {
				panic(err)
			}
			c.chanResp <- protoTyp
			return
		}
		log.Println("无法处理 push router", msg.Route)
		return
	case message.Response:
		msgId = msg.ID
	default:
		log.Println("Invalid message type: " + msg.Type.String())
		return
	}
	cb, ok := c.responseHandler(msgId)
	router, ok2 := c.router(msgId)
	if ok && ok2 {
		c.setResponseHandler(msgId, nil)
		c.setMidRouter(msgId, "")
		protoTyp := c.handler.GetResponseInterfaceByRouter(router)
		err := protobuf.NewSerializer().Unmarshal(msg.Data, protoTyp)
		if err != nil {
			panic(err)
		}
		cb(protoTyp)
	}
}

// 设置 response 的回调
func (c *WsConnector) setResponseHandler(mid uint64, cb Callback) {
	c.muResponses.Lock()
	defer c.muResponses.Unlock()
	if cb == nil {
		delete(c.responses, mid)
	} else {
		c.responses[mid] = cb
	}
}

func (c *WsConnector) responseHandler(mid uint64) (Callback, bool) {
	c.muResponses.RLock()
	defer c.muResponses.RUnlock()
	cb, ok := c.responses[mid]
	return cb, ok
}

func (c *WsConnector) setMidRouter(mid uint64, router string) {
	c.muRouter.Lock()
	defer c.muRouter.Unlock()
	if router == "" {
		delete(c.midRouter, mid)
	} else {
		c.midRouter[mid] = router
	}
}

func (c *WsConnector) router(mid uint64) (string, bool) {
	c.muRouter.RLock()
	defer c.muRouter.RUnlock()
	s, ok := c.midRouter[mid]
	return s, ok
}

func startRobot(c *WsConnector) {
	for {
		select {
		case data := <-c.chanResp:
			c.handler.OnMessage(c, data)
		}
	}
}

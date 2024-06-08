package robot

type SysStruct struct {
	// Type       string      `json:"type"`
	// Version    string      `json:"version"`
	Heartbeat  int         `json:"heartbeat,omitempty"`
	Servertime int64       `json:"servertime,omitempty"`
	Dict       interface{} `json:"dict"`
}

// HandShakeResp 握手响应包
type HandShakeResp struct {
	Code int         `json:"code"`
	Sys  SysStruct   `json:"sys"`
	User interface{} `json:"user,omitempty"`
}

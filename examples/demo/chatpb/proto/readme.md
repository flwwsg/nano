### 使用 protobuf
https://learnku.com/articles/37623

#### 安装 protoc
下载二进制文件 protoc
https://github.com/protocolbuffers/protobuf

#### 安装  protoc-gen-go.exe (protoc)
go install github.com/golang/protobuf/protoc-gen-go@latest

#### 编译 proto file

protoc --go_out=.. --proto_path=. *.proto


#### js 
#### 安装 protobufjs-cli  protobufjs
生成 proto js文件
pbjs -t static-module -w commonjs -o ./web/proto.js ./proto/*.proto
pbts -o proto.d.ts proto.js or pbts -o proto.d.ts --no-comments proto.js

生成 proto ts文件 (npm install ts-proto)
protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_out=. .\assets\script\lib\proto\*.proto


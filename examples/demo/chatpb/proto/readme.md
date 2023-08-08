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
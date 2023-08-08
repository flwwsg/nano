### 使用 protobuf
https://learnku.com/articles/37623

#### 安装 protoc
下载二进制文件 protoc
https://github.com/protocolbuffers/protobuf

#### 安装  protoc-gen-go.exe (protoc)
go install github.com/golang/protobuf/protoc-gen-go@latest

#### 编译 proto file

protoc --go_out=.. --proto_path=. *.proto
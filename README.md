# Basic Realtime Chat Example
Realtime chat example using Javascript and Go

![image](https://user-images.githubusercontent.com/45036724/201047926-59109e98-ea6e-46be-a111-f270a2c2044d.png)

## Prerequisites

You need npm and Go installed in your machine

## Installation

1. Clone the repository

```sh
git clone https://github.com/zuramai/realtime-chat-example
```

2. Install deps and vendors

```sh
cd realtime-chat-example
pnpm install 
cd server
go mod vendor
```

3. Run the app
```sh
go run *.go
cd .. && pnpm dev
```

# LICENSE
MIT

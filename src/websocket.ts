const url = "ws://localhost:8080/ws"

export const websocketConnect = (username: string) => {
    if(!(window.WebSocket)) {
        alert("Your browser does not support WebSocket")
        return 
    }
    const conn = new WebSocket(url + `?username=${username}`)
    return conn
}

import './style.css'
import { websocketConnect } from './websocket'

let name = ""
let ws: WebSocket | undefined

document.getElementById('form-name')?.addEventListener('submit', () => {
  name = (document.getElementById('name') as HTMLInputElement).value

  ws = websocketConnect(name)
  if(!ws) return 

  initWebsocket()
})

function print(type: string, message: string, from: string) {
  console.log(type, message, from)
}

function initWebsocket() {
  if(!ws) return
  ws.onopen = () => {
    alert("Connected!")
  }

  ws.onmessage = (e) => {
    console.log(e.data)
    const res = JSON.parse(e.data)
    if(res.Type == 'New User')
      print(res.Type, "Joined the chat", res.From)
    else if(res.Type == 'Leave')
      print(res.Type, "Left the chat", res.From)
    else 
      print(res.Type, res.Message, res.From)
  }
  ws.onclose = () =>[
    alert("You are disconnected")
  ]
}






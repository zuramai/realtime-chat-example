import './style.css'
import { websocketConnect } from './websocket'

let name = ""
let ws: WebSocket | undefined

document.getElementById('form-name')?.addEventListener('submit', (e) => {
  e.preventDefault()
  document.querySelector('.modal-wrapper')?.classList.remove('show')

  name = (document.getElementById('name') as HTMLInputElement).value
  document.querySelector('.chat-heading p')!.innerHTML = name

  ws = websocketConnect(name)
  if(!ws) return 

  initWebsocket()
})
function initWebsocket() {
  if(!ws) return
  ws.onopen = () => {
    alert("Connected!")
  }

  ws.onmessage = (e) => {
    console.log(e.data)
    const res = JSON.parse(e.data)
    if(res.Type == 'Chat')
      print(res.Type, res.Message, res.From)
  }
  ws.onclose = () =>[
    alert("You are disconnected")
  ]
}

const dummyMessage = document.querySelector('.message-wrapper')

function print(type: string, message: string, from: string) {
  const messagesEl = document.querySelector('.messages')


  const newNode = dummyMessage?.cloneNode(true) as HTMLElement
  newNode!.querySelector('.message-content p')!.innerHTML = message 
  newNode!.querySelector('.name')!.innerHTML = from  
  
  from !== name &&  newNode.classList.remove('me')

  messagesEl?.append(newNode)
  console.log(type, message, from)
}





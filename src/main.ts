import './style.css'
import { websocketConnect } from './websocket'

let name = ""
let ws: WebSocket | undefined

enum MessageType {
  CHAT = "Chat",
  LEAVE = "Leave",
  NEW_USER = "New User"
}

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
    if(res.Type == MessageType.CHAT)
      print(res.Type, res.Message, res.From)
  }
  ws.onclose = () =>[
    alert("You are disconnected")
  ]
}

const dummyMessage = document.querySelector('.message-wrapper')

/**
 * Print the incoming/sent messages to the DOM
 * @param type The type of the st
 * @param message 
 * @param from 
 */
function print(type: string, message: string, from: string) {
  const messagesEl = document.querySelector('.messages')

  const newNode = dummyMessage?.cloneNode(true) as HTMLElement
  newNode!.querySelector('.message-content p')!.innerHTML = message 
  newNode!.querySelector('.name')!.innerHTML = from  
  
  from !== name &&  newNode.classList.remove('me')

  messagesEl?.append(newNode)
  console.log(type, message, from)
}

function sendMessage(msg: string) {
  ws?.send(JSON.stringify({
    Message: msg
  }))

  print(MessageType.CHAT, msg, name)
}

const messageBoxForm = document.querySelector('.messagebox')
messageBoxForm?.addEventListener('submit', (e) => {
  e.preventDefault()
  const msgInput =  document.querySelector<HTMLInputElement>('.message-input')!
  let msg = msgInput.value 
  sendMessage(msg)
  msgInput.value = ""
  
})


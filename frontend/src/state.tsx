import React, {createContext,useContext,useState} from 'react'
export type Message = { id:string; author:'user'|'system'; content:string; timestamp:string }
type AppState = { currentUser:string; setCurrentUser:(u:string)=>void; messages:Message[]; addMessage:(c:string)=>Promise<void> }
const Ctx = createContext<AppState>({} as any)
export const AppProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
  const [currentUser,setCurrentUser]=useState('guest-'+Math.random().toString(36).slice(2,8))
  const [messages,setMessages]=useState<Message[]>([])
  const API_BASE = import.meta.env.VITE_LOGLINE_BASE_URL || '/api/v1'
  async function addMessage(content:string){
    const mine:Message={id:crypto.randomUUID(),author:'user',content,timestamp:new Date().toISOString()}
    setMessages(p=>[...p,mine])
    try{
      const r=await fetch(`${API_BASE}/llm/chat`,{method:'POST',headers:{'Content-Type':'application/json','X-User':currentUser},body:JSON.stringify({message:content})})
      const data=await r.json()
      const reply:Message={id:crypto.randomUUID(),author:'system',content:data?.reply??'OK',timestamp:new Date().toISOString()}
      setMessages(p=>[...p,reply])
    }catch(e){
      const reply:Message={id:crypto.randomUUID(),author:'system',content:'IA indisponível',timestamp:new Date().toISOString()}
      setMessages(p=>[...p,reply])
    }
  }
  return <Ctx.Provider value={{currentUser,setCurrentUser,messages,addMessage}}>{children}</Ctx.Provider>
}
export const useApp=()=>useContext(Ctx)

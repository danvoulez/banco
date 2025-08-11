import React,{useState} from 'react'
import Left from './ui/Left'
import Chat from './ui/Chat'
import Whats from './ui/Whats'
import New from './ui/New'
export default function App(){
  const [screen,setScreen]=useState<'chat'|'whats'|'new'>('chat')
  return <div style={{display:'grid',gridTemplateColumns:'320px 1fr',height:'100vh'}}>
    <div style={{borderRight:'1px solid #eee',overflow:'auto'}}><Left onNav={setScreen}/></div>
    <div style={{background:'#fff',height:'100%',overflow:'auto'}}>
      {screen==='chat' && <Chat/>}
      {screen==='whats' && <Whats/>}
      {screen==='new' && <New/>}
    </div>
  </div>
}

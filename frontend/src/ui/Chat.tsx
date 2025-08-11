import React,{useState} from 'react'
import {useApp} from '../state'
export default function Chat(){
  const {messages,addMessage}=useApp()
  const [t,setT]=useState('')
  return <div style={{height:'100%',display:'grid',gridTemplateRows:'1fr auto'}}>
    <div style={{padding:16,background:'#fff'}}>
      {messages.map(m=>(<div key={m.id} style={{marginBottom:8}}>
        <b>{m.author==='user'?'Você':'IA'}:</b> {m.content}
      </div>))}
    </div>
    <form onSubmit={e=>{e.preventDefault(); if(t.trim()){addMessage(t.trim()); setT('')}}} style={{display:'flex',gap:8,padding:12,borderTop:'1px solid #eee',background:'#fafafa'}}>
      <input value={t} onChange={e=>setT(e.target.value)} placeholder="Escreva..." style={{flex:1}}/>
      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
  </div>
}

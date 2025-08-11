import React,{useState} from 'react'
import {useApp} from './state'
import App from './App'
import logo from './logo.svg'
export default function Shell(){
  const {setCurrentUser}=useApp()
  const [entered,setEntered]=useState(false)
  const [tmp,setTmp]=useState('')
  if(!entered){
    return <div style={{display:'grid',placeItems:'center',height:'100%'}}>
      <div style={{display:'grid',gap:16,textAlign:'center'}}>
        <img src={logo} width={96} height={96} style={{margin:'0 auto'}}/>
        <div style={{fontSize:28,fontWeight:700}}>minicontratos</div>
        <div style={{display:'flex',gap:8,justifyContent:'center'}}>
          <input placeholder="usuário" value={tmp} onChange={e=>setTmp(e.target.value)} className="btn"/>
          <button className="btn btn-primary" onClick={()=>{ if(tmp){setCurrentUser(tmp);} setEntered(true) }}>Entrar</button>
        </div>
        <div style={{fontSize:12,opacity:.7}}>auth simples: qualquer senha depois</div>
      </div>
    </div>
  }
  return <App/>
}

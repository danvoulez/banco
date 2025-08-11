import React,{useState} from 'react'
import {useApp} from '../state'
export default function Left({onNav}:{onNav:(s:'chat'|'whats'|'new')=>void}){
  const {currentUser,setCurrentUser}=useApp()
  const [tmp,setTmp]=useState('')
  return <div>
    <div style={{padding:12,borderBottom:'1px solid #eee',background:'rgba(0,0,0,.02)'}}>
      <div style={{fontSize:12,opacity:.6,textTransform:'uppercase'}}>Login (ruim)</div>
      <div style={{display:'flex',gap:8,marginTop:6}}>
        <input placeholder="usuário" value={tmp} onChange={e=>setTmp(e.target.value)} style={{flex:'0 0 140px'}}/>
        <input placeholder="senha (qualquer)" type="password"/>
        <button className="btn" onClick={()=> tmp && setCurrentUser(tmp)}>Entrar</button>
        <div style={{marginLeft:'auto',fontSize:12,opacity:.7}}>atual: {currentUser}</div>
      </div>
    </div>
    <div style={{padding:12,display:'grid',gap:8}}>
      <button className="btn btn-primary" onClick={()=>onNav('chat')}>Chat / Timeline</button>
      <button className="btn" onClick={()=>onNav('whats')}>WhatsApp (ruim)</button>
      <button className="btn" onClick={()=>onNav('new')}>New (ruim)</button>
    </div>
  </div>
}

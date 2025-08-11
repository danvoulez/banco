import React,{useState} from 'react'
export default function New(){
  const [title,setTitle]=useState('')
  const [parties,setParties]=useState('')
  return <div style={{padding:16}}>
    <h3>New (ruim)</h3>
    <div style={{display:'grid',gap:8,maxWidth:420}}>
      <input placeholder="Título" value={title} onChange={e=>setTitle(e.target.value)}/>
      <input placeholder="Partes" value={parties} onChange={e=>setParties(e.target.value)}/>
      <button className="btn" onClick={()=>alert('Salvar depois (placeholder)')}>Criar</button>
    </div>
  </div>
}

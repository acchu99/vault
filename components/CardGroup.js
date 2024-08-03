"use client"

import { useState, useEffect } from 'react'
import Card from '@/components/Card'

export default function CardGroup({ passwords }) {
  const [rendered, setRendered] = useState(false);

  useEffect(()=>{
      setRendered(true)
  }, [])

  if (rendered){
    return (
      <div className="grid grid-cols-3 gap-4">
          {passwords.map((el) => <Card id={el.id} key={el.id} name={el.name} site={el.site} username={el.username} note={el.note} />)}
      </div>
    )
  }else{
    return (
      <div className='my-6'>Loading...</div>
    )
  }
}

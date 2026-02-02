import React, { useEffect, useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('/api/hello')
      .then((r) => r.json())
      .then((d) => setMessage(d.message))
      .catch(() => setMessage('Could not reach API'))
  }, [])

  return (
    <div style={{fontFamily:'system-ui',padding:20}}>
      <h1>Vite + React (frontend)</h1>
      <p>API message: {message}</p>
    </div>
  )
}

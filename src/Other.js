import { useState, useEffect } from 'react';

const id = Math.floor(Math.random()*100)

export const Other = ({ channel }) => {
  const [state, setState] = useState()
  const [message, setMessage] = useState({})

  useEffect(() => {
    channel.subscribe(m => setMessage(m))
  }, [channel])

  const handleChange = (event) => {
    setState(event.target.value)
  }

  const send = () => {
    channel.publish('event', JSON.stringify({id, value: state}), (err) => {
      err ? console.log('error') : console.log('git')
    })
  }

  return (
      <div>
          <div className="App">
            <textarea value={state} onChange={handleChange}/>
            <button onClick={send}>Send</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {JSON.stringify(message)}           
        </div>
      </div>
  )

}
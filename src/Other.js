import { useState, useEffect } from 'react';
import { useMqtt } from './useMqtt';

const id = Math.floor(Math.random()*100)

export const Other = ({ client }) => {
  const [state, setState] = useState()

  console.log("other:", client)

  const { payload, mqttSub, mqttPublish } = useMqtt(client)

  useEffect(() => {
    mqttSub({topic: 'tryout/mqtt'})
  }, [client])

  const handleChange = (event) => {
    setState(event.target.value)
  }

  const send = () => {
      mqttPublish({ topic: 'tryout/mqtt', payload: JSON.stringify({id, state }) })
  }

  return (
      <div>
          <div className="App">
            <textarea value={state} onChange={handleChange}/>
            <button onClick={send}>Send</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {JSON.stringify(payload)}           
        </div>
      </div>
  )

}
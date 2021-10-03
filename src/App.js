import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Other } from './Other';
import mqtt from 'mqtt';

function App() {

  const [client, setClient] = useState(null)

  const mqttConnect = (host, mqttOption) => {
    const client = mqtt.connect(host, mqttOption);
    setClient(client)
    return client
  };

  const url = `wss://broker.emqx.io:8084/mqtt`;
  const clientId = `mqttjs_ + ${Math.random().toString(16).substr(2, 8)}`
  const options = {
    keepalive: 30,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    },
    rejectUnauthorized: false
  };
  options.clientId = clientId;
  options.username = process.env.REACT_APP_MQTT_USERNAME;
  options.password = process.env.REACT_APP_MQTT_PASSWORD;

  useEffect(() => {
    setClient(mqttConnect(url, options))
  }, [])

  return (
    <Other client={client} />      
  );
}

export default App;

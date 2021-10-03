import { useState, useEffect } from 'react'

export const useMqtt = (client) => {

  const [payload, setPayload] = useState({});

  useEffect(() => {
    if (client) {
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        client.end();
      });
      client.on('message', (topic, message) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    }
  }, [client]);

  const mqttDisconnect = () => {
    if (client) {
      client.end();
    }
  }

  const mqttPublish = (context) => {
    if (client) {
      const { topic, payload } = context;
      client.publish(topic, payload);
    } else {
        console.log("no client")
    }
  }

  const mqttSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.subscribe(topic, console.log);
    } else {
        console.log('no client')
    }
  };

  const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic);
    }
  };

  return { mqttUnSub, mqttSub, mqttPublish, mqttDisconnect, payload }
}
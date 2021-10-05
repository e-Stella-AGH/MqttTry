import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { Other } from './Other';
import { Realtime } from "ably/browser/static/ably-commonjs.js"

const ably = new Realtime({ key: 'vVogsQ.TIFtUw:VOMpWmEg9kv7tR7K' })

function App() {

  const channel = ably.channels.get('newChannel')

  return (
    <Other channel={channel} />      
  );
}

export default App;

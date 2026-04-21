import React, { useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

export default function App() {
  const [text, setText] = useState('');

  const generate = () => {
    const container = document.getElementById('container');
    container.innerHTML = '';

    const lines = text.split(/\n|,/)
      .map(l => l.replace(/^\s*SN:\s*/i, '').trim())
      .filter(Boolean);

    lines.forEach((line) => {
      const canvas = document.createElement('canvas');
      container.appendChild(canvas);

      JsBarcode(canvas, line, {
        format: 'CODE128',
        displayValue: true,
        height: 80,
        width: 2,
      });
    });
  };

  useEffect(() => {
    if (text) setTimeout(generate, 50);
  }, [text]);

  return (
    <div style={{padding:20, maxWidth:600, margin:'auto'}}>
      <h2>Barcode 128 Generator</h2>
      <textarea
        rows={4}
        style={{width:'100%'}}
        placeholder="Paste multiple codes"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div style={{marginTop:10}}>
        <button onClick={generate}>Generate</button>
        <button onClick={()=>setText('')} style={{marginLeft:10}}>Clear</button>
      </div>
      <div id="container" style={{marginTop:20}}></div>
    </div>
  );
}
import './style.css';
import React, { useState } from 'react';
import Child from './child';
import HOC from './Hoc';

function App() {
  const [color, setColor] = useState('red');

  return (
    <>
      <div>
        <h1>Hello TAMM</h1>
        <p>
          {/* <button> Hover here</button> */}
          <HOC decision={true} childName={Child} />
        </p>
      </div>
    </>
  );
}

export default App;

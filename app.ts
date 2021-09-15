import './style.css';
import React, { useState } from 'react';
import Child from './child';
import HOC from './Hoc';
function App() {
    const [color, setColor] = useState('red');
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            React.createElement("h1", null, "Hello TAMM"),
            React.createElement("p", null,
                React.createElement(HOC, { decision: true, childName: Child })))));
}
export default App;
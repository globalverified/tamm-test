import React, { useState } from 'react';

export default function Child(props) {
  let defaultColor = '#e65aef';
  let green = '#11e619';
  let lemon = '#d9f124';
  const [color, setColor] = useState(defaultColor);

  function colorChange(e) {
    const newColor = color === green ? lemon : green;
    console.log('oldColor-', color);
    console.log('newColor-', newColor);
    setColor(newColor);
  }

  return (
    <>
      <p>{props.hoverText}</p>
      {props.changeColorFeature ? (
        <form>
          <input
            name="button"
            value="Hover or Click to Play"
            style={{ backgroundColor: color }}
            onClick={colorChange}
          />
        </form>
      ) : (
        'changeColorFeature is False'
      )}
    </>
  );
}

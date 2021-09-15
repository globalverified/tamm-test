import React, { useState } from 'react';
export default function Child(props: any) {
  let defaultColor = '#e65aef';
  let green = '#11e619';
  let lemon = '#d9f124';
  const [color, setColor] = useState(defaultColor);
  function colorChange() {
    const newColor = color === green ? lemon : green;
    console.log('oldColor-', color);
    console.log('newColor-', newColor);
    setColor(newColor);
  }
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('p', null, props.hoverText),
    props.changeColorFeature
      ? React.createElement(
          'form',
          null,
          React.createElement('input', {
            name: 'button',
            value: 'Hover or Click to Play',
            style: { backgroundColor: color },
            onClick: colorChange
          })
        )
      : 'changeColorFeature is False'
  );
}

import React from 'react';
export default function HOC(props) {
  let defaultText = ':)';
  const [text, setText] = React.useState(defaultText);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement('h3', null, 'From HOC'),
    React.createElement(
      'section',
      {
        onMouseOver: () => setText('Hover IN '),
        onMouseLeave: () => setText('Hover OUT ')
      },
      React.createElement(props.childName, {
        title: 'Mera Bachha',
        hoverText: text,
        changeColorFeature: true
      })
    )
  );
}

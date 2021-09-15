import React, { useState } from 'react';

export default function HOC(props) {
  let defaultText = ':)';
  const [text, setText] = React.useState(defaultText);

  return (
    <>
      <h3>From HOC</h3>
      <section
        onMouseOver={() => setText('Hover IN ')}
        onMouseLeave={() => setText('Hover OUT ')}
      >
        <props.childName
          title="Mera Bachha"
          hoverText={text}
          changeColorFeature={true}
        />
      </section>
    </>
  );
}

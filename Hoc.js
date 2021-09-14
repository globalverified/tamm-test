import React, { useState } from 'react';
// import Child from './child';

export default function HOC(props) {
  return (
    <>
      <h3>From HOC</h3>
      <props.childName
        title="Mera Bachha"
        changeColorFeature={props.decision}
      />
    </>
  );
}

import React, { Component } from 'react';

const Dialog = ({ label, content }) => (
  <div>
    <h1>{label}</h1>
    <span>{content}</span>
  </div>
);

export default Dialog;

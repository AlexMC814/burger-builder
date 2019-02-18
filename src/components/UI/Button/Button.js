import React from 'react';
import './Button.scss';

const Button = props => {
  return (
    <button
      className={`button ${props.btnType}`}
      onClick={props.clicked}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
};

export default Button;

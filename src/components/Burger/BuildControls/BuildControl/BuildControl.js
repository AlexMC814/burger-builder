import React from 'react';
import './BuildControl.scss';

const BuildControl = props => {
  return (
    <div className='build-control'>
      <div className='build-control__label'>{props.label}</div>
      <button
        className='build-control__btn minus'
        onClick={props.remove}
        disabled={props.disabled}>
        -
      </button>
      <button className='build-control__btn plus' onClick={props.add}>
        +
      </button>
    </div>
  );
};

export default BuildControl;

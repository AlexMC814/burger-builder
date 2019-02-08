import React from 'react';
import './BuildControls.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = props => {
  return (
    <div className='build-controls'>
      {controls.map(ctrl => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            add={() => props.add(ctrl.type)}
            remove={() => props.remove(ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
    </div>
  );
};

export default BuildControls;

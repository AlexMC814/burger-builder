import React from 'react';
import './BuildControls.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Салат', type: 'salad' },
  { label: 'Бекон', type: 'bacon' },
  { label: 'Сыр', type: 'cheese' },
  { label: 'Мясо', type: 'meat' },
];

const BuildControls = props => {
  return (
    <div className='build-controls'>
      <h3>Бургер Конструктор</h3>
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
      <button
        className='order-btn'
        disabled={!props.purchasable}
        onClick={props.ordered}>
        ЗАКАЗАТЬ
      </button>
    </div>
  );
};

export default BuildControls;

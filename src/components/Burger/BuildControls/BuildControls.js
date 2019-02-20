import React from 'react';
import './BuildControls.scss';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Салат', type: 'Салат' },
  { label: 'Бекон', type: 'Бекон' },
  { label: 'Сыр', type: 'Сыр' },
  { label: 'Мясо', type: 'Мясо' },
];

const BuildControls = props => {
  return (
    <div className='build-controls'>
      <h3>Бургер Конструктор</h3>
      <strong>{props.price.toFixed(2)}</strong>
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
        {props.isAuth ? 'ЗАКАЗАТЬ' : 'ВОЙДИТЕ ЧТОБЫ ЗАКАЗАТЬ'}
      </button>
    </div>
  );
};

export default BuildControls;

import React from 'react';
import style from './OperationCard.module.scss';
import { AbstractOperation } from 'src/entities/operation/Operation';

export interface OperationCardProps extends AbstractOperation {
  onEditClick?: (id: string) => void;
}

export const OperationCard: React.FC<OperationCardProps> = ({
  id,
  amount,
  category,
  name,
  desc,
  date,
  onEditClick,
}) => {
  return (
    <div className={style['card']}>
      <div className={style['card-header']}>
        <span className={style['category']}>{category.name}</span>
        <span className={style['money-value']}>{amount}</span>
      </div>
      <div className={style['card-body']}>
        <h2 className={style['name']}>{name}</h2>
        <p className={style['description']}>{desc}</p>
      </div>
      <div className={style['card-footer']}>
        <span className={style['date']}>{date}</span>
        {onEditClick && (
          <button className={style['edit-button']} onClick={() => onEditClick(id)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

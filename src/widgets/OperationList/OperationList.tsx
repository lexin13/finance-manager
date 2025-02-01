import React from 'react';
import { OperationCard, OperationCardProps } from '../OperationCard/OperationCard';

import style from './OperationList.module.scss';

export interface OperationListProps {
  operations: OperationCardProps[];
  onEdit?: (id: string) => void;
}

export const OperationList: React.FC<OperationListProps> = ({ operations, onEdit }) => {
  return (
    <div className={style['operation-list']}>
      {operations.map((operation) => (
        <div key={operation.id}>
          <OperationCard {...operation} onEditClick={onEdit} />
        </div>
      ))}
    </div>
  );
};

import React, { CSSProperties } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OperationList } from 'src/widgets/OperationList/OperationList';
import { createRandomOperation } from 'src/entities/operation/Operation';
import AddOperationButton from 'src/features/AddOperationButton/AddOperationButton';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from 'src/shared/ui/Button/Button';
import { addOperation } from 'src/features/operation/operationSlice';
// import { selectIsAdmin } from 'src/features/profile/selectors';
import style from './OperationListPage.module.scss';
import { selectOperations } from 'src/features/operation/selectors';

type ColumnsWidthCSS = CSSProperties & {
  '--columns-width': string;
};

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleAddRandomOperation = () => {
    const newOperation = createRandomOperation(new Date().toISOString());
    dispatch(addOperation(newOperation));
  };

  const handleAddNr = (count: number) => () => {
    [...Array(count)].forEach(() => handleAddRandomOperation());
  };

  return (
    <div className={style.sidebar}>
      <AddOperationButton />
      <Button onClick={handleAddRandomOperation}>Add random operation</Button>
      <Button onClick={handleAddNr(100)}>Add 100 operations</Button>
    </div>
  );
};

export const OperationListPage: React.FC = () => {
  const navigate = useNavigate();
  const { operations } = useSelector(selectOperations);
  // const isAdmin = useSelector(selectIsAdmin);

  const onEditClick = (id: string) => {
    navigate(`${id}/edit`);
  };

  const getContainerStyle = (visible: boolean): ColumnsWidthCSS => ({
    '--columns-width': visible ? '250px 1fr' : '1fr',
  });

  return (
    <div className={style.container} style={getContainerStyle(true)}>
      {true && <Sidebar />}
      <div className={style['operation-list']}>
        <OperationList operations={operations} onEdit={true && onEditClick} />
      </div>
      <Outlet />
    </div>
  );
};

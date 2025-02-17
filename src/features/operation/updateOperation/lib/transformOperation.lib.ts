import { Operation, OperationAddInput, OperationType } from 'src/entities/operation/types/operation.types';
import { OperationSchemaType } from '../ui/OperationForm/operationForm.schema';

export const transformOperationToFormData = (operation: Operation): OperationSchemaType => ({
  amount: operation.amount,
  category: operation.category.id,
  date: operation.date,
  name: operation.name,
  desc: operation.desc ?? '',
  type: operation.type as OperationType,
});

export const transformFormDataToOpearionInput = (formData: OperationSchemaType): OperationAddInput => ({
  amount: formData.amount,
  categoryId: formData.category,
  date: formData.date,
  name: formData.name,
  desc: formData.desc,
  type: formData.type as OperationType,
});

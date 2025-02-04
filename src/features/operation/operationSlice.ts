import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from 'src/shared/api/client';
import { OPERATION_LIST_QUERY, ADD_OPERATION_MUTATION } from './api/operation';
import { ApolloError } from '@apollo/client';

import { BankOperation, createRandomOperation } from 'src/entities/operation/Operation';

export type OperationInputFields = {
  input: {
    name: string;
    amount: number;
    date: string;
    type: 'Cost' | 'Profit';
    categoryId: string;
  };
};

export type OperationField = 'name';

export type OperationError = {
  fields: OperationField[];
  message: string;
};

type ServerErrorExtension = {
  code: string;
};

type ErrorFieldsMap = Record<string, OperationField[]>;
const errorFieldsMap: ErrorFieldsMap = {
  VALIDATION: ['name'],
};

export const handleOperationError = (serverError: ApolloError): OperationError => {
  const { message, extensions } = serverError.cause;
  const serverErrorExtension = extensions as ServerErrorExtension;
  const fields = errorFieldsMap[serverErrorExtension.code];

  return { fields: fields ?? [], message };
};

export const handleUnknownError = (serverError: string): OperationError => {
  return { fields: [], message: serverError };
};

export const fetchOperations = createAsyncThunk('operations/fetchOperations', async () => {
  const { data } = await client.query({ query: OPERATION_LIST_QUERY });
  return data.operations.getMany.data;
});

export const addOperation = createAsyncThunk(
  'operations/addOperation',
  async ({ input }: OperationInputFields, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: ADD_OPERATION_MUTATION,
        variables: { input },
      });
      return data.operations.add;
    } catch (err) {
      if (err instanceof ApolloError) {
        return rejectWithValue(handleOperationError(err));
      }
      return rejectWithValue(handleUnknownError('An unknown error occurred'));
    }
  }
);

interface OperationsState {
  operations: BankOperation[];
  status: 'idle' | 'loading' | 'fetch_succeeded' | 'add_succeeded' | 'failed';
  error: OperationError | null;
}

const initialState: OperationsState = {
  operations: [],
  status: 'idle',
  error: null,
  // operations: [...Array(10)].map(() => createRandomOperation(new Date().toISOString())),
};

const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    // addOperation: (state, action: PayloadAction<BankOperation>) => {
    //   state.operations.push(action.payload);
    // },
    // updateOperation: (state, action: PayloadAction<BankOperation>) => {
    //   const index = state.operations.findIndex((op) => op.id === action.payload.id);
    //   if (index !== -1) {
    //     state.operations[index] = action.payload;
    //   }
    // },
    // deleteOperation: (state, action: PayloadAction<string>) => {
    //   state.operations = state.operations.filter((op) => op.id !== action.payload);
    // },
    // setOperations: (state, action: PayloadAction<BankOperation[]>) => {
    //   state.operations = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOperations.fulfilled, (state, action) => {
        state.status = 'fetch_succeeded';
        state.operations = action.payload;
      })
      .addCase(fetchOperations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as OperationError;
      })
      .addCase(addOperation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOperation.fulfilled, (state, action) => {
        state.status = 'add_succeeded';
        state.operations.push(action.payload);
      })
      .addCase(addOperation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as OperationError;
      });
  },
});

// export const { addOperation, updateOperation, deleteOperation, setOperations } = operationsSlice.actions;
export default operationsSlice.reducer;

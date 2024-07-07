import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchExpenses = createAsyncThunk(
  'expense/fetchExpenses',
  async userId => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(
      `https://expense-tracker-9z0l.onrender.com/api/expenses?user.id=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data; // Ensure the response data format matches expectations
  },
);

export const addExpense = createAsyncThunk(
  'expense/addExpense',
  async (expenseData, {rejectWithValue}) => {
    try {
      const jwt = await AsyncStorage.getItem('token');
      if (!jwt) {
        throw new Error('JWT not found');
      }
      const response = await axios.post(
        'https://expense-tracker-9z0l.onrender.com/api/expenses',
        {data: expenseData},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      );
      return response.data; // Ensure the response data format matches expectations
    } catch (error) {
      console.error('Error submitting expense:', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    expenses: {data: []}, // Ensure the initial state is an object with a data array
    status: 'idle',
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchExpenses.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addExpense.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.expenses.data.push(action.payload.data); // Add new expense to the existing list
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default expenseSlice.reducer;

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = createAsyncThunk('auth/loginUser', async userData => {
  const response = await axios.post(
    'https://expense-tracker-9z0l.onrender.com/api/auth/local',
    userData,
  );
  await AsyncStorage.setItem('token', response.data.jwt);
  await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {user: null, status: 'idle', error: null},
  reducers: {
    logout: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;

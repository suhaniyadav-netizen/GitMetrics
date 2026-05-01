import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (username, { rejectWithValue }) => {
    try {
      const [profileRes, reposRes] = await Promise.all([
        axios.get(`https://api.github.com/users/${username}`),
       
        axios.get(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
      ]);
      
      return { 
        profile: profileRes.data, 
        repos: reposRes.data 
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'User not found');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    repos: [], 
    status: 'idle',
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.profile = null;
      state.repos = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload.profile;
        state.repos = action.payload.repos; 
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
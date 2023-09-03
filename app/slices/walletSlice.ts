import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  walletAddress: '', // Initial value is an empty string
};

// Create a Redux slice
export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // Action to set the wallet address
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    // Action to clear the wallet address
    clearWalletAddress: (state) => {
      state.walletAddress = '';
    },
  },
});

// Export action creators
export const { setWalletAddress, clearWalletAddress } = walletSlice.actions;

// Export the reducer
export default walletSlice.reducer;

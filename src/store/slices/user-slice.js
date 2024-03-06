import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../thunks/user";

const initialState = {
  getProfileLoading: false,
  user_id: null,
  team_name: null,
  mobile_number: null,
  profile_photo_small: null,
  access_token: null,
  wallet: {
    withdrawal_amount: 0,
  },
  payment_methods: {
    upi: {},
    bank: {},
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateUserSliceData(state, action) {
      return { ...state, ...action.payload };
    },
    deleteUserSliceData(state, action) {
      return {
        getProfileLoading: false,
        user_id: null,
        team_name: null,
        mobile_number: null,
        profile_photo_small: null,
        access_token: null,
        wallet: {
          withdrawal_amount: 0,
        },
        payment_methods: {
          upi: {},
          bank: {},
        },
      };
    },
    updateWalletData(state, action) {
      return { ...state, wallet: { ...state.wallet, ...action.payload } };
    },
    updatePaymentMethods(state, action) {
      return {
        ...state,
        payment_methods: { ...state.payment_methods, ...action.payload },
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.getProfileLoading = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.getProfileLoading = false;
    });
    builder.addCase(getProfile.rejected, (state, action) => {
      state.getProfileLoading = false;
    });
  },
});

export const {
  updateUserSliceData,
  deleteUserSliceData,
  updateWalletData,
  updatePaymentMethods,
} = userSlice.actions;

export default userSlice.reducer;

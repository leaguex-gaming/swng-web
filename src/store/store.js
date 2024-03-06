import { configureStore } from "@reduxjs/toolkit";
import commonSliceReducer from "./slices/common-slice";
import { authSliceReducer } from "./slices/authSlice";
import userSliceReducer from "./slices/user-slice";
import communitySliceReducer from "./slices/community-slice";
// import broadcastSliceReducer from "./slices/broadcast-slice";

export const store = configureStore({
  reducer: {
    common: commonSliceReducer,
    user: authSliceReducer,
    userSlice: userSliceReducer,
    community: communitySliceReducer,
    // broadcast: broadcastSliceReducer,
  },
});

export default store;

// import {createSlice} from "@reduxjs/toolkit";
// import {getMatchDetailsThunk} from "../thunks/broadcast";

// const initialState = {
//   cricket: {},
//   football: {},
//   getCricketMatchDetailsLoading: false,
// };

// const broadcastSlice = createSlice({
//   name: "broadcast",
//   initialState,
//   reducers: {
//     updateCricket(state, action) {
//       state.cricket = action.payload;
//     },
//     updateSoccer(state, action) {
//       state.football = action.payload;
//     },
//     updateCricketMatchById(state, action) {
//       const matchId = action.payload.id;
//       state.cricket[matchId] = {
//         ...state.cricket[matchId],
//         ...action.payload,
//       };
//     },
//     updateSoccerMatchById(state, action) {
//       const matchId = action.payload.id;
//       state.football[matchId] = {
//         ...state.football[matchId],
//         ...action.payload,
//       };
//     },
//   },
//   extraReducers: builder => {
//     builder.addCase(getMatchDetailsThunk.pending, state => {
//       state.getCricketMatchDetailsLoading = true;
//     });
//     builder.addCase(getMatchDetailsThunk.fulfilled, (state, action) => {
//       state.getCricketMatchDetailsLoading = false;
//     });
//     builder.addCase(getMatchDetailsThunk.rejected, (state, action) => {
//       state.getCricketMatchDetailsLoading = false;
//     });
//   },
// });

// export const {
//   updateCricket,
//   updateSoccer,
//   updateCricketMatchById,
//   updateSoccerMatchById,
// } = broadcastSlice.actions;

// export default broadcastSlice.reducer;

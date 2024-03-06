// import axios from "axios";
// import {
//   GET_MATCHES,
//   GET_MATCH_DETAILS,
// } from "../../constants/endpoints/broadcast-endpoints";
// import {
//   updateCricket,
//   updateCricketMatchById,
//   updateSoccer,
//   updateSoccerMatchById,
// } from "../slices/broadcast-slice";

// const {createAsyncThunk} = require("@reduxjs/toolkit");

// const convertToObj = (arr = []) => {
//   try {
//     const obj = arr.reduce((acc, curr) => {
//       acc[curr.id] = curr;

//       if (curr.is_popular || curr.match_status === "ongoing") {
//         if (!acc.priority1) {
//           acc.priority1 = [curr.id];
//         } else {
//           acc.priority1.push(curr.id);
//         }
//       } else if (curr.is_popular) {
//         if (!acc.priority2) {
//           acc.priority2 = [curr.id];
//         } else {
//           acc.priority2.push(curr.id);
//         }
//       } else {
//         if (!acc.priority3) {
//           acc.priority3 = [curr.id];
//         } else {
//           acc.priority3.push(curr.id);
//         }
//       }

//       return acc;
//     }, {});
//     obj.priority = [];
//     if (obj.priority1) {
//       obj.priority = obj.priority1;
//       delete obj.priority1;
//     }
//     if (obj.priority2) {
//       obj.priority = obj.priority.concat(obj.priority2);
//       delete obj.priority2;
//     }
//     if (obj.priority3) {
//       obj.priority = obj.priority.concat(obj.priority3);
//       delete obj.priority3;
//     }

//     return obj;
//   } catch (e) {
//     console.log(e);
//     return {};
//   }
// };

// export const getMatchesThunk = createAsyncThunk(
//   "broadcast/getMatches",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await axios.get(GET_MATCHES);
//       let cricket = convertToObj(response.data.cricket);
//       let soccer = convertToObj(response.data.soccer);

//       thunkAPI.dispatch(updateCricket(cricket));
//       thunkAPI.dispatch(updateSoccer(soccer));
//     } catch (e) {}
//   },
// );

// export const getMatchDetailsThunk = createAsyncThunk(
//   "broadcast/getMatchDetails",
//   async (payload, thunkAPI) => {
//     try {
//       const {id, sport} = payload;

//       // const response = await axios.get(GET_MATCH_DETAILS + id);
//       const response = await axios.get(
//         `https://leaguex.s3.ap-south-1.amazonaws.com/live_match_details/${id}_entity_sport.json`,
//       );
//       if (sport === "cricket") {
//         const matchData = thunkAPI.getState().broadcast.cricket[id];
//         const battingTeamId = response.data.innings[0].batting_team_id;
//         const teama = response.data.teama;
//         const teamb = response.data.teamb;
//         const battingTeam = battingTeamId === teama.team_id ? teama : teamb;
//         const changeData = {};
//         if (matchData.t1_id !== battingTeam.team_id) {
//           const tempId = matchData.t1_id;
//           changeData.t1_id = matchData.t2_id;
//           changeData.t2_id = tempId;
//           const tempImage = matchData.t1_image;
//           changeData.t1_image = matchData.t2_image;
//           changeData.t2_image = tempImage;
//           const tempName = matchData.t1_short_name;
//           changeData.t1_short_name = battingTeam.short_name;
//           changeData.t2_short_name = tempName;
//         }
//         changeData.t1_score = response.data.innings?.[0]?.scores_full || "";
//         changeData.t2_score = response.data.innings?.[1]?.scores_full || "";
//         changeData.players = {};

//         let recent_scores = [];
//         if (response.data?.recent_scores) {
//           recent_scores = response.data?.recent_scores.split(",")?.slice(0, 6);
//         }

//         thunkAPI.dispatch(
//           updateCricketMatchById({
//             ...response.data,
//             id: id,
//             recent_scores: recent_scores,
//             recent_ball: response.data?.recent_ball || {},
//             ...changeData,
//           }),
//         );
//       } else if (sport === "soccer") {
//         thunkAPI.dispatch(updateSoccerMatchById(response.data));
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   },
// );

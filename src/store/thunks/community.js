// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {
//   ApiService,
//   ApiServiceMultipart,
// } from "../../utils/services/api/apiService";
// import {
//   CREATE_POST,
//   GET_MEDIA_URL,
//   GET_POSTS,
//   COMMENTS,
//   LIKE_POST,
//   LIKE_COMMENT,
//   GET_USER_PROFILE,
//   DELETE_POST,
//   USER_FOLLOW_UNFOLLOW,
//   VIDEO_SEGMENTS,
//   REPORT_POST,
//   NOTIFICATION_HISTORY,
//   VIEW_NOTIFICATIONS,
//   SEARCH_USERS,
//   SEARCH_POSTS,
//   VIEW_POSTS,
//   SHARE_POSTS,
//   GET_RANDOM_POSTS,
//   GET_UNSEEN_POSTS,
//   GET_LIST_OF_TOPICS,
//   UPDATE_INTERESTED_TOPIC,
//   GET_MY_ACTIVITY,
//   GET_COMMENT_REPLIES,
//   GET_RECOMMENDED_REELS,
//   GET_RECOMMENDED_USERS,
//   GET_RECOMMENDED_POSTS,
// } from "../../constants/endpoints/community-endpoints";
// import Toast from "react-native-toast-message";

// import {Platform} from "react-native";
// import {
//   addComment,
//   addPost,
//   updateAllSubtopics,
//   updateCommentLike,
//   updateCommentReplies,
//   updateComments,
//   updateDeletePost,
//   updateDeletedComment,
//   updateFollow,
//   updateLike,
//   updateMyPosts,
//   updateNotificationHistory,
//   updatePostById,
//   updatePosts,
//   updateReelsPosts,
//   updateSeed,
//   updateShareCount,
//   updateSpecificUserPosts,
//   updateTopics,
//   updateUserProfile,
//   updateViewedPosts,
// } from "../slices/community-slice";
// import {rootNavigate} from "../../navigation/Navigation";
// import {storeDataToAsyncStorage} from "../../utils/asyncstorage/AsyncStorageFunctions";
// import {errorToast} from "../../utils/helpers/errorToast";
// import {Video, createVideoThumbnail} from "react-native-compressor";
// import {FFmpegKit} from "ffmpeg-kit-react-native";
// import RNFetchBlob from "rn-fetch-blob";
// import {updateApiLoading, updateUserClappedPost} from "../slices/common-slice";
// import {
//   cachePosts,
//   getImagePath,
//   getVideoPath,
//   getVideoThumbnailPath,
// } from "../../utils/downloadAndCache";
// import {logEvent} from "../../utils/events";
// import {
//   POST_API_CALL_PAGE_SIZE,
//   REELS_API_CALL_PAGE_SIZE,
// } from "../../constants/StaticData";
// import {shouldShowShareAppCard} from "../../utils/helpers/hibernation";
// import {triggerAppRatingPopUp} from "../../utils/helpers/trigerInAppReviewPopUp";
// import {PlatformOS} from "../../constants/DeviceData";

// export const updateCachePathInPostArray = async (posts = []) => {
//   try {
//     const updatedPosts = await Promise.all(
//       posts?.map(async post => {
//         if (post?.media_type === "video") {
//           // const updatedVideoPath = `file://${
//           //   getVideoPath(post?.media_url)?.split(".m3u8")?.[0]
//           // }.mp4`;
//           // const fileExists = await RNFetchBlob.fs.exists(updatedVideoPath);
//           // // const updatedThumbnailPath = `file://${getVideoThumbnailPath(
//           // //   post?.media_url,
//           // // )}`;
//           // if (fileExists) {
//           //   // Return a new object with the updated media_url
//           //   return {
//           //     ...post,
//           //     media_url: updatedVideoPath,
//           //     // media_thumbnail_url: updatedThumbnailPath,
//           //   };
//           // } else {
//           return post;
//           // }
//         } else if (post?.media_type === "image") {
//           const updatedImagePath = `file://${getImagePath(post?.media_url)}`;
//           const fileExists = await RNFetchBlob.fs.exists(updatedImagePath);
//           if (fileExists) {
//             return {
//               ...post,
//               media_url: updatedImagePath,
//             };
//           } else {
//             return post;
//           }
//         } else {
//           return post;
//         }
//       }),
//     );

//     return updatedPosts;
//   } catch (e) {
//     console.log("err");
//     return posts;
//   }
// };

// export const getPostsThunk = createAsyncThunk(
//   "communitySlice/getPostsThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const {page_number = 1} = payload;
//       const subtopic_id = 0;
//       const seed = thunkAPI.getState().community.seed;
//       let response;
//       let timeline = [];

//       if (!seed) {
//         response = await ApiService.get(GET_RECOMMENDED_POSTS, {
//           params: {
//             size: POST_API_CALL_PAGE_SIZE,
//             page_number: page_number,
//           },
//         });
//         timeline = response.data.posts;
//       }

//       if (timeline?.length < POST_API_CALL_PAGE_SIZE) {
//         if (seed) {
//           response = await ApiService.get(GET_RANDOM_POSTS, {
//             params: {
//               size: POST_API_CALL_PAGE_SIZE,
//               page_number: page_number,
//               seed: seed,
//             },
//           });
//           timeline = response.data.timeline;
//         } else {
//           response = await ApiService.get(GET_RANDOM_POSTS, {
//             params: {
//               size: POST_API_CALL_PAGE_SIZE,
//               page_number: 1,
//             },
//           });
//           timeline = response.data.timeline;
//         }
//       }

//       if (page_number === 2) {
//         if (
//           thunkAPI.getState().common.userClappedPost &&
//           PlatformOS !== "web"
//         ) {
//           const showShareCard = await shouldShowShareAppCard();
//           if (showShareCard) {
//             timeline = [{type: "Share", id: 0}, ...timeline];
//             thunkAPI.dispatch(updateUserClappedPost(false));
//           }
//         } else {
//           triggerAppRatingPopUp();
//         }
//       }

//       //User Follow Suggestion
//       if (page_number === 3) {
//         timeline = [{type: "UserSuggestion", id: 0}, ...timeline];
//       }

//       if (response.data?.seed) {
//         thunkAPI.dispatch(updateSeed(response.data?.seed));
//       }
//       await cachePosts(timeline);
//       thunkAPI.dispatch(
//         updatePosts({
//           data: await updateCachePathInPostArray(timeline),
//           page_number: page_number,
//           subtopic_id: subtopic_id,
//           total_pages: response.data.total_pages || 1,
//         }),
//       );

//       const temporaryPosts = await thunkAPI
//         .getState()
//         .community.posts[subtopic_id].posts.slice(0, POST_API_CALL_PAGE_SIZE);

//       await storeDataToAsyncStorage("posts", temporaryPosts);

//       return response.data;
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const getPostsByTopicThunk = createAsyncThunk(
//   "communitySlice/getPostsByTopicThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const {
//         topic_id = "",
//         subtopic_id = "",
//         page_number = 1,
//         user_id = "",
//       } = payload;
//       const response = await ApiService.get(GET_POSTS, {
//         params: {
//           size: 10,
//           page_number: page_number,
//           topic_id: !topic_id ? undefined : topic_id,
//           subtopic_id: !subtopic_id ? undefined : subtopic_id,
//           user_id: user_id,
//         },
//       });
//       await cachePosts(response.data.posts);
//       thunkAPI.dispatch(
//         updatePosts({
//           data: await updateCachePathInPostArray(response.data.posts),
//           subtopic_id,
//           total_pages: response.data.total_pages,
//           page_number: page_number,
//         }),
//       );

//       return response.data;
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const getRecommendedReels = createAsyncThunk(
//   "communitySlice/getRecommendedReels",
//   async (payload, thunkAPI) => {
//     try {
//       const {
//         currentTopicId,
//         size = REELS_API_CALL_PAGE_SIZE,
//         pageNumber = 1,
//       } = payload;
//       const response = await ApiService.get(GET_RECOMMENDED_REELS, {
//         params: {
//           size: size,
//           page_number: pageNumber,
//         },
//       });

//       thunkAPI.dispatch(
//         updateReelsPosts({
//           data: response.data.posts,
//           subtopic_id: currentTopicId,
//           total_pages: response.data.total_pages,
//           page_number: pageNumber,
//         }),
//       );
//       return response.data;
//     } catch (err) {
//       console.log(err);
//       errorToast(err);
//     }
//   },
// );

// export const getPostsByUserId = createAsyncThunk(
//   "communitySlice/getPostsByUserId",
//   async (payload, thunkAPI) => {
//     try {
//       const {
//         topic_id = "",
//         subtopic_id = "",
//         page_number = 1,
//         user_id = "",
//       } = payload;

//       const response = await ApiService.get(GET_POSTS, {
//         params: {
//           size: POST_API_CALL_PAGE_SIZE,
//           page_number: page_number,
//           topic_id: topic_id,
//           subtopic_id: subtopic_id,
//           user_id: user_id,
//         },
//       });

//       thunkAPI.dispatch(
//         updateSpecificUserPosts({
//           user_id: user_id,
//           subTopics: response.data.topics[0].subtopics,
//           total_pages: response.data.total_pages,
//           page_number: page_number,
//           data: response.data.posts,
//           subtopic_id: subtopic_id,
//         }),
//       );

//       return response.data;
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const getPostById = createAsyncThunk(
//   "communitySlice/getPostsByPostId",
//   async (payload, thunkAPI) => {
//     try {
//       const {post_id = "", currentTopicId = 0} = payload;
//       const response = await ApiService.get(GET_POSTS, {
//         params: {
//           post_id: post_id,
//         },
//       });
//       thunkAPI.dispatch(
//         updatePostById({
//           post: response.data?.posts,
//           currentTopicId: currentTopicId,
//         }),
//       );

//       return response.data;
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const createPostThunk = createAsyncThunk(
//   "communitySlice/createPostThunk",
//   async (payload, thunkAPI) => {
//     try {
//       if (!payload?.selectedMedia) {
//         const response = await ApiService.post(CREATE_POST, payload);

//         thunkAPI.dispatch(addPost(response.data.post));

//         const temporaryPosts = await thunkAPI
//           .getState()
//           .community.posts[0].posts.slice(0, POST_API_CALL_PAGE_SIZE);
//         await storeDataToAsyncStorage("posts", temporaryPosts);

//         thunkAPI.dispatch(updateApiLoading({loading: false, content: ""}));

//         rootNavigate(null, "back");

//         Toast.show({
//           type: "notify",
//           visibilityTime: 5000,
//           props: {
//             profile_pic: payload?.notify_profile_pic,
//             post_id: response?.data?.post?.id,
//             name: payload?.notify_title,
//             content: "Your post uploaded successfully",
//             topic_id: 0,
//             deep_link: false,
//             navigate: true,
//           },
//         });
//       } else {
//         rootNavigate(null, "back");
//         const {controller} = payload;
//         let mediaUrl;
//         let compressedImageUrl;
//         let videoThumbnail;

//         if (payload?.fileType === "video") {
//           const segmentDuration = 3;
//           const segmentCount = Math.ceil(
//             payload?.selectedMedia?.duration / segmentDuration,
//           );

//           const compressedVideo = await Video.compress(
//             payload.selectedMedia?.uri,
//             {
//               bitrate: 1000000, //1mbps
//             },
//           );
//           const chunk = false;
//           const fileName = `${Date.now()}${payload.selectedMedia?.fileName}`;
//           if (chunk) {
//             const getVideoSegments = await ApiService.get(VIDEO_SEGMENTS, {
//               params: {
//                 number_of_segments: segmentCount + 1,
//                 file_name: fileName,
//               },
//             });

//             const videoSegments = getVideoSegments.data.segments;
//             const videoPlaylist = getVideoSegments.data.playlist;
//             const bucket = videoPlaylist.fields.bucket;

//             // get mediaUrl
//             mediaUrl = `https://${bucket}.s3.amazonaws.com/${videoPlaylist.fields.key}`;
//             await chunkVideo(compressedVideo, fileName);

//             const cacheDir = RNFetchBlob.fs.dirs.CacheDir;

//             const files = await RNFetchBlob.fs.ls(cacheDir);

//             await rewritePathsToS3(
//               cacheDir + "/index.m3u8",
//               cacheDir + "/playlist.m3u8",
//               videoSegments,
//             );
//             let index = 0;

//             for (const file of files) {
//               if (file === "playlist.m3u8") {
//                 await uploadVideoSegmentsToS3(
//                   `${cacheDir}/${file}`,
//                   videoPlaylist.fields,
//                 );
//               } else if (file.includes(fileName + "_video")) {
//                 await uploadVideoSegmentsToS3(
//                   `${cacheDir}/${file}`,
//                   videoSegments[index]?.fields,
//                 );
//                 index++;
//               }
//             }
//           } else {
//             // upload full videommp4
//             const videoUrlResponse = await uploadMediaToS3(
//               payload.selectedMedia,
//               payload.fileType,
//               {},
//               payload.extension,
//             );
//             const bucket = videoUrlResponse.data?.url?.fields?.bucket;
//             mediaUrl = `https://${bucket}.s3.amazonaws.com/${videoUrlResponse.data?.url?.fields?.key}`;
//           }

//           const thumbnailRes = await createVideoThumbnail(
//             payload.selectedMedia?.uri,
//           );
//           const thumbnailMediaUrlResponse = await uploadMediaToS3(
//             thumbnailRes,
//             "image",
//             controller,
//             "jpeg",
//           );
//           const bucket = thumbnailMediaUrlResponse.data?.url?.fields?.bucket;
//           videoThumbnail = `https://${bucket}.s3.amazonaws.com/${thumbnailMediaUrlResponse.data?.url?.fields?.key}`;
//         } else if (payload?.fileType === "image") {
//           const normalmediaUrlResponse = await uploadMediaToS3(
//             payload.selectedMedia,
//             payload.fileType,
//             {},
//             payload.extension,
//           );

//           const compressedMediaUrlResponse = await uploadMediaToS3(
//             payload.compressedMedia,
//             payload.fileType,
//             {},
//             payload.extension,
//           );
//           const bucket = normalmediaUrlResponse.data?.url?.fields?.bucket;

//           mediaUrl = `https://${bucket}.s3.amazonaws.com/${normalmediaUrlResponse.data?.url?.fields?.key}`;

//           compressedImageUrl = `https://${bucket}.s3.amazonaws.com/${compressedMediaUrlResponse.data?.url?.fields?.key}`;
//         }

//         let newPayload = {
//           content: payload?.content,
//           media_exists: false,
//           media_type: payload?.fileType || payload?.media_type,
//           topic_id: payload?.topic_id,
//           subtopic_id: payload?.subtopic_id,
//           post_mentions: payload?.post_mentions,
//         };

//         if (payload?.fileType === "image" || payload?.fileType === "video") {
//           newPayload = {
//             ...newPayload,
//             media_exists: true,
//             media_url: mediaUrl,
//             media_meta_data: payload?.selectedMedia,
//             compressed_image_url: compressedImageUrl,
//             media_thumbnail_url: videoThumbnail,
//           };
//         }
//         if (__DEV__) {
//           console.log({mediaUrl});
//         }
//         const response = await ApiService.post(CREATE_POST, newPayload);
//         if (response.status != 200) {
//           throw response;
//         }

//         if (newPayload?.media_type !== "video") {
//           await thunkAPI.dispatch(addPost(response.data?.post));
//         }

//         if (newPayload?.media_type !== "video") {
//           Toast.show({
//             type: "notify",
//             visibilityTime: 5000,
//             props: {
//               profile_pic: payload?.notify_profile_pic,
//               post_id: response?.data?.post?.id,
//               name: payload?.notify_title,
//               content: "Your post uploaded successfully",
//               topic_id: 0,
//               type: "CREATE_POST",
//               deep_link: false,
//               navigate: true,
//             },
//           });
//           const temporaryPosts = await thunkAPI
//             .getState()
//             .community.posts[0].posts.slice(0, 10);
//           await storeDataToAsyncStorage("posts", temporaryPosts);
//         } else {
//           Toast.show({
//             type: "warning",
//             visibilityTime: 5000,
//             props: {
//               message:
//                 "Your video is being processed. It will be available shortly.",
//             },
//           });
//         }

//         thunkAPI.dispatch(updateApiLoading({loading: false, content: ""}));

//         return true;
//       }
//     } catch (err) {
//       thunkAPI.dispatch(updateApiLoading({loading: false, content: ""}));

//       errorToast(err);

//       return false;
//     }
//   },
// );

// export const uploadMediaToS3 = async (
//   media,
//   fileType,
//   controller = {},
//   extension,
// ) => {
//   let media_type;
//   if (fileType === "image") {
//     media_type = fileType;
//   } else {
//     media_type =
//       media?.type?.split("/")?.[0] ||
//       media?.uri?.split("/")[0]?.split(":")[1] ||
//       "image";
//   }
//   let path;
//   if (fileType === "image") {
//     path = media?.uri || media?.path;
//   } else {
//     path = media?.uri;
//   }
//   const fileName = `${path.substring(
//     path.lastIndexOf("/") + 1,
//     path.lastIndexOf("."),
//   )}.${path.substring(path.lastIndexOf(".") + 1, path.length).toLowerCase()}`;

//   const mediaUrlResponse = await ApiService.get(GET_MEDIA_URL, {
//     params: {
//       media_type: media_type,
//       file_name: fileName,
//     },
//   });
//   const formData = new FormData();
//   formData.append("key", mediaUrlResponse.data?.url?.fields?.key);
//   formData.append("bucket", mediaUrlResponse.data?.url?.fields?.bucket);
//   formData.append(
//     "X-Amz-Algorithm",
//     mediaUrlResponse.data?.url?.fields?.["X-Amz-Algorithm"],
//   );
//   formData.append(
//     "X-Amz-Credential",
//     mediaUrlResponse.data?.url?.fields?.["X-Amz-Credential"],
//   );
//   formData.append(
//     "X-Amz-Date",
//     mediaUrlResponse.data?.url?.fields?.["X-Amz-Date"],
//   );
//   formData.append("Policy", mediaUrlResponse.data?.url?.fields?.Policy);
//   formData.append(
//     "X-Amz-Signature",
//     mediaUrlResponse.data?.url?.fields?.["X-Amz-Signature"],
//   );
//   formData.append("acl", mediaUrlResponse.data?.url?.fields?.["ACL"]);
//   formData.append("file", {
//     uri:
//       Platform.OS === "android"
//         ? fileType === "image"
//           ? path
//           : media?.uri
//         : media?.uri.replace("file://", ""),
//     name: fileName,
//     fileName: fileName,
//     type:
//       fileType === "image"
//         ? `${fileType}/${extension}`
//         : media?.type || "image/jpeg",
//   });
//   const mediaUpload = await ApiServiceMultipart.post("/", formData);
//   return mediaUrlResponse;
// };

// export const likePostThunk = createAsyncThunk(
//   "communitySlice/likePostThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const data = {
//         post_id: payload?.postId,
//         like: payload?.like,
//         currentTopicId: payload?.currentTopicId,
//       };
//       thunkAPI.dispatch(updateLike(data));
//       const response = await ApiService.patch(
//         `${LIKE_POST}?post_id=${data.post_id}&action=${
//           data?.like ? "ADD" : "REMOVE"
//         }`,
//       );

//       // return response.data;
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const postCommentThunk = createAsyncThunk(
//   "communitySlice/postCommentThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const body = {
//         post_id: payload.postId,
//         content: payload?.comment,
//         media_exists: payload?.media_url ? true : false,
//         media_url: payload?.media_url,
//         comment_mentions: payload?.comment_mentions,
//         ...(payload?.parentId && {parent_id: payload?.parentId}),
//         ...(payload?.direct_reply_to && {
//           direct_reply_to: payload?.direct_reply_to,
//         }),
//       };
//       const response = await ApiService.post(COMMENTS, body);

//       thunkAPI.dispatch(
//         addComment({
//           comment: response.data.comment,
//           currentTopicId: payload.currentTopicId,
//           parentId: payload?.parentId,
//         }),
//       );
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const getCommentRepliesThunk = createAsyncThunk(
//   "communitySlice/postCommentThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const body = {
//         size: payload?.size,
//         post_id: payload.post_id,
//         page_number: payload?.pageNo,
//         parent_id: payload?.parentId,
//         type: payload?.type,
//         current_comment_id: payload?.currentCommentId,
//       };
//       const response = await ApiService.get(GET_COMMENT_REPLIES, {
//         params: body,
//       });
//       thunkAPI.dispatch(
//         updateCommentReplies({
//           comment: response.data.comments,
//           currentTopicId: payload?.currentTopicId,
//           parentId: payload?.parentId,
//           size: payload?.size,
//           pageNo: payload?.pageNo,
//           type: payload?.type,
//         }),
//       );
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const getComments = createAsyncThunk(
//   "communitySlice/getComments",
//   async (payload, thunkAPI) => {
//     try {
//       const page_number = payload?.page_number || 1;
//       const response = await ApiService.get(COMMENTS, {
//         params: {
//           post_id: payload.postId,
//           size: 10,
//           page_number: page_number,
//           sort_by: "newest",
//         },
//       });
//       const data = {
//         comments: response.data.comments,
//         page_number: page_number,
//         post_id: payload.postId,
//         currentTopicId: payload.currentTopicId,
//         total_pages: response.data.total_pages || 1,
//       };

//       thunkAPI.dispatch(updateComments(data));

//       return response.data;
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const likeCommentThunk = createAsyncThunk(
//   "communitySlice/likeCommentThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const data = {
//         post_id: payload?.postId,
//         comment_id: payload?.commentId,
//         like: payload?.like,
//         currentTopicId: payload?.currentTopicId,
//         ...(payload?.parentCommentId && {
//           parent_comment_id: payload?.parentCommentId,
//         }),
//         type: payload?.type,
//       };
//       thunkAPI.dispatch(updateCommentLike(data));
//       const response = await ApiService.patch(
//         `${LIKE_COMMENT}?comment_id=${data.comment_id}&action=${
//           data?.like ? "ADD" : "REMOVE"
//         }`,
//       );

//       return response.data;
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const deleteCommentThunk = createAsyncThunk(
//   "communitySlice/deleteCommentThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const data = {
//         post_id: payload?.postId,
//         comment_id: payload?.commentId,
//         currentTopicId: payload?.currentTopicId,
//         ...(payload?.parentCommentId && {
//           parent_comment_id: payload?.parentCommentId,
//         }),
//         type: payload?.type,
//       };
//       thunkAPI.dispatch(updateDeletedComment(data));
//       const response = await ApiService.delete(COMMENTS, {
//         params: {
//           comment_id: data.comment_id,
//         },
//       });

//       return response.data;
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const deletePost = createAsyncThunk(
//   "communitySlice/deletePost",
//   async (payload, thunkAPI) => {
//     const {postId, controller} = payload;

//     try {
//       const response = await ApiService.delete(DELETE_POST, {
//         params: {
//           post_id: postId,
//         },
//         signal: controller.signal,
//       });

//       if (response.status === 200) {
//         await thunkAPI.dispatch(updateDeletePost(postId));

//         const temporaryPosts = await thunkAPI
//           .getState()
//           .community.posts[0].posts.slice(0, 10);

//         await storeDataToAsyncStorage("posts", temporaryPosts);

//         Toast.show({
//           type: "notify",
//           visibilityTime: 5000,
//           props: {
//             profile_pic: payload?.notify_profile_pic,
//             name: payload?.notify_title,
//             content: "Your post deleted successfully",
//             deep_link: false,
//             navigate: false,
//           },
//         });
//       } else {
//         throw response;
//       }
//     } catch (err) {
//       errorToast(err);

//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   },
// );

// export const reportPost = createAsyncThunk(
//   "communitySlice/reportPost",
//   async (payload, thunkAPI) => {
//     const {postId} = payload;

//     try {
//       const response = await ApiService.post(REPORT_POST, {
//         post_id: postId,
//         reason: {
//           SPAM: payload?.reason?.includes("SPAM"),
//           INAPPROPRIATE: payload?.reason?.includes("INAPPROPRIATE"),
//           NOT_SPORT_RELATED: payload?.reason?.includes("NOT_SPORT_RELATED"),
//         },
//       });

//       if (response.status === 200) {
//         await thunkAPI.dispatch(updateDeletePost(postId));

//         const temporaryPosts = await thunkAPI
//           .getState()
//           .community.posts[0].posts.slice(0, 10);

//         await storeDataToAsyncStorage("posts", temporaryPosts);

//         Toast.show({
//           type: "warning",
//           visibilityTime: 5000,
//           props: {
//             message: "Post was reported successfully",
//           },
//         });
//       } else {
//         throw response;
//       }
//     } catch (err) {
//       errorToast(err);

//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   },
// );

// export const getUserProfile = createAsyncThunk(
//   "communitySlice/getUserProfile",
//   async (payload, thunkAPI) => {
//     const {
//       userId,
//       controller = {},
//       navigation = true,
//       myProfile = false,
//       navigationAction = "navigate",
//     } = payload;
//     if (!userId) {
//       return;
//     }
//     if (navigation) {
//       if (myProfile) {
//         rootNavigate("MyProfile", navigationAction, {navUserId: userId});
//       } else {
//         rootNavigate("UsersProfile", "navigate", {navUserId: userId});
//       }
//     }
//     try {
//       const response = await ApiService.get(GET_USER_PROFILE, {
//         params: {
//           user_id: userId,
//         },
//         ...(controller && {signal: controller.signal}),
//       });

//       if (response.status === 200) {
//         let userData = response.data.profile;

//         thunkAPI.dispatch(updateUserProfile(userData));
//         return userData;
//       } else {
//         throw response;
//       }
//     } catch (err) {
//       errorToast(err);

//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   },
// );

// export const usersFollow = createAsyncThunk(
//   "communitySlice/userFollowing",
//   async (payload, thunkAPI) => {
//     const {
//       userPic,
//       userName,
//       userId,
//       action,
//       controller,
//       createUserProfile = false,
//       fromSuggestion = false,
//     } = payload;

//     try {
//       if (createUserProfile) {
//         await thunkAPI.dispatch(
//           getUserProfile({userId: userId, controller, navigation: false}),
//         );
//         await thunkAPI.dispatch(
//           getPostsByUserId({
//             page_number: 1,
//             user_id: userId,
//           }),
//         );
//       }

//       const response = await ApiService.patch(
//         `${USER_FOLLOW_UNFOLLOW}?user_id=${userId}&action=${action}`,
//         {},
//         {
//           signal: controller.signal,
//         },
//       );
//       if (response.status === 200) {
//         const myUserId = thunkAPI.getState().userSlice.id;

//         thunkAPI.dispatch(
//           updateFollow({
//             actionType: action,
//             userId,
//             fromSuggestion: fromSuggestion,
//             myUserId: myUserId,
//           }),
//         );
//         if (action === "ADD") {
//           Toast.show({
//             type: "notify",
//             visibilityTime: 5000,
//             props: {
//               profile_pic: userPic,
//               user_id: userId,
//               name: userName,
//               content: "You successfully started following.",
//               type: "FOLLOW",
//               deep_link: false,
//               navigate: true,
//             },
//           });
//         }
//       } else {
//         throw response;
//       }
//     } catch (err) {
//       errorToast(err);

//       return thunkAPI.rejectWithValue(err.response.data);
//     }
//   },
// );

// async function rewritePathsToS3(inputFilePath, outputFilePath, segments) {
//   try {
//     const inputContents = await RNFetchBlob.fs.readFile(inputFilePath, "utf8");
//     const lines = inputContents.split("\n");
//     let outputContents = "";
//     let index = 0;
//     for (const line of lines) {
//       if (!line) continue;
//       if (line.startsWith("#EXTINF:")) {
//         outputContents += line + "\n"; // Keep the #EXTINF line as is
//       } else if (!line.startsWith("#")) {
//         // Rewrite the local path to an S3 URL
//         const s3URL = `https://${segments[index].fields.bucket}.s3.ap-south-1.amazonaws.com/${segments[index].fields.key}`;
//         index++;
//         outputContents += s3URL + "\n";
//       } else {
//         outputContents += line + "\n"; // Keep other lines (e.g., #EXT-X-VERSION, #EXT-X-TARGETDURATION) as is
//       }
//     }

//     await RNFetchBlob.fs.writeFile(outputFilePath, outputContents, "utf8");
//   } catch (err) {
//     logEvent("rewritePathsToS3Error", {error: err?.message});
//     errorToast(err, true);
//   }
// }

// export const uploadVideoSegmentsToS3 = async (uri, fields) => {
//   try {
//     const path = `file://${uri}`;
//     const fileName = `${path.substring(
//       path.lastIndexOf("/") + 1,
//       path.lastIndexOf("."),
//     )}.${path.substring(path.lastIndexOf(".") + 1, path.length).toLowerCase()}`;

//     const formData = new FormData();
//     formData.append("key", fields?.key);
//     formData.append("bucket", fields?.bucket);
//     formData.append("X-Amz-Algorithm", fields?.["X-Amz-Algorithm"]);
//     formData.append("X-Amz-Credential", fields?.["X-Amz-Credential"]);
//     formData.append("X-Amz-Date", fields?.["X-Amz-Date"]);
//     formData.append("Policy", fields?.Policy);
//     formData.append("X-Amz-Signature", fields?.["X-Amz-Signature"]);
//     formData.append("acl", fields?.["ACL"]);

//     formData.append("file", {
//       uri: path,
//       name: fileName,
//       fileName: fileName,
//       type: "video/ts",
//     });

//     const mediaUpload = await ApiServiceMultipart.post("/", formData, {});
//   } catch (err) {
//     errorToast(err, true);
//   }
// };

// async function chunkVideo(inputVideoFile, fileName, segmentDuration = 3) {
//   try {
//     // Define the cache directory path
//     const cacheDir = RNFetchBlob.fs.dirs.CacheDir;
//     const outputTSFilePattern = `${cacheDir}/${fileName}_video%d.ts`;

//     await FFmpegKit.execute(
//       `-i ${inputVideoFile} -codec: copy -start_number 0 -hls_time ${segmentDuration} -hls_list_size 0 -hls_segment_filename ${outputTSFilePattern} -f hls ${cacheDir}/index.m3u8`,
//     );
//   } catch (err) {
//     logEvent("chunkVideoError", {error: err?.message});
//     errorToast(err, true);
//   }
// }

// export const getNotificationHistory = createAsyncThunk(
//   "communitySlice/NotificationHistory",
//   async (payload, thunkAPI) => {
//     try {
//       // const page_number = payload?.page_number || 1;
//       const response = await ApiService.get(NOTIFICATION_HISTORY, {
//         params: {
//           size: 30,
//           page_number: 1,
//         },
//       });
//       const data = response.data;

//       thunkAPI.dispatch(updateNotificationHistory(data));

//       return response.data;
//     } catch (err) {
//       errorToast(err, true);
//     }
//   },
// );

// export const updateNotificationViewedThunk = createAsyncThunk(
//   "communitySlice/updateNotificationViewedThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await updateNotificationViewed(payload);
//       thunkAPI.dispatch(updateNotificationHistory(response.data));
//     } catch (err) {
//       errorToast(err, true);
//     }
//   },
// );

// export const updateNotificationViewed = async payload => {
//   try {
//     const res = await ApiService.post(VIEW_NOTIFICATIONS, {
//       notifications: payload,
//     });
//     return res;
//   } catch (err) {
//     errorToast(err, true);
//   }
// };

// export const searchUsersThunk = createAsyncThunk(
//   "communitySlice/searchUsersThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await ApiService.get(SEARCH_USERS, {
//         params: {
//           team_name: payload?.search,
//           size: payload?.size || 50,
//           page_number: 1,
//         },
//       });

//       return response.data;
//     } catch (err) {
//       errorToast(err, true);
//     }
//   },
// );

// export const searchPostsThunk = createAsyncThunk(
//   "communitySlice/searchPostsThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await ApiService.get(SEARCH_POSTS, {
//         params: {
//           post_content: payload?.search,
//           size: payload?.size || 25,
//           page_number: 1,
//         },
//       });

//       return response.data;
//     } catch (err) {
//       errorToast(err, true);
//     }
//   },
// );

// const SEND_VIEW_POST_COUNT = 5;

// export const updateViewedPostThunk = createAsyncThunk(
//   "communitySlice/updateViewedPostThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const viewedPostsArray = thunkAPI.getState().community?.viewedPosts || [];
//       const newPostArray = [...viewedPostsArray, ...payload];
//       const uniquePosts = [...new Set(newPostArray)];
//       thunkAPI.dispatch(updateViewedPosts(uniquePosts));
//       if (uniquePosts.length >= SEND_VIEW_POST_COUNT) {
//         await thunkAPI.dispatch(viewPostsAnalyticsThunk());
//         thunkAPI.dispatch(updateViewedPosts([]));
//       }
//       return;
//     } catch (err) {
//       errorToast(err, true);
//     }
//   },
// );

// export const viewPostsAnalyticsThunk = createAsyncThunk(
//   "communitySlice/viewPostsAnalyticsThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const viewedPosts = thunkAPI.getState().community.viewedPosts;
//       if (viewedPosts.length === 0) return;
//       const requests = Math.ceil(viewedPosts.length / SEND_VIEW_POST_COUNT);
//       for (let i = 0; i < requests; i++) {
//         const posts = viewedPosts.slice(
//           i * SEND_VIEW_POST_COUNT,
//           (i + 1) * SEND_VIEW_POST_COUNT,
//         );
//         const response = await ApiService.patch(VIEW_POSTS, {
//           posts: posts,
//         });
//       }

//       return;
//     } catch (err) {
//       errorToast(err, true);
//     }
//   },
// );

// export const sharedPostThunk = createAsyncThunk(
//   "communitySlice/sharedPostThunk",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await ApiService.patch(SHARE_POSTS, {
//         posts: [payload.post_id],
//       });

//       // thunkAPI.dispatch(updateShareCount(payload));
//       return;
//     } catch (err) {
//       errorToast(err, true);
//     }
//   },
// );

// export const getTopics = createAsyncThunk(
//   "communitySlice/getTopics",
//   async (payload, thunkAPI) => {
//     try {
//       const response = await ApiService.get(GET_LIST_OF_TOPICS, {});

//       await thunkAPI.dispatch(updateTopics(response.data.topics));

//       const AllSubtopics = response.data.topics.reduce((acc, topic) => {
//         if (topic?.subtopics?.length > 0) {
//           return [...acc, ...topic?.subtopics];
//         } else {
//           return acc;
//         }
//       }, []);

//       thunkAPI.dispatch(updateAllSubtopics(AllSubtopics));

//       await storeDataToAsyncStorage("allSubtopics", AllSubtopics);
//       await storeDataToAsyncStorage("topics", response.data.topics);

//       return response.data;
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const updateInterestedTopics = createAsyncThunk(
//   "communitySlice/updateInterestedTopics",
//   async payload => {
//     try {
//       const response = await ApiService.post(UPDATE_INTERESTED_TOPIC, payload);
//       // console.log(response.data);
//       return response.data;
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const getMyActivity = createAsyncThunk(
//   "communitySlice/getMyActivity",
//   async payload => {
//     const filter_by = payload.filter_by;
//     const pageNo = payload.pageNo;
//     const activity_type =
//       filter_by === "Claps"
//         ? "clapped"
//         : filter_by === "Comment"
//         ? "commented"
//         : "shared";

//     let requestParam = {
//       size: 10,
//       page_number: pageNo,
//       activity_type: activity_type,
//     };

//     try {
//       const response = await ApiService.get(GET_MY_ACTIVITY, {
//         params: requestParam,
//       });

//       const {monthIndex, posts, total_pages} = response.data;
//       console.log(response.data);
//       const responsePayload = {
//         data: {
//           monthIndex: monthIndex,
//           posts: posts,
//           totalPages: total_pages,
//           pageNo: pageNo,
//         },
//         filter_by: filter_by,
//       };
//       return responsePayload;
//     } catch (err) {
//       errorToast(err);
//     }
//   },
// );

// export const getRecommendedUsers = createAsyncThunk(
//   "communitySlice/getRecommendedUsers",
//   async payload => {
//     const pageNo = payload.pageNo;

//     let requestParam = {
//       size: 10,
//       page_number: pageNo,
//     };

//     try {
//       const response = await ApiService.get(GET_RECOMMENDED_USERS, {
//         params: requestParam,
//       });

//       const responsePayload = {
//         users: response.data.users,
//         totalPages: response.data.total_pages,
//         pageNo: pageNo,
//       };

//       return responsePayload;
//     } catch (err) {
//       console.log(err);
//       errorToast(err);
//     }
//   },
// );

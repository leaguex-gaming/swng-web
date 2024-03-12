"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiService,
  ApiServiceMultipart,
} from "../../utils/services/api/apiService";
import {
  CREATE_POST,
  GET_MEDIA_URL,
  GET_POSTS,
  COMMENTS,
  LIKE_POST,
  LIKE_COMMENT,
  GET_USER_PROFILE,
  DELETE_POST,
  USER_FOLLOW_UNFOLLOW,
  REPORT_POST,
  NOTIFICATION_HISTORY,
  VIEW_NOTIFICATIONS,
  SEARCH_USERS,
  SEARCH_POSTS,
  VIEW_POSTS,
  SHARE_POSTS,
  GET_RANDOM_POSTS,
  GET_LIST_OF_TOPICS,
  UPDATE_INTERESTED_TOPIC,
  GET_MY_ACTIVITY,
  GET_COMMENT_REPLIES,
  GET_RECOMMENDED_REELS,
  GET_RECOMMENDED_USERS,
  GET_RECOMMENDED_POSTS,
} from "../../constants/endpoints/community-endpoints";
import { generateVideoThumbnails } from "@rajesh896/video-thumbnails-generator";
import {
  addComment,
  addPost,
  updateAllSubtopics,
  updateCommentLike,
  updateCommentReplies,
  updateComments,
  updateDeletePost,
  updateDeletedComment,
  updateFollow,
  updateLike,
  updateNotificationHistory,
  updatePostById,
  updatePosts,
  updateReelsPosts,
  updateSeed,
  updateSpecificUserPosts,
  updateTopics,
  updateUserProfile,
  updateViewedPosts,
} from "../slices/community-slice";
import { errorToast } from "../../utils/helpers/errorToast";
import { updateApiLoading } from "../slices/common-slice";
import { PlatformOS } from "../../constants/DeviceData";
import {
  POST_API_CALL_PAGE_SIZE,
  REELS_API_CALL_PAGE_SIZE,
} from "../../constants/StaticData";
import { redirect } from "next/navigation";
import { notify, warning } from "@/components/common/ToastLayout";

export const getPostsThunk = createAsyncThunk(
  "communitySlice/getPostsThunk",
  async (payload, thunkAPI) => {
    try {
      const { page_number = 1 } = payload;
      const subtopic_id = 0;
      const seed = thunkAPI.getState().community.seed;
      let response;
      let timeline = [];

      if (!seed) {
        response = await ApiService.get(GET_RECOMMENDED_POSTS, {
          params: {
            size: POST_API_CALL_PAGE_SIZE,
            page_number: page_number,
          },
        });
        timeline = response.data.posts;
      }

      if (timeline?.length < POST_API_CALL_PAGE_SIZE) {
        if (seed) {
          response = await ApiService.get(GET_RANDOM_POSTS, {
            params: {
              size: POST_API_CALL_PAGE_SIZE,
              page_number: page_number,
              seed: seed,
            },
          });
          timeline = response.data.timeline;
        } else {
          response = await ApiService.get(GET_RANDOM_POSTS, {
            params: {
              size: POST_API_CALL_PAGE_SIZE,
              page_number: 1,
            },
          });
          timeline = response.data.timeline;
        }
      }

      //User Follow Suggestion
      if (page_number === 3) {
        timeline = [{ type: "UserSuggestion", id: 0 }, ...timeline];
      }

      if (response.data?.seed) {
        thunkAPI.dispatch(updateSeed(response.data?.seed));
      }
      if (PlatformOS === "web") {
        thunkAPI.dispatch(
          updatePosts({
            data: await timeline,
            page_number: page_number,
            subtopic_id: subtopic_id,
            total_pages: response.data.total_pages || 1,
          })
        );
      } else {
        await cachePosts(timeline);
        thunkAPI.dispatch(
          updatePosts({
            data: await updateCachePathInPostArray(timeline),
            page_number: page_number,
            subtopic_id: subtopic_id,
            total_pages: response.data.total_pages || 1,
          })
        );
      }

      const temporaryPosts = await thunkAPI
        .getState()
        .community.posts[subtopic_id].posts.slice(0, POST_API_CALL_PAGE_SIZE);

      await storeDataToAsyncStorage("posts", temporaryPosts);

      return response.data;
    } catch (err) {
      errorToast(err);
    }
  }
);

export const getPostsByTopicThunk = createAsyncThunk(
  "communitySlice/getPostsByTopicThunk",
  async (payload, thunkAPI) => {
    try {
      const {
        topic_id = "",
        subtopic_id = "",
        page_number = 1,
        user_id = "",
      } = payload;
      const response = await ApiService.get(GET_POSTS, {
        params: {
          size: 10,
          page_number: page_number,
          topic_id: !topic_id ? undefined : topic_id,
          subtopic_id: !subtopic_id ? undefined : subtopic_id,
          user_id: user_id,
        },
      });
      thunkAPI.dispatch(
        updatePosts({
          data: response.data.posts,
          subtopic_id,
          total_pages: response.data.total_pages,
          page_number: page_number,
        })
      );

      return response.data;
    } catch (err) {
      errorToast(err);
    }
  }
);

export const getRecommendedReels = createAsyncThunk(
  "communitySlice/getRecommendedReels",
  async (payload, thunkAPI) => {
    try {
      const {
        currentTopicId,
        size = REELS_API_CALL_PAGE_SIZE,
        pageNumber = 1,
      } = payload;
      const response = await ApiService.get(GET_RECOMMENDED_REELS, {
        params: {
          size: size,
          page_number: pageNumber,
        },
      });
      // await cachePosts(response.data.posts);
      thunkAPI.dispatch(
        updateReelsPosts({
          data: response.data.posts,
          subtopic_id: currentTopicId,
          total_pages: response.data.total_pages,
          page_number: pageNumber,
        })
      );
      return response.data;
    } catch (err) {
      console.log(err);
      errorToast(err);
    }
  }
);

export const getPostsByUserId = createAsyncThunk(
  "communitySlice/getPostsByUserId",
  async (payload, thunkAPI) => {
    try {
      const {
        topic_id = "",
        subtopic_id = "",
        page_number = 1,
        user_id = "",
      } = payload;

      const response = await ApiService.get(GET_POSTS, {
        params: {
          size: POST_API_CALL_PAGE_SIZE,
          page_number: page_number,
          topic_id: topic_id,
          subtopic_id: subtopic_id,
          user_id: user_id,
        },
      });

      thunkAPI.dispatch(
        updateSpecificUserPosts({
          user_id: user_id,
          subTopics: response.data.topics[0].subtopics,
          total_pages: response.data.total_pages,
          page_number: page_number,
          data: response.data.posts,
          subtopic_id: subtopic_id,
        })
      );

      return response.data;
    } catch (err) {
      errorToast(err);
    }
  }
);

export const getPostById = createAsyncThunk(
  "communitySlice/getPostsByPostId",
  async (payload, thunkAPI) => {
    try {
      const { post_id = "", currentTopicId = 0 } = payload;
      const response = await ApiService.get(GET_POSTS, {
        params: {
          post_id: post_id,
        },
      });
      thunkAPI.dispatch(
        updatePostById({
          post: response.data?.posts,
          currentTopicId: currentTopicId,
        })
      );

      return response.data;
    } catch (err) {
      errorToast(err);
    }
  }
);

export const createPostThunk = createAsyncThunk(
  "communitySlice/createPostThunk",
  async (payload, thunkAPI) => {
    try {
      if (!payload?.selectedMedia) {
        const response = await ApiService.post(CREATE_POST, payload);

        thunkAPI.dispatch(addPost(response.data.post));

        const temporaryPosts = await thunkAPI
          .getState()
          .community.posts[0].posts.slice(0, POST_API_CALL_PAGE_SIZE);
        await storeDataToAsyncStorage("posts", temporaryPosts);

        thunkAPI.dispatch(updateApiLoading({ loading: false, content: "" }));

        notify({
          props: {
            profile_pic: payload?.notify_profile_pic,
            post_id: response?.data?.post?.id,
            name: payload?.notify_title,
            content: "Your post uploaded successfully",
            topic_id: 0,
            deep_link: false,
            navigate: true,
          },
        });
        redirect("../");
      } else {
        const { controller } = payload;

        const media_type = payload.selectedMedia?.uri
          ?.split("/")[0]
          ?.split(":")[1];

        let mediaUrl;
        let compressedImageUrl;
        let videoThumbnail;

        if (media_type === "video") {
          const videoUrlResponse = await uploadMediaToS3(
            payload.selectedMedia,
            controller
          );

          const bucket = videoUrlResponse.data?.url?.fields?.bucket;
          mediaUrl = `https://${bucket}.s3.amazonaws.com/${videoUrlResponse.data?.url?.fields?.key}`;

          const thumbnailRes = await generateVideoThumbnails(
            payload.selectedMedia.file,
            1
          );

          const thumbnailMedia = {
            uri: thumbnailRes[0],
          };

          const thumbnailMediaUrlResponse = await uploadMediaToS3(
            thumbnailMedia,
            controller
          );

          videoThumbnail = `https://${bucket}.s3.amazonaws.com/${thumbnailMediaUrlResponse.data?.url?.fields?.key}`;
        } else {
          const normalmediaUrlResponse = await uploadMediaToS3(
            payload.selectedMedia,
            controller
          );

          const compressedMediaUrlResponse = await uploadMediaToS3(
            payload.compressedMedia,
            controller
          );

          const bucket = normalmediaUrlResponse.data?.url?.fields?.bucket;

          mediaUrl = `https://${bucket}.s3.amazonaws.com/${normalmediaUrlResponse.data?.url?.fields?.key}`;

          compressedImageUrl = `https://${bucket}.s3.amazonaws.com/${compressedMediaUrlResponse.data?.url?.fields?.key}`;
        }

        let newPayload = {
          content: payload?.content,
          media_url: mediaUrl,
          media_exists: true,
          // media_meta_data: payload?.selectedMedia,
          media_type: payload?.fileType || payload?.media_type,
          topic_id: payload?.topic_id,
          subtopic_id: payload?.subtopic_id,
          post_mentions: payload?.post_mentions,
          compressed_image_url: compressedImageUrl,
          media_thumbnail_url: videoThumbnail,
        };

        const response = await ApiService.post(CREATE_POST, newPayload);
        if (response.status != 200) {
          throw response;
        }

        if (newPayload?.media_type !== "video") {
          await thunkAPI.dispatch(addPost(response.data?.post));
        }

        if (newPayload?.media_type !== "video") {
          notify({
            props: {
              profile_pic: payload?.notify_profile_pic,
              post_id: response?.data?.post?.id,
              name: payload?.notify_title,
              content: "Your post uploaded successfully",
              topic_id: 0,
              deep_link: false,
              navigate: true,
            },
          });
          const temporaryPosts = await thunkAPI
            .getState()
            .community.posts[0].posts.slice(0, 10);
          await storeDataToAsyncStorage("posts", temporaryPosts);
        } else {
          warning({
            props: {
              message:
                "Your video is being processed. It will be available shortly.",
            },
          });
        }
        thunkAPI.dispatch(updateApiLoading({ loading: false, content: "" }));
        redirect("../");
        return true;
      }
    } catch (err) {
      thunkAPI.dispatch(updateApiLoading({ loading: false, content: "" }));

      errorToast(err);
      return false;
    }
  }
);

export const uploadMediaToS3 = async (media, controller) => {
  try {
    const media_type = media?.uri?.split("/")[0]?.split(":")[1];
    const extension = media?.uri?.split("/")[1]?.split(";")[0];
    const date = new Date().getTime();
    const fileName = `${
      date + media?.uri.split("/").pop().slice(0, 5)
    }.${extension}`;

    const mediaUrlResponse = await ApiService.get(GET_MEDIA_URL, {
      params: {
        media_type: media_type,
        file_name: fileName,
      },
    });
    const formData = new FormData();
    formData.append("key", mediaUrlResponse.data?.url?.fields?.key);
    formData.append("bucket", mediaUrlResponse.data?.url?.fields?.bucket);
    formData.append(
      "X-Amz-Algorithm",
      mediaUrlResponse.data?.url?.fields?.["X-Amz-Algorithm"]
    );
    formData.append(
      "X-Amz-Credential",
      mediaUrlResponse.data?.url?.fields?.["X-Amz-Credential"]
    );
    formData.append(
      "X-Amz-Date",
      mediaUrlResponse.data?.url?.fields?.["X-Amz-Date"]
    );
    formData.append("Policy", mediaUrlResponse.data?.url?.fields?.Policy);
    formData.append(
      "X-Amz-Signature",
      mediaUrlResponse.data?.url?.fields?.["X-Amz-Signature"]
    );
    formData.append("acl", mediaUrlResponse.data?.url?.fields?.["ACL"]);

    const file_type = media?.uri.split(";")[0]?.split(":")[1];

    let uri = media?.uri;

    const byteString = atob(uri.split(",")[1]);

    const ab = new ArrayBuffer(byteString.length);
    const arr = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++)
      arr[i] = byteString.charCodeAt(i);

    const blob = new Blob([arr], {
      type: file_type || "image/png",
    });

    const file = new File([blob], `${fileName}`);

    formData.append("file", file);

    const mediaUpload = await ApiServiceMultipart.post("/", formData);

    return mediaUrlResponse;
  } catch (err) {
    errorToast(err);
  }
};

export const likePostThunk = createAsyncThunk(
  "communitySlice/likePostThunk",
  async (payload, thunkAPI) => {
    try {
      const data = {
        post_id: payload?.postId,
        like: payload?.like,
        currentTopicId: payload?.currentTopicId,
      };
      thunkAPI.dispatch(updateLike(data));
      const response = await ApiService.patch(
        `${LIKE_POST}?post_id=${data.post_id}&action=${
          data?.like ? "ADD" : "REMOVE"
        }`
      );

      // return response.data;
    } catch (err) {
      errorToast(err);
    }
  }
);

export const postCommentThunk = createAsyncThunk(
  "communitySlice/postCommentThunk",
  async (payload, thunkAPI) => {
    try {
      const body = {
        post_id: payload.postId,
        content: payload?.comment,
        media_exists: payload?.media_url ? true : false,
        media_url: payload?.media_url,
        comment_mentions: payload?.comment_mentions,
        ...(payload?.parentId && { parent_id: payload?.parentId }),
        ...(payload?.direct_reply_to && {
          direct_reply_to: payload?.direct_reply_to,
        }),
      };
      const response = await ApiService.post(COMMENTS, body);

      thunkAPI.dispatch(
        addComment({
          comment: response.data.comment,
          currentTopicId: payload.currentTopicId,
          parentId: payload?.parentId,
        })
      );
    } catch (err) {
      errorToast(err);
    }
  }
);

export const getCommentRepliesThunk = createAsyncThunk(
  "communitySlice/postCommentThunk",
  async (payload, thunkAPI) => {
    try {
      const body = {
        size: payload?.size,
        post_id: payload.post_id,
        page_number: payload?.pageNo,
        parent_id: payload?.parentId,
        type: payload?.type,
        current_comment_id: payload?.currentCommentId,
      };
      const response = await ApiService.get(GET_COMMENT_REPLIES, {
        params: body,
      });
      thunkAPI.dispatch(
        updateCommentReplies({
          comment: response.data.comments,
          currentTopicId: payload?.currentTopicId,
          parentId: payload?.parentId,
          size: payload?.size,
          pageNo: payload?.pageNo,
          type: payload?.type,
        })
      );
    } catch (err) {
      errorToast(err);
    }
  }
);

export const getComments = createAsyncThunk(
  "communitySlice/getComments",
  async (payload, thunkAPI) => {
    try {
      const page_number = payload?.page_number || 1;
      const response = await ApiService.get(COMMENTS, {
        params: {
          post_id: payload.postId,
          size: 10,
          page_number: page_number,
          sort_by: "newest",
        },
      });
      const data = {
        comments: response.data.comments,
        page_number: page_number,
        post_id: payload.postId,
        currentTopicId: payload.currentTopicId,
        total_pages: response.data.total_pages || 1,
      };

      thunkAPI.dispatch(updateComments(data));

      return response.data;
    } catch (err) {
      errorToast(err);
    }
  }
);

export const likeCommentThunk = createAsyncThunk(
  "communitySlice/likeCommentThunk",
  async (payload, thunkAPI) => {
    try {
      const data = {
        post_id: payload?.postId,
        comment_id: payload?.commentId,
        like: payload?.like,
        currentTopicId: payload?.currentTopicId,
        ...(payload?.parentCommentId && {
          parent_comment_id: payload?.parentCommentId,
        }),
        type: payload?.type,
      };
      thunkAPI.dispatch(updateCommentLike(data));
      const response = await ApiService.patch(
        `${LIKE_COMMENT}?comment_id=${data.comment_id}&action=${
          data?.like ? "ADD" : "REMOVE"
        }`
      );

      return response.data;
    } catch (err) {
      errorToast(err);
    }
  }
);

export const deleteCommentThunk = createAsyncThunk(
  "communitySlice/deleteCommentThunk",
  async (payload, thunkAPI) => {
    try {
      const data = {
        post_id: payload?.postId,
        comment_id: payload?.commentId,
        currentTopicId: payload?.currentTopicId,
        ...(payload?.parentCommentId && {
          parent_comment_id: payload?.parentCommentId,
        }),
        type: payload?.type,
      };
      thunkAPI.dispatch(updateDeletedComment(data));
      const response = await ApiService.delete(COMMENTS, {
        params: {
          comment_id: data.comment_id,
        },
      });

      return response.data;
    } catch (err) {
      errorToast(err);
    }
  }
);

export const deletePost = createAsyncThunk(
  "communitySlice/deletePost",
  async (payload, thunkAPI) => {
    const { postId, controller } = payload;

    try {
      const response = await ApiService.delete(DELETE_POST, {
        params: {
          post_id: postId,
        },
        signal: controller.signal,
      });

      if (response.status === 200) {
        await thunkAPI.dispatch(updateDeletePost(postId));

        const temporaryPosts = await thunkAPI
          .getState()
          .community.posts[0].posts.slice(0, 10);

        // await storeDataToAsyncStorage("posts", temporaryPosts);

        notify({
          props: {
            profile_pic: payload?.notify_profile_pic,
            name: payload?.notify_title,
            content: "Your post deleted successfully",
            deep_link: false,
            navigate: false,
          },
        });
      } else {
        throw response;
      }
    } catch (err) {
      errorToast(err);

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const reportPost = createAsyncThunk(
  "communitySlice/reportPost",
  async (payload, thunkAPI) => {
    const { postId } = payload;

    try {
      const response = await ApiService.post(REPORT_POST, {
        post_id: postId,
        reason: {
          SPAM: payload?.reason?.includes("SPAM"),
          INAPPROPRIATE: payload?.reason?.includes("INAPPROPRIATE"),
          NOT_SPORT_RELATED: payload?.reason?.includes("NOT_SPORT_RELATED"),
        },
      });

      if (response.status === 200) {
        await thunkAPI.dispatch(updateDeletePost(postId));

        const temporaryPosts = await thunkAPI
          .getState()
          .community.posts[0].posts.slice(0, 10);

        // await storeDataToAsyncStorage("posts", temporaryPosts);

        warning({
          props: {
            message: "Post was reported successfully",
          },
        });
      } else {
        throw response;
      }
    } catch (err) {
      console.log(err);
      errorToast(err);

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "communitySlice/getUserProfile",
  async (payload, thunkAPI) => {
    const {
      userId,
      controller = {},
      navigation = true,
      myProfile = false,
      navigationAction = "navigate",
    } = payload;
    if (!userId) {
      return;
    }
    if (navigation) {
      if (myProfile) {
        // rootNavigate("MyProfile", navigationAction, { navUserId: userId });
      } else {
        // rootNavigate("UsersProfile", "navigate", { navUserId: userId });
      }
    }
    try {
      const response = await ApiService.get(GET_USER_PROFILE, {
        params: {
          user_id: userId,
        },
        ...(controller && { signal: controller.signal }),
      });

      if (response.status === 200) {
        let userData = response.data.profile;

        thunkAPI.dispatch(updateUserProfile(userData));
        return userData;
      } else {
        throw response;
      }
    } catch (err) {
      errorToast(err);

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const usersFollow = createAsyncThunk(
  "communitySlice/userFollowing",
  async (payload, thunkAPI) => {
    const {
      userPic,
      userName,
      userId,
      action,
      controller,
      createUserProfile = false,
      fromSuggestion = false,
    } = payload;

    try {
      if (createUserProfile) {
        await thunkAPI.dispatch(
          getUserProfile({ userId: userId, controller, navigation: false })
        );
        await thunkAPI.dispatch(
          getPostsByUserId({
            page_number: 1,
            user_id: userId,
          })
        );
      }

      const response = await ApiService.patch(
        `${USER_FOLLOW_UNFOLLOW}?user_id=${userId}&action=${action}`,
        {},
        {
          signal: controller.signal,
        }
      );
      if (response.status === 200) {
        const myUserId = thunkAPI.getState().userSlice.id;

        thunkAPI.dispatch(
          updateFollow({
            actionType: action,
            userId,
            fromSuggestion: fromSuggestion,
            myUserId: myUserId,
          })
        );
        if (action === "ADD") {
          notify({
            props: {
              profile_pic: userPic,
              user_id: userId,
              name: userName,
              content: "You successfully started following.",
              type: "FOLLOW",
              deep_link: false,
              navigate: true,
            },
          });
        }
      } else {
        throw response;
      }
    } catch (err) {
      errorToast(err);

      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getNotificationHistory = createAsyncThunk(
  "communitySlice/NotificationHistory",
  async (payload, thunkAPI) => {
    try {
      // const page_number = payload?.page_number || 1;
      const response = await ApiService.get(NOTIFICATION_HISTORY, {
        params: {
          size: 30,
          page_number: 1,
        },
      });
      const data = response.data;

      thunkAPI.dispatch(updateNotificationHistory(data));

      return response.data;
    } catch (err) {
      errorToast(err, true);
    }
  }
);

export const updateNotificationViewedThunk = createAsyncThunk(
  "communitySlice/updateNotificationViewedThunk",
  async (payload, thunkAPI) => {
    try {
      const response = await updateNotificationViewed(payload);
      thunkAPI.dispatch(updateNotificationHistory(response.data));
    } catch (err) {
      errorToast(err, true);
    }
  }
);

export const updateNotificationViewed = async (payload) => {
  try {
    const res = await ApiService.post(VIEW_NOTIFICATIONS, {
      notifications: payload,
    });
    return res;
  } catch (err) {
    errorToast(err, true);
  }
};

export const searchUsersThunk = createAsyncThunk(
  "communitySlice/searchUsersThunk",
  async (payload, thunkAPI) => {
    try {
      const response = await ApiService.get(SEARCH_USERS, {
        params: {
          team_name: payload?.search,
          size: payload?.size || 50,
          page_number: 1,
        },
      });

      return response.data;
    } catch (err) {
      errorToast(err, true);
    }
  }
);

export const searchPostsThunk = createAsyncThunk(
  "communitySlice/searchPostsThunk",
  async (payload, thunkAPI) => {
    try {
      const response = await ApiService.get(SEARCH_POSTS, {
        params: {
          post_content: payload?.search,
          size: payload?.size || 25,
          page_number: 1,
        },
      });

      return response.data;
    } catch (err) {
      errorToast(err, true);
    }
  }
);

const SEND_VIEW_POST_COUNT = 5;

export const updateViewedPostThunk = createAsyncThunk(
  "communitySlice/updateViewedPostThunk",
  async (payload, thunkAPI) => {
    try {
      const viewedPostsArray = thunkAPI.getState().community?.viewedPosts || [];
      const newPostArray = [...viewedPostsArray, ...payload];
      const uniquePosts = [...new Set(newPostArray)];
      thunkAPI.dispatch(updateViewedPosts(uniquePosts));
      if (uniquePosts.length >= SEND_VIEW_POST_COUNT) {
        await thunkAPI.dispatch(viewPostsAnalyticsThunk());
        thunkAPI.dispatch(updateViewedPosts([]));
      }
      return;
    } catch (err) {
      errorToast(err, true);
    }
  }
);

export const viewPostsAnalyticsThunk = createAsyncThunk(
  "communitySlice/viewPostsAnalyticsThunk",
  async (payload, thunkAPI) => {
    try {
      const viewedPosts = thunkAPI.getState().community.viewedPosts;
      if (viewedPosts.length === 0) return;
      const requests = Math.ceil(viewedPosts.length / SEND_VIEW_POST_COUNT);
      for (let i = 0; i < requests; i++) {
        const posts = viewedPosts.slice(
          i * SEND_VIEW_POST_COUNT,
          (i + 1) * SEND_VIEW_POST_COUNT
        );
        const response = await ApiService.patch(VIEW_POSTS, {
          posts: posts,
        });
      }

      return;
    } catch (err) {
      errorToast(err, true);
    }
  }
);

export const sharedPostThunk = createAsyncThunk(
  "communitySlice/sharedPostThunk",
  async (payload, thunkAPI) => {
    try {
      const response = await ApiService.patch(SHARE_POSTS, {
        posts: [payload.post_id],
      });

      // thunkAPI.dispatch(updateShareCount(payload));
      return;
    } catch (err) {
      errorToast(err, true);
    }
  }
);

export const getTopics = createAsyncThunk(
  "communitySlice/getTopics",
  async (payload, thunkAPI) => {
    try {
      const response = await ApiService.get(GET_LIST_OF_TOPICS, {});

      await thunkAPI.dispatch(updateTopics(response.data.topics));

      const AllSubtopics = response.data.topics.reduce((acc, topic) => {
        if (topic?.subtopics?.length > 0) {
          return [...acc, ...topic?.subtopics];
        } else {
          return acc;
        }
      }, []);

      thunkAPI.dispatch(updateAllSubtopics(AllSubtopics));

      await storeDataToAsyncStorage("allSubtopics", AllSubtopics);
      await storeDataToAsyncStorage("topics", response.data.topics);

      return response.data;
    } catch (err) {
      errorToast(err);
    }
  }
);

export const updateInterestedTopics = createAsyncThunk(
  "communitySlice/updateInterestedTopics",
  async (payload) => {
    try {
      const response = await ApiService.post(UPDATE_INTERESTED_TOPIC, payload);
      // console.log(response.data);
      return response.data;
    } catch (err) {
      errorToast(err);
    }
  }
);

export const getMyActivity = createAsyncThunk(
  "communitySlice/getMyActivity",
  async (payload) => {
    const filter_by = payload.filter_by;
    const pageNo = payload.pageNo;
    const activity_type =
      filter_by === "Claps"
        ? "clapped"
        : filter_by === "Comment"
        ? "commented"
        : "shared";

    let requestParam = {
      size: 10,
      page_number: pageNo,
      activity_type: activity_type,
    };

    try {
      const response = await ApiService.get(GET_MY_ACTIVITY, {
        params: requestParam,
      });

      const { monthIndex, posts, total_pages } = response.data;
      console.log(response.data);
      const responsePayload = {
        data: {
          monthIndex: monthIndex,
          posts: posts,
          totalPages: total_pages,
          pageNo: pageNo,
        },
        filter_by: filter_by,
      };
      return responsePayload;
    } catch (err) {
      errorToast(err);
    }
  }
);

export const getRecommendedUsers = createAsyncThunk(
  "communitySlice/getRecommendedUsers",
  async (payload) => {
    const pageNo = payload.pageNo;

    let requestParam = {
      size: 10,
      page_number: pageNo,
    };

    try {
      const response = await ApiService.get(GET_RECOMMENDED_USERS, {
        params: requestParam,
      });

      const responsePayload = {
        users: response.data.users,
        totalPages: response.data.total_pages,
        pageNo: pageNo,
      };

      return responsePayload;
    } catch (err) {
      console.log(err);
      errorToast(err);
    }
  }
);

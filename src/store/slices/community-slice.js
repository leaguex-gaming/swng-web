import { createSlice } from "@reduxjs/toolkit";
import {
  deletePost,
  getComments,
  getPostsByTopicThunk,
  getPostsByUserId,
  getPostsThunk,
  getUserProfile,
  usersFollow,
  getPostById,
  createPostThunk,
  reportPost,
  getTopics,
  updateInterestedTopics,
  getMyActivity,
  getRecommendedUsers,
} from "../thunks/community";
import { getUniqueListBy } from "../../utils/helpers/helper";
import { POST_API_CALL_PAGE_SIZE } from "../../constants/StaticData";

const initialState = {
  posts: {},
  topics: [
    {
      topic_id: "1",
      topic_name: "CRICKET",
      subtopics: [{ subtopic_id: "1", subtopic_name: "cricket" }],
    },
  ],
  myPosts: [],
  allSubTopics: [],
  videoMuted: true,
  getPostsThunkLoading: false,
  getPostsThunkError: "",
  getCommentsLoading: false,
  getCommentsError: "",
  totalPostsPages: 1,

  getPostsByUserIdLoading: false,

  userProfile: {},
  getUserProfileLoading: false,
  getUserProfileError: "",

  deletePostLoading: false,
  deletePostId: "",
  deletePostError: "",

  usersFollowLoading: false,
  usersFollowId: "",
  usersFollowError: "",
  getPostByIdLoading: false,
  createPostLoading: false,
  giphyCommentPostId: "",
  giphyCommentMediaURL: "",
  reportPostLoading: false,
  notificationHistory: {},
  seed: undefined,
  viewedPosts: [],

  interestTopics: [],

  getMyActivityLoading: false,
  myActivity: {
    Claps: null,
    Comment: null,
    Shared: null,
  },

  recommendedUsersLoading: false,
  recommendedUsers: null,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    resettingCommunitySliceData(state, action) {
      return {
        posts: {},
        topics: [
          {
            topic_id: "1",
            topic_name: "CRICKET",
            subtopics: [{ subtopic_id: "1", subtopic_name: "cricket" }],
          },
        ],
        myPosts: [],
        allSubTopics: [],
        videoMuted: true,
        getPostsThunkLoading: false,
        getPostsThunkError: "",
        getCommentsLoading: false,
        getCommentsError: "",
        totalPostsPages: 1,

        userProfile: {},
        getUserProfileLoading: false,
        getUserProfileError: "",

        deletePostLoading: false,
        deletePostError: "",

        usersFollowLoading: false,
        deletePostError: "",
        createPostLoading: false,
        giphyCommentPostId: "",
        reportPostLoading: false,
        notificationHistory: {},
        seed: undefined,
        viewedPosts: [],
      };
    },
    updatePosts(state, action) {
      const {
        page_number = 1,
        data,
        subtopic_id = 0,
        total_pages = 1,
      } = action.payload;
      const postArray = state?.posts?.[subtopic_id]?.posts || [];
      let newPostsArray;
      if (page_number === 1) {
        if (postArray?.length > POST_API_CALL_PAGE_SIZE) {
          //Added for handling deeplink
          newPostsArray = [...data, postArray?.[POST_API_CALL_PAGE_SIZE]];
        } else {
          newPostsArray = [...data];
        }
      } else {
        newPostsArray = [...postArray, ...data];
      }
      const removeDublicatePost = getUniqueListBy(newPostsArray, "id");
      return {
        ...state,
        posts: {
          ...state.posts,
          [subtopic_id]: {
            posts: removeDublicatePost,
            page_number,
            total_pages,
          },
        },
      };
    },
    updateReelsPosts(state, action) {
      const {
        page_number = 1,
        data,
        subtopic_id = 0,
        total_pages = 1,
      } = action.payload;
      const postArray = state?.posts?.[subtopic_id]?.posts || [];

      let newPostsArray = [...(postArray || []), ...data];

      const removeDublicatePost = getUniqueListBy(newPostsArray, "id");
      return {
        ...state,
        posts: {
          ...state.posts,
          [subtopic_id]: {
            posts: removeDublicatePost,
            page_number,
            total_pages,
          },
        },
      };
    },
    updateSearchPosts(state, action) {
      const {
        page_number = 1,
        data,
        subtopic_id = 0,
        total_pages = 1,
      } = action.payload;
      const postArray = state?.posts?.[subtopic_id]?.posts || [];
      let newPostsArray;
      if (page_number === 1) {
        newPostsArray = [...data];
      } else {
        newPostsArray = [...postArray, ...data];
      }
      const removeDublicatePost = getUniqueListBy(newPostsArray, "id");
      return {
        ...state,
        posts: {
          ...state.posts,
          [subtopic_id]: {
            posts: removeDublicatePost,
            page_number,
            total_pages,
          },
        },
      };
    },
    updatePostById(state, action) {
      const { post, currentTopicId = 0 } = action.payload;
      const posts = state.posts[currentTopicId]?.posts || [];
      const newPostsArray = [...posts, post];
      const removeDublicatePost = getUniqueListBy(newPostsArray, "id");
      return {
        ...state,
        posts: {
          ...state.posts,
          [currentTopicId]: {
            ...state.posts[currentTopicId],
            posts: removeDublicatePost,
          },
        },
      };
    },
    updateSpecificUserPosts(state, action) {
      const {
        user_id,
        subTopics,
        total_pages = 1,
        page_number = 1,
        data,
        subtopic_id,
      } = action.payload;

      const postArray = state?.posts?.[`uid_${user_id}`]?.posts || [];
      let newPostsArray;
      if (page_number === 1) {
        newPostsArray = [...data];
      } else {
        newPostsArray = [...postArray, ...data];
      }
      const removeDublicatePost = getUniqueListBy(newPostsArray, "id");
      const subtopics = [
        {
          subtopic_color: "#FF7A7A",
          subtopic_id: 0,
          subtopic_name: "Trending",
          topic_id: 0,
        },
        ...subTopics,
      ];
      return {
        ...state,
        posts: {
          ...state.posts,
          [`uid_${user_id}`]: {
            posts: removeDublicatePost,
            page_number,
            total_pages,
            subTopics: subtopics,
          },
        },
      };
    },
    updateUserProfile(state, action) {
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          [`uid_${action.payload.id}`]: action.payload,
        },
      };
    },
    updateTopics(state, action) {
      state.topics = action.payload;
    },
    updateAllSubtopics(state, action) {
      state.allSubTopics = [
        {
          subtopic_color: "#FF7A7A",
          subtopic_id: 0,
          subtopic_name: "Trending",
          topic_id: 0,
        },
        ...action.payload,
      ];
    },

    addPost(state, action) {
      state.posts = {
        ...state.posts,
        [0]: {
          ...state.posts[0],
          posts: [action.payload, ...state.posts[0]?.posts],
        },
      };
    },
    updateMyPosts(state, action) {
      state.myPosts = action.payload;
    },
    updateLikeNotification(state, action) {
      const { post_id, currentTopicId = 0 } = action.payload;

      const postIdArray = state.posts[currentTopicId]?.posts?.map(
        (post) => post.id
      );

      const postIndex = findIndex(state.posts[currentTopicId]?.posts, post_id);
      const updatedPost = {
        ...state.posts[currentTopicId]?.posts[postIndex],
        claps: state.posts[currentTopicId]?.posts[postIndex].claps + 1,
      };

      findAndReplaceObjectInPosts(state, updatedPost);
    },
    updateLike(state, action) {
      const { post_id, like, currentTopicId = 0 } = action.payload;

      const postIndex = findIndex(state.posts[currentTopicId]?.posts, post_id);
      const updatedPost = {
        ...state.posts[currentTopicId]?.posts[postIndex],
        claps:
          state.posts[currentTopicId]?.posts[postIndex].claps + (like ? 1 : -1),
        user_has_liked: like ? 1 : 0,
      };
      findAndReplaceObjectInPosts(state, updatedPost);
    },

    addComment(state, action) {
      const { comment, currentTopicId, parentId } = action.payload;
      const { post_id } = comment;

      const posts = state.posts[currentTopicId]?.posts || [];

      const postIndex = findIndex(posts, post_id);
      const post = posts[postIndex];
      const comments = post?.comments || [];

      const commentIndex = findIndex(comments, parentId);
      const cmnt = comments[commentIndex];

      let updatedPost;

      if (parentId) {
        if (cmnt?.replies?.length) {
          cmnt.moreReplies = [...(cmnt?.moreReplies || []), comment];
          if (cmnt.child_comment) {
            cmnt.child_comment.total_more_replies =
              (cmnt?.child_comment?.total_more_replies || 0) + 1;
          } else {
            cmnt.child_comment = {
              total_more_replies: 1,
            };
          }
        } else {
          cmnt.replies = [...(cmnt?.replies || []), comment];
          cmnt.total_replies = cmnt?.total_replies || 0 + 1;
        }

        updatedPost = {
          ...post,
          comments: [...(comments || [])],
          number_of_comments: (post.number_of_comments || 0) + 1,
        };
      } else {
        updatedPost = {
          ...post,
          comments: [comment, ...(post.comments || [])],
          number_of_comments: (post.number_of_comments || 0) + 1,
        };
      }
      findAndReplaceObjectInPosts(state, updatedPost);
    },

    updateComments(state, action) {
      const { post_id, page_number, comments, currentTopicId, total_pages } =
        action.payload;

      const updatedPosts = state.posts[currentTopicId]?.posts?.map((post) =>
        post.id == post_id
          ? {
              ...post,
              comments:
                page_number === 1 || !post?.comments
                  ? comments
                  : [...post.comments, ...comments],
              comments_page_number: page_number,
              comments_total_pages: total_pages,
            }
          : post
      );
      // console.log(comments, updatedPosts, "update comment slice");
      return {
        ...state,
        posts: {
          ...state.posts,
          [currentTopicId]: {
            ...state.posts[currentTopicId],
            ["posts"]: updatedPosts,
          },
        },
      };
    },
    updateCommentReplies(state, action) {
      const { size, comment, currentTopicId, parentId, pageNo, type } =
        action.payload;

      const { post_id } = comment[0];

      const posts = state.posts[currentTopicId]?.posts || [];

      const postIndex = findIndex(posts, post_id);
      const post = posts[postIndex];

      const comments = post?.comments || [];

      const commentIndex = findIndex(comments, parentId);
      const cmnt = comments[commentIndex];

      let updatedPost;

      if (type === "more") {
        if (pageNo === 1) {
          cmnt.moreReplies = [...comment];
        } else {
          cmnt.moreReplies = [...(cmnt?.moreReplies || []), ...comment];
        }
        cmnt.moreRepliesPageNo = pageNo;
      } else {
        if (pageNo === 1) {
          cmnt.previousReplies = [...comment];
        } else {
          cmnt.previousReplies = [...comment, ...(cmnt?.previousReplies || [])];
        }
        cmnt.previousRepliesPageNo = pageNo;
      }

      updatedPost = {
        ...post,
        comments: [...(comments || [])],
      };

      findAndReplaceObjectInPosts(state, updatedPost);
    },
    setVideoMuted(state, action) {
      state.videoMuted = action.payload || false;
    },

    updateCommentLike(state, action) {
      const {
        post_id,
        comment_id,
        like,
        currentTopicId,
        parent_comment_id = undefined,
        type = "current",
      } = action.payload;

      const postIndex = findIndex(state.posts[currentTopicId]?.posts, post_id);

      if (postIndex === -1) return state; // Post not found

      const post = state.posts[currentTopicId]?.posts[postIndex];

      const commentIndex = findIndex(
        post.comments,
        parent_comment_id ? parent_comment_id : comment_id
      );

      if (commentIndex === -1) return state; // Comment not found

      let comment = post.comments[commentIndex];

      let updatedPost;

      if (parent_comment_id) {
        const replySection =
          type === "current"
            ? "replies"
            : type === "more"
            ? "moreReplies"
            : "previousReplies";

        const replyIndex = findIndex(comment[replySection], comment_id);

        if (replyIndex === -1) return state; // Reply not found

        let reply = comment[replySection][replyIndex];

        reply.user_has_liked = like ? 1 : 0;
        reply.claps = like ? Number(reply.claps) + 1 : Number(reply.claps) - 1;

        const updatedComments = [...post?.comments];

        updatedPost = { ...post, comments: updatedComments };
      } else {
        const updatedComment = {
          ...comment,
          user_has_liked: like ? 1 : 0,
          claps: comment.claps + (like ? 1 : -1),
        };

        const updatedComments = [...post?.comments];
        updatedComments[commentIndex] = updatedComment;

        updatedPost = { ...post, comments: updatedComments };
      }
      findAndReplaceObjectInPosts(state, updatedPost);
    },

    updateDeletedComment(state, action) {
      const {
        post_id,
        comment_id,
        currentTopicId,
        parent_comment_id,
        type = "current",
      } = action.payload;

      const postIndex = findIndex(state.posts[currentTopicId]?.posts, post_id);

      if (postIndex === -1) return state; // Post not found

      const post = state.posts[currentTopicId]?.posts[postIndex];

      const commentIndex = findIndex(
        post.comments,
        parent_comment_id ? parent_comment_id : comment_id
      );

      if (commentIndex === -1) return state; // Comment not found

      let comment = post.comments[commentIndex];

      let updatedPost;

      if (parent_comment_id) {
        const replySection =
          type === "current"
            ? "replies"
            : type === "more"
            ? "moreReplies"
            : "previousReplies";

        const replyIndex = findIndex(comment[replySection], comment_id);

        if (replyIndex === -1) return state; // Reply not found

        comment[replySection][replyIndex].deleted = true;
        comment[replySection][replyIndex].content =
          "This comment has been deleted";
        comment[replySection][replyIndex].media_exists = false;
        comment[replySection][replyIndex].media_url = "";

        const updatedComments = [...post?.comments];

        updatedPost = {
          ...post,
          comments: updatedComments,
          // number_of_comments: post.number_of_comments - 1,
        };
      } else {
        const updatedComments = [...post?.comments];

        const updatedComment = {
          ...updatedComments[commentIndex],
          deleted: true,
          content: "This comment has been deleted",
          media_exists: false,
          media_url: "",
        };
        updatedComments.splice(commentIndex, 1, updatedComment);
        updatedPost = {
          ...post,
          comments: updatedComments,
          // number_of_comments: post.number_of_comments - 1,
        };
      }
      findAndReplaceObjectInPosts(state, updatedPost);
    },
    updateFollow(state, action) {
      const { userId, actionType, fromSuggestion, myUserId } = action.payload;

      state.userProfile[`uid_${userId}`].total_followers =
        actionType === "ADD"
          ? state.userProfile[`uid_${userId}`].total_followers + 1
          : state.userProfile[`uid_${userId}`].total_followers - 1;

      state.userProfile[`uid_${myUserId}`].total_followings =
        actionType === "ADD"
          ? state.userProfile[`uid_${myUserId}`].total_followings + 1
          : state.userProfile[`uid_${myUserId}`].total_followings - 1;

      if (actionType !== "ADD") {
        const userIndex = findIndex(
          state.userProfile[`uid_${myUserId}`]?.following,
          userId
        );

        state.userProfile[`uid_${myUserId}`]?.following.splice(userIndex, 1);
      }

      if (fromSuggestion && state?.recommendedUsers?.users?.length) {
        const userIndex = findIndex(state.recommendedUsers.users, userId);
        state?.recommendedUsers?.users.splice(userIndex, 1);
      }

      const followedByUser = actionType === "ADD" ? true : false;

      state.userProfile[`uid_${userId}`].followed_by_user =
        actionType === "ADD" ? true : false;

      findAndReplaceFollowedByInSpecificUserPosts(
        state,
        userId,
        followedByUser
      );
    },
    updateDeletePost(state, action) {
      const postId = action.payload;
      deletePostObjectFromPosts(state, postId);
    },
    updateGiphyCommentPostId(state, action) {
      state.giphyCommentPostId = action.payload;
    },
    updateGiphyCommentMediaURL(state, action) {
      state.giphyCommentMediaURL = action.payload;
    },
    updateNotificationHistory(state, action) {
      state.notificationHistory = {
        ...state.notificationHistory,
        ...action.payload,
      };
    },
    updateShareCount(state, action) {
      const { post_id, currentTopicId = 0 } = action.payload;

      const postIndex = findIndex(state.posts[currentTopicId]?.posts, post_id);
      const updatedPost = {
        ...state.posts[currentTopicId]?.posts[postIndex],
        share_count:
          state.posts[currentTopicId]?.posts[postIndex].share_count + 1,
      };
      findAndReplaceObjectInPosts(state, updatedPost);
    },
    updateSeed(state, action) {
      state.seed = action.payload;
    },
    updateViewedPosts(state, action) {
      state.viewedPosts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPostsThunk.pending, (state) => {
      state.getPostsThunkLoading = true;
    });
    builder.addCase(getPostsThunk.fulfilled, (state, action) => {
      state.getPostsThunkLoading = false;
    });
    builder.addCase(getPostsThunk.rejected, (state, action) => {
      state.getPostsThunkLoading = false;
    });

    builder.addCase(getPostsByTopicThunk.pending, (state) => {
      state.getPostsThunkLoading = true;
    });
    builder.addCase(getPostsByTopicThunk.fulfilled, (state, action) => {
      // state.totalPostsPages = action.payload.total_pages;
      state.getPostsThunkLoading = false;
    });
    builder.addCase(getPostsByTopicThunk.rejected, (state, action) => {
      state.getPostsThunkLoading = false;
    });

    builder.addCase(getPostsByUserId.pending, (state) => {
      state.getPostsByUserIdLoading = true;
    });
    builder.addCase(getPostsByUserId.fulfilled, (state, action) => {
      state.getPostsByUserIdLoading = false;
    });
    builder.addCase(getPostsByUserId.rejected, (state, action) => {
      state.getPostsByUserIdLoading = false;
    });

    builder.addCase(getComments.pending, (state) => {
      state.getCommentsLoading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.getCommentsLoading = false;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.getCommentsLoading = false;
    });

    builder.addCase(getUserProfile.pending, (state) => {
      state.getUserProfileLoading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.getUserProfileLoading = false;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.getUserProfileLoading = false;
    });

    builder.addCase(deletePost.pending, (state, action) => {
      state.deletePostId = action.meta.arg.postId;
      state.deletePostLoading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.deletePostLoading = false;
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.deletePostLoading = false;
    });

    builder.addCase(usersFollow.pending, (state, action) => {
      state.usersFollowId = action.meta.arg.userId;
      state.usersFollowLoading = true;
    });
    builder.addCase(usersFollow.fulfilled, (state, action) => {
      state.usersFollowLoading = false;
    });
    builder.addCase(usersFollow.rejected, (state, action) => {
      state.usersFollowLoading = false;
    });
    builder.addCase(getPostById.pending, (state, action) => {
      state.getPostByIdLoading = true;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.getPostByIdLoading = false;
    });
    builder.addCase(getPostById.rejected, (state, action) => {
      state.getPostByIdLoading = false;
    });
    builder.addCase(createPostThunk.pending, (state, action) => {
      state.createPostLoading = true;
    });
    builder.addCase(createPostThunk.fulfilled, (state, action) => {
      state.createPostLoading = false;
    });
    builder.addCase(createPostThunk.rejected, (state, action) => {
      state.createPostLoading = false;
    });
    builder.addCase(reportPost.pending, (state, action) => {
      state.reportPostLoading = true;
    });
    builder.addCase(reportPost.fulfilled, (state, action) => {
      state.reportPostLoading = false;
    });
    builder.addCase(reportPost.rejected, (state, action) => {
      state.reportPostLoading = false;
    });

    builder.addCase(getTopics.pending, (state) => {
      state.getTopicsLoading = true;
    });
    builder.addCase(getTopics.fulfilled, (state, action) => {
      state.getTopicsLoading = false;
      state.interestTopics = action?.payload?.topics;
    });
    builder.addCase(getTopics.rejected, (state, action) => {
      state.getTopicsLoading = false;
    });
    builder.addCase(updateInterestedTopics.pending, (state) => {
      state.updateInterestLoading = true;
    });
    builder.addCase(updateInterestedTopics.fulfilled, (state, action) => {
      state.updateInterestLoading = false;
    });
    builder.addCase(updateInterestedTopics.rejected, (state, action) => {
      state.updateInterestLoading = false;
    });

    builder.addCase(getMyActivity.pending, (state) => {
      state.getMyActivityLoading = true;
    });
    builder.addCase(getMyActivity.fulfilled, (state, action) => {
      const { filter_by, data } = action.payload;

      state.getMyActivityLoading = false;
      if (data.pageNo === 1) {
        const keys = Object.keys(data.posts);
        const transformedData = Object.entries(data.posts).reduce(
          (acc, [key, value], currentIndex) => {
            if (currentIndex === 0) {
              acc.push(key, "");
            } else if (
              data.posts[keys[currentIndex - 1]].length == 1 ||
              data.posts[keys[currentIndex - 1]].length % 2 != 0
            ) {
              acc.push("", key, "");
            } else {
              acc.push(key, "");
            }
            acc.push(...value);
            return acc;
          },
          []
        );
        const updatedData = { ...data, postsArray: transformedData };

        state.myActivity[filter_by] = updatedData;
      } else {
        const is_Append_Posts_To_LastMonths_Existing_Object =
          state.myActivity[filter_by]?.monthIndex?.[
            state.myActivity[filter_by]?.monthIndex?.length - 1
          ] === Object.keys(data?.posts)[0];

        const month = Object.keys(data?.posts)[0];
        const months_Posts = {
          [month]: [
            ...state.myActivity[filter_by]?.posts?.[month],
            ...data?.posts?.[month],
          ],
        };

        const updated_Posts_Array = {
          ...state.myActivity[filter_by]?.posts,
          ...data?.posts,
          ...(is_Append_Posts_To_LastMonths_Existing_Object && months_Posts),
        };

        const keys = Object.keys(updated_Posts_Array);
        const transformed_Months_Posts = Object.entries(
          updated_Posts_Array
        ).reduce((acc, [key, value], currentIndex) => {
          if (currentIndex === 0) {
            acc.push(key, "");
          } else if (
            updated_Posts_Array[keys[currentIndex - 1]].length == 1 ||
            updated_Posts_Array[keys[currentIndex - 1]].length % 2 != 0
          ) {
            acc.push("", key, "");
          } else {
            acc.push(key, "");
          }
          acc.push(...value);
          return acc;
        }, []);

        const overallMonthIndex = [
          ...state.myActivity[filter_by].monthIndex,
          ...data?.monthIndex,
        ];
        const uniqueMonthIndex = overallMonthIndex.filter(
          (item, index) => overallMonthIndex.indexOf(item) === index
        );

        // console.log(
        //   Object.keys(data2?.posts)[0],
        //   "---------------------------------",
        //   activityData?.posts?.[month],
        //   "---------------------------------",
        //   is_Append_Posts_To_Previous_Objects_LastMonth,
        //   "---------------------------------",
        //   months_Posts,
        // );

        const newData = {
          ...state.myActivity[filter_by],
          posts: {
            ...state.myActivity[filter_by]?.posts,
            ...data?.posts,
            ...(is_Append_Posts_To_LastMonths_Existing_Object && months_Posts),
          },
          postsArray: transformed_Months_Posts,
          monthIndex: uniqueMonthIndex,
          pageNo: data?.pageNo,
          totalPages: data?.totalPages,
        };

        state.myActivity[filter_by] = newData;
      }
    });
    builder.addCase(getMyActivity.rejected, (state, action) => {
      state.getMyActivityLoading = false;
    });

    builder.addCase(getRecommendedUsers.pending, (state) => {
      state.recommendedUsersLoading = true;
    });
    builder.addCase(getRecommendedUsers.fulfilled, (state, action) => {
      const { pageNo, users, totalPages } = action.payload;

      state.recommendedUsersLoading = false;

      if (pageNo === 1) {
        state.recommendedUsers = action.payload;
      } else {
        state.recommendedUsers = {
          users: [...state.recommendedUsers.users, ...users],
          totalPages: totalPages,
          pageNo: pageNo,
        };
      }
    });
    builder.addCase(getRecommendedUsers.rejected, (state, action) => {
      state.recommendedUsersLoading = false;
    });
  },
});

export const {
  updatePosts,
  updateReelsPosts,
  updatePostById,
  updateTopics,
  updateAllSubtopics,
  addPost,
  updateLikeNotification,
  updateLike,
  updateMyPosts,
  addComment,
  updateComments,
  updateCommentLike,
  setVideoMuted,
  updateFollow,
  updateDeletePost,
  resettingCommunitySliceData,
  updateSpecificUserPosts,
  updateUserProfile,
  updateGiphyCommentPostId,
  updateGiphyCommentMediaURL,
  updateNotificationHistory,
  updateShareCount,
  updateSeed,
  updateDeletedComment,
  updateViewedPosts,
  updateSearchPosts,
  updateCommentReplies,
} = communitySlice.actions;

export default communitySlice.reducer;

/**
 * The function "findIndex" takes an array and an id as parameters and returns the index of the first
 * element in the array that has a matching id.
 * @param array - An array of objects. Each object in the array has a property called "id".
 * @param id - The `id` parameter is the value that you want to find in the `array`.
 * @returns the index of the item in the array that has the specified id.
 */
function findIndex(array = [], id) {
  try {
    const index = array?.findIndex((item) => {
      return Number(item.id) == Number(id);
    });
    return index;
  } catch (e) {
    return -1;
  }
}

const findAndReplaceObjectInPosts = (state, replaceObject) => {
  for (let key in state.posts) {
    const postIndex = findIndex(state.posts[key]?.posts, replaceObject.id);
    if (postIndex === -1) continue;

    state.posts[key]?.posts.splice(postIndex, 1, replaceObject);
  }
};

const findAndReplaceFollowedByInSpecificUserPosts = (
  state,
  user_id,
  followed_by_user
) => {
  for (let key in state.posts) {
    const allPosts = state.posts[key]?.posts || [];
    allPosts.map((post, index) => {
      if (post.user_id === user_id) {
        state.posts[key].posts[index].followed_by_user = followed_by_user;
      }
    });
  }
};

const deletePostObjectFromPosts = (state, postId) => {
  for (let key in state.posts) {
    const postIndex = findIndex(state.posts[key]?.posts, postId);
    if (postIndex === -1) continue;

    state.posts[key]?.posts.splice(postIndex, 1);
  }
};

"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Keyboard,
  ScrollView,
  StyleSheet,
  Pressable,
  RefreshControl,
} from "react-native-web";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  getPostById,
  postCommentThunk,
} from "@/store/thunks/community";
import { BackButton, PolygonContainer } from "../common/InBuiltNavigation";
import Post from "./Post";
import CommentInput from "./CommentInput";
import PostComments from "./PostComments";
import LoadingScreen from "../common/LoadingScreen";
import MyText from "../common/MyText";
import MoreVertical from "../../../public/svg/MoreVertical";
import Header from "../common/Header";
import LottieLoader from "../common/LottieLoader";
import {
  black,
  commentBorderColor,
  greyBackgroundColor,
  postBackground,
  primaryTextBlue,
  theme,
} from "@/constants/theme/colors";
import {
  PlatformOS,
  windowMaxWidth,
  windowMaxHeight,
} from "@/constants/DeviceData";
import Reply from "../../../public/svg/community/ReplyIcon";
import Close from "../../../public/svg/community/Close";
import { useRouter } from "next/navigation";
// import Toast from "react-native-toast-message";

const PostInfo = ({ postId, currentTopicId = 0, fromDeepLink = false }) => {
  const router = useRouter();

  //---------------------------------------------state management------------------------------------------//
  const [keyboardStatus, setKeyboardStatus] = useState(0);
  const fullScreenPostRef = useRef(null);
  const [commentText, setCommentText] = useState("");
  const [mentionedUser, setMentionedUser] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [replyToSpecificPerson, setReplyToSpecificPerson] = useState(null);
  const [directReplyTo, setDirectReplyTo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  //--------------------------------------------------refs---------------------------------------------------//
  const commentInputRef = useRef(null);

  //---------------------------------------------redux store management-------------------------------------//
  const dispatch = useDispatch();
  const post = useSelector((state) => {
    return state.community.posts[currentTopicId]?.posts?.find(
      (p) => p.id === Number(postId)
    );
  });
  const navigationChanged = useSelector(
    (state) => state.common.navigationChanged
  );
  const { is_guest } = useSelector((state) => state.userSlice);

  //--------------------------------------------------hook effects--------------------------------------------//
  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener("keyboardDidShow", e => {
  //     setKeyboardStatus(e?.endCoordinates?.height);
  //   });
  //   const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
  //     setKeyboardStatus(0);
  //   });

  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, []);

  useEffect(() => {
    getPostByIdfunc();
    getPostComments(post);
  }, [fromDeepLink, postId]);

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const getPostByIdfunc = async () => {
    setLoading(true);
    const res = await dispatch(
      getPostById({ post_id: postId, currentTopicId: currentTopicId })
    );
    getPostComments(res.payload.posts);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    const res = await dispatch(
      getPostById({ post_id: postId, currentTopicId: currentTopicId })
    );
    getPostComments(res.payload.posts);
    setRefreshing(false);
  };

  const getPostComments = async (post) => {
    if (post?.comments?.length < post?.number_of_comments) {
      await dispatch(
        getComments({ postId: postId, currentTopicId: currentTopicId })
      );
    }
  };

  const onCloseReply = () => {
    setParentId(null);
    setReplyToSpecificPerson(null);
    setMentionedUser(null);
    commentInputRef?.current?.blur();
  };

  if (!post?.id && !loading) {
    return (
      <View style={styles.emptyStateContainer}>
        <MyText pageHeaders>Post Not found</MyText>
      </View>
    );
  }

  const extraMargin = keyboardStatus && navigationChanged ? keyboardStatus : 0;

  //--------------------------------------render ui----------------------------------------//
  return (
    <View style={styles.container}>
      {post?.id === undefined ? (
        <LoadingScreen />
      ) : (
        <>
          <Header
            containerStyle={{
              marginTop: PlatformOS === "ios" ? 0 : extraMargin,
              zIndex: 1,
            }}
            backgroundColor={black}
            leftComponent={
              <BackButton
                onPress={() => {
                  router.back();
                }}
              />
            }
            headerText={`${post?.team_name}'s Post`}
            rightComponent={
              <PolygonContainer
                rotate={true}
                onPress={() =>
                  //   Toast.show({
                  //     type: "info",
                  //     visibilityTime: 1000,
                  //   })
                  {}
                }>
                <View style={{ top: 12, left: 30 }}>
                  <MoreVertical />
                </View>
              </PolygonContainer>
            }></Header>

          <ScrollView
            ref={fullScreenPostRef}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={"always"}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.scrollContainer}>
            <Post
              {...post}
              fullScreenPost={true}
              currentTopicId={currentTopicId}
              loading={loading}
              commentInputRef={commentInputRef}></Post>

            <View
              style={styles.commentContainer}
              keyboardShouldPersistTaps={"handled"}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <LottieLoader />
                </View>
              ) : (
                <>
                  {post?.comments?.length ? (
                    <PostComments
                      fullScreenPost={true}
                      comments={post?.comments || []}
                      postId={post.id}
                      noOfComments={post?.comments?.length}
                      currentTopicId={currentTopicId}
                      post={post}
                      setParentId={(data) => {
                        commentInputRef?.current?.focus();
                        setParentId(data);
                      }}
                      setDirectReplyTo={setDirectReplyTo}
                      setMentionedUser={setReplyToSpecificPerson}
                    />
                  ) : (
                    <></>
                  )}
                </>
              )}
            </View>
          </ScrollView>
          {!is_guest && (
            <View style={styles.inputContainer}>
              {parentId && (
                <View style={styles.replyToContainer}>
                  <View style={styles.replyToTextContainer}>
                    <Reply width={25} height={25} />
                    <View style={styles.textContainer}>
                      <MyText>Replying to</MyText>
                      <MyText color={primaryTextBlue}>
                        @
                        {directReplyTo
                          ? directReplyTo?.team_name
                          : parentId?.team_name}
                      </MyText>
                    </View>
                  </View>
                  <Pressable onPress={() => onCloseReply()}>
                    <Close />
                  </Pressable>
                </View>
              )}
              <CommentInput
                commentInputRef={commentInputRef}
                postId={postId}
                fullScreenPost={true}
                currentTopicId={currentTopicId}
                fullScreenPostRef={fullScreenPostRef}
                value={commentText}
                setValue={setCommentText}
                setMentionedUser={setMentionedUser}
                mentionedUser={mentionedUser}
                replyToSpecificPerson={replyToSpecificPerson}
                parentId={parentId}
                setParentId={setParentId}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    backgroundColor: black,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: black,
    height: windowMaxHeight,
    width: windowMaxWidth,
    alignSelf: "center",
  },
  scrollContainer: { width: windowMaxWidth, alignSelf: "center" },
  commentContainer: {
    marginLeft: 22,
    marginRight: 15,
    bottom: 12,
    zIndex: -1,
  },
  loadingContainer: {
    backgroundColor: postBackground[theme],
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderWidth: 1,
    borderColor: commentBorderColor,
    height: 75,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    borderRadius: 9,
  },
  replyToContainer: {
    width: windowMaxWidth,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: greyBackgroundColor,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  replyToTextContainer: {
    flexDirection: "row",
    gap: 10,
  },
  textContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});

export default PostInfo;

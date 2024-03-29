"use client";

import React, { useRef, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native-web";
import { LinearGradientBackground } from "../common/MyBackground";
import MyText from "../common/MyText";
import {
  black2,
  blackOpacity,
  commentBorderColor,
  greyBackgroundColor,
  postBackground,
  primaryTextBlue,
  theme,
} from "@/constants/theme/colors";
import PostComments from "../community/PostComments";
import { windowMaxHeight, windowMaxWidth } from "@/constants/DeviceData";
import CommentInput from "../community/CommentInput";
import LottieLoader from "../common/LottieLoader";
import Reply from "../../../public/svg/community/ReplyIcon";
import Close from "../../../public/svg/Close";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { customStyles } from "./utils";

const CommentModalize = ({
  setCommentModal,
  post,
  loading,
  currentTopicId,
}) => {
  //--------------------------------------------------refs---------------------------------------------------//
  const commentInputRef = useRef(null);

  //---------------------------------------------state management------------------------------------------//
  const [commentText, setCommentText] = useState("");
  const [mentionedUser, setMentionedUser] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [replyToSpecificPerson, setReplyToSpecificPerson] = useState(null);
  const [directReplyTo, setDirectReplyTo] = useState(null);

  //---------------------------------------------redux store management-------------------------------------//
  const postDetails = useSelector((state) => {
    return state.community.posts[currentTopicId]?.posts?.find(
      (p) => p?.id === Number(post?.id)
    );
  });

  const posts = useSelector((state) => {
    return state.community;
  });

  const getCommentsLoading = useSelector(
    (state) => state.community.getCommentsLoading
  );

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const onCloseReply = () => {
    setParentId(null);
    setReplyToSpecificPerson(null);
    setMentionedUser(null);
    commentInputRef?.current?.blur();
  };

  //--------------------------------------render ui----------------------------------------//
  return (
    <Pressable
      style={styles.outerContainer}
      onPress={() => {
        setMentionedUser(null);
        setParentId(null);
        setReplyToSpecificPerson(null);
        setDirectReplyTo(null);
        setCommentText("");
        setCommentModal(false);
      }}>
      <View style={styles.container}>
        <LinearGradientBackground colors={[black2, black2]}>
          <View style={styles.header}>
            <MyText fontSize={16} mv={10} pageHeaders>
              Comments
            </MyText>
          </View>

          <View
            style={[
              styles.commentContainer,
              { maxHeight: `calc(${windowMaxHeight} / 2)` },
            ]}
            keyboardShouldPersistTaps={"handled"}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <LottieLoader />
              </View>
            ) : (
              <>
                {postDetails?.comments?.length ? (
                  <PostComments
                    border={"hidden"}
                    fullScreenPost={false}
                    reelsScreenPost={true}
                    comments={postDetails?.comments || []}
                    postId={postDetails?.id}
                    noOfComments={postDetails?.number_of_comments}
                    currentTopicId={currentTopicId}
                    post={postDetails}
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

          {postDetails?.comments?.length && getCommentsLoading && (
            <View style={styles.loaderContainer}>
              <LottieLoader width={25} height={25} />
            </View>
          )}

          <View style={styles.lineBreak} />

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
              postId={post?.id}
              currentTopicId={currentTopicId}
              value={commentText}
              setValue={setCommentText}
              setMentionedUser={setMentionedUser}
              mentionedUser={mentionedUser}
              replyToSpecificPerson={replyToSpecificPerson}
              parentId={parentId}
              setParentId={setParentId}
            />
          </View>
        </LinearGradientBackground>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100vw",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 0,
    right: `calc(( 500px - 100vw) / 2)`,
    height: "100vh",
    alignItems: "center",
    backgroundColor: blackOpacity,
  },
  container: {
    width: windowMaxWidth,
    backgroundColor: postBackground[theme],
  },
  header: {
    alignItems: "center",
  },
  commentContainer: {
    width: windowMaxWidth,
    overflow: "scroll",
    alignSelf: "center",
    marginHorizontal: 20,
  },
  loadingContainer: {
    backgroundColor: postBackground[theme],
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderWidth: 1,
    borderColor: "#383737",
    height: 75,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  lineBreak: {
    borderBottomColor: commentBorderColor,
    borderBottomWidth: 1,
  },
  inputContainer: {
    borderRadius: 9,
    width: windowMaxWidth,
    marginHorizontal: 20,
    alignSelf: "center",
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
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: windowMaxWidth,
    paddingVertical: 5,
  },
});

export default CommentModalize;

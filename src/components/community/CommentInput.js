"use client";

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Pressable } from "react-native-web";
import MyText from "../common/MyText";
import { useDispatch, useSelector } from "react-redux";
import { postCommentThunk } from "@/store/thunks/community";
import SendButton from "../common/SendButton";
import InputBox from "../../../public/svg/InputBox";
import { postBackground, theme, white } from "../../constants/theme/colors";
import {
  updateGifModalVisible,
  updateSignupFrom,
} from "@/store/slices/common-slice";
import {
  updateGiphyCommentMediaURL,
  updateGiphyCommentPostId,
} from "@/store/slices/community-slice";
import { getFilteredMentionedUsers } from "@/utils/helpers/helper";
import { debounce } from "lodash";
import MentionModal from "../modals/MentionModal";

const CommentInput = ({
  postId = 1,
  fullScreenPost = false,
  currentTopicId,
  value,
  setValue = () => {},
  setMentionText = () => {},
  mentionedUser = {},
  setMentionedUser = () => {},

  fullScreenPostRef = null,
  commentInputRef = null,
  postCommentInputRef = null,
  handleFocus = () => {},
  parentId = null,
  setParentId = () => {},
  replyToSpecificPerson = null,
}) => {
  const dispatch = useDispatch();
  const { is_guest } = useSelector((state) => state.userSlice);
  const { giphyCommentPostId, giphyCommentMediaURL } = useSelector(
    (state) => state.community
  );

  const [mentionText, setMentionText2] = useState("");

  const [loading, setLoading] = useState(false);
  const [showMentionModal, setShowMentionModal] = useState(false);

  const onCommentSend = async () => {
    try {
      if (value) {
        setLoading(true);
        const filteredMentionedUser = getFilteredMentionedUsers(
          value,
          mentionedUser
        );
        await dispatch(
          postCommentThunk({
            postId: postId,
            comment: value,
            currentTopicId,
            comment_mentions: filteredMentionedUser,
            parentId: parentId?.id,
            ...(replyToSpecificPerson && {
              direct_reply_to: replyToSpecificPerson?.id,
            }),
          })
        );

        fullScreenPostRef?.current?.scrollTo({ x: 0, y: 0, animated: true });
        setValue("");
        setMentionedUser(null);
        setLoading(false);
        setParentId(null);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const handleTextChange = (text) => {
    setValue(text);

    const match = text.match(/@(\w+)$/);
    if (match) {
      setMentionText(match[1]);
      setMentionText2(match[1]);
    } else {
      setMentionText("");
      setMentionText2("");
    }
  };

  const selectUser = (user) => {
    // Replace the mentionText with the selected user in the input field
    const newValue = value.replace(`@${mentionText}`, `@${user.team_name} `);
    if (!mentionedUser) {
      setMentionedUser({ [user.team_name]: user.id });
    } else {
      const newMentionedUser = { ...mentionedUser, [user.team_name]: user.id };
      setMentionedUser(newMentionedUser);
    }
    setValue(newValue);
    setMentionText2("");
  };

  useEffect(() => {
    const postComment = debounce(async () => {
      if (giphyCommentMediaURL && giphyCommentPostId === postId) {
        dispatch(updateGiphyCommentPostId(""));
        dispatch(updateGiphyCommentMediaURL(""));

        setLoading(true);
        await dispatch(
          postCommentThunk({
            postId: postId,
            currentTopicId,
            media_url: giphyCommentMediaURL,
            parentId: parentId?.id,
            ...(replyToSpecificPerson && {
              direct_reply_to: replyToSpecificPerson?.id,
            }),
          })
        );
        fullScreenPostRef?.current?.scrollTo({ x: 0, y: 0, animated: true });

        setValue("");
        setMentionedUser(null);
        setLoading(false);
        setParentId(null);
      }
    }, 200);
    postComment();
  }, [giphyCommentMediaURL]);

  useEffect(() => {
    if (replyToSpecificPerson) {
      const { team_name, id } = replyToSpecificPerson;
      setMentionedUser({ [team_name]: id });
      setValue(`@${team_name} `);
    } else {
      setMentionedUser(null);
      setValue("");
    }
  }, [replyToSpecificPerson]);

  useEffect(() => {
    if (mentionText) {
      setShowMentionModal(true);
    } else {
      setShowMentionModal(false);
    }
  }, [mentionText]);

  return (
    <>
      {fullScreenPost && showMentionModal && (
        <MentionModal
          fullScreenPost={true}
          search={mentionText}
          onUserPress={selectUser}
        />
      )}
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            dispatch(updateGiphyCommentPostId(postId));
            dispatch(updateGifModalVisible(true));
          }}>
          <View style={styles.gifButtonContainer}>
            <MyText fontSize={12}>GIF</MyText>
          </View>
        </Pressable>

        <View
          style={[
            styles.inputContainer,
            // {width: fullScreenPost ? screenWidth - 130 : screenWidth - 167},
          ]}>
          <InputBox style={styles.inputBoxContainer} />

          <input
            ref={commentInputRef || postCommentInputRef}
            placeholder="Write a comment..."
            className="font-regular"
            onChange={(text) => handleTextChange(text.target.value)}
            disabled={is_guest ? true : loading}
            style={StyleSheet.flatten([
              styles.input,
              {
                border: "0px",
                outline: "none",
                backgroundColor: "transparent",
              },
            ])}
            value={value}
            onClick={() => {
              if (is_guest) {
                dispatch(updateSignupFrom("default"));
              }
            }}
            onFocus={() =>
              handleFocus(commentInputRef || postCommentInputRef)
            }></input>
        </View>

        <SendButton
          disabled={!value}
          loading={loading}
          onPress={onCommentSend}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1.5,
    paddingHorizontal: 10,
    backgroundColor: postBackground[theme],
  },
  gifButtonContainer: {
    height: 35,
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 3,
    borderColor: "rgba(255,255,255,0.2)",
  },
  inputContainer: {
    height: 40,
    paddingRight: 18,

    overflow: "hidden",
    flex: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginLeft: 10,
  },
  inputBoxContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  input: {
    paddingHorizontal: 10,
    width: "90%",
    height: "100%",
    fontWeight: 100,
    color: white,
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    zIndex: 1,
  },
});
export default CommentInput;

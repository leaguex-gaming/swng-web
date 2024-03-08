//condition  !props?.deleted || (props?.replies && !props?.replies?.every(reply => reply?.deleted))

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, FlatList } from "react-native-web";
import {
  commentBorderColor,
  darkGreen,
  postBackground,
  theme,
} from "@/constants/theme/colors";
import CommentInput from "./CommentInput";
import ProfileCard from "./ProfileCard";
import { MemoizedClap } from "./PostOptions";
import MyText from "../common/MyText";
import { getTimeElasped } from "@/utils/helpers/timeElapsed";
import {
  getCommentRepliesThunk,
  getComments,
  likeCommentThunk,
} from "@/store/thunks/community";
import { useDispatch, useSelector } from "react-redux";
import { windowMaxHeight, windowMaxWidth } from "@/constants/DeviceData";
import {
  updateCommentMoreOptions,
  updateSignupFrom,
} from "@/store/slices/common-slice";
import useSound from "use-sound";
// import clapaud from "../../assets/audio/clapaud.mp3";
import LottieLoader from "../common/LottieLoader";
import AutoHeightImage from "@/utils/CustomImage/AutoHeightImage";
import HashTagText from "./HashTagText";
import Delete from "../../../public/svg/community/Delete";
import Reply from "../../../public/svg/community/ReplyIcon";

const Replies = ({
  item,
  type,
  index,
  onReplyLongPress = () => {},
  longPress = false,
  setLongPress = () => {},
  onSecondLevelReplyPress = () => {},
  onReplyLikePress = () => {},
  bottomBorder = true,
}) => {
  return (
    <Pressable
      onLongPress={() => {
        onReplyLongPress(item, type);
      }}
      onPressIn={() => {
        if (longPress) {
          setLongPress(false);
        }
      }}>
      <View
        style={[
          {
            paddingVertical: 10,
            paddingLeft: 10,
          },
          bottomBorder && {
            borderBottomColor: commentBorderColor,
            borderBottomWidth: 1,
          },
        ]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 20,
          }}
          key={index}>
          <ProfileCard
            name={item?.team_name}
            profilePic={item?.profile_photo_small}
            postTime={getTimeElasped(item?.created_at)}
            opacity={0.8}
            user_id={item?.user_id}
          />
          {!longPress ? (
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}>
              <Pressable
                onPress={() => onSecondLevelReplyPress(item)}
                style={{ marginBottom: -15 }}>
                <Reply width={30} height={30} />
              </Pressable>

              {!item?.deleted && (
                <MemoizedClap
                  count={item?.claps}
                  additonalStyles={{
                    justifyContent: "flex-end",
                  }}
                  userLiked={item?.user_has_liked == "0" ? false : true}
                  onPress={() => onReplyLikePress(item, type)}
                />
              )}
            </View>
          ) : (
            <Pressable style={{ margin: 10 }}>
              <Delete />
            </Pressable>
          )}
        </View>
        <View style={{ marginBottom: 10, paddingRight: 8 }}>
          <HashTagText
            sentence={
              item?.deleted
                ? "This comment has been deleted"
                : item?.content || ""
            }
            fullScreenPost={true}
            commentText={true}
            fontSize={14}
            mentionedUsers={item?.comment_mentions || {}}></HashTagText>

          {!!item?.media_url && (
            <AutoHeightImage
              width={windowMaxWidth - 225}
              defaultSouce={require("../../../public/images/ImagePlaceholder.png")}
              source={{
                uri: item?.media_url,
              }}></AutoHeightImage>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const Comment = (props) => {
  const {
    content = "",
    team_name,
    profile_photo_small,
    created_at,
    claps,
    user_has_liked,
    post_id,
    id,
    currentTopicId,
    media_exists,
    media_url,
    setParentId,
    setMentionedUser = () => {},
    setDirectReplyTo = () => {},

    ...otherProps
  } = props;
  // const [play] = useSound(clapaud);

  //---------------------------------------------state management------------------------------------------//
  const [clapSt, setclapSt] = useState(null);
  const [longPress, setLongPress] = useState(false);

  //---------------------------------------------redux store management-------------------------------------//
  const dispatch = useDispatch();
  const { is_guest, id: current_user_id } = useSelector(
    (state) => state.userSlice
  );
  const { sound } = useSelector((state) => state.common);
  const { id: longPressCommentId } = useSelector(
    (state) => state.common.moreOptionsComment
  );

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const onCommentLikePress = async () => {
    try {
      if (is_guest) {
        dispatch(updateSignupFrom("clap"));
      } else {
        if (!user_has_liked) {
          if (PlatformOS !== "web") {
            clapSt?.play((success, info) => {
              if (success) {
              } else {
              }
            });
          } else {
            // play();
          }
        }
        await dispatch(
          likeCommentThunk({
            postId: post_id,
            commentId: id,
            like: user_has_liked == "0" ? true : false,
            currentTopicId: currentTopicId,
          })
        );
      }
    } catch (err) {}
  };

  const onReplyLikePress = async (comment, type) => {
    try {
      if (is_guest) {
        dispatch(updateSignupFrom("clap"));
      } else {
        if (!comment?.user_has_liked) {
          if (PlatformOS !== "web") {
            clapSt?.play((success, info) => {
              if (success) {
              } else {
              }
            });
          } else {
            play();
          }
        }
        await dispatch(
          likeCommentThunk({
            postId: comment?.post_id,
            commentId: comment?.id,
            like: comment?.user_has_liked == "0" ? true : false,
            currentTopicId: currentTopicId,
            parentCommentId: props?.id,
            type: type,
          })
        );
      }
    } catch (err) {}
  };

  const onLongPress = () => {
    if (!props?.deleted && current_user_id == props?.user_id) {
      dispatch(
        updateCommentMoreOptions({
          show: true,
          comment: { ...props, currentTopicId, isComment: true },
        })
      );
    }
  };

  const onReplyLongPress = (comment, type) => {
    if (!comment?.deleted && current_user_id == comment?.user_id) {
      dispatch(
        updateCommentMoreOptions({
          show: true,
          comment: {
            ...comment,
            currentTopicId,
            isComment: true,
            parent_id: props?.id,
            type: type,
          },
        })
      );
    }
  };

  const onReplyPress = () => {
    setParentId({
      team_name: team_name,
      id: props?.id,
    });
    setDirectReplyTo(null);
  };

  const onSecondLevelReplyPress = (comment) => {
    setParentId({
      team_name: props?.team_name,
      id: props?.id,
    });
    setDirectReplyTo({
      team_name: comment?.team_name,
      id: comment?.id,
    });
    if (current_user_id !== comment?.user_id) {
      setMentionedUser({ team_name: comment?.team_name, id: comment?.id });
    }
  };

  const onViewMorePress = (comment) => {
    dispatch(
      getCommentRepliesThunk({
        size: 10,
        post_id: post_id,
        parentId: props?.id,
        currentTopicId: currentTopicId,
        pageNo: props?.moreRepliesPageNo ? props?.moreRepliesPageNo + 1 : 1,
        currentCommentId: props?.child_comment?.child_id,
        type: "more",
      })
    );
  };

  const onViewPreviousPress = (comment) => {
    dispatch(
      getCommentRepliesThunk({
        size: 10,
        post_id: post_id,
        parentId: props?.id,
        currentTopicId: currentTopicId,
        pageNo: props?.previousRepliesPageNo
          ? props?.previousRepliesPageNo + 1
          : 1,
        currentCommentId: props?.child_comment?.child_id,
        type: "previous",
      })
    );
  };

  //--------------------------------------render ui----------------------------------------//
  return (
    <View
      style={[
        (props?.fullScreenPost || props?.reelsScreenPost) &&
          Number(props?.total_replies) &&
          props?.index != props?.commentLength - 1 && {
            borderBottomColor: commentBorderColor,
            borderBottomWidth: 1,
          },
      ]}>
      {/*--------------------Comment-------------------------*/}
      <Pressable
        style={[
          {
            paddingLeft: 8,
            marginTop: 10,
            paddingVertical: 5,
            borderBottomColor: commentBorderColor,
            borderBottomWidth: 1,
          },

          (props?.reelsScreenPost || props?.fullScreenPost) &&
            !Number(props?.total_replies) &&
            props?.index === props?.commentLength - 1 && {
              borderBottomColor: commentBorderColor,
              borderBottomWidth: 0,
            },

          longPressCommentId === id && {
            backgroundColor: darkGreen,
            borderRadius: 5,
          },
        ]}
        onLongPress={onLongPress}
        onPressIn={() => {
          if (longPress) {
            setLongPress(false);
          }
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 20,
          }}>
          <ProfileCard
            name={team_name}
            profilePic={profile_photo_small}
            postTime={getTimeElasped(created_at)}
            opacity={0.8}
            user_id={props?.user_id}
          />
          {!longPress ? (
            <View style={{ flexDirection: "row", gap: 5 }}>
              {(props.fullScreenPost || props.reelsScreenPost) && (
                <Pressable
                  onPress={() => {
                    onReplyPress();
                  }}
                  style={{ marginTop: 13, marginRight: 10 }}>
                  <Reply width={25} height={25} />
                </Pressable>
              )}

              {!props?.deleted && (
                <MemoizedClap
                  count={claps}
                  additonalStyles={{ justifyContent: "flex-end" }}
                  userLiked={user_has_liked == "0" ? false : true}
                  onPress={onCommentLikePress}
                />
              )}
            </View>
          ) : (
            <Pressable style={{ margin: 10 }}>
              <Delete />
            </Pressable>
          )}
        </View>
        <View style={{ marginBottom: 6, paddingRight: 8 }}>
          <HashTagText
            sentence={
              props?.deleted ? "This comment has been deleted" : content || ""
            }
            fullScreenPost={true}
            commentText={true}
            fontSize={14}
            mentionedUsers={otherProps?.comment_mentions || {}}></HashTagText>

          {!!media_url && (
            <AutoHeightImage
              width={windowMaxWidth - 225}
              defaultSouce={require("../../../public/images/ImagePlaceholder.png")}
              source={{
                uri: media_url,
              }}></AutoHeightImage>
          )}
        </View>
      </Pressable>

      {/*--------------------Previous Replies-------------------------*/}
      {(props?.fullScreenPost || props?.reelsScreenPost) &&
      Number(props?.child_comment?.total_previous_replies) ? (
        <View style={styles.previousReplyContainer}>
          {props?.child_comment?.total_previous_replies -
          (props?.previousReplies?.length || 0) ? (
            <Pressable
              onPress={() => {
                onViewPreviousPress();
              }}
              style={styles.previousReplyButton}>
              <MyText textAlign={"center"} pv={10} PSBold>
                View previous
                {` ${
                  props?.child_comment?.total_previous_replies -
                  (props?.previousReplies?.length || 0)
                } `}
                {props?.child_comment?.total_previous_replies -
                  (props?.previousReplies?.length || 0) >
                1
                  ? `replies`
                  : `reply`}
              </MyText>
            </Pressable>
          ) : (
            <></>
          )}

          <FlatList
            data={props?.previousReplies}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item, index }) => {
              return (
                <Replies
                  item={item}
                  type={"previous"}
                  index={index}
                  onReplyLongPress={onReplyLongPress}
                  longPress={longPress}
                  setLongPress={setLongPress}
                  onSecondLevelReplyPress={onSecondLevelReplyPress}
                  onReplyLikePress={onReplyLikePress}
                />
              );
            }}
          />
        </View>
      ) : (
        <></>
      )}

      {/*--------------------My Reply-------------------------*/}
      {(props?.fullScreenPost || props?.reelsScreenPost) && (
        <View style={styles.myReplyContainer}>
          {Number(props?.total_replies) > 0 && props?.replies?.length ? (
            <FlatList
              data={props?.replies}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={({ item, index }) => {
                return (
                  <Replies
                    item={item}
                    type={"current"}
                    index={0}
                    onReplyLongPress={onReplyLongPress}
                    longPress={longPress}
                    setLongPress={setLongPress}
                    onSecondLevelReplyPress={onSecondLevelReplyPress}
                    onReplyLikePress={onReplyLikePress}
                    bottomBorder={false}
                  />
                );
              }}
            />
          ) : (
            <></>
          )}
        </View>
      )}

      {/*--------------------More Replies-------------------------*/}
      {(props?.fullScreenPost || props?.reelsScreenPost) &&
      Number(props?.child_comment?.total_more_replies) ? (
        <View style={styles.moreReplyContainer}>
          <FlatList
            data={props?.moreReplies}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={({ item, index }) => {
              return (
                <Replies
                  item={item}
                  type={"more"}
                  index={index}
                  onReplyLongPress={onReplyLongPress}
                  longPress={longPress}
                  setLongPress={setLongPress}
                  onSecondLevelReplyPress={onSecondLevelReplyPress}
                  onReplyLikePress={onReplyLikePress}
                  bottomBorder={
                    index == props?.child_comment?.total_more_replies - 1
                      ? false
                      : true
                  }
                />
              );
            }}
          />
          {props?.child_comment?.total_more_replies -
          (props?.moreReplies?.length || 0) ? (
            <Pressable
              onPress={() => {
                onViewMorePress();
              }}>
              <MyText textAlign={"center"} pv={10} PSBold>
                View more
                {` ${
                  props?.child_comment?.total_more_replies -
                  (props?.moreReplies?.length || 0)
                } `}
                {props?.child_comment?.total_more_replies -
                  (props?.moreReplies?.length || 0) >
                1
                  ? `replies`
                  : `reply`}
              </MyText>
            </Pressable>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const PostComments = ({
  comments = [],
  postId,
  fullScreenPost,
  reelsScreenPost = false,
  noOfComments = 0,
  currentTopicId,
  commentValue,
  setCommentValue = () => {},
  setMentionText = () => {},
  setMentionedUser = () => {},
  setDirectReplyTo = () => {},
  mentionedUser = {},
  postCommentInputRef = null,
  post,
  handleFocus = () => {},
  border = "visible",
  setParentId = () => {},
}) => {
  //---------------------------------------------state management------------------------------------------//
  const [loading, setLoading] = useState(false);

  //---------------------------------------------redux store management-------------------------------------//
  const dispatch = useDispatch();
  const getCommentsLoading = useSelector(
    (state) => state.community.getCommentsLoading
  );

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const getAllComments = async () => {
    if (!loading) {
      setLoading(true);
      if (!fullScreenPost) {
        if (post?.media_type === "video") {
          // rootNavigate("Reels", "navigate", {
          //   postId: postId,
          //   currentTopicId,
          //   mediaType: post?.media_type,
          // });
        } else {
          // rootNavigate("PostFullScreen", "navigate", {
          //   postId: postId,
          //   currentTopicId,
          //   mediaType: post?.media_type,
          // });
        }
      }
      if (comments.length < noOfComments) {
        await dispatch(getComments({ postId: postId, currentTopicId }));
      }
      setLoading(false);
    }
  };

  //--------------------------------------render ui----------------------------------------//
  return (
    <View style={[styles.container, border === "hidden" && { borderWidth: 0 }]}>
      <View>
        {!fullScreenPost && !reelsScreenPost ? (
          <CommentInput
            value={commentValue}
            setValue={setCommentValue}
            postId={postId}
            currentTopicId={currentTopicId}
            setMentionText={setMentionText}
            mentionedUser={mentionedUser}
            setMentionedUser={setMentionedUser}
            postCommentInputRef={postCommentInputRef}
            handleFocus={handleFocus}
          />
        ) : (
          <View style={{ width: windowMaxWidth, height: 10 }} />
        )}
        <FlatList
          data={
            !fullScreenPost && !reelsScreenPost
              ? comments.slice(0, 2)
              : comments
          }
          keyExtractor={(item) => item?.id?.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ maxHeight: windowMaxHeight / 2 }}
          renderItem={({ item, index }) => {
            return (
              <Comment
                {...item}
                key={index}
                index={index}
                currentTopicId={currentTopicId}
                setParentId={setParentId}
                setMentionedUser={setMentionedUser}
                fullScreenPost={fullScreenPost}
                reelsScreenPost={reelsScreenPost}
                setDirectReplyTo={setDirectReplyTo}
                commentLength={comments?.length}
              />
            );
          }}
          onEndReached={() => {
            if (
              (fullScreenPost || reelsScreenPost) &&
              post?.comments_page_number < post?.comments_total_pages &&
              !getCommentsLoading
            ) {
              dispatch(
                getComments({
                  postId: postId,
                  currentTopicId,
                  page_number: post?.comments_page_number + 1,
                })
              );
            }
          }}></FlatList>
      </View>
      {((noOfComments > 2 && !fullScreenPost && !reelsScreenPost) ||
        (fullScreenPost && !loading && comments.length < noOfComments)) && (
        <Pressable
          onPress={getAllComments}
          style={{
            borderTopColor: commentBorderColor,
            borderTopWidth: 1,
          }}>
          <MyText textAlign={"center"} pv={10} PSBold>
            {loading
              ? `Loading comments...`
              : `View all ${noOfComments} comments`}
          </MyText>
        </Pressable>
      )}

      {getCommentsLoading && fullScreenPost && (
        <View style={styles.loaderContainer}>
          <LottieLoader width={50} height={50} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: postBackground[theme],
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderWidth: 1,
    borderColor: commentBorderColor,
  },
  loaderContainer: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  previousReplyContainer: {
    borderLeftWidth: 1,
    marginLeft: 50,
    borderColor: commentBorderColor,
  },
  previousReplyButton: {
    borderBottomWidth: 1,
    borderColor: commentBorderColor,
  },
  myReplyContainer: {
    borderLeftWidth: 1,
    borderColor: commentBorderColor,
    marginLeft: 50,
  },
  moreReplyContainer: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: commentBorderColor,
    marginLeft: 50,
  },
});

export default PostComments;

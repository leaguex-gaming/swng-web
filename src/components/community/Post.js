"use client";

import React, { useEffect, useState, memo, useRef } from "react";
import { View, StyleSheet, Pressable, Keyboard } from "react-native-web";
import ProfileCard from "./ProfileCard";
import FollowIcon from "../../../public/svg/community/FollowIcon";
import MyText from "../common/MyText";
import {
  commentBorderColor,
  postBackground,
  theme,
} from "@/constants/theme/colors";
import PostOptions from "./PostOptions";
import PostComments from "./PostComments";
import { getTimeElasped } from "@/utils/helpers/timeElapsed";
import CommunityVideoPlayer from "./CommunityVideoPlayer";
import { likePostThunk, usersFollow } from "@/store/thunks/community";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePostMoreOptions,
  updateSignupFrom,
  updateUserClappedPost,
} from "@/store/slices/common-slice";
import HashTagText from "./HashTagText";
import { windowMaxWidth } from "@/constants/DeviceData";
import AutoHeightImage from "@/utils/CustomImage/AutoHeightImage";
import Hamburger from "../../../public/svg/community/Hamburger";
import { LottieView } from "../common/LottieLoader";
import { throttle } from "lodash";
import DoubleTapHandler from "./DoubleTapHandler";
// import MentionModal from "./MentionModal";
import useSound from "use-sound";
import { useRouter } from "next/navigation";
// import clapaud from "../../../public/audio/clapaud.mp3";

const FollowsTag = ({ follwedby }) => {
  if (follwedby.name) {
    return (
      <View style={styles.followedbyContainer}>
        <View style={styles.followedByInnerContainer}>
          <MyText fontSize={12}>
            {`${follwedby.name} and ${follwedby.totalFollowers} others follow`}
          </MyText>
        </View>
      </View>
    );
  }
};

const Post = (props) => {
  const {
    //backend data
    comments = [],
    content,
    id,
    name,
    profile_photo_small,
    team_name,
    user_id,
    topic,

    //postType
    fullScreenPost = false,
    myPostScreen = false,

    //index

    follwedby = {},
    profile = {
      name: "AK10",
      profilePic:
        "https://s3-ap-southeast-1.amazonaws.com/testleaguex/avatars/thumb_B6D20D656A2F4005B7D2E3B2FD3DE62E_1683105828529.jpg",
    },
    setSignUpFrom = () => {},
    userLiked = false,
    likeCount = 0,
    currentIndex,
    subtopic,
    followed_by_user,
    owned_by_user,
    currentTopicId = 0,
    number_of_comments = 0,
    // onHamburgerClick = () => {},
    loading = false,
    marginTop = 0,
    commentInputRef = null,
    ...otherProps
  } = props;
  // const [play] = useSound(clapaud);
  const router = useRouter();

  //---------------------------------------------state management------------------------------------------//
  const [clapSt, setclapSt] = useState(null);
  const [commentValue, setCommentValue] = useState("");
  const [mentionText, setMentionText] = useState("");
  const [mentionedUser, setMentionedUser] = useState({});
  const [keyboardShown, setKeyboardShown] = useState(false);
  const [showComments, setShowComments] = useState(
    fullScreenPost ? true : false
  );
  const [focusedInput, setFocusedInput] = useState(null);

  //--------------------------------------------------refs---------------------------------------------------//
  const postCommentInputRef = useRef(null);

  //---------------------------------------------redux store management-------------------------------------//
  const dispatch = useDispatch();
  const { sound } = useSelector((state) => state.common);
  const { userProfile, usersFollowId, usersFollowLoading } = useSelector(
    (state) => state.community
  );
  const { is_guest } = useSelector((state) => state.userSlice);

  //--------------------------------------------------hook effects--------------------------------------------//
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShown(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (!keyboardShown) {
      postCommentInputRef?.current?.blur();
    }
  }, [keyboardShown]);

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const viewPost = throttle(async () => {
    console.log("called");
    // if (route.name === "PostFullScreen") return;
    if (props?.media_type === "video") {
      //   rootNavigate("Reels", "navigate", {
      //     postId: id,
      //     currentTopicId,
      //     mediaType: props?.media_type,
      //   });
    } else {
      router.push(`/post/${id}`);
    }
    setShowComments(false);
  }, 400);

  const onUserFollow = () => {
    if (is_guest) {
      dispatch(updateSignupFrom("default"));
    } else {
      if (userProfile[`uid_${user_id}`] !== undefined) {
        let controller = new AbortController();

        dispatch(
          usersFollow({
            userPic: profile_photo_small,
            userName: team_name || name,
            userId: user_id,
            action: "ADD",
            controller,
          })
        );
      } else {
        let controller = new AbortController();

        dispatch(
          usersFollow({
            userPic: profile_photo_small,
            userName: team_name || name,
            userId: user_id,
            action: "ADD",
            controller,
            createUserProfile: true,
          })
        );
      }
    }
  };

  const postClapAction = () => {
    if (!props.user_has_liked) {
      if (currentTopicId === 0) {
        dispatch(updateUserClappedPost(true));
      }

      // play();
    }
    dispatch(
      likePostThunk({
        postId: id,
        like: !props.user_has_liked,
        currentTopicId: currentTopicId,
      })
    );
  };

  const onHamburgerClick = () => {
    try {
      dispatch(
        updatePostMoreOptions({
          show: true,
          post: {
            ...props,
            commentInputRef: null,
            fullScreenPost: fullScreenPost,
            onHamburgerClick: null,
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const selectUser = (user) => {
    // Replace the mentionText with the selected user in the input field
    const newValue = commentValue.replace(
      `@${mentionText}`,
      `@${user.team_name} `
    );

    if (!mentionedUser) {
      setMentionedUser({ [user.team_name]: user.id });
    } else {
      const newMentionedUser = { ...mentionedUser, [user.team_name]: user.id };
      setMentionedUser(newMentionedUser);
    }
    setCommentValue(newValue);

    setMentionText("");
  };

  const handleFocus = (inputRef) => {
    setFocusedInput(inputRef);
  };

  //--------------------------------------render ui----------------------------------------//
  return (
    <View style={[styles.container, { marginTop: marginTop }]}>
      <View style={styles.header}>
        <ProfileCard
          profilePic={profile_photo_small}
          name={team_name}
          postTime={getTimeElasped(props.created_at)}
          user_id={user_id}
          tags={subtopic}
          sport={topic}
          topic_id={topic?.id}
        />

        <View style={styles.infoContainer}>
          {!(followed_by_user || owned_by_user || myPostScreen) && (
            <>
              {usersFollowLoading && user_id === usersFollowId ? (
                <View style={styles.loading}>
                  {/* <LottieView
                    style={styles.lottieContainer}
                    source={require("../../../public/lottie/mini_loader.json")}
                    autoPlay={true}
                    loop={true}
                    resizeMode="cover"
                  /> */}
                </View>
              ) : (
                <Pressable onPress={() => onUserFollow()}>
                  <FollowIcon />
                </Pressable>
              )}
            </>
          )}
          <Pressable
            onPress={() => {
              onHamburgerClick(id);
            }}
            style={styles.hamburgerIcon}>
            <Hamburger />
          </Pressable>
          {/* ------------For debug----------------- */}
          {/* <MyText>{id}</MyText> */}
        </View>
      </View>
      <View>
        {content && (
          <View style={styles.textContentContainer}>
            <View>
              <DoubleTapHandler
                singleTapAction={viewPost}
                doubleTapAction={postClapAction}>
                <HashTagText
                  viewPost={viewPost}
                  sentence={content}
                  fullScreenPost={fullScreenPost}
                  mentionedUsers={props?.post_mentions}></HashTagText>
              </DoubleTapHandler>
            </View>
          </View>
        )}
        {!!props.media_url && <FollowsTag follwedby={follwedby} />}
        {!!props.media_url && (
          <View style={styles.mediaContentContainer}>
            {props.media_type !== "video" && (
              <DoubleTapHandler
                singleTapAction={viewPost}
                doubleTapAction={postClapAction}>
                <AutoHeightImage
                  width={windowMaxWidth - 20}
                  maxHeight={600}
                  source={{
                    uri: props?.media_url || props?.compressed_image_url,
                    // cache: FastImage.cacheControl.cacheOnly,
                  }}></AutoHeightImage>
              </DoubleTapHandler>
            )}
            {props?.media_type === "video" && (
              <CommunityVideoPlayer
                poster={props?.media_thumbnail_url || ""}
                uri={props?.media_url}
                currentIndex={currentIndex}
                fullScreenPost={fullScreenPost}
                onPress={viewPost}
                postClapAction={postClapAction}
                postId={id}
                currentTopicId={currentTopicId}
                mediaType={props?.media_type}
              />
            )}
          </View>
        )}

        <View style={[styles.textContentWrapper]}>
          <PostOptions
            content={content}
            post={props}
            setShowComments={setShowComments}
            currentTopicId={currentTopicId}
            loading={loading}
            postClapAction={postClapAction}
            commentInputRef={commentInputRef}
            fullScreenPost={fullScreenPost}
          />
        </View>
      </View>

      {!fullScreenPost ? (
        <View style={[styles.commentsContainer]}>
          {showComments && (
            <>
              <PostComments
                comments={comments}
                noOfComments={props.number_of_comments}
                postId={id}
                setMentionText={setMentionText}
                setMentionedUser={setMentionedUser}
                mentionedUser={mentionedUser}
                fullScreenPost={fullScreenPost}
                currentTopicId={currentTopicId}
                setCommentValue={setCommentValue}
                commentValue={commentValue}
                postCommentInputRef={postCommentInputRef}
                handleFocus={handleFocus}
                post={props}
              />
              {/* {!fullScreenPost && showComments && focusedInput && (
                <MentionModal
                  search={mentionText}
                  onUserPress={selectUser}
                  style={{ top: 60 }}></MentionModal>
              )} */}
            </>
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: windowMaxWidth,
    alignSelf: "center",
  },
  header: {
    backgroundColor: postBackground[theme],
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    marginHorizontal: 15,
    borderColor: commentBorderColor,
    borderWidth: 1,
  },
  infoContainer: { flexDirection: "row", alignItems: "center" },
  mediaContentContainer: {
    marginHorizontal: 10,
  },
  textContentWrapper: {
    marginHorizontal: 15,
    bottom: 0,
  },
  hamburgerIcon: {
    width: 30,
    alignItems: "center",
    marginLeft: 10,
  },
  textContentContainer: {
    backgroundColor: postBackground[theme],
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginRight: 15,
    marginLeft: 15,
  },
  commentsContainer: {
    marginLeft: 22,
    marginRight: 15,
    bottom: 12,
    zIndex: 2,
    marginTop: 10,
  },
  loading: {
    flexDirection: "row",
    gap: 5,
  },
  lottieContainer: {
    width: 100,
    height: 30,
    marginRight: -20,
  },
  followedbyContainer: {
    marginHorizontal: 14,
    alignItems: "flex-start",
    flex: 1,
  },
  followedByInnerContainer: {
    backgroundColor: commentBorderColor,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});

export default memo(Post);

import React, { memo, useEffect, useRef, useState, useMemo } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Share as RNShare,
  Pressable,
} from "react-native-web";
import {
  commentBorderColor,
  postBackground,
  theme,
} from "@/constants/theme/colors";
import ClapIcon from "../../../public/svg/community/ClapIcon";
import MyText from "../common/MyText";
import CommentIcon from "../../../public/svg/community/CommentIcon";
import ShareIcon from "../../../public/svg/community/ShareIcon";
import MedalIcon from "../../../public/svg/community/MedalIcon";
import { useDispatch, useSelector } from "react-redux";
import { updateSignupFrom } from "@/store/slices/common-slice";
import { LottieView } from "../common/LottieLoader";
import useSound from "use-sound";
// import clapaud from "../../assets/audio/clapaud.mp3";
import {
  DEEPLINK_NORMAL_POST_URL,
  DEEPLINK_REELS_URL,
} from "@/constants/StaticData";
import AnalyticsIcon from "../../../public/svg/community/AnalyticsIcon";
import { getPostScore } from "@/utils/helpers/getPostScore";
// import { logEvent } from "../../utils/events";
import { ShareToSocial } from "../../utils/helpers/ShareToSocial";
import Image from "next/image";
import ClappingHands from "../../../public/images/clapping-hands.png";
const opacity = 0.5;

const ClapLottie = ({ lottieRef }) => {
  return (
    // <LottieView
    //   source={require("../../../public/lottie/clap.json")}
    //   style={{ width: 35, height: 35 }}
    //   autoPlay={true}
    //   lottieRef={lottieRef}
    // />
    <Image width={50} height={50} src={ClappingHands} />
  );
};

const Clap = ({
  count,
  type = "clap",
  onPress = () => {},
  userLiked = false,
  additonalStyles = {},
  loading,
  opacity = 0.5,
  style = {},
  iconSize = 22,
  fontSize = 15,
  iconStyle = {},
}) => {
  const clapLottieRef = useRef(null);

  return (
    <Pressable
      style={[styles.iconContainer, additonalStyles, style]}
      onPress={() => {
        onPress(type);
      }}>
      <View style={{ width: !userLiked ? 25 : 35 }}>
        {!userLiked ? (
          <ClapIcon
            opacity={opacity}
            width={iconSize}
            height={iconSize}
            style={iconStyle}
          />
        ) : (
          <View style={{ marginTop: -5 }}>
            <ClapLottie lottieRef={clapLottieRef} userLiked={userLiked} />
          </View>
        )}
      </View>

      {loading ? (
        // <LottieView
        //   style={styles.lottieContainer}
        //   source={require("../../../public/lottie/mini_loader.json")}
        //   autoPlay={true}
        //   loop={true}
        // />
        <ClapLottie />
      ) : (
        <MyText fontSize={fontSize} opacity={opacity}>
          {count}
        </MyText>
      )}
    </Pressable>
  );
};

export const MemoizedClap = memo(Clap);

export const Comment = ({
  count,
  type = "comment",
  onPress = () => {},
  loading,
  opacity = 0.5,
  style = {},
  iconSize = 22,
  fontSize = 15,
}) => {
  return (
    <TouchableOpacity
      style={[styles.iconContainer, style]}
      onPress={() => onPress(type)}>
      <CommentIcon opacity={opacity} width={iconSize} height={iconSize} />

      {loading ? (
        // <LottieView
        //   style={styles.lottieContainer}
        //   source={require("../../../public/lottie/mini_loader.json")}
        //   autoPlay={true}
        //   loop={true}
        // />
        <></>
      ) : (
        <MyText ml={4} fontSize={fontSize} opacity={opacity}>
          {count}
        </MyText>
      )}
    </TouchableOpacity>
  );
};

export const Share = ({
  count,
  type = "share",
  onPress = () => {},
  opacity = 0.5,
  style = {},
  iconSize = 22,
  fontSize = 15,
}) => {
  return (
    <TouchableOpacity
      style={[styles.iconContainer, style]}
      onPress={() => onPress(type)}>
      <ShareIcon opacity={opacity} width={iconSize} height={iconSize} />
      <MyText ml={4} fontSize={fontSize} opacity={opacity}>
        {count}
      </MyText>
    </TouchableOpacity>
  );
};

export const Medal = ({ count, type = "analytics", onPress = () => {} }) => {
  return (
    <TouchableOpacity
      style={[styles.iconContainer, styles.medalContainer]}
      onPress={() => onPress(type)}>
      <AnalyticsIcon opacity={opacity} />
      <MyText ml={4} fontSize={12} opacity={opacity}>
        {count ? count : "0"}
      </MyText>
    </TouchableOpacity>
  );
};

const PostOptions = ({
  content,
  post,
  setShowComments,
  currentTopicId,
  loading,
  postClapAction = () => {},
  commentInputRef = null,
  fullScreenPost = false,
}) => {
  const { claps = 0, user_has_liked, id, number_of_comments } = post;

  const dispatch = useDispatch();
  const { is_guest, userId } = useSelector((state) => state.userSlice);

  const optionsOnPress = async (type) => {
    try {
      const isGuest = is_guest;
      if (isGuest && type !== "share") {
        dispatch(updateSignupFrom(type));
      } else {
        if (type === "clap") {
          postClapAction();
        } else if (type === "comment") {
          if (
            post?.comments?.every(
              (comment) => comment?.deleted && !fullScreenPost
            )
          ) {
            if (post?.media_type === "video") {
              if (post?.media_type === "video") {
                // rootNavigate("Reels", "navigate", {
                //   postId: post?.id,
                //   currentTopicId,
                //   mediaType: post?.media_type,
                // });
              } else {
                // rootNavigate("PostFullScreen", "navigate", {
                //   postId: post?.id,
                //   currentTopicId,
                //   mediaType: post?.media_type,
                // });
              }
            }
          } else {
            setShowComments((prev) => !prev);
            commentInputRef?.current?.blur();
            setTimeout(() => {
              commentInputRef?.current?.focus();
            }, 100);
          }
        } else if (type === "share") {
          const postId = post.user_id === userId ? null : id;
          // logEvent("share_post", { postId: id, postType: post?.media_type });
          if (post?.media_type === "video") {
            const deep_link_url = `${DEEPLINK_REELS_URL}?postId=${id}&mediaType=${post?.media_type}`;
            ShareToSocial(
              post?.media_thumbnail_url || "",
              post?.content,
              deep_link_url,
              postId,
              currentTopicId,
              dispatch
            );
          } else if (post?.media_type === "image") {
            const deep_link_url = `${DEEPLINK_NORMAL_POST_URL}?postId=${id}&mediaType=${post?.media_type}`;
            ShareToSocial(
              post?.media_url,
              post?.content,
              deep_link_url,
              postId,
              currentTopicId,
              dispatch
            );
          } else {
            const deep_link_url = `${DEEPLINK_NORMAL_POST_URL}?postId=${id}&mediaType=${post?.media_type}`;
            ShareToSocial(
              "",
              post?.content,
              deep_link_url,
              postId,
              currentTopicId,
              dispatch
            );
          }
        } else if (type === "analytics") {
          // rootNavigate("PostAnalytics", "navigate", { post: post });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const postScore = getPostScore(post);

  return (
    <View style={[styles.container]}>
      <View style={{ flex: 1 }}>
        <MemoizedClap
          count={claps}
          onPress={(type) => optionsOnPress(type)}
          userLiked={user_has_liked}
          loading={loading}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Comment
          count={number_of_comments}
          onPress={(type) => optionsOnPress(type)}
          loading={loading}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Share onPress={(type) => optionsOnPress(type)} />
      </View>

      <Medal onPress={(type) => optionsOnPress(type)} count={postScore} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 20,
    height: 56,
    paddingVertical: 10,
    justifyContent: "space-between",
    backgroundColor: postBackground[theme],
    alignItems: "center",
    borderColor: commentBorderColor,
    borderWidth: 1,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  medalContainer: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingRight: 6,
    paddingLeft: 16,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  lottieContainer: {
    width: 50,
    height: 50,
    marginLeft: -12.5,
    marginTop: 5,
  },
});

export default memo(PostOptions);

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePostMoreOptions,
  updateSignupFrom,
} from "@/store/slices/common-slice";
import { usersFollow } from "@/store/thunks/community";
import { ShareToSocial } from "@/utils/helpers/ShareToSocial";
import { Pressable, View, StyleSheet } from "react-native-web";
import {
  Comment,
  MemoizedClap,
  Share,
} from "@/components/community/PostOptions";
import { LottieView } from "@/components/common/LottieLoader";
import FollowIcon from "../../../../public/svg/community/FollowIcon";
import { windowWidth } from "@/constants/DeviceData";
import Hamburger from "../../../../public/svg/community/Hamburger";
import {
  DEEPLINK_NORMAL_POST_URL,
  DEEPLINK_REELS_URL,
} from "@/constants/StaticData";

const ReelsOptions = ({
  post = null,
  postClapAction = () => {},
  loading = false,
  modalizeRef = null,
  currentTopicId,
  setviewablePost,
}) => {
  //---------------------------------------------redux store management-------------------------------------//
  const dispatch = useDispatch();
  const { is_guest, id: userId } = useSelector((state) => state.userSlice);
  const { userProfile, usersFollowId, usersFollowLoading } = useSelector(
    (state) => state.community
  );

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const onHamburgerClick = () => {
    try {
      if (is_guest) {
        dispatch(updateSignupFrom("default"));
      } else {
        dispatch(
          updatePostMoreOptions({
            show: true,
            post: {
              ...post,
              commentInputRef: null,
              fullScreenPost: true,
              onHamburgerClick: null,
            },
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onUserFollow = () => {
    if (is_guest) {
      dispatch(updateSignupFrom("default"));
    } else {
      if (userProfile[`uid_${post?.user_id}`] !== undefined) {
        let controller = new AbortController();

        dispatch(
          usersFollow({
            userPic: post?.profile_photo_small,
            userName: post?.team_name,
            userId: post?.user_id,
            action: "ADD",
            controller,
          })
        );
      } else {
        let controller = new AbortController();

        dispatch(
          usersFollow({
            userPic: post?.profile_photo_small,
            userName: post?.team_name,
            userId: post?.user_id,
            action: "ADD",
            controller,
            createUserProfile: true,
          })
        );
      }
    }
  };

  const optionsOnPress = async (type, post) => {
    setviewablePost(post);
    const isGuest = is_guest;
    if (isGuest && type !== "share") {
      dispatch(updateSignupFrom(type));
    } else {
      if (type === "clap") {
        postClapAction(post);
      } else if (type === "comment") {
        // setShowComments(prev => !prev);
        // commentInputRef?.current?.blur();
        // setTimeout(() => {
        //   commentInputRef?.current?.focus();
        // }, 100);

        modalizeRef?.current?.open();
      } else if (type === "share") {
        try {
          const postId = post.user_id === userId ? null : post?.id;

          if (post?.media_type === "video") {
            const deep_link_url = `${DEEPLINK_REELS_URL}?postId=${post?.id}&mediaType=${post?.media_type}`;

            ShareToSocial(
              post?.media_thumbnail_url || "",
              post?.content,
              deep_link_url,
              post?.id,
              currentTopicId,
              dispatch
            );
          } else if (post?.media_type === "image") {
            const deep_link_url = `${DEEPLINK_NORMAL_POST_URL}?postId=${post?.id}&mediaType=${post?.media_type}`;
            ShareToSocial(
              post?.media_url,
              post?.content,
              deep_link_url,
              post?.id,
              currentTopicId,
              dispatch
            );
          } else {
            const deep_link_url = `${DEEPLINK_NORMAL_POST_URL}?postId=${post?.id}&mediaType=${post?.media_type}`;
            ShareToSocial(
              "",
              post?.content,
              deep_link_url,
              post?.id,
              currentTopicId,
              dispatch
            );
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  //--------------------------------------render ui----------------------------------------//
  return (
    <View
      style={[
        styles.postOptions,
        post?.content?.length < 40 && { bottom: 75 },
        post?.content?.length == 0 && { bottom: 35 },
      ]}>
      <View style={styles.flex}>
        <MemoizedClap
          count={post?.claps}
          onPress={(type) => optionsOnPress(type, post)}
          userLiked={post?.user_has_liked}
          loading={loading}
          opacity={1}
          style={styles.iconStyle}
          iconSize={30}
          fontSize={15}
          iconStyle={{ right: 5 }}
        />
      </View>
      <View style={styles.flex}>
        <Comment
          count={post?.number_of_comments}
          onPress={(type) => optionsOnPress(type, post)}
          loading={loading}
          opacity={1}
          style={styles.iconStyle}
          iconSize={30}
          fontSize={15}
        />
      </View>
      <View style={styles.flex}>
        <Share
          onPress={(type) => optionsOnPress(type, post)}
          opacity={1}
          style={styles.iconStyle}
          iconSize={30}
          fontSize={15}
        />
      </View>

      <View style={styles.moreOptions}>
        {!(post?.followed_by_user || post?.owned_by_user) && (
          <>
            {usersFollowLoading && post?.user_id === usersFollowId ? (
              <View style={styles.loading}>
                <LottieView
                  style={styles.lottieContainer}
                  source={require("../../../../public/lottie/mini_loader.json")}
                  autoPlay={true}
                  loop={true}
                  resizeMode="cover"
                />
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
            onHamburgerClick(post?.id);
          }}>
          <Hamburger width={20} height={20} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postOptions: {
    position: "absolute",
    right: 10,
    gap: 10,
    flexDirection: "column",
    alignItems: "flex-end",
    bottom: 75,
    width: windowWidth,
    alignSelf: "center",
  },
  flex: {
    flex: 1,
  },
  iconStyle: {
    flexDirection: "column",
    gap: 10,
  },
  moreOptions: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 7,
    gap: 15,
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
  hamburgerContainer: {
    width: 30,
    alignItems: "center",
  },
});

export default ReelsOptions;

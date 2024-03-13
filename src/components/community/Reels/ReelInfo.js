import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native-web";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  getPostById,
  likePostThunk,
} from "@/store/thunks/community";
import { updateUserClappedPost } from "@/store/slices/common-slice";
import CommunityVideoPlayer from "@/components/community/CommunityVideoPlayer";
import ProfileCard from "../ProfileCard";
import { getTimeElasped } from "@/utils/helpers/timeElapsed";
import DoubleTapHandler from "@/components/community/DoubleTapHandler";
import HashTagText from "@/components/community/HashTagText";
import { windowMaxHeight, windowMaxWidth } from "@/constants/DeviceData";
import ReelsOptions from "./ReelsOptions";
// import clapaud from "../../../assets/audio/clapaud.mp3";
// import useSound from "use-sound";

const ReelInfo = ({
  postId,
  currentTopicId,
  setviewablePost,
  modalizeRef,
  index,
  postOnScreen,
}) => {
  // const [play] = useSound(clapaud);

  //---------------------------------------------state management------------------------------------------//
  const [loading, setLoading] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [clapSt, setclapSt] = useState(null);

  //---------------------------------------------redux store management-------------------------------------//
  const dispatch = useDispatch();
  const post = useSelector((state) => {
    return state.community.posts[currentTopicId]?.posts?.find(
      (p) => p.id === Number(postId)
    );
  });
  const { sound } = useSelector((state) => state.common);
  const { deviceVisibleHeight } = useSelector((state) => {
    return state.common;
  });

  //--------------------------------------------------hook effects--------------------------------------------//
  useEffect(() => {
    if (!post) {
      getPostByIdfunc();
    }
  }, [postId]);

  useEffect(() => {
    getPostComments();
  }, [postId]);

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const getPostComments = async () => {
    if (post?.comments?.length < post?.number_of_comments) {
      await dispatch(
        getComments({ postId: postId, currentTopicId: currentTopicId })
      );
    }
  };

  const getPostByIdfunc = async () => {
    setLoading(true);
    const res = await dispatch(
      getPostById({ post_id: postId, currentTopicId: currentTopicId })
    );
    getPostComments(res?.payload?.posts || {});
    setLoading(false);
  };

  const postClapAction = () => {
    if (!post.user_has_liked) {
      if (currentTopicId === 0) {
        dispatch(updateUserClappedPost(true));
      }

      // play();
    }
    dispatch(
      likePostThunk({
        postId: post?.id,
        like: !post?.user_has_liked,
        currentTopicId: currentTopicId,
      })
    );
  };

  //--------------------------------------render ui----------------------------------------//
  return (
    <View
      style={[
        styles.reelContainer,
        {
          height: windowMaxHeight,
        },
      ]}>
      <View style={styles.videoContainer}>
        <CommunityVideoPlayer
          poster={post?.media_thumbnail_url || ""}
          uri={post?.media_url}
          currentIndex={0}
          fullScreenPost={false}
          reelsScreen={true}
          onPress={() => {}}
          postClapAction={postClapAction}
          postId={post?.id}
          currentTopicId={currentTopicId}
          mutedIcon="top"
          fullWidth={true}
          postOnScreen={postOnScreen}
        />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileInnerContainer}>
          <View style={styles.header}>
            <ProfileCard
              profilePic={post?.profile_photo_small}
              name={post?.team_name}
              postTime={getTimeElasped(post?.created_at)}
              user_id={post?.user_id}
              tags={post?.subtopic}
              sport={post?.topic}
              topic_id={post?.topic?.id}
            />
          </View>

          {post?.content && (
            <View style={styles.textContentContainer}>
              <View>
                <DoubleTapHandler
                  singleTapAction={() => {
                    setReadMore(true);
                  }}
                  doubleTapAction={() => postClapAction(post)}>
                  <HashTagText
                    viewPost={() => {
                      setReadMore(true);
                    }}
                    sentence={post?.content}
                    fullScreenPost={readMore}
                    mentionedUsers={post?.post_mentions}
                    maxLength={40}></HashTagText>
                </DoubleTapHandler>
              </View>
            </View>
          )}
        </View>

        <ReelsOptions
          post={post}
          postClapAction={postClapAction}
          loading={loading}
          modalizeRef={modalizeRef}
          currentTopicId={currentTopicId}
          getPostComments={getPostComments}
          setviewablePost={setviewablePost}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    width: windowMaxWidth,
    alignSelf: "center",
  },
  profileInnerContainer: {
    position: "absolute",
    bottom: 10,
  },
  listContainer: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    gap: 8,
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 8,
    flexDirection: "row",
  },
  videoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    width: "100%",
  },
  loading: {
    flexDirection: "row",
    gap: 5,
  },
  textContentContainer: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginRight: 80,
    marginLeft: 15,
  },
  reelContainer: {
    width: windowMaxWidth,
    alignSelf: "center",
    overflow: "hidden",
  },
});

export default ReelInfo;

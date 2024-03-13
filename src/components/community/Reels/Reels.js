"use client";

import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native-web";
import { black } from "@/constants/theme/colors";
import { useDispatch, useSelector } from "react-redux";
import InBuiltNavigation from "@/components/common/InBuiltNavigation";
import { getPostById, getRecommendedReels } from "@/store/thunks/community";
// import { SwiperFlatList } from "react-native-swiper-flatlist";
import { updateReelsPosts } from "@/store/slices/community-slice";
// import CommentModalize from "@/components/Modalize/CommentModalize";
import ReelInfo from "./ReelInfo";
import { windowMaxWidth } from "@/constants/DeviceData";
import CommentModalize from "@/components/modals/CommentModalize";

const Reels = ({ postId, currentTopicId = 0 }) => {
  //--------------------------------------------------refs---------------------------------------------------//
  const modalizeRef = useRef(null);

  //---------------------------------------------state management------------------------------------------//
  const [viewablePost, setviewablePost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);

  //---------------------------------------------redux store management-------------------------------------//
  const dispatch = useDispatch();
  const { deviceVisibleHeight } = useSelector((state) => {
    return state.common;
  });
  const filteredPost = useSelector((state) => {
    return state.community.posts[currentTopicId]?.posts?.find(
      (p) => p.id === Number(postId)
    );
  });
  const recommendedPosts = useSelector((state) => {
    return state.community.posts[`reels_${postId}`]?.posts;
  });
  const reelsDetails = useSelector((state) => {
    return state.community.posts[`reels_${postId}`];
  });

  //--------------------------------------------------hook effects--------------------------------------------//
  useEffect(() => {
    const apiCall = async () => {
      if (!recommendedPosts?.length) {
        if (filteredPost) {
          setLoading(true);
          const reelsInitialData = {
            data: [filteredPost],
            subtopic_id: `reels_${postId}`,
          };
          await dispatch(updateReelsPosts(reelsInitialData));
          await dispatch(
            getRecommendedReels({
              currentTopicId: `reels_${postId}`,
            })
          );
          setLoading(false);
        } else {
          await getPostByIdfunc();
          setLoading(true);
          const reelsInitialData = {
            data: [filteredPost],
            subtopic_id: `reels_${postId}`,
          };
          await dispatch(updateReelsPosts(reelsInitialData));
          await dispatch(
            getRecommendedReels({
              currentTopicId: `reels_${postId}`,
            })
          );
          setviewablePost(0);
          setLoading(false);
        }
      }
    };
    apiCall();
  }, [postId, filteredPost]);

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const getPostByIdfunc = async () => {
    setLoading(true);
    const res = await dispatch(
      getPostById({ post_id: postId, currentTopicId: currentTopicId })
    );
    setLoading(false);
  };

  const onEndReached = async () => {
    if (reelsDetails?.page_number < reelsDetails?.total_pages) {
      await dispatch(
        getRecommendedReels({
          pageNumber: reelsDetails?.page_number + 1,
          currentTopicId: `reels_${postId}`,
        })
      );
    }
  };

  //--------------------------------------render ui----------------------------------------//
  return (
    <View style={styles.container}>
      <InBuiltNavigation back={true} rightNav="" />

      {!loading && recommendedPosts?.length && (
        // <SwiperFlatList
        //   vertical={true}
        //   data={recommendedPosts}
        //   onEndReached={onEndReached}
        //   onChangeIndex={({ index, prevIndex }) => setVisibleIndex(index)}
        //   renderItem={({ item, index }) => (
        <ReelInfo
          // key={index}
          // index={index}
          // postId={item?.id}
          postId={recommendedPosts[0]?.id}
          currentTopicId={`reels_${postId}`}
          setviewablePost={setviewablePost}
          modalizeRef={modalizeRef}
          postOnScreen={recommendedPosts[visibleIndex]?.id}
        />
        //   )}
        //   keyExtractor={(item) => item.id}
        //   removeClippedSubviews={true}
        // />
      )}

      {/* {!loading && recommendedPosts?.length && (
        <CommentModalize
          modalizeRef={modalizeRef}
          // post={viewablePost}
          postId={recommendedPosts[0]?.id}
          loading={loading}
          currentTopicId={`reels_${postId}`}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowMaxWidth,
    alignSelf: "center",
    backgroundColor: black,
  },
});

export default Reels;

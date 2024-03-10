"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native-web";
import MyText from "@/components/common/MyText";
// import Post from "../components/community/Post";
// import Tag from "../components/community/Tag";
import { useDispatch, useSelector } from "react-redux";
import {
  getPostsByTopicThunk,
  getPostsThunk,
  getTopics,
  updateViewedPostThunk,
  viewPostsAnalyticsThunk,
} from "@/store/thunks/community";
// import CreatePostIcon from "../assets/SvgComponent/community/CreatePostIcon";
import {
  setCurrentVisibleIndex,
  updateDeviceVisibleHeight,
  updateScrollToTopTL,
  updateSignupFrom,
} from "@/store/slices/common-slice";
import { getProfile } from "@/store/thunks/user";
import CommunityHeader from "@/components/community/CommunityHeader";
import LottieLoader from "@/components/common/LottieLoader";
import { checkFCMToken } from "@/store/thunks/authentication";
import { requestNoficationPermission } from "@/utils/services/notifications";
import { windowMaxHeight, windowMaxWidth } from "@/constants/DeviceData";
import { debounce } from "lodash";
// import { getMatchesThunk } from "../redux/thunks/broadcast";
import { black } from "@/constants/theme/colors";
import Post from "@/components/community/Post";
// import SuggestedProfiles from "@/components/community/SuggestedProfiles";

const Feed = () => {
  //---------------------------------------------state management------------------------------------------//
  const [refreshing, setRefreshing] = useState(false);
  const [currentTopicObj, setCurrentTopic] = useState({
    name: "trending",
    subtopic_id: 0,
    topic_id: 0,
  });
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [deviceVisibleHeight, setDeviceVisibleHeight] = useState(0);

  //---------------------------------------------redux store management-------------------------------------//
  const dispatch = useDispatch();
  const { posts, getPostsThunkLoading, createPostLoading } = useSelector(
    (state) => state.community
  );
  const { is_guest, user_id } = useSelector((state) => state.userSlice);
  const { pushNotification, scrollToTopTL, currentRoute } = useSelector(
    (state) => state.common
  );

  const currentTopicId = currentTopicObj.subtopic_id;
  const currentSportId = currentTopicObj.topic_id;
  const totalPostsPages = posts[currentTopicId]?.total_pages;

  //--------------------------------------------------refs---------------------------------------------------//
  const isHeaderVisibleRef = useRef(true);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });
  const flatlistRef = useRef(null);

  //--------------------------------------------------hook effects--------------------------------------------//
  useEffect(() => {
    dispatch(
      getPostsThunk({
        page_number: 1,
      })
    );
    dispatch(getTopics());
    dispatch(getProfile());
    // dispatch(getMatchesThunk());
  }, []);

  useEffect(() => {
    if (scrollToTopTL) {
      flatlistRef?.current?.scrollToOffset({ animated: true, offset: 0 });
      dispatch(updateScrollToTopTL(false));
    }
  }, [scrollToTopTL]);

  useEffect(() => {
    requestNoficationPermission();
    if (pushNotification) {
      checkFCMToken();
    }

    return () => {
      dispatch(updateSignupFrom(""));
    };
  }, []);

  useEffect(() => {
    dispatch(updateDeviceVisibleHeight(deviceVisibleHeight));
  }, [deviceVisibleHeight]);

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const onRefresh = async () => {
    if (posts?.[currentTopicId]?.posts?.length) {
      setRefreshing(true);
      if (currentTopicId) {
        // await dispatch(
        //   getPostsByTopicThunk({
        //     page_number: 1,
        //     subtopic_id: currentTopicObj.subtopic_id,
        //     topic_id: currentTopicObj.topic_id,
        //   }),
        // );
      } else {
        await dispatch(
          getPostsThunk({
            page_number: 1,
          })
        );
      }
      setRefreshing(false);
    }
  };

  /**
   * The function `onTagChange` filters and updates the posts state, and sets
   * the current topic state based on the selected tag.
   */
  const onTagChange = (item) => {
    const { subtopic_id, topic_id, subtopic_name } = item;
    // if (!posts?.[subtopic_id]?.posts?.length) {
    flatlistRef?.current?.scrollToOffset({ animated: true, offset: 0 });
    if (subtopic_id) {
      // dispatch(
      //   getPostsByTopicThunk({
      //     page_number: 1,
      //     subtopic_id: subtopic_id,
      //     topic_id: topic_id,
      //   }),
      // );
    } else {
      dispatch(
        getPostsThunk({
          page_number: 1,
        })
      );
    }
    // }
    setCurrentTopic({
      name: subtopic_name,
      subtopic_id: subtopic_id,
      topic_id: topic_id,
    });
  };

  const onViewCallBack = useCallback((viewableItems) => {
    const currentIndex =
      viewableItems?.changed?.[0]?.index ||
      viewableItems?.viewableItems?.[0]?.index;
    const postId =
      viewableItems?.changed?.[0]?.item?.id ||
      viewableItems?.viewableItems?.[0]?.item?.id;
    if (postId) {
      dispatch(updateViewedPostThunk([postId]));
    }
    if (currentIndex !== undefined) {
      dispatch(setCurrentVisibleIndex(currentIndex));
    }
  }, []);

  const onEndReached = () => {
    if (
      posts[currentTopicId].page_number < totalPostsPages &&
      !getPostsThunkLoading
    ) {
      if (currentTopicId) {
        // dispatch(
        //   getPostsByTopicThunk({
        //     page_number: posts[currentTopicId]?.page_number + 1,
        //     subtopic_id: currentTopicId,
        //     topic_id: currentSportId,
        //   }),
        // );
      } else {
        dispatch(
          getPostsThunk({
            page_number: posts[currentTopicId]?.page_number + 1,
          })
        );
      }
    }
  };

  const renderItem = ({ item, index }) => {
    if (item?.type === "UserSuggestion") {
      // return <SuggestedProfiles />;
    }

    return (
      <Post
        {...item}
        currentIndex={index}
        marginTop={index === 0 ? 72 : 0}
        currentTopicId={currentTopicId}
      />
    );
  };

  const footerComponent = useCallback(() => {
    if (
      posts[currentTopicId]?.posts?.length &&
      posts[currentTopicId].page_number === totalPostsPages &&
      !getPostsThunkLoading
    ) {
      return (
        <View style={styles.footer}>
          <MyText>No more posts</MyText>
        </View>
      );
    } else {
      <></>;
    }
  }, [posts, currentTopicId, totalPostsPages]);

  const toggleHeaderVisibility = () => {
    isHeaderVisibleRef.current = !isHeaderVisibleRef.current;
  };

  const handleScroll = (event) => {
    try {
      const currentScrollY = event.nativeEvent.contentOffset.y;
      if (currentScrollY > prevScrollY) {
        // Scrolling down
        if (currentScrollY < windowMaxHeight) {
          if (isHeaderVisibleRef.current) {
            toggleHeaderVisibility();
          }
          return;
        }
        if (isHeaderVisibleRef.current) {
          toggleHeaderVisibility();
        }
      } else {
        // Scrolling up
        if (!isHeaderVisibleRef.current) {
          toggleHeaderVisibility();
        }
      }
      setPrevScrollY(currentScrollY);
    } catch (e) {}
  };

  const debouncedScroll = (e) => {
    // e.persist();
    debounce(handleScroll, 200)(e);
  };

  const createPostHandler = () => {
    try {
      if (is_guest) {
        dispatch(updateSignupFrom("default"));
      } else {
        rootNavigate("CreatePost", "navigate");
      }
    } catch (err) {
      if (__DEV__) {
        errorToast(err);
      }
    }
  };

  //--------------------------------------render ui----------------------------------------//
  return (
    <View
      style={styles.container}
      onLayout={(x) =>
        setDeviceVisibleHeight(x.nativeEvent.layout.height + 58.66)
      }>
      {posts?.[currentTopicId]?.posts === undefined ? (
        <View style={styles.fullScreenloaderContainer}>
          {/* <LottieLoader width={150} height={150} /> */}
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <FlatList
            ref={flatlistRef}
            data={posts?.[currentTopicId]?.posts}
            ListEmptyComponent={
              <View
                style={[
                  styles.listEmptyContainer,
                  { height: deviceVisibleHeight - 70 },
                ]}>
                <MyText pageHeaders>No Posts</MyText>
              </View>
            }
            onScroll={debouncedScroll}
            scrollEventThrottle={16}
            automaticallyAdjustKeyboardInsets={true}
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={120}
              />
            }
            estimatedItemSize={windowMaxHeight / 2}
            keyExtractor={(_, index) => index.toString()}
            onViewableItemsChanged={onViewCallBack}
            showsVerticalScrollIndicator={false}
            viewabilityConfig={viewConfigRef.current}
            keyboardShouldPersistTaps={"handled"}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              onEndReached();
            }}
            renderItem={renderItem}
            ListFooterComponent={footerComponent}></FlatList>

          {getPostsThunkLoading && (
            <View style={styles.loaderContainer}>
              {/* <LottieLoader width={50} height={50} /> */}
            </View>
          )}

          {!createPostLoading && (
            <Pressable style={styles.createPost} onPress={createPostHandler}>
              {/* <CreatePostIcon /> */}
            </Pressable>
          )}
        </View>
      )}

      {/* Header is kept at the bottom of the stack to prevent it from being covered by the posts */}
      {(isHeaderVisibleRef.current || prevScrollY <= 0) && (
        <View style={styles.headerContainer}>
          <CommunityHeader />
          {/* {user_id && (
            <View style={[styles.tagContainer]}>
              <FlatList
                data={allSubTopics}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                keyExtractor={(item) => item.subtopic_id?.toString()}
                renderItem={({ item }) => {
                  return (
                    <Tag
                      name={item.subtopic_name}
                      subtopic_id={item.subtopic_id}
                      iconBackgroundColor={item.subtopic_color}
                      topic_id={item.topic_id}
                      sport_name={item.topic_name}
                      onPress={() => {
                        // logEvent("tag_selected", {
                          //   tag_name: item.subtopic_name,
                          //   tag_id: item.subtopic_id,
                        // });
                        onTagChange(item);
                      }}
                      selected={
                        currentTopicObj.subtopic_id === item.subtopic_id
                      }
                      image_url={item?.topic_image_url}></Tag>
                  );
                }}></FlatList>
            </View>
          )} */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowMaxWidth,
    height: windowMaxHeight,
    backgroundColor: black,
  },
  headerContainer: {
    backgroundColor: black,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
  },
  mainContainer: {
    zIndex: 0,
    flex: 1,
    paddingTop: 10,
  },
  fullScreenloaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // tagContainer: {
  //   flexDirection: "row",
  //   marginHorizontal: 10,
  //   marginBottom: 20,
  // },
  listEmptyContainer: {
    width: windowMaxWidth,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: black,
  },
  loaderContainer: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  createPost: {
    position: "absolute",
    bottom: 100,
    right: 0,
    zIndex: 10,
  },
  footer: {
    alignItems: "center",
  },
});

export default Feed;

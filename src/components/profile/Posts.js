"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View, RefreshControl, FlatList } from "react-native-web";
import { BackButton } from "../common/InBuiltNavigation";
import Post from "../community/Post";
import { useDispatch, useSelector } from "react-redux";
import Header from "../common/Header";
import MyText from "../common/MyText";
import { black } from "@/constants/theme/colors";
import { getPostsByUserId, getUserProfile } from "@/store/thunks/community";
import LottieLoader from "../common/LottieLoader";
import { windowMaxWidth, windowMaxHeight } from "@/constants/DeviceData";
import { setCurrentVisibleIndex } from "@/store/slices/common-slice";
import { useRouter } from "next/navigation";
import MarqueeText from "../common/MarqueeText";
import Image from "next/image";

const Posts = ({ userId }) => {
  const id = userId;
  const router = useRouter();

  //---------------------------------------------state management------------------------------------------//
  const [rendered, setRendered] = useState(false);
  const [currentlyClickedPostId, setCurentlyClickedPost] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [currentTopicObj, setCurrentTopic] = useState({
    name: "trending",
    subtopic_id: 0,
    topic_id: 0,
  });
  const currentTopicId = currentTopicObj.subtopic_id;
  const currentSportId = currentTopicObj.topic_id;

  //---------------------------------------------redux store management-------------------------------------//
  const dispatch = useDispatch();
  const { posts, getPostsByUserIdLoading, userProfile } = useSelector(
    (state) => state.community
  );
  const { user_id } = useSelector((state) => state.userSlice);
  const { deviceVisibleHeight } = useSelector((state) => {
    return state.common;
  });
  let team_name = userProfile[`uid_${id}`]?.team_name;
  let profilePic = userProfile[`uid_${id}`]?.profile_photo_small;

  useEffect(() => {
    const asyncFunction = async () => {
      await dispatch(getUserProfile({ userId: id }));
      await dispatch(
        getPostsByUserId({
          page_number: 1,
          user_id: id,
          topic_id: "",
          subtopic_id: "",
        })
      );
    };

    if (!posts[`uid_${id}`]) {
      asyncFunction();
    }

    const timer = setTimeout(() => {
      setRendered(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [id]);

  //--------------------------------------------------refs---------------------------------------------------//
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const onRefresh = async () => {
    if (posts[`uid_${id}`]?.posts.length) {
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
          getPostsByUserId({
            page_number: 1,
            subtopic_id: currentSportId || "",
            topic_id: currentTopicId || "",
            user_id: id,
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
    dispatch(
      getPostsByUserId({
        page_number: 1,
        subtopic_id: item.subtopic_id,
        topic_id: 1,
        user_id: id,
      })
    );
    setCurrentTopic({
      name: item.subtopic_name,
      subtopic_id: item.subtopic_id,
      topic_id: item.topic_id,
    });
  };

  const onEndReached = async () => {
    if (posts[`uid_${id}`]?.page_number < posts[`uid_${id}`]?.total_pages) {
      await dispatch(
        getPostsByUserId({
          page_number: posts[`uid_${id}`]?.page_number + 1,
          subtopic_id: currentTopicObj.subtopic_id || "",
          topic_id: currentTopicObj.topic_id || "",
          user_id: id,
        })
      );
    }
  };

  const onViewCallBack = useCallback((viewableItems) => {
    const currentIndex =
      viewableItems?.changed?.[0]?.index ||
      viewableItems?.viewableItems?.[0]?.index;

    if (currentIndex !== undefined) {
      dispatch(setCurrentVisibleIndex(currentIndex));
    }
  }, []);

  const optionsModalizeRef = useRef(null);

  const onHamburgerClick = (id) => {
    optionsModalizeRef.current?.open();
    setCurentlyClickedPost(id);
  };

  const renderItem = ({ item, index }) => {
    return (
      <Post
        {...item}
        currentIndex={index}
        currentTopicId={`uid_${id}`}
        myPostScreen={id === user_id}
        onHamburgerClick={onHamburgerClick}
      />
    );
  };

  const keyExtractor = (item) => item.id.toString();

  const footerComponent = () => {
    if (posts[`uid_${id}`]?.page_number === posts[`uid_${id}`]?.total_pages) {
      return (
        <View style={styles.footer}>
          <MyText>No more posts</MyText>
        </View>
      );
    } else {
      <></>;
    }
  };

  //--------------------------------------render ui----------------------------------------//
  return (
    <View style={styles.container}>
      {rendered && (
        <Header
          leftComponent={<BackButton onPress={() => router.back()} />}
          centerComponent={
            <View style={styles.headerContainer}>
              <View style={styles.profilePictureContainer}>
                <Image
                  src={profilePic}
                  style={styles.profilePic}
                  width={40}
                  height={40}
                />
              </View>
              <View>
                <MarqueeText
                  scroll={false}
                  marqueeOnStart={true}
                  duration={10000}
                  loop
                  repeatSpacer={40}
                  style={{ width: windowMaxWidth - 175 }}
                  animationType={"scroll"}>
                  <MyText pageHeaders textTransform={"uppercase"}>
                    {`${team_name}'s Posts`}
                  </MyText>
                </MarqueeText>
              </View>
            </View>
          }
        />
      )}

      {/* <View>
        <View style={styles.tagContainer}>
          <FlatList
            data={
              posts?.specificUserPosts?.[
                `${id}_${currentTopicObj?.subtopic_id || 0}`
              ]?.subTopics
            }
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            keyExtractor={item => item.subtopic_id?.toString()}
            renderItem={({item}) => {
              return (
                <Tag
                  name={item.subtopic_name}
                  subtopic_id={item.subtopic_id}
                  iconBackgroundColor={item.subtopic_color}
                  topic_id={item.topic_id}
                  onPress={() => onTagChange(item)}
                  selected={
                    currentTopicObj.subtopic_id === item.subtopic_id
                  }></Tag>
              );
            }}></FlatList>
        </View>
      </View> */}

      {posts[`uid_${id}`]?.posts === undefined ? (
        <View style={styles.fullScreenloaderContainer}>
          <LottieLoader width={150} height={150} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={posts[`uid_${id}`]?.posts}
            ListEmptyComponent={
              <View
                style={[
                  styles.listEmptyContainer,
                  { height: deviceVisibleHeight },
                ]}>
                <MyText pageHeaders>Posts Not found</MyText>
              </View>
            }
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={onRefresh}
                progressViewOffset={120}
              />
            }
            keyExtractor={keyExtractor}
            estimatedItemSize={windowMaxHeight / 2}
            decelerationRate={0.94}
            viewabilityConfig={viewConfigRef.current}
            showsVerticalScrollIndicator={false}
            onViewableItemsChanged={onViewCallBack}
            keyboardShouldPersistTaps={"handled"}
            onEndReachedThreshold={0.3}
            onEndReached={() => {
              onEndReached();
            }}
            renderItem={renderItem}
            ListFooterComponent={footerComponent}></FlatList>

          {getPostsByUserIdLoading && (
            <View style={styles.loaderContainer}>
              <LottieLoader width={50} height={50} />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowMaxWidth,
    alignSelf: "center",
    height: "100vh",
    backgroundColor: black,
  },
  headerContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginRight: -70,
  },
  profilePictureContainer: {
    width: 40,
    height: 40,
    borderColor: black,
    borderWidth: 3,
    borderRadius: 100,
    alignSelf: "center",
    overflow: "hidden",
  },
  profilePic: {
    overflow: "hidden",
    flex: 1,
  },
  // tagContainer: {
  //   flexDirection: "row",
  //   marginHorizontal: 10,
  //   marginBottom: 10,
  // },
  fullScreenloaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: black,
  },
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
  footer: {
    alignItems: "center",
  },
});

export default Posts;

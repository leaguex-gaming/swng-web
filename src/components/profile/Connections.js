"use client";

import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import { BackButton } from "../common/InBuiltNavigation";
import { StyleSheet, View, RefreshControl, FlatList } from "react-native-web";
import MyText from "../common/MyText";
import { useDispatch, useSelector } from "react-redux";
import { windowMaxWidth } from "@/constants/DeviceData";
import UserCard from "../common/UserCard";
import { getPostsByUserId, getUserProfile } from "@/store/thunks/community";
import { useRouter } from "next/navigation";

const Connections = ({ userId, title }) => {
  const navUserId = userId;
  const router = useRouter();

  const { userProfile } = useSelector((state) => state.community);
  const profile = userProfile[`uid_${navUserId}`];
  const userList = profile?.[title?.toLowerCase()];
  const dispatch = useDispatch();

  //---------------------------------------------state management------------------------------------------//
  const [refreshing, setRefreshing] = useState(false);
  const [rendered, setRendered] = useState(false);

  //--------------------------------------Hook effects----------------------------------------//
  useEffect(() => {
    dispatch(getUserProfile({ userId: navUserId, navigation: false }));

    const timer = setTimeout(() => {
      setRendered(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const onUserPress = async (user) => {
    try {
      await dispatch(getUserProfile({ userId: user?.id }));
      router.push(`/profile/${user?.id}`);
      dispatch(
        getPostsByUserId({
          page_number: 1,
          user_id: user?.id,
          topic_id: "",
          subtopic_id: "",
        })
      );
    } catch (err) {}
  };

  const onPullDownRefresh = async () => {
    setRefreshing(true);
    await dispatch(getUserProfile({ userId: navUserId, navigation: false }));
    setRefreshing(false);
  };

  return (
    <View>
      {rendered && (
        <Header
          leftComponent={<BackButton onPress={() => router.back()} />}
          centerComponent={
            <View style={styles.headerContainer}>
              <MyText pageHeaders textTransform={"uppercase"}>
                {title}
              </MyText>
            </View>
          }
        />
      )}

      <View
        style={{
          marginHorizontal: 10,
          width: windowMaxWidth - 20,
          alignSelf: "center",
          height: `calc(100vh - 75px)`,
        }}>
        {userList && (
          <FlatList
            data={userList}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  backgroundColor: "black",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <MyText pageHeaders>No {title} found</MyText>
              </View>
            }
            keyExtractor={(item) => item?.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <UserCard
                  index={index}
                  user={item}
                  onUserPress={(item) => onUserPress(item)}
                  disableProfileRoute={true}
                />
              );
            }}
            refreshControl={
              <RefreshControl
                enabled={true}
                refreshing={refreshing}
                onRefresh={onPullDownRefresh}
              />
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  userDetailContainer: {
    width: windowMaxWidth,
    height: 75,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  detailContainer: {
    marginHorizontal: 10,
  },
});

export default Connections;

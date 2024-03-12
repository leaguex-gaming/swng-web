"use client";

import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native-web";
import MyText from "@/components/common/MyText";
import { black, black2, white3 } from "@/constants/theme/colors";
import Header from "@/components/common/Header";
import { BackButton } from "@/components/common/InBuiltNavigation";
import UserCard from "@/components/common/UserCard";
import { useDispatch } from "react-redux";
import { getPostById } from "@/store/thunks/community";
import { windowMaxWidth, windowWidth } from "@/constants/DeviceData";
import { getPostScore } from "@/utils/helpers/getPostScore";
import AnalyticsIcon from "../../../../public/svg/community/AnalyticsIcon";
import MyTextLink from "@/components/common/MyTextLink";
import ClapIcon from "../../../../public/svg/community/ClapIcon";
import CommentIcon from "../../../../public/svg/community/CommentIcon";
import ShareIcon from "../../../../public/svg/community/ShareIcon";
import InputEye from "../../../../public/svg/InputEye";
import { useRouter } from "next/navigation";

const PostAnalytics = ({ params }) => {
  const [post1, setPost] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  const getPostByIdFunc = async () => {
    const res = await dispatch(getPostById({ post_id: params.postId }));
    setPost(res?.payload?.posts);
  };

  useEffect(() => {
    getPostByIdFunc();
  }, []);

  const clappedBy = post1.clapped_users;

  const renderItem = ({ item }) => {
    return <UserCard user={item} />;
  };

  const {
    claps = 0,
    number_of_comments = 0,
    view_count = 0,
    share_count = 0,
  } = post1;

  const postScrore = getPostScore(post1);

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <BackButton
            onPress={() => {
              router.back();
            }}
          />
        }
        headerText={"Post Analytics"}></Header>

      <View
        style={{
          paddingHorizontal: 16,
          width: windowWidth,
          alignSelf: "center",
        }}>
        <View
          style={{
            backgroundColor: black2,
            borderRadius: 8,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: white3,
          }}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: white3 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 12,
              }}>
              <MyText PSBold fontSize={16}>
                Gold Post
              </MyText>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AnalyticsIcon />
                <MyText opacity={0.5} ml={4}>
                  Score:{" "}
                </MyText>
                <MyText PSBold fontSize={16}>
                  {postScrore}
                </MyText>
              </View>
            </View>
            <MyText mh={12} mb={10} mt={12} fontSize={12} opacity={0.5}>
              Post score is determined by the sum of all activities in the post.
            </MyText>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View style={styles.box}>
              <View style={styles.countContainer}>
                <ClapIcon width={18} height={18} opacity={0.6} />
                <MyText ml={4}>{claps}</MyText>
              </View>
              <MyText fontSize={12} opacity={0.5}>
                Claps
              </MyText>
            </View>

            <View style={styles.box}>
              <View style={styles.countContainer}>
                <CommentIcon width={18} height={18} opacity={0.6} />
                <MyText ml={4}>{number_of_comments}</MyText>
              </View>
              <MyText fontSize={12} opacity={0.5}>
                Comments
              </MyText>
            </View>

            <View style={styles.box}>
              <View style={styles.countContainer}>
                <ShareIcon width={18} height={18} opacity={0.6} />
                <MyText ml={4}>{share_count}</MyText>
              </View>
              <MyText fontSize={12} opacity={0.5}>
                Shares
              </MyText>
            </View>

            <View style={styles.box}>
              <View style={styles.countContainer}>
                <InputEye width={18} height={18} opacity={0.6} />
                <MyText ml={4}>{view_count}</MyText>
              </View>
              <MyText fontSize={12} opacity={0.5}>
                Impressions
              </MyText>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", marginVertical: 12 }}>
          <MyTextLink
            fontSize={12}
            onPress={() => {
              Toast.show({
                type: "info",
                visibilityTime: 1000,
              });
            }}
            label={"KNOW MORE ABOUT POST RANKINGS"}></MyTextLink>
        </View>

        <View>
          {!!clappedBy?.length && (
            <MyText pageHeaders mv={8} fontSize={18}>
              Clapped By
            </MyText>
          )}

          <FlatList
            data={clappedBy}
            renderItem={renderItem}
            keyExtractor={(item) => item.user_id}></FlatList>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100vh",
    width: windowMaxWidth,
    alignSelf: "center",
    backgroundColor: black,
  },
  box: {
    flex: 1,
    alignItems: "center",
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
});

export default PostAnalytics;

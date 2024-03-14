"use client";

import React, { useEffect } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native-web";
import MyBackground from "../common/MyBackground";
import {
  black,
  devBackground,
  postBackground,
  theme,
} from "@/constants/theme/colors";
import InBuiltNavigation from "../common/InBuiltNavigation";
import { windowMaxWidth, windowMaxHeight } from "@/constants/DeviceData";
import MyText from "../common/MyText";
import MyButton from "../common/MyButton";
import MyTextLink from "../common/MyTextLink";
import Tag from "../community/Tag";
import { useDispatch, useSelector } from "react-redux";
import { getTimeElasped } from "@/utils/helpers/timeElapsed";
import LoadingScreen from "../common/LoadingScreen";
import { dateMonth } from "@/utils/helpers/helper";
import {
  getPostsByUserId,
  getUserProfile,
  usersFollow,
} from "@/store/thunks/community";
import {
  updateNavigationChanged,
  updateSignupFrom,
} from "@/store/slices/common-slice";
import LottieLoader from "../common/LottieLoader";
import Edit from "../../../public/svg/Edit";
import { ProfilePicture } from "./ProfilePicture";
import { useRouter } from "next/navigation";

const Roles = [
  { id: 1, name: "Athlete", value: "athlete" },
  { id: 2, name: "Spectator", value: "spectator" },
  { id: 3, name: "Journalist", value: "journalist" },
  { id: 4, name: "Influencer", value: "influencer" },
  { id: 5, name: "Brand", value: "brand" },
  { id: 6, name: "Board", value: "board" },
  { id: 7, name: "Team", value: "team" },
];

export const getRole = (value) => {
  try {
    const findRole = Roles.find((item) => item?.value === value);

    return findRole?.name || "";
  } catch (err) {
    return "";
  }
};

const ProfileInfo = ({
  team_name,
  name,
  total_followers,
  total_followings,
  created_at,
  user_id,
  designation,
  aboutMe,
  is_guest,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const userSlice = useSelector((state) => state.userSlice);
  const currentUserId = userSlice?.user_id;

  const onFollowListClick = (title) => {
    if (is_guest) {
      dispatch(updateSignupFrom("default"));
    } else {
      router.push(`/profile/${user_id}/${title}`);
    }
  };

  let teamName = team_name;
  let uName = name;
  let bio = aboutMe;
  let role = getRole(designation) || "";

  if (currentUserId === user_id) {
    teamName = userSlice?.team_name;
    uName = userSlice?.name;
    bio = userSlice?.bio || aboutMe;
    role = getRole(userSlice?.role) || getRole(designation) || "";
  }
  return (
    <View style={styles.profileInfo}>
      <View style={styles.profileName}>
        <MyText pageHeaders mr={5} fontSize={"3.25vh"}>
          {uName || ""}
        </MyText>
        <MyText fontSize={"2.5vh"}>@{teamName}</MyText>
      </View>
      {role && (
        <View style={styles.designation}>
          <MyText fontSize={"2vh"} color={black} opacity={0.6}>
            {role}
          </MyText>
        </View>
      )}
      {bio && (
        <View style={styles.intro}>
          <MyText fontSize={"2vh"} textAlign={"center"} opacity={0.6}>
            {bio}
          </MyText>
        </View>
      )}
      <View
        style={[
          styles.statistics,
          (!designation || !aboutMe) && { marginTop: 20 },
        ]}>
        {[
          { title: "Debut", value: dateMonth(created_at) },
          { title: "followers", value: total_followers },
          { title: "following", value: total_followings },
        ].map((stat, index) => {
          return (
            <Pressable
              disabled={stat.title === "debut" ? true : false}
              onPress={() => onFollowListClick(stat.title)}
              key={index}>
              <View style={styles.statisticContainer} key={index}>
                <MyText opacity={0.65} fontSize={"2vh"} mv={0} pv={0}>
                  {stat.title}
                </MyText>
                <MyText fontSize={"2vh"} mv={0} pv={0}>
                  {stat.value}
                </MyText>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export const PostsCard = ({
  post,
  index,
  style = null,
  date = "createdAt",
}) => {
  const router = useRouter();

  //---------------------------------------------redux store management-------------------------------------//
  const { is_guest } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const onPostClick = () => {
    if (is_guest) {
      dispatch(updateSignupFrom("default"));
      return;
    }
    if (post?.media_type === "video") {
      router.push(`/reel/${post.id}`);
    } else {
      router.push(`/post/${post.id}`);
    }
  };

  //--------------------------------------render ui----------------------------------------//
  return (
    <View
      style={[
        !style && styles.postContainer,
        !style && !index && { marginLeft: 18 },
        style && style,
      ]}>
      <TouchableOpacity onPress={onPostClick}>
        <View style={[styles.post, style && { height: 180 }]}>
          {post.media_type === "image" ? (
            <Image source={{ uri: post.media_url }} style={styles.imagePost} />
          ) : post.media_type === "video" ? (
            <>
              {post.media_thumbnail_url === "" ? (
                <Image
                  style={styles.imagePost}
                  source={require("../../../public/images/vid_thumb.png")}
                />
              ) : (
                <Image
                  source={{ uri: post.media_thumbnail_url }}
                  style={styles.imagePost}
                />
              )}
            </>
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}>
              <MyText ellipsizeMode="tail" fontSize={12} numberOfLines={8}>
                {post.content}
              </MyText>
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.postInfo}>
        <MyText fontSize={12} opacity={0.6}>
          {getTimeElasped(
            date === "createdAt" ? post.created_at : post.updated_at
          )}
        </MyText>
        <Tag
          name={post?.subtopic?.name || "Trending"}
          iconBackgroundColor={post?.subtopic?.color || "#FF0000"}
          type={"small"}
          selected={true}
          image_url={post?.subtopic?.topic_image_url}
          marginRight={0}
          topic_id={post?.topic?.id}></Tag>
      </View>
    </View>
  );
};

const Profile = ({ userId }) => {
  const navUserId = userId;
  const router = useRouter();

  //---------------------------------------------redux store management-------------------------------------//
  const {
    posts,
    getUserProfileLoading,
    getPostsByUserIdLoading,
    userProfile,
    usersFollowLoading,
  } = useSelector((state) => state.community);
  const { user_id, is_guest, id } = useSelector((state) => state.userSlice);
  const { currentRoute } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const onMessage = () => {
    // Toast.show({
    //   type: "info",
    //   visibilityTime: 1000,
    // });
  };

  const onFollowUnFollow = () => {
    if (is_guest) {
      dispatch(updateSignupFrom("default"));
    } else {
      if (!getPostsByUserIdLoading && !getUserProfileLoading) {
        let controller = new AbortController();
        dispatch(
          usersFollow({
            userPic: userProfile[`uid_${navUserId}`].profile_photo_small,
            userName:
              userProfile[`uid_${navUserId}`].team_name ||
              userProfile[`uid_${navUserId}`].name,
            userId: userProfile[`uid_${navUserId}`].id,
            action: userProfile[`uid_${navUserId}`].followed_by_user
              ? "REMOVE"
              : "ADD",
            controller,
            ...(userProfile[`uid_${navUserId}`] !== undefined
              ? { createUserProfile: false }
              : { createUserProfile: true }),
            fromSuggestion: true,
          })
        );
      }
    }
  };

  //--------------------------------------------------hook effects--------------------------------------------//
  useEffect(() => {
    if (navUserId && userProfile[`uid_${navUserId}`] === undefined) {
      const fetchingProfile = async () => {
        const res = await dispatch(
          getUserProfile({
            userId: navUserId,
            navigation: false,
          })
        );
        await dispatch(
          getPostsByUserId({
            page_number: 1,
            user_id: navUserId,
          })
        );
      };
      fetchingProfile();
    }
  }, [navUserId]);

  useEffect(() => {
    dispatch(updateNavigationChanged(true));
  }, []);

  //--------------------------------------render ui----------------------------------------//
  return (
    <>
      {userProfile[`uid_${navUserId}`] === undefined ? (
        <LoadingScreen />
      ) : (
        <MyBackground colors={devBackground}>
          <InBuiltNavigation
            back={currentRoute === "MyProfile" ? false : true}
            onPressRightNav={() => {
              if ((user_id || id) == navUserId) {
                // rootNavigate("Settings", "push", {
                //   navUserId: navUserId,
                // });
              } else {
                // Toast.show({
                //   type: "info",
                //   visibilityTime: 1000,
                // });
              }
            }}
            rightNav={(user_id || id) == navUserId ? "settings" : "more"}
          />

          <View>
            <ProfilePicture
              profilePic={userProfile[`uid_${navUserId}`].profile_photo_small}
              coverPic={userProfile[`uid_${navUserId}`].cover_photo}
              user_id={navUserId}
            />

            <View style={styles.userProfileContainer}>
              <ProfileInfo
                team_name={userProfile[`uid_${navUserId}`].team_name}
                name={userProfile[`uid_${navUserId}`].name}
                created_at={userProfile[`uid_${navUserId}`].created_at}
                total_followers={
                  userProfile[`uid_${navUserId}`].total_followers
                }
                total_followings={
                  userProfile[`uid_${navUserId}`].total_followings
                }
                user_id={navUserId}
                designation={userProfile[`uid_${navUserId}`]?.role || ""}
                aboutMe={userProfile[`uid_${navUserId}`]?.bio || ""}
                is_guest={is_guest}
              />

              {userProfile[`uid_${navUserId}`].user_self_profile ? (
                <View style={[styles.buttonContainer, { marginBottom: 0 }]}>
                  <MyButton
                    label="EDIT PROFILE"
                    type="tertiary"
                    loading={usersFollowLoading}
                    width={(windowMaxWidth - 60) / 2}
                    height={40}
                    mv={10}
                    onPress={() =>
                      // rootNavigate("EditProfile", "navigate", {
                      //   navUserId: navUserId,
                      // })
                      {}
                    }
                    buttonTextSize={14}
                    iconComponent={<Edit style={{ marginRight: 5 }} />}
                  />
                </View>
              ) : (
                <View style={styles.buttonContainer}>
                  {userProfile[`uid_${navUserId}`].followed_by_user ? (
                    <View style={styles.buttons}>
                      <MyButton
                        label="Unfollow"
                        type="semiTransparent"
                        buttonColor={"white"}
                        loading={usersFollowLoading}
                        width={(windowMaxWidth - 60) / 2}
                        height={40}
                        mv={10}
                        onPress={onFollowUnFollow}
                        buttonTextSize={14}
                      />

                      <MyButton
                        label="Message"
                        type="secondary"
                        //loading={loading}
                        width={(windowMaxWidth - 60) / 2}
                        height={40}
                        mv={10}
                        onPress={onMessage}
                        buttonTextSize={14}
                      />
                    </View>
                  ) : (
                    <MyButton
                      label="Follow"
                      type="secondary"
                      loading={usersFollowLoading}
                      width={(windowMaxWidth - 60) / 2}
                      height={40}
                      mv={10}
                      onPress={onFollowUnFollow}
                      buttonTextSize={14}
                    />
                  )}
                </View>
              )}

              <ScrollView
                style={[
                  styles.userPostsContainer,
                  userProfile[`uid_${navUserId}`].id === user_id && {
                    marginTop: 30,
                  },
                ]}
                showsVerticalScrollIndicator={false}>
                <View style={styles.headers}>
                  <MyText pageHeaders fontSize={18} opacity={0.9}>
                    Recent Posts
                  </MyText>
                  {posts?.[`uid_${userProfile[`uid_${navUserId}`].id}`]?.posts
                    ?.length &&
                  !getPostsByUserIdLoading &&
                  !getUserProfileLoading ? (
                    <MyTextLink
                      label={"See All"}
                      fontSize={14}
                      onPress={() => {
                        router.push(
                          `/profile/${userProfile[`uid_${navUserId}`].id}/posts`
                        );
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </View>
                {getPostsByUserIdLoading || getUserProfileLoading ? (
                  <View
                    style={{
                      width: windowMaxWidth,
                      height: 150,
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <LottieLoader width={100} height={100} />
                  </View>
                ) : (
                  <FlatList
                    data={posts?.[
                      `uid_${userProfile[`uid_${navUserId}`].id}`
                    ]?.posts?.slice(0, 10)}
                    ListEmptyComponent={
                      <View
                        style={{
                          width: windowMaxWidth,
                          height: 150,
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        <MyText pageHeaders fontSize={16}>
                          Posts Not found
                        </MyText>
                      </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                      return <PostsCard post={item} index={index} />;
                    }}></FlatList>
                )}
              </ScrollView>
            </View>
          </View>
        </MyBackground>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  userProfileContainer: {
    width: windowMaxWidth,
    alignSelf: "center",
  },
  profilePictureContainer: {
    position: "absolute",
    bottom: -20,
    width: 100,
    height: 100,
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
  profileInfo: {
    marginTop: 25,
    alignSelf: "center",
    alignItems: "center",
  },
  profileName: {
    marginHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  designation: {
    backgroundColor: "#FFFFFF88",
    paddingHorizontal: 10,
    borderRadius: 5,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 5,
  },
  intro: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
  statistics: {
    marginVertical: 10,
    flexDirection: "row",
    gap: 5,
  },
  statisticContainer: {
    width: (windowMaxWidth - 40) / 3,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "#FFFFFF40",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  buttons: {
    paddingHorizontal: 20,
    flexDirection: "row",
    gap: 20,
    alignSelf: "center",
  },
  userPostsContainer: {},
  headers: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postContainer: {
    marginRight: 18,
    width: 150,
    paddingBottom: 10,
  },
  post: {
    width: "100%",
    height: 150,
    backgroundColor: postBackground[theme],
    borderRadius: 4,
    padding: 10,
    borderWidth: 1,
    borderColor: "#383737",
  },
  imagePost: {
    width: "100%",
    height: "100%",
  },
  postInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loaderContainer: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    width: 40,
    height: 40,
    backgroundColor: black,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ffffff66",
  },
  profileCamera: {
    left: windowMaxWidth / 2 + 10,
    bottom: -25,
    position: "absolute",
  },
  coverCamera: {
    position: "absolute",
    zIndex: 1,
    right: 0,
  },
});

export default Profile;

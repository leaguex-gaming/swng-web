"use client";

import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native-web";
import MyText from "../common/MyText";
import Tag from "./Tag";
import { useSelector, useDispatch } from "react-redux";
import { getPostsByUserId, getUserProfile } from "@/store/thunks/community";

export const ProfilePic = ({
  profilePic,
  size = 36,
  user_id,
  disabled = false,
}) => {
  const dispatch = useDispatch();
  const userSlice = useSelector((state) => state.userSlice);
  const currentUserId = userSlice?.user_id;
  let profilePicture = profilePic;
  if (user_id === currentUserId) {
    profilePicture = userSlice?.profile_photo_small;
  }

  const onUserProfilePress = async () => {
    // logEvent("profile_pic_clicked", { userId: user_id });
    if (user_id) {
      dispatch(getUserProfile({ userId: user_id }));
      dispatch(
        getPostsByUserId({
          page_number: 1,
          user_id: user_id,
          topic_id: "",
          subtopic_id: "",
        })
      );
    }
  };

  return (
    <Pressable onPress={onUserProfilePress} disabled={!user_id || disabled}>
      <Image
        source={{ uri: profilePicture }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    </Pressable>
  );
};

const ProfileCard = ({
  profilePic = "https://s3-ap-southeast-1.amazonaws.com/testleaguex/avatars/thumb_B6D20D656A2F4005B7D2E3B2FD3DE62E_1683105828529.jpg",
  name = "userName",
  postTime,
  tags,
  opacity = 1,
  user_id,
  topic_id,
  sport,
}) => {
  const pictureSize = 36;
  const userSlice = useSelector((state) => state.userSlice);
  const currentUserId = userSlice?.user_id;
  let teamName = name;
  if (currentUserId === user_id) {
    teamName = userSlice?.team_name;
  }
  return (
    <View style={styles.container}>
      <View>
        <ProfilePic
          profilePic={profilePic}
          pictureSize={pictureSize}
          user_id={user_id}
        />
      </View>
      <View style={{ marginLeft: 8 }}>
        <MyText buttonText fontSize={16} opacity={opacity}>
          {teamName}
        </MyText>
        <View style={[styles.flexDirectionRow]}>
          <MyText fontSize={12} opacity={0.7}>
            {postTime}
          </MyText>
          {!!tags?.id && (
            <Tag
              name={tags?.name}
              type={"small"}
              sport_name={sport?.name}
              iconBackgroundColor={tags?.color}
              selected={true}
              image_url={tags?.topic_image_url}
              topic_id={topic_id}></Tag>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
});

export default ProfileCard;

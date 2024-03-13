"use client";

import React from "react";
import { Pressable, StyleSheet, View } from "react-native-web";
import { black2 } from "@/constants/theme/colors";
import MyText from "./MyText";
import { ProfilePic } from "../community/ProfileCard";

const UserCard = ({
  user,
  onUserPress = () => {},
  disableProfileRoute = false,
}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        onUserPress(user);
      }}>
      <View style={styles.card}>
        <ProfilePic
          profilePic={user.profile_photo_small}
          user_id={user.user_id || user?.id}
          disabled={disableProfileRoute}
          size={44}
        />
        <View style={{ marginLeft: 6, alignSelf: "flex-start" }}>
          <MyText buttonText fontSize={16} mt={2}>
            {user?.team_name}
          </MyText>
          {!!user.name && <MyText>{user?.name || ""}</MyText>}
        </View>
      </View>
      {typeof user?.total_followers === "number" && (
        <View style={{ justifyContent: "center" }}>
          <MyText fontSize={18} textAlign={"center"}>
            {user?.total_followers}
          </MyText>
          <MyText PSBold opacity={0.5} fontSize={10}>
            Followers
          </MyText>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: black2,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default UserCard;

"use client";

import React, { useRef } from "react";
import { Pressable, View, StyleSheet } from "react-native-web";
import { windowMaxWidth } from "@/constants/DeviceData";
import Camera from "../../../public/svg/Camera";
import { black, white5 } from "@/constants/theme/colors";
import { useSelector } from "react-redux";
import Image from "next/image";
import Dummy_cover from "../../../public/images/Cover.png";

export const ProfilePicture = ({
  profilePic,
  coverPic,
  onPress = () => {},
  screen = "default",
  hght = 175,
  user_id,
}) => {
  let height = hght || 175;
  const coverInputRef = useRef(null);
  const profileInputRef = useRef(null);

  const userSlice = useSelector((state) => state.userSlice);
  const currentUserId = userSlice?.user_id;
  let profilePicture = profilePic;
  let coverPicture = coverPic;
  if (user_id === currentUserId) {
    profilePicture = userSlice?.profile_photo_small || profilePic;
    coverPicture = userSlice?.cover_photo || coverPic;
  }

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const handleOnPress = async (type, e) => {
    const domId =
      type === "profilePic" ? "#previewImage" : "#previewCoverImage";
    try {
      function readFileAsBase64(file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const image = document.querySelector(domId);
          image.src = event.target.result;
          image.onload = () => {
            const { height, width } = image;

            const base64String = event.target.result;
            onPress(type, {
              uri: base64String,
              width: width,
              height: height,
            });
          };
        };
        reader.readAsDataURL(file);
      }

      readFileAsBase64(e.target.files[0]);
    } catch (err) {}
  };

  const CameraIcon = ({ containerStyle }) => {
    return (
      <View style={[styles.cameraContainer, containerStyle]}>
        <Camera />
      </View>
    );
  };

  //--------------------------------------render ui----------------------------------------//
  return (
    <View style={{ width: windowMaxWidth, alignSelf: "center" }}>
      {/*--------------------------------------cover pic-------------------------------------------*/}
      <Pressable
        onPress={
          screen !== "default"
            ? () => coverInputRef?.current?.click()
            : () => {}
        }>
        {/*--------------------Camera Icon---------------------*/}
        {screen !== "default" && (
          <CameraIcon containerStyle={styles.coverCamera} />
        )}

        {/*-----------------picture--------------------------*/}
        <View style={[styles.coverPicContaier, { height: height }]}>
          <Image
            src={coverPic ? coverPicture : Dummy_cover}
            width={windowMaxWidth}
            height={height}
            style={{ objectFit: "cover" }}
          />

          <input
            ref={coverInputRef}
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleOnPress("coverPic", e);
            }}
            onClick={(event) => {
              const { target = {} } = event || {};
              target.value = "";
            }}
          />
          <img id="previewCoverImage" style={{ display: "none" }}></img>
        </View>

        {/*-----------------overlay---------------------------*/}
        <View
          style={[
            {
              height: height,
              background: `linear-gradient(to bottom, #D9D9D933, #000000CC)`,
            },
            styles.linearBackground,
          ]}></View>
      </Pressable>

      {/*--------------------------------------profile pic-------------------------------------------*/}
      <View>
        <Pressable
          style={styles.profilePictureContainer}
          onPress={
            screen !== "default"
              ? () => profileInputRef?.current?.click()
              : () => {}
          }>
          <Image
            src={profilePicture}
            style={styles.profilePic}
            width={100}
            height={100}
          />
          <input
            ref={profileInputRef}
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleOnPress("profilePic", e);
            }}
            onClick={(event) => {
              const { target = {} } = event || {};
              target.value = "";
            }}
          />
          <img id="previewImage" style={{ display: "none" }}></img>
        </Pressable>
        {/*--------------------Camera Icon---------------------*/}
        {screen !== "default" && (
          <Pressable
            onPress={
              screen !== "default"
                ? () => profileInputRef?.current?.click()
                : () => {}
            }>
            <CameraIcon containerStyle={styles.profileCamera} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    width: 40,
    height: 40,
    backgroundColor: black,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: white5,
  },
  coverCamera: {
    position: "absolute",
    zIndex: 1,
    right: 0,
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
    width: 100,
    height: 100,
  },
  profileCamera: {
    left: windowMaxWidth / 2 + 10,
    bottom: -25,
    position: "absolute",
  },
  coverPicContaier: {
    width: windowMaxWidth,
    clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)`,
    justifyContent: "center",
  },
  linearBackground: {
    width: windowMaxWidth,
    position: "absolute",
    clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)`,
  },
});

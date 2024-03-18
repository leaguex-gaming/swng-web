"use client";

import React from "react";
import { View } from "react-native-web";
import { LinearGradientBackground } from "../common/MyBackground";
import MyButton from "../common/MyButton";
import { windowMaxWidth } from "@/constants/DeviceData";
import MyText from "../common/MyText";
import MyTextLink from "../common/MyTextLink";
import { useDispatch } from "react-redux";
import { updateSignupFrom } from "@/store/slices/common-slice";
import { logoutUser } from "@/store/thunks/authentication";
import Modal from "react-modal";
import { customStyles } from "./utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

const content = {
  clap: {
    title: "CLAP & SHOW YOUR LOVE TO THE POST",
  },
  comment: {
    title: "COMMENT & TELL YOUR OPINION OF THE POST",
  },
  analytics: {
    title: "LOGIN/SIGNUP TO INTERACT WITH THE POSTS",
  },
  default: {
    title: "LOGIN/SIGNUP TO INTERACT WITH THE POSTS",
  },
};

const CLAP = require(`../../../public/images/clapping-hands.png`);
const COMMENT = require(`../../../public/gif/Comment.gif`);
const MEDAL = require(`../../../public/gif/Medal.gif`);

const MODALHEIGHT = windowMaxWidth >= 500 ? 330 : 360;

const SignupModalize = ({ type = "clap", modalizeRef }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const onLogin = async () => {
    try {
      dispatch(updateSignupFrom(""));
      // await dispatch(logoutUser());
      router.replace("/user-login");
    } catch (err) {}
  };

  const notNow = () => {
    try {
      dispatch(updateSignupFrom(""));
    } catch (err) {}
  };

  return (
    <Modal
      isOpen={() => {}}
      onRequestClose={() => dispatch(updateSignupFrom(""))}
      shouldCloseOnOverlayClick={true}
      style={customStyles(MODALHEIGHT, 0)}>
      <LinearGradientBackground
        colors={["#988FFF", "#FFFFFF"]}
        containerStyle={{
          height: MODALHEIGHT,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}>
        <View style={{ alignItems: "center", paddingBottom: 20 }}>
          <Image
            style={{ width: 150, height: 120 }}
            src={
              type === "comment" ? COMMENT : type === "medal" ? MEDAL : CLAP
            }></Image>
          <MyText pageHeaders color={"black"} textAlign={"center"} ph={30}>
            {content[type || "clap"]?.title}
          </MyText>
          <MyText
            textAlign={"center"}
            color={"rgba(0,0,0,0.6)"}
            ph={30}
            mt={20}>
            {type !== "default"
              ? `You need to Login to interact with the posts in swng.`
              : `You need to Login to interact in swng.`}
          </MyText>
          <MyButton
            label="LOGIN/SIGNUP"
            type="secondary"
            width={windowMaxWidth - 30}
            mv={20}
            onPress={onLogin}
          />

          <MyTextLink label={"NOT NOW"} onPress={() => notNow()}></MyTextLink>
        </View>
      </LinearGradientBackground>
    </Modal>
  );
};

export default SignupModalize;

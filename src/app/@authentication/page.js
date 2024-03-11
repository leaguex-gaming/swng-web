"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Text, View, StyleSheet, Pressable } from "react-native-web";
import Bg from "../../../public/images/LandingImage.png";
import { windowMaxWidth } from "@/constants/DeviceData";
import MyText from "../../components/common/MyText";
import MyTextLink from "@/components/common/MyTextLink";
import { buttonGoogle } from "@/constants/theme/colors";
import { googleSignIn, guestLogin } from "@/store/thunks/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import Marquee from "@/components/common/Marquee";
import GoogleLogo from "../../../public/svg/GoogleLogo";
import MyButton from "@/components/common/MyButton";

const GoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [linkActive, setLinkActive] = useState(true);

  const dispatch = useDispatch();
  const { googleSignInLoading, guestLoginLoading } = useSelector(
    (state) => state.user
  );

  const onGoogleSignin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      dispatch(googleSignIn({ accessToken: codeResponse.access_token }));
    },
  });

  const onGuestLogin = () => {
    try {
      if (linkActive && !googleSignInLoading) {
        setLinkActive(false);
        dispatch(guestLogin());
      }
    } catch (err) {}
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.marqueeContainer}>
        <Marquee marqueeText={"Sports fans unite."} />
      </View>

      <Image
        width={windowMaxWidth}
        height={"100%"}
        src={Bg}
        alt="swng-login"
        priority={true}
      />

      <View style={styles.container}>
        <MyButton
          label={"Go in with google"}
          backgroundColor={buttonGoogle.dark}
          mv={10}
          onPress={() => {
            onGoogleSignin();
          }}
          loading={googleSignInLoading}
          disabled={guestLoginLoading ? true : false}
          width={windowMaxWidth - 80}
          buttonColor="white"
          iconComponent={<GoogleLogo style={{ marginRight: 5 }} />}
        />

        <View style={styles.guestChoice}>
          <MyText paragraphText>Want to see first?</MyText>
          <MyTextLink
            label={"Be Our guest >"}
            onPress={() => onGuestLogin()}
            active={linkActive && !googleSignInLoading ? true : false}
          />
        </View>

        <Text style={styles.terms}>
          <MyText>
            By continuing, you confirm that you're above 18+ years old & agree
            to swng{" "}
            <MyTextLink
              label={"T&C"}
              onPress={() => {}}
              active={true}
              fontSize={10}
              ml={-1}
              mt={0}
              mb={-1}
              umt={0}
              umb={-1.5}
              underlineWidth={0.7}
            />
          </MyText>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width: windowMaxWidth,
    overflow: "hidden",
  },
  marqueeContainer: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
  },
  container: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    zIndex: 2,
  },
  guestChoice: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 10,
    marginBottom: 20,
    gap: 5,
  },
  terms: {
    flexDirection: "row",
    textAlign: "center",
    marginVertical: 10,
    marginBottom: 30,
  },
});

export default GoogleAuth;

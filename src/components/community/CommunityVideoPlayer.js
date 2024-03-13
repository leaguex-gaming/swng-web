"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native-web";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { setVideoMuted } from "@/store/slices/community-slice";
import UnMutedIcon from "../../../public/svg/community/UnMutedIcon";
import MutedIcon from "../../../public/svg/community/MutedIcon";
import PlayIcon from "../../../public/svg/community/PlayIcon";
import PauseIcon from "../../../public/svg/community/PauseIcon";
import MyText from "../common/MyText";
import { windowMaxWidth } from "@/constants/DeviceData";
import DoubleTapHandler from "./DoubleTapHandler";
import { black, black3 } from "@/constants/theme/colors";
// import MyButton from "../common/MyButton";

const CommunityVideoPlayer = ({
  uri,
  // fullScreenPost = false,
  reelsScreen = false,
  onPress = () => {},
  poster = "",
  currentIndex,
  postClapAction = () => {},
  postId,
  currentTopicId,
  mutedIcon = "right",
  fullWidth = false,
  postOnScreen = null,
  mediaType,
}) => {
  // const isFocused = useIsFocused();

  //---------------------------------------------state management------------------------------------------//
  const [paused, setPaused] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [err, setErr] = useState(false);
  const [retry, setRetry] = useState(false);
  const [videoDimensions, setvideoDimensions] = useState({
    videoWidth: 0, // Set your initial width
    videoHeight: 0,
  });

  //---------------------------------------------redux store management-------------------------------------//
  const dispatch = useDispatch();
  const videoMuted = useSelector((state) => state.community.videoMuted);
  const currentVisibleIndex = useSelector(
    (state) => state.common.currentVisibleIndex
  );

  //--------------------------------------------------hook effects--------------------------------------------//
  useEffect(() => {
    setShowIcon(true);
    setTimeout(() => {
      setShowIcon(false);
    }, 1000);
  }, [paused]);

  useEffect(() => {
    if (reelsScreen) {
      if (postOnScreen == postId) {
        setPaused(false);
      } else {
        setPaused(true);
      }
    } else {
      if (currentIndex === currentVisibleIndex) {
        setPaused(false);
      } else {
        setPaused(true);
      }
    }
  }, [postOnScreen, reelsScreen, postId, currentIndex, currentVisibleIndex]);

  //--------------------------------------onPress Actions and Functions----------------------------------------//
  const onBuffer = ({ isBuffering }) => {
    setBuffering(isBuffering);
  };

  const soundButton = () => {
    dispatch(setVideoMuted(!videoMuted));
  };

  const handlePress = useCallback(() => {
    if (!reelsScreen) {
      rootNavigate("Reels", "navigate", {
        postId,
        currentTopicId,
        mediaType,
      });
    }
    setPaused((prevPaused) => !prevPaused);
  }, [onPress]);

  const retryLoadFile = () => {
    setErr(false);
    setRetry(false);
  };

  const onVideoLoad = (data) => {
    // const { width, height } = data.naturalSize;
    // const aspectRatio = width / height;

    // Calculate the new height based on the aspect ratio and desired width
    const newWidth = fullWidth ? windowMaxWidth : windowMaxWidth - 20; // Set your desired width here
    // const newHeight = newWidth / aspectRatio;

    setvideoDimensions({
      videoWidth: newWidth,
      videoHeight: 1,
    });
  };

  // console.log(
  //   "reels screen ---------------------->",
  //   reelsScreen,
  //   "currentIndex Id ------------------>",
  //   currentIndex,
  //   "currentVisibleIndex Id ------------------>",
  //   currentVisibleIndex,
  //   "post Id ------------------>",
  //   postId,
  //   "poster ------------------>",
  //   poster,
  //   "video uri------------------------------>",
  //   // convertToProxyURL(uri),
  //   "pause------------------------------>",
  //   paused,
  //   "is Buffering------------------------------>",
  //   buffering
  // );

  //--------------------------------------render ui----------------------------------------//
  return (
    <View>
      <DoubleTapHandler
        style={[
          {
            width: videoDimensions.videoWidth
              ? videoDimensions.videoWidth
              : fullWidth
              ? windowMaxWidth
              : windowMaxWidth - 20,
            backgroundColor: black,
            position: "relative",
          },
        ]}
        singleTapAction={handlePress}
        doubleTapAction={() => {
          postClapAction();
        }}>
        {!videoDimensions?.videoHeight && !reelsScreen && (
          <>
            <Image
              style={{
                width: fullWidth ? windowMaxWidth : windowMaxWidth - 20,
                height: 200,
              }}
              source={require("../../../public/images/vid_thumb.png")}
            />
            <View style={[styles.absoluteCentered, { zIndex: 1 }]}>
              <ActivityIndicator size="large" color="white" />
            </View>
          </>
        )}

        <ReactPlayer
          url={uri}
          width={fullWidth ? windowMaxWidth : windowMaxWidth - 20}
          height={"auto"}
          style={StyleSheet.flatten([
            {
              alignSelf: "center",
              marginBottom: -4,
            },
          ])}
          onReady={onVideoLoad}
          progressive={true}
          posterResizeMode={"contain"}
          loop={true}
          resizeMode={"contain"}
          onBuffer={onBuffer}
          onError={(err) => {
            // if (err.error.extra == -1004) {
            //   setErr(true);
            // } else if (err.error.extra == -2147483648) {
            //   setErr(true);
            //   setRetry(true);
            // }
          }}
          muted={videoMuted}
          poster={poster}
          playing={reelsScreen ? !paused : currentIndex === currentVisibleIndex}
        />
        {buffering && (
          <View style={styles.absoluteCentered}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
        {videoDimensions.videoHeight !== 0 && !paused && showIcon && (
          <View style={styles.absoluteCentered}>
            <PlayIcon />
          </View>
        )}
        {videoDimensions.videoHeight !== 0 && paused && showIcon && (
          <View style={styles.absoluteCentered}>
            <PauseIcon />
          </View>
        )}
        {videoDimensions.videoHeight !== 0 && (
          <Pressable
            style={[
              { zIndex: 3 },
              mutedIcon === "top"
                ? { position: "absolute", right: 10, top: 10 }
                : { position: "absolute", right: 10, bottom: 20 },
            ]}
            onPress={soundButton}>
            {videoMuted ? (
              <MutedIcon width={35} height={35} />
            ) : (
              <UnMutedIcon width={35} height={35} />
            )}
          </Pressable>
        )}
        {!!err && (
          <View style={[styles.absoluteCentered, { backgroundColor: black3 }]}>
            <MyText opacity={0.6} mb={8}>
              {retry ? "Media couldn't load." : "Cannot play media"}
            </MyText>
            {/* {retry && (
              <MyButton
                onPress={retryLoadFile}
                width={100}
                height={40}
                label="retry"
                type={"tertiary"}></MyButton>
            )} */}
          </View>
        )}
      </DoubleTapHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  absoluteCentered: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    zIndex: 3,
  },
});

export default CommunityVideoPlayer;

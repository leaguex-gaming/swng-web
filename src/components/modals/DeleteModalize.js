"use client";

import React, { useEffect, useState } from "react";
import { View, StyleSheet, BackHandler, Pressable } from "react-native-web";
import MyText from "../common/MyText";
import { deleteCommentThunk, deletePost } from "@/store/thunks/community";
import { windowMaxHeight, windowMaxWidth } from "@/constants/DeviceData";
import MyButton from "../common/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { updateDeletePostModalVisible } from "@/store/slices/common-slice";
import { blackOpacity } from "@/constants/theme/colors";
import { useRouter } from "next/navigation";

const DeleteModalize = () => {
  const dispatch = useDispatch();
  const { id, ...modalPost } = useSelector((state) => state.common.modalPost);
  const router = useRouter();

  const { deletePostLoading } = useSelector((state) => state.community);
  const { profile_photo_small, team_name } = useSelector(
    (state) => state.userSlice
  );

  const [deletePostController, setDeletePostController] = useState();
  const onDeletePost = async () => {
    let controller = new AbortController();
    setDeletePostController(controller);
    let isDeletePost = true;
    if (modalPost?.isComment) {
      isDeletePost = false;
    }
    if (isDeletePost) {
      await dispatch(
        deletePost({
          postId: id,
          controller,
          notify_profile_pic: profile_photo_small,
          notify_title: team_name,
        })
      );
      if (modalPost?.fullScreenPost) {
        router.back();
      }
    } else {
      //comment
      await dispatch(
        deleteCommentThunk({
          commentId: id,
          currentTopicId: modalPost.currentTopicId,
          postId: modalPost.post_id,
          ...(modalPost?.parent_id && {
            parentCommentId: modalPost?.parent_id,
          }),
          ...(modalPost?.type && { type: modalPost?.type }),
        })
      );
    }
    dispatch(updateDeletePostModalVisible(false));
  };

  useEffect(() => {
    let backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      dispatch(updateDeletePostModalVisible(false));
      return false;
    });

    if (deletePostLoading) {
      backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        return true;
      });
    }
    return () => backHandler?.remove();
  }, [deletePostLoading]);

  return (
    <Pressable
      style={styles.outerContainer}
      onPress={() => {
        dispatch(updateDeletePostModalVisible(false));
      }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <MyText pageHeaders>Delete for sure?</MyText>
          <MyText textAlign={"center"} pb={20}>
            Are you sure you want to delete this, since this actions can’t be
            undone.
          </MyText>

          <View style={styles.buttonContainer}>
            <MyButton
              label="No"
              width={windowMaxWidth > 500 ? 210 : (windowMaxWidth - 140) / 2}
              height={40}
              mv={10}
              onPress={() => {
                if (!deletePostLoading) {
                  dispatch(updateDeletePostModalVisible(false));
                }
              }}
              buttonTextSize={14}
              backgroundColor={"#535353"}
              buttonColor={"white"}
            />
            <MyButton
              label="YES"
              type="tertiary"
              loading={deletePostLoading}
              width={windowMaxWidth > 500 ? 210 : (windowMaxWidth - 140) / 2}
              height={40}
              mv={10}
              onPress={() => onDeletePost()}
              buttonTextSize={14}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100vw",
    height: "100vh",
    backgroundColor: blackOpacity,
    zIndex: 10,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: windowMaxWidth,
    backgroundColor: "#000000BB",
  },
  innerContainer: {
    marginHorizontal: 20,
    backgroundColor: "#1B1B1B",
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    width: windowMaxWidth - 40,
    maxWidth: 500,
    borderColor: "#EF6D6D",
  },
  buttonContainer: {
    width: windowMaxWidth - 120,
    maxWidth: 450,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: -30,
  },
});

export default DeleteModalize;

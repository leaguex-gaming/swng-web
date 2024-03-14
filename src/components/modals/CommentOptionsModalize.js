"use client";

import React from "react";
import { View, StyleSheet, Pressable } from "react-native-web";
import MyText from "../common/MyText";
import Delete from "../../../public/svg/community/Delete";
import CopyLink from "../../../public/svg/community/CopyLink";
import { white } from "@/constants/theme/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  updateReportPostModalVisible,
  updateModalPost,
  updateDeletePostModalVisible,
  updateCommentMoreOptions,
} from "@/store/slices/common-slice";
import ReportIcon from "../../../public/svg/community/ReportIcon";
import Modal from "react-modal";
import { customStyles } from "./utils";

const CommentOptionsModalize = ({ modalizeRef }) => {
  const dispatch = useDispatch();

  const { moreOptionsComment } = useSelector((state) => state.common);
  const { user_id: currentUserId } = useSelector((state) => state.userSlice);

  let options = [];
  if (moreOptionsComment.user_id === currentUserId) {
    options = ["Delete"];
  }

  const OptionsObj = {
    Report: {
      title: "Report",
      onClick: () => {
        dispatch(updateModalPost(moreOptionsComment));
        dispatch(updateReportPostModalVisible(true));
      },
      icon: <ReportIcon />,
    },
    Delete: {
      title: "Delete",
      onClick: () => {
        dispatch(updateModalPost(moreOptionsComment));
        dispatch(updateDeletePostModalVisible(true));
      },
      color: "#EF6D6D",
      icon: <Delete />,
    },
  };

  const RenderItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          item.onClick();
        }}
        style={{
          paddingVertical: 15,
          paddingLeft: 24,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor:
            index % 2 == 0 ? "rgba(255,255,255,0.2)" : "transparent",
        }}>
        {item?.icon ? item.icon : <CopyLink />}
        <MyText
          textTransform={"capitalize"}
          color={item?.color ? item.color : white}>
          {item.title}
        </MyText>
      </Pressable>
    );
  };

  return (
    <Modal
      isOpen={() => {}}
      onRequestClose={() =>
        dispatch(
          updateCommentMoreOptions({
            show: false,
            comment: {},
          })
        )
      }
      shouldCloseOnOverlayClick={true}
      style={customStyles(110)}>
      <View>
        <View style={{ marginHorizontal: 15 }}>
          <MyText fontSize={16} mv={20}>
            More actions for this comment
          </MyText>
        </View>

        {options?.map((item, index) => {
          return (
            <RenderItem item={OptionsObj[item]} index={index} key={index} />
          );
        })}
      </View>
    </Modal>
  );
};

export default CommentOptionsModalize;

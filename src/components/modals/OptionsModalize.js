"use client";

import React from "react";
import { View, Pressable } from "react-native-web";
import Modal from "react-modal";
import MyText from "../common/MyText";
import Delete from "../../../public/svg/community/Delete";
import CopyLink from "../../../public/svg/community/CopyLink";
import { white } from "@/constants/theme/colors";
import {
  DEEPLINK_NORMAL_POST_URL,
  DEEPLINK_REELS_URL,
} from "@/constants/StaticData";
// import Clipboard from "@react-native-clipboard/clipboard";
// import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePostMoreOptions,
  updateReportPostModalVisible,
  updateModalPost,
  updateDeletePostModalVisible,
} from "@/store/slices/common-slice";
import ReportIcon from "../../../public/svg/community/ReportIcon";
import { customStyles } from "./utils";

const OptionsModalize = ({ modalizeRef }) => {
  const dispatch = useDispatch();

  const { moreOptionsPost } = useSelector((state) => state.common);
  const { id: currentUserId } = useSelector((state) => state.userSlice);

  let options = ["CopyLink", "Report"];
  if (moreOptionsPost.user_id === currentUserId) {
    options = ["CopyLink", "Delete"];
  }

  const OptionsObj = {
    CopyLink: {
      title: "Copy link",
      onClick: () => {
        // if (moreOptionsPost?.media_type === "video") {
        //   Clipboard.setString(
        //     `${DEEPLINK_REELS_URL}?postId=${moreOptionsPost.id}&mediaType=${moreOptionsPost?.media_type}`
        //   );
        // } else {
        //   Clipboard.setString(
        //     `${DEEPLINK_NORMAL_POST_URL}?postId=${moreOptionsPost.id}&mediaType=${moreOptionsPost?.media_type}`
        //   );
        // }
        // Toast.show({
        //   type: "successnotifies",
        //   visibilityTime: 2000,
        //   props: {
        //     content: "Link Copied Successfully",
        //   },
        // });
      },
      icon: <CopyLink />,
    },
    Report: {
      title: "Report",
      onClick: () => {
        dispatch(updateModalPost(moreOptionsPost));
        dispatch(updateReportPostModalVisible(true));
      },
      icon: <ReportIcon />,
    },
    Delete: {
      title: "Delete",
      onClick: () => {
        dispatch(updateModalPost(moreOptionsPost));
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
          modalizeRef?.current?.close();
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
          updatePostMoreOptions({
            show: false,
            post: {},
          })
        )
      }
      shouldCloseOnOverlayClick={true}
      style={customStyles(160)}>
      <View>
        <View style={{ marginHorizontal: 15 }}>
          <MyText fontSize={16} mv={20}>
            More actions for this post
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

export default OptionsModalize;

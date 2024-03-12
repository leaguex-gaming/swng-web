"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { StyleSheet, View } from "react-native-web";
import { SearchContextManager } from "@giphy/react-components";
import GiphyModal from "./GiphyModal";
import { GIPHY_KEY } from "@/constants/StaticData";
import { useDispatch, useSelector } from "react-redux";
import { windowMaxWidth } from "@/constants/DeviceData";
import { useRef } from "react";
import DeleteModalize from "./DeleteModalize";
import ReportModalize from "./ReportModal";
import OptionsModalize from "./OptionsModalize";
import CommentOptionsModalize from "./CommentOptionsModalize";

function Modals() {
  const dispatch = useDispatch();
  const {
    networkConnected,
    signupFrom,
    deeplinkURL,
    apiLoading,
    toastContent,
    currentRoute,
    showPostMoreOptions,
    showCommentMoreOptions,
    deletePostModalVisible,
    reportPostModalVisible,
    closeAppModalVisible,
    gifModalVisible,
  } = useSelector((state) => state.common);

  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");

  const signupModalizeRef = useRef(null);
  const postMoreOptionsRef = useRef(null);
  const gifModalizeRef = useRef();
  const commentMoreOptionsRef = useRef(null);

  console.log(showCommentMoreOptions);
  return (
    <>
      {showPostMoreOptions && (
        <View style={[styles.modalContainer]}>
          <OptionsModalize modalizeRef={postMoreOptionsRef} />
        </View>
      )}

      {showCommentMoreOptions && (
        <View style={[styles.modalContainer]}>
          <CommentOptionsModalize modalizeRef={commentMoreOptionsRef} />
        </View>
      )}

      {gifModalVisible && (
        <View style={[styles.modalContainer]}>
          <SearchContextManager apiKey={GIPHY_KEY}>
            <GiphyModal />
          </SearchContextManager>
        </View>
      )}

      {deletePostModalVisible && <DeleteModalize />}

      {reportPostModalVisible && <ReportModalize />}
    </>
  );
}

const styles = StyleSheet.create({
  noInternetContainer: {
    backgroundColor: "#000",
    height: "100%",
    width: windowMaxWidth,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 1,
  },
  modalContainer: {
    width: windowMaxWidth,
    height: "100%",
    justifyContent: "flex-end",
    position: "absolute",
  },
});

export default Modals;

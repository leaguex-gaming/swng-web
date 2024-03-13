import React, { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, BackHandler } from "react-native-web";
import MyText from "../common/MyText";
import { reportPost } from "@/store/thunks/community";
import { windowMaxHeight, windowMaxWidth } from "@/constants/DeviceData";
import MyButton from "../common/MyButton";
import { useDispatch, useSelector } from "react-redux";
import { updateReportPostModalVisible } from "@/store/slices/common-slice";
import Checkbox from "../common/Checkbox";
import { blackOpacity } from "@/constants/theme/colors";

const REPORT_LIST = [
  "This post is not related to sports",
  "Inappropriate content",
  "Spam Content",
];

const Backend_Mapping = ["NOT_SPORT_RELATED", "INAPPROPRIATE", "SPAM"];

const ReportListItem = ({ title, onPress, index, reportContentArray }) => {
  return (
    <Pressable onPress={onPress} style={styles.reportListItem}>
      <Checkbox checked={reportContentArray.includes(index)} />
      <MyText color="white" fontSize={16} ml={10}>
        {title}
      </MyText>
    </Pressable>
  );
};

const ReportModalize = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.common.modalPost?.id);

  const [reportContentArray, setReportContentArray] = useState([]);

  const { reportPostLoading } = useSelector((state) => state.community);
  const { profile_photo_small, team_name } = useSelector(
    (state) => state.userSlice
  );

  const onReportPost = async () => {
    const reportContent = reportContentArray.map(
      (item) => Backend_Mapping[item]
    );

    await dispatch(
      reportPost({
        postId: id,
        reason: reportContent?.join(","),
      })
    );

    dispatch(updateReportPostModalVisible(false));
  };

  useEffect(() => {
    let backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      dispatch(updateReportPostModalVisible(false));
      return false;
    });

    if (reportPostLoading) {
      backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
        return true;
      });
    }
    return () => backHandler?.remove();
  }, [reportPostLoading]);

  const onCheckBoxClick = (index) => {
    if (reportContentArray.includes(index)) {
      setReportContentArray(
        reportContentArray.filter((item) => item !== index)
      );
    } else {
      setReportContentArray([...reportContentArray, index]);
    }
  };

  return (
    <Pressable
      style={styles.outerContainer}
      onPress={() => {
        dispatch(updateReportPostModalVisible(false));
      }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <MyText pageHeaders>Report this post</MyText>
          <MyText textAlign={"center"} pb={20}>
            Choose what's wrong with this post
          </MyText>
          <View>
            {REPORT_LIST.map((item, index) => {
              return (
                <ReportListItem
                  title={item}
                  key={index}
                  onPress={() => onCheckBoxClick(index)}
                  index={index}
                  reportContentArray={reportContentArray}
                />
              );
            })}
          </View>
          <View style={styles.buttonContainer}>
            <MyButton
              label="Cancel"
              width={windowMaxWidth > 500 ? 210 : (windowMaxWidth - 140) / 2}
              height={40}
              mv={10}
              onPress={() => {
                if (!reportPostLoading) {
                  dispatch(updateReportPostModalVisible(false));
                }
              }}
              buttonTextSize={14}
              backgroundColor={"#535353"}
              buttonColor={"white"}
            />
            <MyButton
              label="Report"
              loading={reportPostLoading}
              width={windowMaxWidth > 500 ? 210 : (windowMaxWidth - 140) / 2}
              height={40}
              disabled={reportContentArray.length === 0}
              mv={10}
              onPress={() => onReportPost()}
              disableOpacity={0.75}
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
    borderColor: "rgba(255, 255, 255, 0.6)",
    width: windowMaxWidth - 40,
    maxWidth: 500,
  },
  buttonContainer: {
    width: windowMaxWidth - 120,
    maxWidth: 450,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: -30,
  },
  reportListItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default ReportModalize;

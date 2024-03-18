"use client";

import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native-web";
import Modal from "react-modal";
import MyText from "../common/MyText";
import { windowMaxWidth } from "@/constants/DeviceData";
import InputBox from "../../../public/svg/InputBox";
import { white } from "@/constants/theme/colors";
import { customStyles } from "./utils";

const SelectSubTopicModalize = ({
  selectSubTopicModalize,
  setselectSubTopicModalize = () => {},
  selectedSubTopic,
  setSubTopic = () => {},
  subtopics = [],
  selectedTopic,
}) => {
  const [subTopic, setsubTopic] = useState("");

  const RenderItem = ({ item, index }) => {
    return (
      <>
        {item?.subtopic_name?.toLowerCase().search(subTopic?.toLowerCase()) !==
          -1 && (
          <Pressable
            onPress={() => {
              setSubTopic(item);
              setselectSubTopicModalize(false);
            }}
            style={{
              paddingVertical: 15,
              paddingLeft: 24,
              backgroundColor:
                selectedSubTopic.subtopic_id === item.subtopic_id
                  ? "#207EE6"
                  : index % 2 == 0
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
            }}>
            <MyText textTransform={"capitalize"}>{item.subtopic_name}</MyText>
          </Pressable>
        )}
      </>
    );
  };

  return (
    <Modal
      shouldCloseOnOverlayClick={true}
      style={customStyles(400, 0, "linear-gradient(to bottom,#525252, #525252")}
      isOpen={selectSubTopicModalize}
      onRequestClose={() => setselectSubTopicModalize(false)}>
      <View style={{ height: "100%" }}>
        <View style={{ marginHorizontal: 15 }}>
          <View style={{ flexDirection: "row", gap: 5 }}>
            <MyText fontSize={16} mt={20}>
              Select a Topic in
            </MyText>

            <MyText
              style={{ fontFamily: "ProductSans-Bold" }}
              fontSize={20}
              mt={15}
              color={"#207EE6"}>
              {selectedTopic?.topic_name?.toLowerCase()}
            </MyText>
          </View>
          <View style={[styles.inputContainer]}>
            <InputBox style={styles.inputBoxContainer} />

            <input
              placeholder="Search Topic"
              style={{
                outline: "none",
                width: "100%",
                height: "100%",
                border: "0px",
                backgroundColor: "transparent",
                fontWeight: 100,
                color: white,
                fontSize: 14,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
                zIndex: 1,
              }}
              value={subTopic}
              className="font-regular placeholder-stone-300"
              onChange={(e) => setsubTopic(e.target.value)}></input>
          </View>
        </View>

        {subtopics?.map((item, index) => {
          return <RenderItem item={item} index={index} key={index} />;
        })}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: 40,
    width: windowMaxWidth - 40,
    overflow: "hidden",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginVertical: 20,
  },
  inputBoxContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    fontFamily: "ProductSans-Regular",
    color: white,
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -2,
    paddingHorizontal: 10,
  },
});

export default SelectSubTopicModalize;

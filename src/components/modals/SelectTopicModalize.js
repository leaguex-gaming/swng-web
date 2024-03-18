"use client";

import React from "react";
import { View, Pressable, FlatList } from "react-native-web";
import Modal from "react-modal";
import { LinearGradientBackground } from "../common/MyBackground";
import MyText from "../common/MyText";
import { useSelector } from "react-redux";
import Kabaddi from "../../../public/svg/Kabaddi";
import { customStyles } from "./utils";
import Image from "next/image";
import { windowMaxWidth } from "@/constants/DeviceData";

const SelectTopicModalize = ({
  selectTopicModalize,
  setselectTopicModalize = () => {},
  selectedTopic,
  setTopic = () => {},
  setSubTopic,
}) => {
  const sportsTypes = useSelector((state) => state.community.topics);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          setTopic(item);
          setSubTopic("");
          setselectTopicModalize(false);
        }}
        style={{
          paddingVertical: 14,
          backgroundColor:
            selectedTopic.topic_id === item.topic_id ? "#207EE6" : "#404040",
          width: (windowMaxWidth - 60) / 3,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8,
          marginHorizontal: index % 3 === 1 ? 15 : 0,
        }}>
        {item.topic_name === "KABADDI" ? (
          <Kabaddi width={35} height={35} />
        ) : (
          <Image src={item.image_url} width={35} height={35} />
        )}
        <MyText textTransform={"capitalize"} mt={10} buttonText>
          {item.topic_name}
        </MyText>
      </Pressable>
    );
  };

  return (
    <Modal
      shouldCloseOnOverlayClick={true}
      style={customStyles(540, 0)}
      isOpen={selectTopicModalize}
      onRequestClose={() => setselectTopicModalize(false)}>
      <LinearGradientBackground
        colors={["#525252", "#525252"]}
        containerStyle={{
          padding: 15,
        }}>
        <MyText fontSize={16} mb={16}>
          This post related to
        </MyText>

        <FlatList
          data={sportsTypes}
          numColumns={3}
          keyExtractor={(item) => item.topic_id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          renderItem={renderItem}></FlatList>
      </LinearGradientBackground>
    </Modal>
  );
};

export default SelectTopicModalize;

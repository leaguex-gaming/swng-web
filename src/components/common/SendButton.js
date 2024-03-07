import React from "react";
import { ActivityIndicator, Pressable } from "react-native-web";
import SendCommentButton from "../../../public/svg/SendCommentButton";

const SendButton = ({
  loading = false,
  onPress = () => {},
  disabled = false,
}) => {
  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={{
        width: 36,
        backgroundColor: "#2FBC32",
        height: 36,

        justifyContent: "center",
        alignItems: "center",
        borderRadius: 18,
      }}>
      {!loading ? (
        <SendCommentButton size={32} />
      ) : (
        <ActivityIndicator color={"white"}></ActivityIndicator>
      )}
    </Pressable>
  );
};

export default SendButton;

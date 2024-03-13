import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native-web";
import { searchUsersThunk } from "@/store/thunks/community";
import UserCard from "../common/UserCard";
import { useDispatch } from "react-redux";
import { postBackground, theme } from "@/constants/theme/colors";
import { windowMaxWidth } from "@/constants/DeviceData";

const MentionModal = ({ fullScreenPost, search, onUserPress = () => {} }) => {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const getUsers = async () => {
    if (search) {
      const res = dispatch(searchUsersThunk({ search: search, size: 10 }));
      const data = await res.unwrap();
      setUsers(data?.users || []);
    }
  };

  useEffect(() => {
    if (search.length === 0) {
      setUsers([]);
    } else {
      getUsers();
    }
  }, [search]);

  if (search) {
    return (
      <View
        style={StyleSheet.flatten([
          styles.outerContainer,
          !fullScreenPost && { left: -20 },
        ])}
        onPress={() => {}}>
        <FlatList
          data={users}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"handled"}
          keyExtractor={(item, index) => item?.id?.toString()}
          renderItem={({ item, index }) => (
            <UserCard
              user={item}
              onUserPress={onUserPress}
              disableProfileRoute={true}
            />
          )}></FlatList>
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  outerContainer: {
    width: windowMaxWidth,
    maxHeight: 200,
    zIndex: 10,
    position: "absolute",
    bottom: 50,
    overflow: "scroll",
    backgroundColor: postBackground[theme],
    padding: 5,
  },
  container: {
    width: windowMaxWidth,
    backgroundColor: postBackground[theme],
  },
});

export default MentionModal;

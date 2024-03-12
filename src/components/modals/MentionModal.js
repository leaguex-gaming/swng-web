import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-web";
import { searchUsersThunk } from "@/store/thunks/community";
import UserCard from "../common/UserCard";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { customStyles } from "./utils";

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
      <Modal
        isOpen={() => {}}
        shouldCloseOnOverlayClick={true}
        style={customStyles(300, fullScreenPost ? 60 : 0)}>
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
      </Modal>
    );
  } else {
    return <></>;
  }
};

export default MentionModal;

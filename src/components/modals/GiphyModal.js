"use client";

import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native-web";
import Header from "../common/Header";
import { BackButton } from "../common/InBuiltNavigation";
import { postBackground, theme, white } from "@/constants/theme/colors";
import { windowMaxWidth } from "@/constants/DeviceData";
import { useDispatch } from "react-redux";
import { updateGiphyCommentMediaURL } from "@/store/slices/community-slice";
import { updateGifModalVisible } from "@/store/slices/common-slice";
import {
  Grid, // our UI Component to display the results
  SearchBar, // the search bar the user will type into
  SearchContext, // the context that wraps and connects our components
} from "@giphy/react-components";

export const customStyles = {
  overlay: {
    backgroundColor: "transparent",
  },
  content: {
    width: windowMaxWidth,
    height: 160,
    left: "50%",
    top: window.innerHeight - 160,
    transform: "translate(-50%, 0)",
    bottom: 0,
    padding: 0,
    border: 0,
    background: postBackground[theme],
    borderRadius: 0,
  },
};

const GiphyModal = ({ modalizeRef }) => {
  const { fetchGifs, searchKey } = useContext(SearchContext);
  const [rendered, setRendered] = useState(false);

  const dispatch = useDispatch();

  const closeGIFModal = () => {
    dispatch(updateGifModalVisible(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setRendered(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <>
          {rendered && (
            <View style={styles.container}>
              <Header
                backgroundColor={postBackground[theme]}
                leftComponent={
                  <BackButton
                    onPress={() => {
                      dispatch(updateGifModalVisible(false));
                    }}
                  />
                }
                headerText={`Post GIF`}></Header>

              <View
                style={{
                  marginBottom: 20,
                  marginHorizontal: 20,
                  width: windowMaxWidth - 40,
                }}>
                <SearchBar theme={"dark"} />
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Grid
                  key={searchKey}
                  columns={3}
                  onGifClick={(gif, e) => {
                    e.preventDefault();

                    dispatch(
                      updateGiphyCommentMediaURL(gif?.images?.downsized?.url)
                    );
                    closeGIFModal();
                  }}
                  width={windowMaxWidth}
                  fetchGifs={fetchGifs}
                  style={{ marginTop: 20 }}
                />
              </ScrollView>
            </View>
          )}
        </>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowMaxWidth,
    height: "65vh",
    alignItems: "center",
    backgroundColor: postBackground[theme],
  },
  inputContainer: {
    height: 54,
    width: windowMaxWidth - 40,
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 20,
  },
  inputBoxContainer: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  input: {
    fontFamily: "ProductSans-Regular",
    color: white,
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -2,
    paddingHorizontal: 10,
  },
});

export default GiphyModal;
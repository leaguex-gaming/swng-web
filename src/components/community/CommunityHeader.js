"use client";

import React from "react";
import Header from "../common/Header";
import { StyleSheet, View } from "react-native-web";
import Search from "../../../public/svg/Search";
import { PolygonContainer } from "../common/InBuiltNavigation";
import AppLogo from "../../../public/images/swng.png";
import Image from "next/image";

const CommunityHeader = () => {
  return (
    <Header
      containerStyle={{ alignItems: "flex-start" }}
      leftComponent={
        <View style={styles.logoContainer}>
          <Image src={AppLogo} style={styles.swngLogo}></Image>
        </View>
      }
      // rightComponent={
      //   <PolygonContainer
      //     rotate={true}
      //     onPress={() => {
      //       // rootNavigate("Search", "navigate");
      //     }}>
      //     <View style={styles.searchContainer}>
      //       <Search />
      //     </View>
      //     <></>
      //   </PolygonContainer>
      // }
    />
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: "relative",
    left: 22,
    top: 18,
    transform: [{ rotate: "90deg" }],
  },
  swngLogo: {
    width: 150,
    height: 70,
    objectFit: "contain",
  },
  logoContainer: {
    marginHorizontal: 16,
    justifyContent: "center",
  },
});

export default CommunityHeader;

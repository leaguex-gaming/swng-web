"use client";

import React, { useState } from "react";
import { Pressable } from "react-native-web";
import { useDispatch, useSelector } from "react-redux";
import { updateSignupFrom } from "@/store/slices/common-slice";

function DoubleTapHandler({
  singleTapAction = () => {},
  doubleTapAction = () => {},
  children,
  ...props
}) {
  const [singleTapTimeout, setSingleTapTimeout] = useState(null);
  const { is_guest } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const handlePress = () => {
    if (is_guest) {
      if (singleTapTimeout) {
        // If there is a single tap timeout, it means there was a previous single tap.
        // So, this is a double tap.
        clearTimeout(singleTapTimeout);
        dispatch(updateSignupFrom("default"));
        setSingleTapTimeout(null);
      } else {
        // No single tap timeout, so this is the first tap.
        // Set a timeout to detect a double tap.
        const timeout = setTimeout(() => {
          dispatch(updateSignupFrom("default"));
        }, 300); // Adjust the timeout duration as needed for your application.
        setSingleTapTimeout(timeout);
      }
    } else {
      if (singleTapTimeout) {
        // If there is a single tap timeout, it means there was a previous single tap.
        // So, this is a double tap.
        clearTimeout(singleTapTimeout);
        doubleTapAction();
        setSingleTapTimeout(null);
      } else {
        // No single tap timeout, so this is the first tap.
        // Set a timeout to detect a double tap.
        const timeout = setTimeout(() => {
          singleTapAction();

          setSingleTapTimeout(null);
        }, 300); // Adjust the timeout duration as needed for your application.
        setSingleTapTimeout(timeout);
      }
    }
  };

  return (
    <Pressable onPress={handlePress} {...props}>
      {children}
    </Pressable>
  );
}

export default DoubleTapHandler;

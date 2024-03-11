"use client";

import React, { useEffect, useRef } from "react";
import Loader from "../../../public/lottie/sports-ball-loader.json";
import dynamic from "next/dynamic";
import lottie from "lottie-web";

const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

export const LottieView = ({
  source = Loader,
  loop = false,
  style = { width: "100%", height: "100%" },
  autoPlay = true,
}) => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      animationData: source,
      loop: loop,
      autoplay: autoPlay,
    });
  }, [source]);

  return <div ref={container} style={style}></div>;
};

const LottieLoader = ({ width = 50, height = 50 }) => {
  return (
    <LottieView
      style={{ height: height, width: width }}
      source={require("../../../public/lottie/sports-ball-loader.json")}
      autoPlay={true}
      loop={true}
    />
  );
};

export default LottieLoader;

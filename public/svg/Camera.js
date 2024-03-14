import * as React from "react";
import { ActivityIndicator, View } from "react-native-web";

function Camera({ width = 22, height = 22 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.857 10.53c-.64 0-1.16.52-1.16 1.16 0 .64.52 1.161 1.16 1.161.64 0 1.161-.52 1.161-1.16 0-.64-.52-1.161-1.16-1.161zm0 3.869A2.711 2.711 0 017.15 11.69a2.711 2.711 0 012.708-2.709 2.711 2.711 0 012.709 2.709 2.711 2.711 0 01-2.709 2.708zM8.31 5.113c0-.213.174-.387.387-.387h2.321c.213 0 .387.174.387.387v1.16H8.31v-1.16zm6.964 1.16h-2.321v-1.16a1.937 1.937 0 00-1.935-1.934H8.697a1.937 1.937 0 00-1.935 1.934v1.16H4.441a2.324 2.324 0 00-2.322 2.322v6.19a2.324 2.324 0 002.322 2.322h10.833a2.324 2.324 0 002.321-2.321v-6.19a2.324 2.324 0 00-2.321-2.322z"
        fill="#ffffffAA"
      />
      <mask
        id="a"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={3}
        width={16}
        height={15}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.857 10.53c-.64 0-1.16.52-1.16 1.16 0 .64.52 1.161 1.16 1.161.64 0 1.161-.52 1.161-1.16 0-.64-.52-1.161-1.16-1.161zm0 3.869A2.711 2.711 0 017.15 11.69a2.711 2.711 0 012.708-2.709 2.711 2.711 0 012.709 2.709 2.711 2.711 0 01-2.709 2.708zM8.31 5.113c0-.213.174-.387.387-.387h2.321c.213 0 .387.174.387.387v1.16H8.31v-1.16zm6.964 1.16h-2.321v-1.16a1.937 1.937 0 00-1.935-1.934H8.697a1.937 1.937 0 00-1.935 1.934v1.16H4.441a2.324 2.324 0 00-2.322 2.322v6.19a2.324 2.324 0 002.322 2.322h10.833a2.324 2.324 0 002.321-2.321v-6.19a2.324 2.324 0 00-2.321-2.322z"
          fill="#ffffffAA"
        />
      </mask>
      <g mask="url(#a)">
        <path d="M0.571533 0.857178H19.142933V19.428578H0.571533z" />
      </g>
    </svg>
  );
}

export const CameraIconRound = ({
  width = 22,
  height = 22,
  loading = false,
}) => {
  const size = width;
  const smallSize = size * 0.65;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        justifyContent: "center",
        borderColor: "white",
        alignItems: "center",
      }}>
      <View>
        {!loading ? (
          <View
            style={{
              backgroundColor: "white",
              width: smallSize,
              height: smallSize,
              borderRadius: smallSize / 2,
            }}></View>
        ) : (
          <ActivityIndicator size="small" color="white" />
        )}
      </View>
    </View>
  );
};
export default Camera;

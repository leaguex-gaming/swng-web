import * as React from "react";

function Plus({ width = 16, height = 16, fill = "#fff", ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.667 7.333h-4v-4a.666.666 0 10-1.334 0v4h-4a.666.666 0 100 1.334h4v4a.666.666 0 101.334 0v-4h4a.666.666 0 100-1.334z"
        fill={props.color || "#fff"}
      />
      <mask
        id="a"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={2}
        width={12}
        height={12}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.667 7.333h-4v-4a.666.666 0 10-1.334 0v4h-4a.666.666 0 100 1.334h4v4a.666.666 0 101.334 0v-4h4a.666.666 0 100-1.334z"
          fill={props.color || "#fff"}
        />
      </mask>
      <g mask="url(#a)">
        <path d="M0 0H16V16H0z" />
      </g>
    </svg>
  );
}

export default Plus;

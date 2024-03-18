import * as React from "react";

function ChevronDown({ width = 17, height = 16, ...props }) {
  return (
    <svg
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g opacity={0.8}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.5 10.333a.665.665 0 01-.471-.195L5.362 7.471a.666.666 0 11.943-.942l2.203 2.203 2.195-2.12a.667.667 0 01.927.96l-2.667 2.574a.665.665 0 01-.463.187z"
          fill={props.color || "#fff"}
        />
        <mask
          id="a"
          style={{
            maskType: "luminance",
          }}
          maskUnits="userSpaceOnUse"
          x={5}
          y={6}
          width={7}
          height={5}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.5 10.333a.665.665 0 01-.471-.195L5.362 7.471a.666.666 0 11.943-.942l2.203 2.203 2.195-2.12a.667.667 0 01.927.96l-2.667 2.574a.665.665 0 01-.463.187z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#a)">
          <path d="M0.5 0H16.5V16H0.5z" />
        </g>
      </g>
    </svg>
  );
}

export default ChevronDown;

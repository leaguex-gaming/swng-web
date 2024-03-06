import * as React from "react";

const PolygonComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={80}
    height={80}
    fill="none"
    preserveAspectRatio="none"
    {...props}>
    <g filter="url(#a)">
      <path fill="url(#b)" d="M4.594 0h67.5l-11.5 43.5-56 22V0Z" />
    </g>
    <defs>
      <linearGradient
        id="b"
        x1={60.594}
        x2={4.594}
        y1={49.5}
        y2={0}
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#75AECF" />
        <stop offset={1} stopColor="#0007BA" />
      </linearGradient>
      <filter
        id="a"
        width={100}
        height={100}
        x={0.594}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.36 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_0_9" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_0_9"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default PolygonComponent;

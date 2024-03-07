import * as React from "react";

function MutedIcon(props) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g>
        <circle cx={25} cy={25} r={25} fill="#fff" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M25 50c13.807 0 25-11.193 25-25S38.807 0 25 0 0 11.193 0 25s11.193 25 25 25zm-2.412-12.812l-8.888-7.17-5.24-.185c-.46-.016-.733-.384-.733-.817V19.68c0-.436.358-.768.79-.755l5.183-.185 8.93-7.203c.518-.416 1.234-.03 1.234.631v24.465c0 .667-.797.999-1.276.556z"
          fill="#000"
          opacity={0.7}
        />
        <path
          d="M33.136 25L37 21.136a.932.932 0 10-1.318-1.317l-3.864 3.863-3.864-3.863a.931.931 0 10-1.317 1.317L30.5 25l-3.864 3.864a.931.931 0 101.317 1.317l3.864-3.863 3.864 3.863a.929.929 0 001.318 0 .931.931 0 000-1.317L33.136 25z"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

export default MutedIcon;

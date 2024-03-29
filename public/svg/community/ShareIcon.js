import * as React from "react";

function ShareIcon(props) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 12.667a.667.667 0 110-1.334.667.667 0 010 1.334zm-8.667-4a.667.667 0 110-1.334.667.667 0 010 1.334zM12 3.333a.667.667 0 110 1.334.667.667 0 010-1.334zM12 10c-.545 0-1.038.22-1.4.574l-5.29-2.35c.01-.075.023-.148.023-.224 0-.076-.014-.15-.022-.223l5.29-2.351C10.962 5.78 11.455 6 12 6c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2c0 .076.014.15.023.223l-5.29 2.351A1.994 1.994 0 003.333 6c-1.102 0-2 .897-2 2s.898 2 2 2c.545 0 1.038-.22 1.4-.574l5.29 2.35c-.009.075-.023.148-.023.224 0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2z"
        fill="#fff"
      />
      <mask
        id="a"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={1}
        y={2}
        width={22}
        height={22}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 12.667a.667.667 0 110-1.334.667.667 0 010 1.334zm-8.667-4a.667.667 0 110-1.334.667.667 0 010 1.334zM12 3.333a.667.667 0 110 1.334.667.667 0 010-1.334zM12 10c-.545 0-1.038.22-1.4.574l-5.29-2.35c.01-.075.023-.148.023-.224 0-.076-.014-.15-.022-.223l5.29-2.351C10.962 5.78 11.455 6 12 6c1.103 0 2-.897 2-2s-.897-2-2-2-2 .897-2 2c0 .076.014.15.023.223l-5.29 2.351A1.994 1.994 0 003.333 6c-1.102 0-2 .897-2 2s.898 2 2 2c.545 0 1.038-.22 1.4-.574l5.29 2.35c-.009.075-.023.148-.023.224 0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2z"
          fill="#fff"
        />
      </mask>
      <g mask="url(#a)">
        <path d="M0 0H16V16H0z" />
      </g>
    </svg>
  );
}

export default ShareIcon;

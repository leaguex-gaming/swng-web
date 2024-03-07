import * as React from "react";

function UnMutedIcon(props) {
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
          d="M25 50c13.807 0 25-11.193 25-25S38.807 0 25 0 0 11.193 0 25s11.193 25 25 25zm3.043-12.474l-8.888-7.17-5.241-.186c-.459-.016-.732-.384-.732-.816v-9.337c0-.436.358-.768.79-.755l5.183-.186 8.93-7.203c.517-.416 1.233-.029 1.233.632V36.97c0 .666-.797.998-1.275.556zm2.424-7.645c4.232-2.125 4.232-8.209 0-10.333v1.311c2.72 1.829 2.72 5.882 0 7.71v1.312zm1.216-13.707c6.998 3.514 6.998 13.567 0 17.08v-2.166c4.496-3.023 4.496-9.725 0-12.747v-2.167z"
          fill="#000"
          opacity={0.7}
        />
      </g>
    </svg>
  );
}

export default UnMutedIcon;

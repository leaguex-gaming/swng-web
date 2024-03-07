import * as React from "react";

function PlayIcon(props) {
  return (
    <svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g opacity={0.5}>
        <circle cx={25} cy={25} r={25} fill="#fff" />
        <path
          d="M25 0C11.167 0 0 11.167 0 25s11.167 25 25 25 25-11.167 25-25S38.833 0 25 0zm8.278 26.111l-11.945 8.611c-.889.667-2.166 0-2.166-1.11V16.388c0-1.111 1.277-1.778 2.166-1.111l11.945 8.61a1.35 1.35 0 010 2.223z"
          fill="#000"
        />
      </g>
    </svg>
  );
}

export default PlayIcon;

// <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
// <g opacity="0.5">
// <circle cx="25" cy="25" r="25" fill="white"/>
// <path d="M25 0C11.1667 0 0 11.1667 0 25C0 38.8333 11.1667 50 25 50C38.8333 50 50 38.8333 50 25C50 11.1667 38.8333 0 25 0ZM33.2778 26.1111L21.3333 34.7222C20.4444 35.3889 19.1667 34.7222 19.1667 33.6111V16.3889C19.1667 15.2778 20.4444 14.6111 21.3333 15.2778L33.2778 23.8889C34.0556 24.4444 34.0556 25.5556 33.2778 26.1111Z" fill="black"/>
// </g>
// </svg>

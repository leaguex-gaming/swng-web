import * as React from "react";

function MedalIcon(props) {
  return (
    <svg
      width={15}
      height={20}
      viewBox="0 0 15 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M3.994 9.52a5.713 5.713 0 106.299 0l3.928-8.506A.714.714 0 0013.57 0H9.286a.714.714 0 00-.65.414L7.143 3.65 5.651.414A.714.714 0 005 0H.716a.714.714 0 00-.65 1.014L3.994 9.52zm7.434 4.763a4.285 4.285 0 11-8.57 0 4.285 4.285 0 018.57 0zM9.743 1.428h2.714L9.015 8.891a5.485 5.485 0 00-2.586-.271l3.314-7.192zm-5.2 0l1.815 3.928L5 8.291 1.83 1.428h2.714z"
        fill="#fff"
        opacity={0.8}
      />
    </svg>
  );
}

export default MedalIcon;

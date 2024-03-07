import * as React from "react";

function Hamburger(props) {
  return (
    <svg
      width={4}
      height={14}
      viewBox="0 0 4 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M3.474 1.474a1.474 1.474 0 10-2.948 0 1.474 1.474 0 002.948 0zm0 5.526A1.474 1.474 0 10.526 7a1.474 1.474 0 002.948 0zm0 5.526a1.474 1.474 0 10-2.948 0 1.474 1.474 0 002.948 0z"
        fill="#fff"
      />
    </svg>
  );
}

export default Hamburger;

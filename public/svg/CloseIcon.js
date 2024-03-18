import * as React from "react";

function CloseIcon(props) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.296 6l3.935-3.935A.916.916 0 109.935.769L6 4.704 2.065.769A.916.916 0 10.769 2.065L4.704 6 .769 9.935a.916.916 0 101.296 1.296L6 7.296l3.935 3.935a.914.914 0 001.296 0 .916.916 0 000-1.296L7.296 6z"
        fill="#000"
      />
    </svg>
  );
}

export default CloseIcon;

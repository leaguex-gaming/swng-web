import * as React from "react";

function InputBox(props) {
  return (
    <svg
      width={1500}
      height={54}
      viewBox="0 0 1500 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M0 8c0-4.418 3.817-8 8.525-8H1500l-19.25 48.779c-1.24 3.138-4.43 5.221-7.99 5.221H8.525C3.817 54 0 50.418 0 46V8z"
        fill={props.color || "#FFFFFF40"}
      />
    </svg>
  );
}

export default InputBox;

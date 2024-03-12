import * as React from "react";

function OtpBox(props) {
  const color = props.fill || "#FFFFFF40";

  return (
    <svg
      width="70"
      height="54"
      viewBox="0 0 70 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}>
      <path
        d="M0 8C0 3.58172 3.58172 0 8 0H70L51.9339 48.7785C50.7715 51.9168 47.7786 54 44.4319 54H8C3.58172 54 0 50.4183 0 46V8Z"
        fill={color}
      />
      {props.stroke && (
        <path
          d="M8 0.5H69.2816L51.465 48.6049C50.3753 51.547 47.5694 53.5 44.4319 53.5H8C3.85787 53.5 0.5 50.1421 0.5 46V8C0.5 3.85786 3.85786 0.5 8 0.5Z"
          stroke="white"
          stroke-opacity="0.5"
        />
      )}
    </svg>
  );
}

export default OtpBox;

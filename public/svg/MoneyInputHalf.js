import * as React from "react";

function MoneyInputHalf({ width = 28, height = 54, fill = "#fff", ...props }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="1 0 28 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}>
      <path d="M0 0h28L9.934 48.779A8 8 0 012.432 54H0V0z" fill={fill} />
    </svg>
  );
}

export default MoneyInputHalf;

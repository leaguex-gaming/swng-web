import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}>
    <path
      fill="#fff"
      d="M1.592.788a.833.833 0 0 0-.744 1.144l2.877 7.19h6.233a.834.834 0 1 1 0 1.668H3.724L.848 17.98a.833.833 0 0 0 1.15 1.05l16.663-8.326a.833.833 0 0 0 0-1.496L1.999.881a.833.833 0 0 0-.407-.093Z"
    />
  </svg>
);
export default SvgComponent;

import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={7}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      stroke="#fff"
      strokeWidth={0.4}
      d="M3.484 14.684a2.684 2.684 0 1 0 0-5.368 2.684 2.684 0 0 0 0 5.368ZM3.484 23.2a2.684 2.684 0 1 0 0-5.368 2.684 2.684 0 0 0 0 5.368ZM3.484 6.168a2.684 2.684 0 1 0 0-5.368 2.684 2.684 0 0 0 0 5.368Z"
    />
  </svg>
)
export default SvgComponent

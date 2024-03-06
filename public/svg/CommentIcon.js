import * as React from "react"
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#121212"
      fillRule="evenodd"
      d="M4.667 7.333a.667.667 0 1 1 1.334 0 .667.667 0 0 1-1.334 0ZM8 6.666A.667.667 0 1 0 8 8a.667.667 0 0 0 0-1.334Zm2.667 0a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.334Zm2.599 1.53c-.338 2.17-2.087 3.969-4.253 4.375a5.336 5.336 0 0 1-3.078-.325 2.144 2.144 0 0 0-.835-.175c-.127 0-.252.012-.376.037l-1.874.375.375-1.878c.079-.39.03-.808-.138-1.207a5.34 5.34 0 0 1-.325-3.078c.406-2.166 2.205-3.915 4.375-4.253 1.727-.268 3.415.276 4.634 1.494 1.22 1.22 1.764 2.91 1.495 4.635Zm-.552-5.577C11.191 1.096 9.084.417 6.932.749c-2.718.424-4.972 2.614-5.48 5.325a6.672 6.672 0 0 0 .407 3.843.733.733 0 0 1 .06.426l-.573 2.86a.664.664 0 0 0 .654.796.678.678 0 0 0 .131-.012l2.855-.572a.767.767 0 0 1 .43.06 6.68 6.68 0 0 0 3.842.406c2.712-.508 4.902-2.762 5.326-5.48.334-2.15-.346-4.259-1.87-5.782Z"
      clipRule="evenodd"
    />
    <mask
      id="a"
      width={14}
      height={14}
      x={1}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M4.667 7.333a.667.667 0 1 1 1.334 0 .667.667 0 0 1-1.334 0ZM8 6.666A.667.667 0 1 0 8 8a.667.667 0 0 0 0-1.334Zm2.667 0a.667.667 0 1 0 0 1.334.667.667 0 0 0 0-1.334Zm2.599 1.53c-.338 2.17-2.087 3.969-4.253 4.375a5.336 5.336 0 0 1-3.078-.325 2.144 2.144 0 0 0-.835-.175c-.127 0-.252.012-.376.037l-1.874.375.375-1.878c.079-.39.03-.808-.138-1.207a5.34 5.34 0 0 1-.325-3.078c.406-2.166 2.205-3.915 4.375-4.253 1.727-.268 3.415.276 4.634 1.494 1.22 1.22 1.764 2.91 1.495 4.635Zm-.552-5.577C11.191 1.096 9.084.417 6.932.749c-2.718.424-4.972 2.614-5.48 5.325a6.672 6.672 0 0 0 .407 3.843.733.733 0 0 1 .06.426l-.573 2.86a.664.664 0 0 0 .654.796.678.678 0 0 0 .131-.012l2.855-.572a.767.767 0 0 1 .43.06 6.68 6.68 0 0 0 3.842.406c2.712-.508 4.902-2.762 5.326-5.48.334-2.15-.346-4.259-1.87-5.782Z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#a)">
      <path fill="#121212" d="M0 0h16v16H0z" />
    </g>
  </svg>
)
export default SvgComponent

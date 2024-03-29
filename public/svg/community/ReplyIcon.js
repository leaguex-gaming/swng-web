import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={15}
    fill="none"
    {...props}>
    <path
      fill="#fff"
      d="M16.873 14.998a.626.626 0 0 1-.537-.306c-1.731-2.887-5.087-4.544-9.462-4.694v3.125a.625.625 0 0 1-1.088.419L.161 7.292a.625.625 0 0 1 0-.838L5.786.204a.625.625 0 0 1 1.088.42v3.124a10.969 10.969 0 0 1 10.625 10.625.625.625 0 0 1-.457.625.525.525 0 0 1-.169 0ZM6.25 8.748c4.037 0 7.443 1.25 9.68 3.432a9.744 9.744 0 0 0-9.68-7.182.625.625 0 0 1-.625-.625V2.254l-4.157 4.62 4.157 4.618V9.373a.625.625 0 0 1 .625-.625Z"
      opacity={0.4}
    />
  </svg>
);
export default SvgComponent;

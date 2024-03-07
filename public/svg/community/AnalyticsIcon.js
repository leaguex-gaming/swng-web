import * as React from "react";

function AnalyticsIcon({ fill = "#fff", ...props }) {
  return (
    <svg
      width={18}
      height={13}
      viewBox="0 0 18 13"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.82 0L18 4.736l-2.13-1.218-4.616 8.19H8.806l-3.36-4.562L2.3 12.75H0l4.15-7.393h2.467l3.354 4.555 4.16-7.389-1.992-1.139L16.82 0z"
        fill={fill}
        opacity={0.6}
      />
    </svg>
  );
}

export default AnalyticsIcon;

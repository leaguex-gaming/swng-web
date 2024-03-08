import * as React from "react";

function ButtonHalf({ color = "red", animatedProps = {}, ...props }) {
  return (
    <svg
      width={294}
      height={24}
      viewBox="0 0 294 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}>
      <defs>
        <linearGradient
          id="gradientId"
          x1={14.2917}
          y1={6.14599}
          x2={255.317}
          y2={92.7579}
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#063BFB" />
          <stop offset={1} stopColor="#0B39DE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default ButtonHalf;

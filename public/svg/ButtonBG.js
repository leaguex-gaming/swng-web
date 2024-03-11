import * as React from "react";

function ButtonBGFull({
  label,
  children,
  color = "green",
  fill,
  type,
  ...props
}) {
  return (
    <svg
      width={294}
      height={48}
      viewBox="0 0 294 48"
      preserveAspectRatio="none"
      {...props}>
      <path
        d="M8.53982 0H286.648C291.036 0 294.594 2.48366 294.594 5.54775L289.403 24.209L294.594 42.4522C294.594 45.5154 291.036 48 286.648 48H8.53982C4.15138 47.9997 0.59375 45.516 0.59375 42.4519L5.77008 24.2177L0.59375 5.54775C0.59375 2.48366 4.15138 0 8.53982 0Z"
        fill="url(#paint0_linear_387_1309)"
      />
      <line
        x1="5.76074"
        y1="24.2192"
        x2="289.406"
        y2="24.2192"
        stroke="black"
        strokeOpacity="0.1"
      />
      <defs>
        <linearGradient
          id="paint0_linear_387_1309"
          x1="147.594"
          y1="1.27028e-05"
          x2="142.265"
          y2="47.4009"
          gradientUnits="userSpaceOnUse">
          <stop stopColor={color} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
      </defs>
    </svg>
  );
}
export default ButtonBGFull;

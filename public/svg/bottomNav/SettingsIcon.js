import * as React from "react";

function SettingsIcon({ fill = "#fff", ...props }) {
  return (
    <svg
      width={30}
      height={30}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 8.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm0 4.167A2.92 2.92 0 017.083 10 2.92 2.92 0 0110 7.083 2.92 2.92 0 0112.917 10 2.92 2.92 0 0110 12.917zm8.243-4.318l-.655-2.1a1.916 1.916 0 00-.961-1.149c-.451-.23-.964-.27-1.444-.11l-.283.094c-.447.151-.945.068-1.328-.22l-.089-.067a1.483 1.483 0 01-.578-1.191l.002-.233c.001-.529-.2-1.025-.57-1.395a1.872 1.872 0 00-1.331-.559l-2.123-.002H8.88c-1.045 0-1.898.868-1.903 1.938v.2c-.002.5-.231.97-.611 1.26l-.108.08a1.596 1.596 0 01-1.48.248 1.798 1.798 0 00-1.403.097c-.45.228-.783.623-.937 1.112l-.68 2.162a1.955 1.955 0 001.234 2.451l.136.047c.432.147.78.524.933 1.009l.046.14c.182.538.119 1.106-.193 1.547-.6.853-.417 2.055.408 2.68l1.726 1.312a1.86 1.86 0 001.42.362c.51-.08.957-.36 1.259-.787l.192-.273c.277-.394.7-.626 1.19-.64.49-.027.956.228 1.248.648l.098.143c.3.432.746.715 1.258.798a1.859 1.859 0 001.425-.357l1.718-1.296c.828-.625 1.018-1.831.423-2.691l-.217-.313a1.626 1.626 0 01-.215-1.376c.15-.51.527-.91 1.008-1.072l.168-.056c.989-.33 1.536-1.426 1.22-2.44z"
        fill={fill}
      />
      <mask
        id="a"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={1}
        y={1}
        width={18}
        height={18}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 8.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm0 4.167A2.92 2.92 0 017.083 10 2.92 2.92 0 0110 7.083 2.92 2.92 0 0112.917 10 2.92 2.92 0 0110 12.917zm8.243-4.318l-.655-2.1a1.916 1.916 0 00-.961-1.149c-.451-.23-.964-.27-1.444-.11l-.283.094c-.447.151-.945.068-1.328-.22l-.089-.067a1.483 1.483 0 01-.578-1.191l.002-.233c.001-.529-.2-1.025-.57-1.395a1.872 1.872 0 00-1.331-.559l-2.123-.002H8.88c-1.045 0-1.898.868-1.903 1.938v.2c-.002.5-.231.97-.611 1.26l-.108.08a1.596 1.596 0 01-1.48.248 1.798 1.798 0 00-1.403.097c-.45.228-.783.623-.937 1.112l-.68 2.162a1.955 1.955 0 001.234 2.451l.136.047c.432.147.78.524.933 1.009l.046.14c.182.538.119 1.106-.193 1.547-.6.853-.417 2.055.408 2.68l1.726 1.312a1.86 1.86 0 001.42.362c.51-.08.957-.36 1.259-.787l.192-.273c.277-.394.7-.626 1.19-.64.49-.027.956.228 1.248.648l.098.143c.3.432.746.715 1.258.798a1.859 1.859 0 001.425-.357l1.718-1.296c.828-.625 1.018-1.831.423-2.691l-.217-.313a1.626 1.626 0 01-.215-1.376c.15-.51.527-.91 1.008-1.072l.168-.056c.989-.33 1.536-1.426 1.22-2.44z"
        />
      </mask>
      <g mask="url(#a)">
        <path d="M0 0H20V20H0z" />
      </g>
    </svg>
  );
}

export default SettingsIcon;

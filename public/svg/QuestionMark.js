import * as React from "react";

function QuestionMark(props) {
  return (
    <svg
      width={17}
      height={25}
      viewBox="0 0 17 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M6.22 7.973c.324-.836 1.16-1.672 2.428-1.591 1.349.107 2.4 1.294 2.373 2.643-.027 1.267-.863 2.292-2.05 2.508-1.752.296-2.966 1.78-2.966 3.64v3.345H11.4v-2.077c2.913-1.132 4.963-3.991 5.043-7.282.081-4.234-3.155-7.82-7.362-8.144C5.68.745 2.526 2.74 1.23 5.95L.207 8.458l4.989 2.023 1.025-2.508zM11.4 19.596H6.008v5.394H11.4v-5.394z"
        fill="#fff"
      />
    </svg>
  );
}

export default QuestionMark;

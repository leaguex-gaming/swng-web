import * as React from "react";

function PlayIcon({ fill = "#fff", ...props }) {
  return (
    <svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <path
        d="M20 7.094a4.29 4.29 0 00-4.286-4.237h-5V.714a.714.714 0 10-1.428 0v2.143h-5A4.29 4.29 0 000 7.143c0 .028.033.463.089 1.143.109 1.328.298 3.642.44 5.616a3.506 3.506 0 003.485 3.24h.005a3.51 3.51 0 003.457-2.998l.198-1.388a.718.718 0 01.708-.613h3.236a.718.718 0 01.707.613l.199 1.388a3.495 3.495 0 006.944-.24l.53-6.697A.813.813 0 0020 7.143v-.05zM6.429 8.393h-.893v.893a.536.536 0 01-1.072 0v-.893h-.893a.536.536 0 110-1.072h.893V6.43a.536.536 0 111.072 0v.892h.893a.536.536 0 110 1.072zm5.985-1.307a.714.714 0 01-.546.004.708.708 0 01-.382-.933.823.823 0 01.15-.236.729.729 0 01.778-.15.645.645 0 01.386.386.714.714 0 01.057.272.753.753 0 01-.207.507.833.833 0 01-.236.15zm1.815 2.471a.832.832 0 01-.15.236.739.739 0 01-.508.207.714.714 0 01-.271-.057.646.646 0 01-.386-.386.714.714 0 01-.057-.271.75.75 0 01.207-.507.824.824 0 01.236-.15.685.685 0 01.543 0 .544.544 0 01.128.064l.107.086c.03.035.058.071.086.107.027.04.049.083.065.128.02.04.034.084.042.129.009.047.013.095.015.143a.599.599 0 01-.057.271zm1.278-2.621a.834.834 0 01-.236.15.673.673 0 01-.543 0 .646.646 0 01-.385-.386.676.676 0 010-.543.648.648 0 01.386-.386.718.718 0 01.542 0 .646.646 0 01.386.386.673.673 0 010 .543.834.834 0 01-.15.236zm1.621 2.493a.467.467 0 01-.042.128.547.547 0 01-.065.129.613.613 0 01-.193.193.542.542 0 01-.128.064.466.466 0 01-.129.043.717.717 0 01-.65-1.207.72.72 0 01.65-.193.454.454 0 01.129.043.542.542 0 01.128.064l.108.086c.03.033.06.07.085.107.027.04.049.083.065.128.02.04.035.084.043.129.007.047.012.095.014.143a.992.992 0 01-.015.143z"
        fill={fill}
        opacity={0.4}
      />
    </svg>
  );
}

export default PlayIcon;
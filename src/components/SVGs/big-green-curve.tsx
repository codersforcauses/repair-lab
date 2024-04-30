import * as React from "react";

const BigGreenCurve: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 2078 102"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_2221_282)">
      <path
        d="M11 101.312C810.566 -3.80178 1260.62 -7.72194 2067 101.312H11Z"
        fill="#098D85"
      />
      <path
        d="M11 101.312C810.566 -3.80178 1260.62 -7.72194 2067 101.312H11Z"
        stroke="#098D85"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_2221_282"
        x="0.934814"
        y="0.5"
        width="2076.13"
        height="101.312"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="-10" />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.301961 0 0 0 0 0.576471 0 0 0 0 0.560784 0 0 0 0.3 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2221_282"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_2221_282"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default BigGreenCurve;

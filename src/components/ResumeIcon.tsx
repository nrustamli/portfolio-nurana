import React, { useState } from "react"

export default function ElasticInteractiveIcon(props: React.SVGProps<SVGSVGElement>) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Reset the click state after the animation duration (300ms)
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <svg
      {...props}
      width="86"
      height="50"
      viewBox="0 0 86 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      className={`
        group cursor-pointer overflow-visible select-none
        ${props.className || ""}
      `}
    >
      <path
        d="M43.6907 0C32.9174 0 23.0868 2.36824 15.6191 6.26243L10.028 8.73639L7.40602 3.95763L4.69947 11.9381L0 15.5891L3.21228 18.0049L2.34357 24.0823L6.91968 19.6225L12.4509 20.7361L11.6315 14.0191L17.1186 6.21662C23.9854 3.44311 32.5297 1.79556 41.7965 1.79556C64.4463 1.79556 82.8054 11.6244 82.8054 23.7475C82.8054 35.8706 64.4445 45.6995 41.7965 45.6995C22.5546 45.6995 6.41045 38.6054 1.98763 29.0355C5.37963 40.7604 22.759 49.6906 43.6925 49.6906C67.0577 49.6906 86 38.5666 86 24.8453C86 11.124 67.0594 0 43.6925 0H43.6907Z"
        fill="#B64CF7"
        style={{
          transformOrigin: 'center',
          transition: isClicked 
            ? 'transform 0.1s ease-out' // Fast squish on click
            : 'transform 0.5s cubic-bezier(0.68, -0.6, 0.32, 1.6)' // Elastic hover
        }}
        className={`
          /* 1. STILL (Default) */
          scale-100

          /* 2. HOVER (Elastic Stretch) */
          group-hover:scale-x-115 group-hover:scale-y-90

          /* 3. CLICK (Vertical Squash) */
          ${isClicked ? "!scale-x-90 !scale-y-110" : ""}
        `}
      />
    </svg>
  )
}
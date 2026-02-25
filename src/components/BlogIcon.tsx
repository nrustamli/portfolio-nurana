import * as React from "react"

export default function DrawingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="94"
      height="98"
      viewBox="0 0 94 98"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      // "group" allows us to trigger the child path animation 
      // when the parent SVG is hovered
      className={`group ${props.className || ""}`}
    >
      <path
        d="M66.1357 44.3803C66.1357 42.9345 62.4306 41.6689 56.8807 40.9656C60.6717 41.6867 63.1108 42.7238 63.1108 43.5949C63.1108 45.0194 56.599 46.1886 48.2939 46.3117L46.8321 11.55L45.3704 46.3117C37.0653 46.1886 30.5534 45.0194 30.5534 43.5949C30.5534 42.7238 32.9909 41.6867 36.7836 40.9656C31.2337 41.6671 27.5286 42.9345 27.5286 44.3803C27.5286 46.4849 35.3836 48.2092 45.3532 48.3663L46.8321 86.45L48.3111 48.3663C58.2789 48.2092 66.1357 46.4849 66.1357 44.3803Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        // 1. Set initial stroke state (invisible/drawn out)
        className="
          transition-all duration-700 ease-in-out
          fill-opacity-100 [stroke-dasharray:250] [stroke-dashoffset:250]
          group-hover:fill-opacity-0 group-hover:[stroke-dashoffset:0]
        "
      />
    </svg>
  )
}
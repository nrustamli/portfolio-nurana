export default function SpinningStarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="102"
      height="74"
      viewBox="0 0 102 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`origin-center group-hover:animate-spin ${props.className ?? ''}`}
    >
      <path
        d="M51 0C51 36.2386 52.0403 37.7485 102 73.9856C52.0403 37.747 49.958 37.747 0 73.9856C49.9597 37.747 51 36.2371 51 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

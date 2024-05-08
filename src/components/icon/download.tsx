export const DownloadIcon = ({
  strokeWidth = 2,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 42 42"
      className="w-10"
      fill="none"
      {...props}
    >
      <rect width={38} height={38} x={2} y={2} fill="#69d3e8" rx={8} />
      <rect
        width={38}
        height={38}
        x={2}
        y={2}
        stroke="#000"
        strokeWidth={strokeWidth}
        rx={8}
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M9.521 25.354v2.375a4.75 4.75 0 0 0 4.75 4.75h13.458a4.75 4.75 0 0 0 4.75-4.75v-2.375M21 24.563V9.52M15.854 19.02 21 24.564l5.146-5.542"
      />
    </svg>
  );
};

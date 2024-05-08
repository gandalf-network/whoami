export const PlayIcon = ({
  strokeWidth = 1.5,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-6"
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M17.513 12.794a.887.887 0 0 0 0-1.588L9.285 7.095A.888.888 0 0 0 8 7.889v8.222a.888.888 0 0 0 1.285.794l8.228-4.111Z"
      />
    </svg>
  );
};

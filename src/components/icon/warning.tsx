export const WarningIcon = ({
  strokeWidth = 3,
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className="w-[100px]"
      fill="none"
      {...props}
    >
      <path
        fill="#FF541F"
        stroke="#000"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={3}
        d="m5.026 29.041 24-24.015c.769-.77 1.794-1.18 2.923-1.18h36.154c1.077 0 2.153.41 2.923 1.18L94.974 28.99c.77.769 1.18 1.795 1.18 2.923v36.174c0 1.077-.41 2.154-1.18 2.923L71.026 94.974c-.77.77-1.795 1.18-2.923 1.18H31.897a4.154 4.154 0 0 1-2.923-1.18L5.026 71.01a4.067 4.067 0 0 1-1.18-2.923V31.913c0-1.077.41-2.154 1.18-2.923v.051Z"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
        d="M50 70.513h.041M50 29.487v25.641"
      />
    </svg>
  );
};

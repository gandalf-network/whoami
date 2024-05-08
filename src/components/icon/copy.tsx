export const CopyIcon = ({
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
      <rect width={38} height={38} x={2} y={2} fill="#FEBF10" rx={8} />
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
        d="M12.292 26.146a2.77 2.77 0 0 1-2.771-2.771V12.687a3.167 3.167 0 0 1 3.167-3.166h10.687a2.77 2.77 0 0 1 2.771 2.77"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M15.854 19.02a3.167 3.167 0 0 1 3.167-3.166h10.291a3.167 3.167 0 0 1 3.167 3.167v10.291a3.167 3.167 0 0 1-3.167 3.167H19.021a3.167 3.167 0 0 1-3.167-3.166V19.02Z"
      />
    </svg>
  );
};

export const CopyCheckIcon = ({
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
      <rect width={38} height={38} x={2} y={2} fill="#FEBF10" rx={8} />
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
        strokeWidth={+strokeWidth + 0.5}
        d="M31 14 16.562 28 10 21.636"
      />
    </svg>
  );
};

export const Circle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 56 56"
      className="w-6"
      {...props}
    >
      <circle
        cx={28}
        cy={28}
        r={27}
        fill="#FF541F"
        stroke="#000"
        strokeWidth={props?.strokeWidth || 2}
      />
    </svg>
  );
};

export const DodecagramStar = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 96 96"
      className="w-6"
      {...props}
    >
      <path
        fill="#9026C9"
        stroke="#000"
        strokeWidth={props?.strokeWidth || 2}
        d="m47.801 1.743 6.921 9.264a3 3 0 0 0 3.587.96l10.626-4.561a1 1 0 0 1 1.387.8l1.362 11.484a3 3 0 0 0 2.626 2.625l11.483 1.363a1 1 0 0 1 .801 1.387l-4.561 10.626a3 3 0 0 0 .96 3.587l9.264 6.92a1 1 0 0 1 0 1.603l-9.263 6.921a3 3 0 0 0-.962 3.587l4.562 10.626a1 1 0 0 1-.8 1.387L74.31 71.684a3 3 0 0 0-2.626 2.626l-1.362 11.483a1 1 0 0 1-1.387.801l-10.626-4.561a3 3 0 0 0-3.587.96l-6.92 9.264a1 1 0 0 1-1.603 0l-6.921-9.263a3 3 0 0 0-3.587-.962l-10.626 4.562a1 1 0 0 1-1.387-.8L22.315 74.31a3 3 0 0 0-2.625-2.626L8.207 70.323a1 1 0 0 1-.801-1.387l4.561-10.626a3 3 0 0 0-.96-3.587l-9.264-6.92a1 1 0 0 1 0-1.603l9.264-6.921a3 3 0 0 0 .96-3.587L7.406 25.065a1 1 0 0 1 .8-1.387l11.484-1.363a3 3 0 0 0 2.625-2.625l1.363-11.483a1 1 0 0 1 1.387-.801l10.626 4.561a3 3 0 0 0 3.587-.96l6.92-9.264a1 1 0 0 1 1.603 0Z"
      />
    </svg>
  );
};

export const NonagramStar = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 88 88"
      className="w-6"
      {...props}
    >
      <path
        fill="#FF7A5A"
        stroke="#000"
        strokeWidth={props?.strokeWidth || 2}
        d="m30.94 3.433.526 2.582c.745 3.657 5.089 5.238 8.01 2.916l2.064-1.64c2.557-2.033 6.061.907 4.503 3.78l-1.257 2.316c-1.78 3.28.532 7.283 4.263 7.382l2.634.07c3.266.087 4.06 4.591 1.021 5.79l-2.452.967c-3.471 1.369-4.274 5.921-1.48 8.395l1.974 1.747c2.446 2.165.158 6.127-2.94 5.091l-2.5-.835c-3.54-1.183-7.08 1.788-6.53 5.48l.389 2.606c.482 3.231-3.817 4.796-5.525 2.01l-1.378-2.246c-1.95-3.181-6.573-3.181-8.524 0l-1.378 2.247c-1.708 2.785-6.007 1.22-5.525-2.01l.389-2.608c.55-3.69-2.99-6.662-6.53-5.48l-2.5.836c-3.098 1.036-5.386-2.926-2.94-5.091l1.974-1.747c2.794-2.474 1.992-7.026-1.48-8.395l-2.452-.967c-3.04-1.199-2.245-5.703 1.02-5.79l2.635-.07c3.731-.099 6.042-4.102 4.263-7.382L9.957 11.07c-1.558-2.872 1.946-5.812 4.503-3.779l2.063 1.64c2.922 2.322 7.266.741 8.011-2.916l.526-2.582c.653-3.201 5.227-3.201 5.88 0Z"
      />
    </svg>
  );
};

export const Nonagram1Star = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      className="w-6"
      {...props}
    >
      <path
        fill="#FF68B5"
        stroke="#000"
        strokeWidth={props?.strokeWidth || 2}
        d="m37.99 2.532 2.496 18.133c.33 2.389 3.199 3.433 4.986 1.814L59.04 10.193c.861-.78 2.136.29 1.517 1.274l-9.743 15.495c-1.284 2.04.243 4.685 2.653 4.594l18.29-.69c1.162-.044 1.451 1.595.344 1.95l-17.424 5.607c-2.295.739-2.825 3.746-.921 5.225l14.456 11.228c.918.713.086 2.155-.99 1.716L50.27 49.687c-2.234-.91-4.573 1.053-4.065 3.41l3.857 17.893c.245 1.137-1.32 1.706-1.862.678l-8.547-16.186c-1.126-2.132-4.18-2.132-5.306 0L25.8 71.668c-.543 1.028-2.107.459-1.862-.678l3.857-17.893c.508-2.357-1.832-4.32-4.065-3.41L6.78 56.592c-1.077.439-1.909-1.003-.99-1.716l14.455-11.228c1.904-1.479 1.374-4.486-.921-5.225L1.899 32.817c-1.107-.356-.818-1.995.344-1.952l18.29.691c2.41.091 3.937-2.553 2.653-4.595l-9.743-15.494c-.62-.985.656-2.054 1.517-1.274l13.568 12.286c1.787 1.619 4.657.574 4.986-1.814l2.495-18.133c.159-1.152 1.823-1.152 1.982 0Z"
      />
    </svg>
  );
};

export const PentagramStar = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      className="w-6"
      {...props}
    >
      <path
        fill="#69D3E8"
        stroke="#000"
        strokeWidth={props?.strokeWidth || 2}
        d="m44.951 2.163 8.875 27.313a3 3 0 0 0 2.853 2.073h28.718c.97 0 1.372 1.24.588 1.81l-23.234 16.88a3 3 0 0 0-1.09 3.354l8.875 27.313c.3.921-.755 1.687-1.539 1.118l-23.234-16.88a3 3 0 0 0-3.526 0l-23.234 16.88c-.784.57-1.838-.197-1.54-1.118l8.875-27.313a3 3 0 0 0-1.09-3.354L2.016 33.359c-.784-.57-.381-1.81.588-1.81H31.32a3 3 0 0 0 2.853-2.073L43.05 2.163c.3-.921 1.603-.921 1.902 0Z"
      />
    </svg>
  );
};

export const QuadrilateralStar = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 40 40"
      className="w-6"
      {...props}
    >
      <path
        fill="#FBFE93"
        stroke="#000"
        strokeWidth={props?.strokeWidth || 2}
        d="m17.938 2.416 3.207 8.667a3 3 0 0 0 1.772 1.772l8.667 3.207c.87.322.87 1.554 0 1.876l-8.667 3.207a3 3 0 0 0-1.772 1.772l-3.207 8.667c-.322.87-1.554.87-1.876 0l-3.207-8.667a3 3 0 0 0-1.772-1.772l-8.667-3.207c-.87-.322-.87-1.554 0-1.876l8.667-3.207a3 3 0 0 0 1.772-1.772l3.207-8.667c.322-.87 1.554-.87 1.876 0Z"
      />
    </svg>
  );
};

export const Quadrilateral1Star = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      className="w-6"
      {...props}
    >
      <path
        fill="#BBFCA2"
        stroke="#000"
        strokeWidth={props?.strokeWidth || 2}
        d="m36.993 2.608 3.2 26.579a3 3 0 0 0 2.62 2.62l26.578 3.2c1.174.142 1.174 1.845 0 1.986l-26.578 3.2a3 3 0 0 0-2.62 2.62l-3.2 26.578c-.142 1.174-1.845 1.174-1.986 0l-3.2-26.578a3 3 0 0 0-2.62-2.62l-26.578-3.2c-1.174-.142-1.174-1.845 0-1.986l26.578-3.2a3 3 0 0 0 2.62-2.62l3.2-26.578c.142-1.174 1.845-1.174 1.986 0Z"
      />
    </svg>
  );
};

export const Rectangle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 32 32"
      className="w-6"
      {...props}
    >
      <path
        fill="#91C59F"
        stroke="#000"
        strokeWidth={props?.strokeWidth || 2}
        d="M1 1h30v30H1z"
      />
    </svg>
  );
};

export const HalfEclipse = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 60 110"
      className="w-6"
      {...props}
    >
      <path
        fill="#C5A1FF"
        stroke="#000"
        strokeWidth={props?.strokeWidth || 2}
        d="M5 4a51 51 0 0 1 0 102V84.506A29.504 29.504 0 0 0 32.26 43.71 29.505 29.505 0 0 0 5 25.494V4Z"
      />
    </svg>
  );
};

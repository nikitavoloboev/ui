interface IconProps {
  size?: number
  className?: string
}

export function Logo({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>Logo</title>
      <path
        d="M10.933 0.00574493C13.3106 0.126291 15.2015 2.09228 15.2015 4.49989C15.2015 6.90752 13.3107 8.87348 10.933 8.99403L10.7015 8.99989V-0.000114441L10.933 0.00574493Z"
        fill="white"
      />
      <path
        d="M10.9329 9.00586C13.3105 9.12641 15.2014 11.0924 15.2014 13.5C15.2014 15.9076 13.3105 17.8736 10.9329 17.9941L10.7014 18V9L10.9329 9.00586Z"
        fill="white"
      />
      <path
        d="M5.30029 8.99989C2.81501 8.99985 0.800293 6.98518 0.800293 4.49989C0.800324 2.01462 2.81503 -8.2486e-05 5.30029 -0.000114441V8.99989Z"
        fill="white"
      />
      <path
        d="M5.53174 9.00586C7.90949 9.1263 9.80026 11.0923 9.80029 13.5C9.80029 15.9077 7.90951 17.8737 5.53174 17.9941L5.30029 18V9L5.53174 9.00586Z"
        fill="white"
      />
    </svg>
  )
}

export function Notification({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>Notification</title>
      <g opacity="0.2" clipPath="url(#clip0_10938_1724)">
        <path
          d="M8.55664 17.5C8.70293 17.7533 8.91332 17.9637 9.16668 18.11C9.42003 18.2563 9.70743 18.3333 9.99997 18.3333C10.2925 18.3333 10.5799 18.2563 10.8333 18.11C11.0866 17.9637 11.297 17.7533 11.4433 17.5"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.3333 6.66667C18.3333 4.75 17.6666 3.08333 16.6666 1.66667"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.71833 12.7717C2.60947 12.891 2.53763 13.0394 2.51155 13.1988C2.48547 13.3582 2.50627 13.5217 2.57142 13.6695C2.63658 13.8173 2.74328 13.943 2.87855 14.0312C3.01381 14.1195 3.17182 14.1665 3.33333 14.1667H16.6667C16.8282 14.1667 16.9862 14.1199 17.1216 14.0318C17.2569 13.9437 17.3637 13.8181 17.4291 13.6704C17.4944 13.5227 17.5154 13.3592 17.4895 13.1998C17.4637 13.0404 17.392 12.892 17.2833 12.7725C16.175 11.63 15 10.4158 15 6.66667C15 5.34058 14.4732 4.06881 13.5355 3.13113C12.5979 2.19345 11.3261 1.66667 10 1.66667C8.67392 1.66667 7.40215 2.19345 6.46447 3.13113C5.52679 4.06881 5 5.34058 5 6.66667C5 10.4158 3.82417 11.63 2.71833 12.7717Z"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.33329 1.66667C2.33329 3.08333 1.66663 4.75 1.66663 6.66667"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_10938_1724">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function Search({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>Search</title>
      <g opacity="0.2">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.8269 16.6483C18.1509 16.9723 18.152 17.4965 17.8243 17.8242C17.4988 18.1497 16.9729 18.1514 16.6484 17.8268L12.1243 13.3028C11.0728 14.1061 9.75882 14.5833 8.33337 14.5833C4.88159 14.5833 2.08337 11.7851 2.08337 8.33333C2.08337 4.88155 4.88159 2.08333 8.33337 2.08333C11.7852 2.08333 14.5834 4.88155 14.5834 8.33333C14.5834 9.75878 14.1062 11.0728 13.3028 12.1243L17.8269 16.6483ZM8.33337 12.9167C10.8647 12.9167 12.9167 10.8646 12.9167 8.33333C12.9167 5.80203 10.8647 3.75 8.33337 3.75C5.80207 3.75 3.75004 5.80203 3.75004 8.33333C3.75004 10.8646 5.80207 12.9167 8.33337 12.9167Z"
          fill="white"
        />
      </g>
    </svg>
  )
}

import React from 'react';

const Group = ({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) => (
  <svg
    {...(!title ? { 'aria-hidden': 'true' } : {})}
    focusable="false"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    width="20"
    height="16"
    viewBox="0 0 640 512"
    className={className}
    aria-label={title}
  >
    <path d="M211.2 96a64 64 0 10-128 0 64 64 0 10128 0zM32 256c0 17.7 14.3 32 32 32h85.6c10.1-39.4 38.6-71.5 75.8-86.6-9.7-6-21.2-9.4-33.4-9.4H96c-35.3 0-64 28.7-64 64zm461.6 32H576c17.7 0 32-14.3 32-32 0-35.3-28.7-64-64-64h-96c-11.7 0-22.7 3.1-32.1 8.6 38.1 14.8 67.4 47.3 77.7 87.4zm-102.4-61.6c-6.9-1.6-14.2-2.4-21.6-2.4h-96c-8.5 0-16.7 1.1-24.5 3.1-30.8 8.1-55.6 31.1-66.1 60.9-3.5 10-5.5 20.8-5.5 32 0 17.7 14.3 32 32 32h224c17.7 0 32-14.3 32-32 0-11.2-1.9-22-5.5-32-10.8-30.7-36.8-54.2-68.9-61.6zM563.2 96a64 64 0 10-128 0 64 64 0 10128 0zm-241.6 96a80 80 0 100-160 80 80 0 100 160zM32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32h576c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"></path>
  </svg>
);

export default Group;

import React from 'react';

const Minus = ({
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
    viewBox="0 0 1024 1024"
    className={className}
    aria-label={title}
  >
    <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
  </svg>
);

export default Minus;

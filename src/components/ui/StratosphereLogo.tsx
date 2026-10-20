import type { SVGProps } from 'react';

/**
 * Stratosphere brand mark: two nested atmospheric layers above a horizon.
 * Uses `currentColor`, so drop it in any colored container.
 */
export default function StratosphereLogo({
  className = 'size-6',
  ...props
}: SVGProps<SVGSVGElement> = {}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M3 23.5a13 13 0 0 1 26 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M9.5 23.5a6.5 6.5 0 0 1 13 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="16" cy="23.5" r="2.5" fill="currentColor" />
      <path
        d="M2 27.5h28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

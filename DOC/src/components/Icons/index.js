const paths = {
  bolt: <path d="m13 2-8 12h6l-1 8 8-12h-6l1-8Z" />,
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </>
  ),
  radio: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4" />
      <path d="M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 1.3 4.1L17 9l-3.7 1.9L12 15l-1.3-4.1L7 9l3.7-1.9L12 3Z" />
      <path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z" />
      <path d="m5 14 .6 1.8 1.9.7-1.9.7L5 19l-.6-1.8-1.9-.7 1.9-.7L5 14Z" />
    </>
  ),
  devices: (
    <>
      <rect x="2.5" y="5" width="13" height="9" rx="1.5" />
      <path d="M6.5 18h5" />
      <path d="M9 14v4" />
      <rect x="16.5" y="9" width="5" height="10" rx="1.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.5 2.8 8.1 7 10 4.2-1.9 7-5.5 7-10V6l-7-3Z" />
      <path d="m9.2 12 1.8 1.8 3.8-4" />
    </>
  ),
  chat: (
    <>
      <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v8Z" />
      <path d="M8 9h8M8 13h5" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.3 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 7H6" />
      <circle cx="10" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16" />
      <path d="M15 9h3a2 2 0 0 1 2 2v10M2 21h20" />
      <path d="M8 7h3M8 11h3M8 15h3" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18h10a4 4 0 0 0 .8-7.9A6 6 0 0 0 6.3 8.8 4.6 4.6 0 0 0 7 18Z" />
      <path d="M9 14h6" />
    </>
  ),
  code: (
    <>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  rocket: (
    <>
      <path d="M14 5c3.2-1.2 5.9-1 6.5-.4.6.6.8 3.3-.4 6.5-1 2.7-2.9 5.2-5.5 7.4l-4.8-4.8C12 11 14.5 9 14 5Z" />
      <path d="m9.8 13.7-3.3.6-1.7 4 4-1.7.6-3.3M10.3 14.2l4.8 4.8" />
      <circle cx="16.5" cy="7.5" r="1.3" />
      <path d="M5 19c-1 1-1.5 3-1.5 3s2-.5 3-1.5" />
    </>
  ),
};

export default function Icon({name = 'bolt', size = 22, className}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      {paths[name] || paths.bolt}
    </svg>
  );
}
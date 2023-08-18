const ColorIcon = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="white" fillOpacity="0.4" />
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="url(#paint0_angular_6_1421)"
        strokeOpacity="0.8"
        strokeWidth="4"
      />
      <circle cx="20" cy="20" r="12" fill="#212121" />
      <defs>
        <radialGradient
          id="paint0_angular_6_1421"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20 20) rotate(90) scale(20)"
        >
          <stop stopColor="#E74733" />
          <stop offset="0.140625" stopColor="#ED912C" />
          <stop offset="0.28125" stopColor="#F4C838" />
          <stop offset="0.421875" stopColor="#58BC5A" />
          <stop offset="0.5625" stopColor="#50BCB5" />
          <stop offset="0.708333" stopColor="#51A3BD" />
          <stop offset="0.859375" stopColor="#386BF7" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default ColorIcon;

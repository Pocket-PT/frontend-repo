const PersonIcon = ({ fill = '#C6C6C6' }: { fill: string }) => {
  return (
    <div className="w-max h-max">
      <svg
        className="w-8 h-8 hover:fill-hover active:fill-focus"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke={fill}
        aria-hidden="true"
      >
        <path d="M16.0002 16.0002C18.9468 16.0002 21.3335 13.6135 21.3335 10.6668C21.3335 7.72016 18.9468 5.3335 16.0002 5.3335C13.0535 5.3335 10.6668 7.72016 10.6668 10.6668C10.6668 13.6135 13.0535 16.0002 16.0002 16.0002ZM16.0002 18.6668C12.4402 18.6668 5.3335 20.4535 5.3335 24.0002V26.6668H26.6668V24.0002C26.6668 20.4535 19.5602 18.6668 16.0002 18.6668Z" />
      </svg>
    </div>
  );
};

export default PersonIcon;

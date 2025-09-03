import PropTypes from "prop-types";

export const SwatchIcon = ({ className = "w-6 h-6", color = "white" }) => (
  <img
  src={import.meta.env.BASE_URL + "color-palette.svg"}
    alt="Color Palette"
    className={className}
    style={{ filter: color === "white" ? "brightness(0) invert(1)" : "none" }}
  />
);

SwatchIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export const FileIcon = ({ className = "w-6 h-6", color = "white" }) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
      strokeWidth="2"
    />
    <polyline points="13,2 13,9 20,9" strokeWidth="2" />
  </svg>
);

FileIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export const DownloadIcon = ({ className = "w-6 h-6", color = "white" }) => (
  <svg
    className={className}
    fill="none"
    stroke={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="2" />
    <polyline points="7,10 12,15 17,10" strokeWidth="2" />
    <line x1="12" y1="15" x2="12" y2="3" strokeWidth="2" />
  </svg>
);

DownloadIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export const LogoClothIcon = ({ className = "w-6 h-6", color = "white" }) => (
  <img
  src={import.meta.env.BASE_URL + "shirt-logo.svg"}
    alt="Shirt with Logo"
    className={className}
    style={{ filter: color === "white" ? "brightness(0) invert(1)" : "none" }}
  />
);

LogoClothIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export const StyleClothIcon = ({ className = "w-6 h-6", color = "white" }) => (
  <img
  src={import.meta.env.BASE_URL + "shirt-textured.svg"}
    alt="Textured Shirt"
    className={className}
    style={{ filter: color === "white" ? "brightness(0) invert(1)" : "none" }}
  />
);

StyleClothIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export const MainLogo = ({ className = "w-8 h-8", color = "white" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Elegant circular background */}
    <circle
      cx="32"
      cy="32"
      r="30"
      fill={color}
      stroke={color}
      strokeWidth="2"
    />

    {/* Stylish F letter */}
    <path
      d="M22 18h16M22 18v26M22 31h12"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Decorative elements */}
    <circle cx="42" cy="22" r="2" fill="white" opacity="0.8" />
    <circle cx="45" cy="28" r="1.5" fill="white" opacity="0.6" />
    <circle cx="43" cy="35" r="1" fill="white" opacity="0.4" />
  </svg>
);

MainLogo.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

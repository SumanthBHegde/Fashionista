import { useSnapshot } from "valtio";
import PropTypes from "prop-types";

import state from "../store";
import { APP_CONFIG } from "../config/app-config";
import { getContrastingColor } from "../config/helpers";

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  const snap = useSnapshot(state);

  // This function generates a style object based on the type of style required
  const generateStyle = (type) => {
    if (type === "filled") {
      // Use theme colors for filled button with high contrast
      return {
        background: APP_CONFIG.theme.gradient,
        color: "#ffffff", // Pure white text for contrast
        boxShadow: `0 4px 15px ${APP_CONFIG.theme.primary}30`,
        border: `1px solid ${APP_CONFIG.theme.primary}`,
        fontWeight: "600",
      };
    } else if (type === "outline") {
      // Use theme colors for outline button
      return {
        borderWidth: "2px",
        borderColor: APP_CONFIG.theme.primary,
        color: APP_CONFIG.theme.primary,
        backgroundColor: "white",
        fontWeight: "600",
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md transition-all duration-200 hover:shadow-lg active:scale-95 ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  customStyles: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default CustomButton;

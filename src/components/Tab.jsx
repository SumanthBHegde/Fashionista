import { useSnapshot } from "valtio";
import PropTypes from "prop-types";

import state from "../store";

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);

  const activeStyles = isActiveTab
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 };

  // Check if the icon is a React component (SVG), a string (image path), or emoji
  const IconComponent = tab.icon;
  const isReactComponent = typeof IconComponent === "function";
  const isEmoji = typeof tab.icon === "string" && tab.icon.length <= 2;

  const onTabClick = () => {
    if (snap.debugMode) {
      if (isFilterTab) {
        console.log(`Tab clicked: ${tab.name}, isActive: ${isActiveTab}`);
      } else {
        console.log(
          `Editor tab clicked: ${tab.name}, isActive: ${isActiveTab}`
        );
      }
    }
    handleClick();
  };

  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        isFilterTab ? "rounded-full glassmorphism" : "rounded-4"
      }`}
      onClick={onTabClick}
      style={activeStyles}
    >
      {isReactComponent ? (
        <IconComponent className="w-6 h-6" color="white" />
      ) : isEmoji ? (
        <span className="text-xl">{tab.icon}</span>
      ) : (
        <img src={tab.icon} alt={tab.name} className="w-6 h-6 object-contain" />
      )}
    </div>
  );
};

Tab.propTypes = {
  tab: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  }).isRequired,
  isFilterTab: PropTypes.bool,
  isActiveTab: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
};

export default Tab;

import { swatch, fileIcon, logoCloth, stylishCloth } from "../assets";

export const EDITOR_TABS = [
  {
    name: "colorPicker",
    icon: swatch,
  },
  {
    name: "filePicker",
    icon: fileIcon,
  },
  {
    name: "modelPicker",
    icon: "👕",
  },
  {
    name: "rotationControl",
    icon: "🔄",
  },
  {
    name: "logoControl",
    icon: "📐",
  },
];

export const FILTER_TABS = [
  {
    name: "logoCloth",
    icon: logoCloth,
  },
  {
    name: "stylishCloth",
    icon: stylishCloth,
  },
  {
    name: "viewToggle",
    icon: import.meta.env.BASE_URL + "flip-switch.svg", // Flip/switch SVG icon for front/back view toggle
  },
];

export const DECAL_TYPES = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoCloth",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishCloth",
  },
  frontLogo: {
    stateProperty: "frontLogoDecal",
    filterTab: "frontLogo",
  },
  backLogo: {
    stateProperty: "backLogoDecal",
    filterTab: "backLogo",
  },
};

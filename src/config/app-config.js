export const APP_CONFIG = {
  branding: {
    title: "FASHIONISTA",
    tagline: "CRAFT YOUR STYLE",
    subtitle: "Create Your Style",
    description:
      "Design beautiful clothes with our powerful 3D customization tool. Express your creativity and make something uniquely yours.",
    customizeButtonText: "Start Designing",
    goBackButtonText: "Back to Home",
  },

  // Royal Peacock Blue Theme with proper contrast
  theme: {
    primary: "#2563eb", // Bright blue - more readable
    primaryLight: "#3b82f6", // Lighter blue
    primaryDark: "#1d4ed8", // Darker blue
    accent: "#60a5fa", // Light blue accent
    surface: "#ffffff", // Pure white surface
    surfaceDark: "#f8fafc", // Very light gray
    text: "#1f2937", // Dark gray text - readable
    textLight: "#6b7280", // Medium gray text
    white: "#ffffff",
    gradient: "linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #60a5fa 100%)",
  },

  defaults: {
    clothColor: "#2563eb", // Using theme primary color
    logoDecal: import.meta.env.BASE_URL + "react.png",
    fullDecal: import.meta.env.BASE_URL + "pattern.svg",
    isLogoTexture: true,
    isFullTexture: false,
    // Default logos for front and back
    frontLogoDecal: import.meta.env.BASE_URL + "front-design.png",
    backLogoDecal: import.meta.env.BASE_URL + "boson-back.png",
    selectedModel: "shirt", // Default model selection
  },

  // Available 3D models
  models: {
    shirt: {
      path: import.meta.env.BASE_URL + "shirt-baked.glb",
      name: "T-Shirt",
      geometry: "T_Shirt_male",
    },
    hoodie: {
      path: import.meta.env.BASE_URL + "hoodie.glb",
      name: "Hoodie",
      geometry: "Hoodie_FABRIC_3_FRONT_1850_0", // Updated to match the new hoodie model
    },
  },

  colorPresets: [
    { name: "Royal Blue", color: "#2563eb" },
    { name: "Ocean Blue", color: "#3b82f6" },
    { name: "Sky Blue", color: "#60a5fa" },
    { name: "Navy", color: "#1d4ed8" },
    { name: "Black", color: "#000000" },
    { name: "Charcoal", color: "#2d3748" },
    { name: "Light Gray", color: "#e2e8f0" },
    { name: "White", color: "#ffffff" },
    { name: "Emerald", color: "#059669" },
    { name: "Forest", color: "#065f46" },
    { name: "Crimson", color: "#dc2626" },
    { name: "Burgundy", color: "#7f1d1d" },
    { name: "Amber", color: "#f59e0b" },
    { name: "Orange", color: "#ea580c" },
    { name: "Purple", color: "#7c3aed" },
    { name: "Rose", color: "#e11d48" },
  ],

  ui: {
    animations: {
      duration: 0.8,
      springConfig: {
        type: "spring",
        damping: 5,
        stiffness: 40,
        restDelta: 0.001,
      },
    },
  },
};

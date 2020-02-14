const { ThemeBuilder, Theme } = require("tailwindcss-theming");

const lightTheme = new Theme()
  .name("light")
  .default()
  .assignable()
  .colors({
    // A transparent color, which alpha value will be detected.
    transparent: "transparent",

    // Brand colors
    brand: "#2196f3",
    "on-brand": "#ffffff",

    // Background colors, but not limited to `bg` utilities.
    background: "#f4f4f4",
    surface: "#ffffff",
    "on-background": "#585851",
    "on-surface": "#3c3c3c",

    // Event colors.
    error: "#b00020",
    "on-error": "#ffffff",
    success: "#3ab577",
    "on-success": "#ffffff",
    warning: "#e65100",
    "on-warning": "#ffffff",
    info: "#2481ea",
    "on-info": "#ffffff"
  })

  // Material variants
  .opacityVariant("high-emphasis", 0.87)
  .opacityVariant("medium-emphasis", 0.6)
  .opacityVariant("muted", 0.38)

  // Arbitrary variants
  .opacityVariant("slightly-visible", 0.075)

  // Custom variable
  .variable("decoration", "underline")

  // Tailwind extension
  .variable("dynamic", "not-allowed", "cursor");
const darkTheme = new Theme()
  .name("dark")
  .colors({
    // Brand colors
    brand: "#2196f3",
    "on-brand": "#ffffff",

    // Background colors, but not limited to `bg` utilities.
    background: "#1f1f1f",
    surface: "#282828",
    "on-background": "#ffffff",
    "on-surface": "#ffffff",

    // Event colors.
    error: "#e67388",
    "on-error": "#ffffff",
    success: "#3ab577",
    "on-success": "#ffffff",
    warning: "#ffa777",
    "on-warning": "#ffffff",
    info: "#83bdff",
    "on-info": "#ffffff"
  })

  // Material variants
  .opacityVariant("slightly-visible", 0.04)

  // Custom variable
  .variable("decoration", "none")

  // Tailwind extension
  .variable("dynamic", "pointer", "cursor");
module.exports = new ThemeBuilder()
  .asClass()
  .default(lightTheme)
  .dark(darkTheme);

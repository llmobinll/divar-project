// lint-staged.config.js
export default {
    // Type check TypeScript files
    "**/*.(ts|tsx)": () => "npm tsc --noEmit",
  
    // Lint then format TypeScript and JavaScript files
    "**/*.(ts|tsx|js)": (filenames) => [
      `npm eslint --fix --resolve-plugins-relative-to ${filenames.join(" ")}`,
      `npm prettier --write ${filenames.join(" ")}`,
    ],
  
    // Format MarkDown and JSON
    "**/*.(md|json)": (filenames) =>
      `npm prettier --write ${filenames.join(" ")}`,
  };
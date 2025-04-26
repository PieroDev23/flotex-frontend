import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import globalCss from "./global-css";
import tokens from "./tokens";

import recipes from "./recipes";

const customTheme = defineConfig({
  globalCss,
  theme: {
    tokens,
    recipes
  }
});

export default createSystem(defaultConfig, customTheme);
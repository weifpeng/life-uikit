const svgr = require("vite-plugin-svgr").default;
const { mergeConfig } = require("vite");
const { readFileSync } = require("fs");
const { loadCsf } = require("@storybook/csf-tools");
module.exports = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      plugins: [svgr({ exportAsDefault: true })],
    });
  },
};

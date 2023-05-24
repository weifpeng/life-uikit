import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { BaseUikit as AntdBaseUikit } from "@life-uikit/antd";
import { Context } from "@life-uikit/context";
import { BaseUikit as FluentuiBaseUikit } from "@life-uikit/fluentui";
import "@life-uikit/global-css/tailwind-css/input.css";
import { Preview } from "@storybook/react";
import React from "react";
import * as services from "./services";

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// };

const withThemeProvider = (Story, context) => {
  return (
    <Context.Provider
      value={{
        uiKit:
          context.globals.theme === "antd" ? AntdBaseUikit : FluentuiBaseUikit,
        services: {
          ...services,
        },
        getRootContainer: () => {
          return document.getElementById("storybook-root")!;
        },
      }}
    >
      <FluentProvider theme={teamsLightTheme}>
        <Story />
      </FluentProvider>
    </Context.Provider>
  );
};

const preview: Preview = {
  decorators: [withThemeProvider],
  globalTypes: {
    theme: {
      description: "uikit for components",
      defaultValue: "antd",
      toolbar: {
        title: "Theme",
        icon: "contrast",
        items: ["antd", "fluentui"],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;

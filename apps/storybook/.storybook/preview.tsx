import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { BaseUikit as AntdBaseUikit } from "@life-uikit/antd";
import { Context } from "@life-uikit/context";
import { BaseUikit as FluentuiBaseUikit } from "@life-uikit/fluentui";
import "@life-uikit/global-css/tailwind-css/input.css";
import { Preview } from "@storybook/react";
import React from "react";
import * as services from "./services";

const Layout = ({ them, children }) => {
  return (
    <Context.Provider
      value={{
        uiKit: them === "antd" ? AntdBaseUikit : FluentuiBaseUikit,
        services: {
          ...services,
        },
      }}
    >
      <FluentProvider theme={teamsLightTheme}><div className="p-5" >{children}</div></FluentProvider>
    </Context.Provider>
  );
};

const withThemeProvider = (Story, context) => {
  return (
    <Layout them={context.globals.theme}>
      <Story />
    </Layout>
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

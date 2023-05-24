import { IBaseUiKit } from "@life-uikit/types";
import React from "react";

import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";

export const Dropdown: IBaseUiKit["Dropdown"] = ({
  className,
  style,
  overlay,
  children,
}) => {
  if (overlay) {
    return (
      <div className={className}>
        <Popover positioning="below-start">
          <PopoverTrigger disableButtonEnhancement>
            <div>{children}</div>
          </PopoverTrigger>
          <PopoverSurface style={{ padding: 0, border: "none" }}>
            {overlay?.({})}
          </PopoverSurface>
        </Popover>
      </div>
    );
  }

  return <div></div>;
};

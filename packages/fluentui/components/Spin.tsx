import { IBaseUiKit } from "@life-uikit/types";

import { Spinner } from "@fluentui/react-components";
import * as React from "react";

export const Spin: IBaseUiKit["Spin"] = (props) => {
  return (
    <div className="relative">
      {props.spinning && (
        <div className="w-full h-full flex justify-center items-center bg-white bg-opacity-50 z-10 absolute  ">
          <Spinner size="tiny" />
        </div>
      )}
      {props?.children}
    </div>
  );
};

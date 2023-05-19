import React from "react";

export interface IBaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface ICallback<S = any, E = any> {
  successCallback?: (e?: S) => void;
  failedCallback?: (e?: E) => void;
  cancleCallback?: () => void;
}


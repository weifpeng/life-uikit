import React from "react";
import { IBaseProps } from "./components";

/**
 * base component abstract
 */

// Input
interface InputTypeProps extends IBaseProps {
  ref?: any;
  onChange?: (val: string) => void;
  value?: string;
  size?: "middle" | "small" | "large";
  placeholder?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  onEnter?: () => void;
}
type InputType = React.FC<InputTypeProps>;

// Button
interface ButtonTypeProps extends IBaseProps {
  children?: React.ReactNode;
  type?: "default" | "primary";
  block?: boolean;
  onClick?: () => void;
}
type ButtonType = React.FC<ButtonTypeProps>;

// Modal
type ModalTypeProps = {
  children?: React.ReactNode;
  zIndex?: number;
  width?: string | number;
  title?: React.ReactNode;
  visible?: boolean;
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
type ModalType = React.FC<ModalTypeProps>;

// Spin
type SpinTypeProps = {
  children?: React.ReactNode;
  spinning?: boolean;
};
type SpinType = React.FC<SpinTypeProps>;

// Dropdown
type DropdownProps = {
  children?: React.ReactNode;
  overlay?: React.FC<any>;
  visible?: boolean;
  onVisibleChange?: (v: boolean) => void;
  placement?: "topLeft" | "bottomLeft";
  overlayStyle?: React.CSSProperties;
};
type DropdownType = React.FC<DropdownProps>;

export interface IBaseUiKit {
  Input: InputType;
  Button: ButtonType;
  Modal: ModalType;
  Spin: SpinType;
  Dropdown: DropdownType;
}

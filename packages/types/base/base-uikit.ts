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
interface ModalTypeProps extends IBaseProps {
  children?: React.ReactNode;
  zIndex?: number;
  width?: string | number;
  title?: React.ReactNode;
  visible?: boolean;
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  afterOpenChange?: (open?: boolean) => void;
}
type ModalType = React.FC<ModalTypeProps>;

// Spin
type SpinTypeProps = {
  children?: React.ReactNode;
  spinning?: boolean;
};
type SpinType = React.FC<SpinTypeProps>;

// Dropdown
interface DropdownProps extends IBaseProps {
  children?: React.ReactNode;
  overlay?: React.FC<any>;
  visible?: boolean;
  onVisibleChange?: (v: boolean) => void;
  placement?: "topLeft" | "bottomLeft";
  overlayStyle?: React.CSSProperties;
  renderInParent?: boolean;
}
type DropdownType = React.FC<DropdownProps>;

export interface IBaseUiKit {
  Input: InputType;
  Button: ButtonType;
  Modal: ModalType;
  Spin: SpinType;
  Dropdown: DropdownType;
}

import { useCtx } from "@life-uikit/context";
import { IBaseUiKit } from "@life-uikit/types";
import {
  Button as ButtonBase,
  Dropdown as DropdownBase,
  Input as InputBase,
  Modal as ModalBase,
  Spin,
} from "antd";
import React from "react";

export const Dropdown: IBaseUiKit["Dropdown"] = (props) => {
  const { getRootContainer } = useCtx();

  return (
    <DropdownBase
      getPopupContainer={getRootContainer}
      dropdownRender={props.overlay}
      trigger={["click"]}
      placement={props.placement}
      open={props.visible}
      onOpenChange={props.onVisibleChange}
      overlayStyle={props.overlayStyle}
      overlayClassName=" bg-white border border-gray-200 shadow-md rounded "
    >
      {props?.children}
    </DropdownBase>
  );
};

export const Input: IBaseUiKit["Input"] = React.forwardRef((props, ref) => {
  const { onChange, onEnter, ...other } = props;

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      onEnter?.();
    }
  };
  
  return (
    <InputBase
      ref={ref}
      onKeyDown={handleKeyDown}
      {...other}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    />
  );
});

export const Button: IBaseUiKit["Button"] = (props) => {
  return <ButtonBase {...props} />;
};

export const Modal: IBaseUiKit["Button"] = (props) => {
  return <ModalBase destroyOnClose {...props} />;
};

export const BaseUikit: IBaseUiKit = {
  Dropdown,
  Input,
  Modal,
  Button,
  Spin,
};

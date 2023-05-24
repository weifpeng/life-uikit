import { useCtx } from "@life-uikit/context";
import { IBaseUiKit } from "@life-uikit/types";
import {
  Button as ButtonBase,
  Input as InputBase,
} from "@fluentui/react-components";
import React, { useMemo } from "react";
import { Dropdown } from "./components/Dropdown";
import { Modal } from "./components/Modal";
import { Spin } from "./components/Spin";
import cn from "classnames";

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
      ref={ref as any}
      className="w-full"
      onKeyDown={handleKeyDown}
      contentBefore={<>{props.prefix}</>}
      contentAfter={<>{props.suffix}</>}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => {
        onChange?.(e.target.value);
      }}
    />
  );
});

export const Button: IBaseUiKit["Button"] = (props) => {
  const btnAppearance = useMemo(() => {
    if (!props?.type || props?.type === "default") return undefined;
    return "primary";
  }, [props.type]);

  return (
    <ButtonBase
      className={cn(props.className, { ["w-full"]: props.block })}
      appearance={btnAppearance}
      onClick={props?.onClick}
    >
      <div className="w-full">{props.children}</div>
    </ButtonBase>
  );
};

export const BaseUikit: IBaseUiKit = {
  Dropdown,
  Input,
  Modal,
  Button,
  Spin,
};

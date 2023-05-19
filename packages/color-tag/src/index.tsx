import { IColorTagProps } from "@uikit/types/color-tag";
import React from "react";
import { ColorPikcer } from "./color-picker";
import { TagCreate } from "./tag-create";
import { TagManagement } from "./tag-management";
import { ColorTag as ColorTagBase } from "./color-tag";

type ColorTagType = React.FC<Partial<IColorTagProps>>;

export const ColorTag: ColorTagType = (props) => {
  const { slots, ...others } = props;

  return (
    <ColorTagBase
      slots={{
        TagPicker: ColorPikcer,
        TagCreate: TagCreate,
        TagManagement,
        ...((slots || {}) as any),
      }}
      {...others}
    />
  );
};

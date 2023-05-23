import React from "react";
import { IBaseUiKit } from "../base/base-uikit";

import { IUseContextValue } from "../base/context";

import { ITagInfo, ITagService } from "../base/services";
import { IBaseProps, ICallback } from "../base/components";

interface TagItemsProps extends IBaseProps {
  onRemove?: (id: string) => void;
  tagsList?: ITagInfo[];
  readOnly?: boolean;
}
type TagItemsType = React.FC<TagItemsProps>;

interface TagPickerProps extends IBaseProps {
  value?: string[];
  onChange?: (checkedIds: string[]) => void;
  onSearchChange?: (val: string) => void;
  searchValue?: string;
  tagsList?: ITagInfo[];
  onCreated?: (id: string) => void;
  onCreateClick?: (info?: Partial<ITagInfo>) => void;
  onManagementClick?: () => void;
  spinning?: boolean;
  showFooter?: boolean;
}
type TagPickerType = React.FC<TagPickerProps>;

interface TagManagementProps extends IBaseProps, ICallback {
  tagsList?: ITagInfo[];
  onUpdate?: (info: ITagInfo) => Promise<any>;
  onDelete?: (id: string) => Promise<any>;
}

type TagManagementType = React.FC<TagManagementProps>;

interface TagCreateProps extends IBaseProps, ICallback {
  onChange?: (data: Partial<ITagInfo>) => void;
  value?: Partial<ITagInfo>;
}

type TagCreateType = React.FC<TagCreateProps>;

export interface IColorTagComponent {
  TagItems: TagItemsType;
  TagPicker: TagPickerType;
  TagManagement: TagManagementType;
  TagCreate: TagCreateType;
}

export type IUseContext = () => IUseContextValue<
  ITagService,
  Pick<IBaseUiKit, "Button" | "Dropdown" | "Input" | "Modal" | "Spin">
>;

export interface IColorTagProps extends IBaseProps {
  slots: IColorTagComponent;
  value?: string[];
  onChange?: (ids: string[]) => void;
}

export type ColorTagType = React.FC<IColorTagProps>;

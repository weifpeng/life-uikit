import AddColorTag from "@uikit/assets/svg/add-color-tag.svg";
import ArrowLeft from "@uikit/assets/svg/arrow-left.svg";
import CheckedSvg from "@uikit/assets/svg/check.svg";
import { useCtx } from "@uikit/context";
import { IBaseProps } from "@uikit/types";
import { IColorTagComponent } from "@uikit/types/color-tag";
import cn from "classnames";
import { useState } from "react";

export const COLOR_TAG_LIST: string[] = [
  "#c6c8cc",
  "#5a606b",
  "#5fd9c6",
  "#7ad94e",
  "#d98657",
  "#ffce40",
  "#ff8c40",
  "#ff5757",
  "#fe6fd4",
  "#ab6bff",
  "#4dbafd",
  "#3e70f8",
];

interface IColorItemProps extends IBaseProps {
  value?: string;
  onChange?: (color: string) => void;
  colorList?: string[];
}

const ColorItems: React.FC<IColorItemProps> = ({
  value,
  onChange,
  colorList,
  className,
}) => {
  return (
    <div className="flex justify-between flex-wrap">
      {colorList.map((c) => (
        <div
          onClick={() => {
            onChange(c);
          }}
          key={c}
          className={cn(
            "inline-block w-5 h-5 rounded-full mr-2 mb-2 cursor-pointer hover:scale-110   transition-all",
            className
          )}
          style={{ backgroundColor: c }}
        >
          {c === value && (
            <div className="flex justify-center items-center text-white w-full h-full ">
              <CheckedSvg />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const TagCreate: IColorTagComponent["TagCreate"] = ({
  cancleCallback,
  onChange,
  value,
  successCallback,
}) => {
  console.log('value', value)
  const { uiKit } = useCtx();

  const setColor = (color: string) => {
    onChange?.({
      ...value,
      color,
    });
  };

  const setName = (name: string) => {
    onChange?.({
      ...value,
      name,
    });
  };

  return (
    <div className="w-52">
      <div className="flex items-center px-2 py-1 border-b-2 border-gray-100 h-10">
        <div
          className=" absolute text-lg hover:bg-gray-100 cursor-pointer rounded p-1 "
          onClick={cancleCallback}
        >
          <ArrowLeft />
        </div>

        <div className=" grow flex justify-center   font-bold ">创建标签</div>
      </div>
      <div className="px-3 ">
        <p className=" text-gray-500 text-xs py-4">标签名称</p>
        <uiKit.Input value={value?.name} onChange={setName} placeholder="标签名称" />
      </div>
      <div className="px-3 ">
        <p className=" text-gray-500 text-xs py-4">标签颜色</p>
        <ColorItems
          colorList={COLOR_TAG_LIST}
          value={value?.color}
          onChange={setColor}
        />
      </div>
      <div className="px-2 py-1 border-gray-100 border-t-2 ">
        <uiKit.Button block type="primary" onClick={successCallback}>
          完成创建
          <div className=" float-right h-full flex items-center ">
            <div>
              <AddColorTag className="text-lg h-5 w-5 rounded bg-white bg-opacity-30 " />
            </div>
          </div>
        </uiKit.Button>
      </div>
    </div>
  );
};

import { ColorTag, TagItems } from "@life-uikit/color-tag/index";
import { Meta } from "@storybook/react";
import { useState } from "react";

export default {
  title: "Components/ColorTag",
  component: ColorTag,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof ColorTag>;

export const Primary = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="w-full h-32  p-4">
      <ColorTag
        value={value}
        onChange={(ids) => {
          setValue(ids);
        }}
      />
    </div>
  );
};

export const CustomerTigger = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="w-full h-32  p-4">
      <ColorTag
        value={value}
        onChange={(ids) => {
          setValue(ids);
        }}
      >
        <div className=" hover:bg-gray-100 transition-all cursor-pointer py-1 px-2 rounded text-gray-600">
          新增标签
        </div>
      </ColorTag>
    </div>
  );
};

export const UseTagItems = () => {
  return (
    <TagItems
      tagsList={[
        { id: "1", name: "标签1", color: "#ff5757" },
        { id: "2", name: "标签2", color: "#3e70f8" },
      ]}
      readOnly
    />
  );
};

export const CustomerSlots = () => {
  return (
    <ColorTag
      slots={
        {
          TagCreate: () => <div>tag create</div>,
        } as any
      }
    />
  );
};

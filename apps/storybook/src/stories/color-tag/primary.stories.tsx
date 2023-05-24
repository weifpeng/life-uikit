import { ColorTag } from "@life-uikit/color-tag/src";
import { Meta } from "@storybook/react";
import { useRef, useState } from "react";

export default {
  title: "Components/ColorTag",
  component: ColorTag,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof ColorTag>;

export const Primary = () => {
  const rootRef = useRef<HTMLDivElement>();
  const [value, setValue] = useState<string[]>([]);

  return (
    <div ref={(d) => (rootRef.current = d!)} className="w-full h-32  p-4">
      <ColorTag
        value={value}
        onChange={(ids) => {
          console.log(ids);
          setValue(ids);
        }}
      />
    </div>
  );
};
 
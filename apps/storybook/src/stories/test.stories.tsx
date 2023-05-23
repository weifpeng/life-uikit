import { Meta } from "@storybook/react";
import { ColorTag } from "@life-uikit/color-tag/src";
import { BaseUikit } from "@life-uikit/antd";
import { Context } from "@life-uikit/context";
import { ITagInfo, ITagService } from "@life-uikit/types";
import { useRef, useState } from "react";

const COLOR_TAG_LIST: string[] = [
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

let _tagList: ITagInfo[] = [];

const getTagList: ITagService["getTagList"] = (param) => {
  if (!param) {
    return Promise.resolve({
      data: _tagList,
      count: _tagList.length,
    });
  }


  return new Promise((r, j) => {
    setTimeout(() => {
      r({
        data: _tagList.slice(0, param.limit).map((t) => ({
          ...t,
          id: `${t.id}`,
          name: `${t.name}`,
        })),
        count: _tagList.length * 3,
      });
    }, 1000);
  });
};

const createTag: ITagService["createTag"] = (param: any) => {
  const newInfo = { ...param, id: `${_tagList.length + 2}` };
  _tagList.push(newInfo);

  return new Promise<any>((r, j) => {
    setTimeout(() => {
      r(newInfo);
    }, 3000);
  });
};

const updateTag: ITagService["updateTag"] = (id, param) => {
  _tagList = _tagList.map((t) => {
    if (t.id === id) {
      return {
        ...t,
        ...param,
      };
    }
    return t;
  });

  return new Promise<any>((r, j) => {
    setTimeout(() => {
      r(param);
    }, 3000);
  });
};

const removeTag: ITagService["deleteTag"] = (id) => {
  console.log('id',id)
  _tagList = _tagList.filter((t) => t.id !== id);
  return new Promise<any>((r, j) => {
    setTimeout(() => {
      r(id);
    }, 3000);
  });
};

export default {
  title: "Example/Antd",
  component: ColorTag,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof ColorTag>;

export const Test = () => {
  const rootRef = useRef<HTMLDivElement>();
  const [value, setValue] = useState<string[]>([]);

  return (
    <Context.Provider
      value={{
        uiKit: BaseUikit,
        services: {
          createTag,
          getTagList,
          deleteTag: removeTag,
          updateTag,
        },
        getRootContainer: () => {
          return document.getElementById("storybook-root")!;
        },
      }}
    >
      <div ref={(d) => (rootRef.current = d!)} className="w-full h-32  p-4">
        <ColorTag
          value={value}
          onChange={(ids) => {
            console.log(ids);
            setValue(ids);
          }}
        />
      </div>
    </Context.Provider>
  );
};

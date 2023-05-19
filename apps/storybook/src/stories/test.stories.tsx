import { Meta } from "@storybook/react";
import { ColorTag } from "@uikit/color-tag/src";
import { BaseUikit } from "@uikit/antd"
import { Context } from "@uikit/context"
import { ITagService } from "@uikit/types"
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

const TAG_LIST = COLOR_TAG_LIST.map((c, i) => ({
    id: `${i}`,
    name: `test-${i}`,
    color: c,
}));

const getTagList: ITagService['getTagList'] = (param) => {
    if (!param) {
        return Promise.resolve({
            data: TAG_LIST,
            count: TAG_LIST.length
        });
    }

    return new Promise((r, j) => {

        setTimeout(() => {
            r({
                data: TAG_LIST.slice(0, param.limit).map(t => ({
                    ...t,
                    id: `${param.offset}-${t.id}`,
                    name: `${param.offset}-${t.name}`
                })),
                count: TAG_LIST.length * 3
            })
        }, 1000)
    })
}

const createTag: ITagService['createTag'] = (param: any) =>
    new Promise<any>((r, j) => {
        setTimeout(() => {
            r({ id: "1", name: "test", color: "#666" });
        }, 3000);
    });


export default {
    title: "Example/Antd",
    component: ColorTag,
    parameters: {
        layout: "fullscreen",
    },
} as Meta<typeof ColorTag>;

export const Test = () => {
    const rootRef = useRef<HTMLDivElement>();
    const [value, setValue] = useState<string[]>([])

    return (
        <Context.Provider
            value={{
                uiKit: BaseUikit,
                services: {
                    createTag,
                    getTagList,
                    deleteTag: () => Promise.resolve(),
                    updateTag: () => Promise.resolve({} as any),
                },
                getRootContainer: () => {
                    return document.getElementById('storybook-root')!
                }
            }}
        >
            <div
                ref={(d) => (rootRef.current = d!)}

                className="w-full h-32  p-4"
            >
                <ColorTag
                    value={value}
                    onChange={(ids)=>{
                        console.log(ids)
                        setValue(ids)
                    }}

                />
            </div>
        </Context.Provider>

    )
}
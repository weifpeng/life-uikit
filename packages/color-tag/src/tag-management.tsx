import { useCtx } from "@life-uikit/context";
import { IColorTagComponent } from "@life-uikit/types/color-tag";
import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import TrashSvg from "@life-uikit/assets/svg/trash.svg";

import CheckSvg from "@life-uikit/assets/svg/check.svg";
import CloseSvg from "@life-uikit/assets/svg/close.svg";
import { ITagInfo } from "@life-uikit/types";

export const TagManagement: IColorTagComponent["TagManagement"] = ({
  tagsList,
  onDelete,
  onUpdate,
}) => {
  const { uiKit } = useCtx();
  const [activeInfo, setActiveInfo] = useState<ITagInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<any>();

  useEffect(() => {
    setActiveInfo(null);
  }, [tagsList]);

  useEffect(() => {
    if (!inputRef.current) return;
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [activeInfo?.id]);

  const handleNameChange = (val: string) => {
    setActiveInfo({ ...activeInfo!, name: val });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await onUpdate?.(activeInfo!);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      setLoading(true);
      await onDelete?.(id);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <uiKit.Spin spinning={loading}>
      <div className=" text-lg font-bold">标签管理</div>
      <div className=" mt-4 h-72 overflow-y-auto pt-1 ">
        {tagsList?.map((t) => (
          <div
            className={cn(
              " flex items-center h-10  -mt-px cursor-pointer hover:bg-gray-100 transition-all group ",
              { ["border"]: t.id !== activeInfo?.id }
            )}
            onClick={() => {
              setActiveInfo(t);
            }}
          >
            <div
              className={cn("flex items-center w-full h-full  ", {
                ["px-3"]: t.id !== activeInfo?.id,
              })}
            >
              {t.id === activeInfo?.id ? (
                <uiKit.Input
                  onChange={handleNameChange}
                  ref={(r: any) => (inputRef.current = r)}
                  prefix={
                    <div
                      style={{ backgroundColor: t.color }}
                      className="w-2 h-2 rounded-full  mr-1"
                    ></div>
                  }
                  className="w-full h-full"
                  value={activeInfo.name}
                  suffix={
                    <>
                      <CheckSvg
                        style={{
                          color: "rgb(79, 190, 14)",
                          height: 14,
                          width: 14,
                          marginRight: 8.5,
                        }}
                        onClick={handleSave}
                      />
                      <CloseSvg
                        style={{
                          color: "rgb(235, 51, 63)",
                          height: 14,
                          width: 14,
                          marginRight: 0,
                        }}
                        onClick={(e: any) => {
                          e.stopPropagation();
                          setActiveInfo(null);
                        }}
                      />
                    </>
                  }
                />
              ) : (
                <div className="flex items-center relative w-full ">
                  <div
                    style={{ backgroundColor: t.color }}
                    className="w-2 h-2 rounded-full  mr-2"
                  ></div>
                  {t.name}
                  <div
                    className=" absolute right-1 hidden group-hover:block transition-all text-gray-400 hover:text-red-500 "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove?.(t?.id!);
                    }}
                  >
                    <TrashSvg />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </uiKit.Spin>
  );
};

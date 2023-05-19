import PlusSvg from "@uikit/assets/svg/plus.svg";
import { useCtx } from "@uikit/context";
import { ITagInfo } from "@uikit/types";
import type { ColorTagType } from "@uikit/types/color-tag";
import { useState } from "react";
import useSwr from "swr";

export const ColorTag: ColorTagType = ({
  slots,
  className,
  style,
  value = [],
  onChange,
}) => {
  const {
    uiKit,
    services: { getTagList, createTag },
  } = useCtx();

  const { data, error, mutate } = useSwr("tag-list", () => getTagList());
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showManagement, setShowManagement] = useState(false);
  const [newTagInfo, setNewTagInfo] = useState<Partial<ITagInfo>>({
    name: "",
    color: "",
  });
  const [createLoading, setCreateLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setCreateLoading(true);
      const data = await createTag(newTagInfo as ITagInfo);
      onChange?.([...value, data?.id]);
      await mutate();
    } catch (e) {
    } finally {
      setShowCreate(false);
      setCreateLoading(false);
    }
  };

  return (
    <div>
      <uiKit.Dropdown
        visible={dropdownVisible}
        onVisibleChange={setDropdownVisible}
        overlay={() =>
          showCreate ? (
            <uiKit.Spin spinning={createLoading}>
              <slots.TagCreate
                cancleCallback={() => {
                  setShowCreate(false);
                }}
                value={newTagInfo}
                onChange={setNewTagInfo}
                successCallback={handleCreate}
              />
            </uiKit.Spin>
          ) : (
            <slots.TagPicker
              tagsList={data?.data}
              value={value}
              onChange={onChange}
              onCreateClick={() => {
                setShowCreate(true);
              }}
              onManagementClick={() => {
                setShowManagement(true);
                setDropdownVisible(false);
              }}
            />
          )
        }
        placement="bottomLeft"
      >
        <div className=" w-5 h-5 rounded-full hover:bg-gray-100 cursor-pointer border flex justify-center items-center bg-white active:bg-gray-200 transition-all ">
          <PlusSvg
            className="text-xs "
            style={{ color: "black", fontSize: "10px" }}
          />
        </div>
      </uiKit.Dropdown>
      <uiKit.Modal
        visible={showManagement}
        onCancel={() => {
          setShowManagement(false);
        }}
      >
        <slots.TagManagement tagsList={data?.data} />
      </uiKit.Modal>
    </div>
  );
};

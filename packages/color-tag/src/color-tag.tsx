import PlusSvg from "@uikit/assets/svg/plus.svg";
import { useCtx } from "@uikit/context";
import { ITagInfo } from "@uikit/types";
import type { ColorTagType } from "@uikit/types/color-tag";
import cn from "classnames";
import { useMemo, useState } from "react";
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
    services: { getTagList, createTag, updateTag, deleteTag },
  } = useCtx();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showManagement, setShowManagement] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [newTagInfo, setNewTagInfo] = useState<Partial<ITagInfo>>({
    name: "",
    color: "",
  });
  const [createLoading, setCreateLoading] = useState(false);

  const { data, error, mutate } = useSwr(`tag-list`, () => getTagList());

  const handleCreate = async () => {
    try {
      setCreateLoading(true);
      const data = await createTag(newTagInfo as ITagInfo);
      onChange?.([...value, data?.id]);
      await mutate();
      setNewTagInfo({ name: "", color: "" });
      setSearchValue("");
    } catch (e) {
    } finally {
      setShowCreate(false);
      setCreateLoading(false);
    }
  };

  const handleUpdate = async (info: Partial<ITagInfo>) => {
    try {
      const { id, ...rest } = info;
      await updateTag(id!, rest!);
      await mutate();
    } catch (e) {}
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTag(id);
      await mutate();
    } catch (e) {}
  };

  const handleRemove = async (id: string) => {
    onChange?.(value.filter((v) => v !== id));
  };

  const selectedTagList = useMemo(() => {
    return data?.data?.filter((d) => value?.includes(d.id));
  }, [data, value]);

  return (
    <div className={cn("flex items-center", className)} style={style}>
      <slots.TagItems tagsList={selectedTagList} onRemove={handleRemove} />
      <uiKit.Dropdown
        visible={dropdownVisible}
        onVisibleChange={setDropdownVisible}
        overlay={() => (
          <>
            {showCreate && (
              <>
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
              </>
            )}
            {!showCreate && (
              <slots.TagPicker
                tagsList={data?.data}
                value={value}
                onChange={onChange}
                onCreateClick={(info) => {
                  if (info) {
                    setNewTagInfo(info!);
                  }
                  setShowCreate(true);
                }}
                onManagementClick={() => {
                  setShowManagement(true);
                  setDropdownVisible(false);
                }}
                onSearchChange={setSearchValue}
                searchValue={searchValue}
              />
            )}
          </>
        )}
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
        onOk={() => {
          setShowManagement(false);
        }}
      >
        <slots.TagManagement
          tagsList={data?.data}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </uiKit.Modal>
    </div>
  );
};

import { useCtx } from "@uikit/context";
import { IColorTagComponent } from "@uikit/types/color-tag";
import SearchSvg from "@uikit/assets/svg/search.svg";
import PluseSvg from "@uikit/assets/svg/plus.svg";
import AddColorTagSvg from "@uikit/assets/svg/add-color-tag.svg";
import ChevronRight from "@uikit/assets/svg/chevron-right.svg";
import Cog from "@uikit/assets/svg/cog.svg";
import Checked from "@uikit/assets/svg/check.svg";
import { ITagInfo } from "@uikit/types";

interface IActionBarProps {
  leftSvg: React.ReactNode;
  rightSvg: React.ReactNode;
  text: string;
  onClick?: () => void;
}
const ActionBar: React.FC<IActionBarProps> = ({
  leftSvg,
  rightSvg,
  text,
  onClick,
}) => {
  return (
    <div
      className="flex items-center justify-between px-3 cursor-pointer hover:bg-gray-50 transition-all h-10 "
      onClick={onClick}
    >
      <div className=" flex items-center">
        <div className=" text-sm mr-3">{leftSvg}</div>
        <span className=" text-xs text-gray-500">{text}</span>
      </div>
      <div>{rightSvg}</div>
    </div>
  );
};

interface ITagOptionProps {
  info: ITagInfo;
  onClick?: () => void;
  checked?: boolean;
}

const TagOption: React.FC<ITagOptionProps> = ({ info, checked, onClick }) => {
  return (
    <div
      className=" flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-gray-50 transition-all h-10  "
      onClick={onClick}
    >
      <div className="flex items-center">
        <div
          className="w-2 h-2 rounded-full   mr-2"
          style={{ backgroundColor: info.color }}
        ></div>
        {info.name}
      </div>
      {checked && (
        <div>
          <Checked />
        </div>
      )}
    </div>
  );
};

export const ColorPikcer: IColorTagComponent["TagPicker"] = ({
  className,
  style,
  tagsList,
  value = [],
  onCreateClick,
  onManagementClick,
  onChange,
}) => {
  const { uiKit } = useCtx();

  const handleOptionClick = (info: ITagInfo) => {
    if (value?.includes(info.id)) {
      onChange?.(value?.filter((v) => v !== info.id));
    } else {
      onChange?.([...value, info.id]);
    }
  };

  return (
    <div className=" w-52">
      <div className="flex items-center justify-between px-2 py-1 border-b border-gray-200 bg-gray-100">
        <uiKit.Input
          size="middle"
          placeholder="快速筛选"
          suffix={<SearchSvg style={{ color: "#adbacc" }} />}
        />
      </div>
      <div className="w-full max-h-52  overflow-y-auto ">
        {tagsList?.map((t) => (
          <TagOption
            key={t.id}
            info={t}
            checked={value?.includes(t.id)}
            onClick={() => {
              handleOptionClick(t);
            }}
          />
        ))}
        {!tagsList?.length && (
          <div className="w-full h-full flex items-center justify-center text-gray-400 py-5">
            <div></div>
            <span>暂无数据</span>
          </div>
        )}
      </div>
      <ActionBar
        leftSvg={<PluseSvg />}
        rightSvg={<AddColorTagSvg />}
        text="创建标签"
        onClick={onCreateClick}
      />
      {Boolean(tagsList?.length )&& (
        <ActionBar
          leftSvg={<Cog />}
          rightSvg={<ChevronRight />}
          text="管理标签"
          onClick={onManagementClick}
        />
      )}
    </div>
  );
};

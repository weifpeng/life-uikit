import CloseIcon from "@uikit/assets/svg/close.svg";
import { IColorTagComponent } from "@uikit/types/color-tag";

export const TagItems: IColorTagComponent["TagItems"] = ({
  tagsList,
  onRemove,
}) => {
  return (
    <div className="flex items-center flex-wrap" >
      {tagsList?.map((v) => (
        <div key={v.id} className="flex items-center border px-1 rounded-xl mr-1  ">
          <div
            className="mr-1 w-2 h-2 rounded-full  "
            style={{ backgroundColor: v.color }}
          ></div>
          <div className="mr-1 text-gray-600 text-xs ">{v.name}</div>
          <div
            className=" text-gray-500 hover:text-gray-700 hover:bg-slate-100 cursor-pointer mr-1"
            onClick={() => onRemove?.(v.id)}
          >
            <CloseIcon className="w-2 h-2"   />
          </div>
        </div>
      ))}
    </div>
  );
};

import { ITagInfo, ITagService } from "@life-uikit/types";

let _tagList: ITagInfo[] = [];

export const getTagList: ITagService["getTagList"] = (param) => {
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

export const createTag: ITagService["createTag"] = (param: any) => {
  const newInfo = { ...param, id: `${_tagList.length + 2}` };
  _tagList.push(newInfo);

  return new Promise<any>((r, j) => {
    setTimeout(() => {
      r(newInfo);
    }, 1000);
  });
};

export const updateTag: ITagService["updateTag"] = (id, param) => {
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
    }, 1000);
  });
};

export const deleteTag: ITagService["deleteTag"] = (id) => {
  console.log("id", id);
  _tagList = _tagList.filter((t) => t.id !== id);
  return new Promise<any>((r, j) => {
    setTimeout(() => {
      r(id);
    }, 1000);
  });
};

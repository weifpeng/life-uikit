/**
 * api page response data
 */
type IPageData<T> = {
  data: T[];
  count: number;
};

/**
 * api page query param
 */
type IPageParam<T> = Partial<T> & {
  offset?: number;
  limit?: number;
};

export type ITagInfo = {
  id: string;
  name: string;
  color: string;
};
/**
 * when param have not offset and limit ,response all data ,need  page data sturct
 */
type GetTagList = (
  param?: IPageParam<ITagInfo>
) => Promise<IPageData<ITagInfo>>;

type PostTagParam = Partial<Omit<ITagInfo, "id">>;
type CreateTag = (param: PostTagParam) => Promise<ITagInfo>;

type UpdateTag = (id: string, param: PostTagParam) => Promise<ITagInfo>;

type DeleteTag = (id: string) => Promise<any>;

export interface ITagService {
  getTagList: GetTagList;
  createTag: CreateTag;
  updateTag: UpdateTag;
  deleteTag: DeleteTag;
}

export interface IServices extends ITagService {}

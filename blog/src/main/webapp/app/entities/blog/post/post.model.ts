import dayjs from 'dayjs/esm';

export interface IPost {
  compositeId: IPostId;
  title?: string | null;
  content?: string | null;
}
export interface IPostId {
  createdDate: number | null;
  addedDateTime: dayjs.Dayjs | null;
  postId: string | null;
}

export type NewPost = Omit<IPost, 'compositeId'> & { compositeId: IPostId };

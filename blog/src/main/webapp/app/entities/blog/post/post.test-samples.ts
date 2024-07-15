import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  createdDate: 25559,
  title: 'agile but',
  content: 'knottily',
};

export const sampleWithPartialData: IPost = {
  createdDate: 19472,
  addedDateTime: 27961,
  postId: '6b46d524-9a04-46ab-a68d-9d8bbff62edf',
  title: 'yuck',
  content: 'punctual er',
};

export const sampleWithFullData: IPost = {
  createdDate: 20312,
  addedDateTime: 15095,
  postId: '4ee7e9c3-d8b9-46ec-9526-ba0b96bd53c4',
  title: 'untidy pesky',
  content: 'foolishly cure apropos',
};

export const sampleWithNewData: NewPost = {
  title: 'imbibe',
  content: 'yahoo critical',
  createdDate: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  createdDate: 14702,
  title: 'biodegrade',
  content: 'rear victoriously boohoo',
};

export const sampleWithPartialData: IPost = {
  createdDate: 23669,
  title: 'energetic',
  content: 'infatuated zowie',
};

export const sampleWithFullData: IPost = {
  createdDate: 8021,
  addedDateTime: 30064,
  postId: 'a96ce413-fac1-420a-8561-405aa9d3a23c',
  title: 'upward highlight always',
  content: 'unblinking',
};

export const sampleWithNewData: NewPost = {
  title: 'sleepy immediately',
  content: 'in completion mushy',
  createdDate: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

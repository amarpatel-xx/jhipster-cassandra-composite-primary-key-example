import { IPost, NewPost } from './post.model';

export const sampleWithRequiredData: IPost = {
  createdDate: 5212,
  title: 'until',
  content: 'sock dramatic',
};

export const sampleWithPartialData: IPost = {
  createdDate: 19998,
  addedDateTime: 5720,
  postId: 'aab49e7e-7938-49e5-96ab-6d34aa4e3ea9',
  title: 'phew boo till',
  content: 'provided',
};

export const sampleWithFullData: IPost = {
  createdDate: 17741,
  addedDateTime: 15425,
  postId: '3c3e9350-336c-4dc3-9c30-2cdb08bf53a9',
  title: 'cloudy into dwell',
  content: 'jam-packed save',
  publishedDateTime: 6457,
};

export const sampleWithNewData: NewPost = {
  title: 'splosh obedience till',
  content: 'opposite consequently anti',
  createdDate: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

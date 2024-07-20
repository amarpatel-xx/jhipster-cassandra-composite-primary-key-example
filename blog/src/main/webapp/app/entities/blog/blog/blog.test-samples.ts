import { IBlog, NewBlog } from './blog.model';

export const sampleWithRequiredData: IBlog = {
  category: '4c3cf9c6-a31e-47e9-83c4-e48c726a0331',
  handle: 'aw parallelogram',
  content: 'an sentimentalize dangerous',
};

export const sampleWithPartialData: IBlog = {
  category: '35b1e79f-9f02-4fbb-8713-e06061f365c1',
  blogId: 'd1ac6f77-f1f2-4018-ab77-a260408be05f',
  handle: 'notwithstanding snappy chiffonier',
  content: 'suddenly software larch',
};

export const sampleWithFullData: IBlog = {
  category: '99b3b8dd-61d9-45a0-ad4f-9e37aadcaffd',
  blogId: '47042d3a-ef3c-46dc-ac6b-d6e2aa4926cf',
  handle: 'diam blind',
  content: 'certainly when stitch',
};

export const sampleWithNewData: NewBlog = {
  handle: 'incidentally',
  content: 'cruel assassination',
  category: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

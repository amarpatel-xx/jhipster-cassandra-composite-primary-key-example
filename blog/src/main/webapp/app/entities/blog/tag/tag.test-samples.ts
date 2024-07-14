import { ITag, NewTag } from './tag.model';

export const sampleWithRequiredData: ITag = {
  id: 'df8a9cf7-e4ce-42fd-8a0c-490c07442753',
  name: 'spandex hmph nor',
};

export const sampleWithPartialData: ITag = {
  id: 'c9f28ad2-8a2f-4f91-81d1-ff31f5e241c9',
  name: 'ew pfft',
};

export const sampleWithFullData: ITag = {
  id: 'ac34ae41-9861-43e2-9de8-43fb002eca4b',
  name: 'shampoo boastfully start',
};

export const sampleWithNewData: NewTag = {
  name: 'secede',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

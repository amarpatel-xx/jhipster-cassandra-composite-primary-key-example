import { ISaathratriEntity, NewSaathratriEntity } from './saathratri-entity.model';

export const sampleWithRequiredData: ISaathratriEntity = {
  entityId: '0a12abbb-cbc7-4233-8d33-638e4f24eb9b',
};

export const sampleWithPartialData: ISaathratriEntity = {
  entityId: '5659ffb4-244c-461e-9a74-f787a2422e3c',
  entityName: 'against during acidly',
  entityCost: 5939.97,
};

export const sampleWithFullData: ISaathratriEntity = {
  entityId: '0ed97841-b0ab-4204-ae52-95cfbca84d82',
  entityName: 'with whoa sunny',
  entityDescription: 'provided lustrous',
  entityCost: 26498.61,
};

export const sampleWithNewData: NewSaathratriEntity = {
  entityId: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

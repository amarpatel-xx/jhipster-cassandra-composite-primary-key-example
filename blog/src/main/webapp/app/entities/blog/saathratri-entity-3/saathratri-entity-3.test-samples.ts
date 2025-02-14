import { ISaathratriEntity3, NewSaathratriEntity3 } from './saathratri-entity-3.model';

export const sampleWithRequiredData: ISaathratriEntity3 = {
  entityType: '4727c3dd-75d1-495a-b213-37d013125ad7',
};

export const sampleWithPartialData: ISaathratriEntity3 = {
  entityType: '486d641a-08ab-4ff2-807c-1115a7413467',
  entityName: 'sans midwife digestive',
  departureDate: 891,
};

export const sampleWithFullData: ISaathratriEntity3 = {
  entityType: '593d2ae4-ac28-49ed-a28a-6030ce520538',
  createdTimeId: 'cae4762d-1030-4828-8f8d-947c6b5eb53c',
  entityName: 'plus word',
  entityDescription: 'duh',
  entityCost: 13544.51,
  departureDate: 12420,
};

export const sampleWithNewData: NewSaathratriEntity3 = {
  entityType: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

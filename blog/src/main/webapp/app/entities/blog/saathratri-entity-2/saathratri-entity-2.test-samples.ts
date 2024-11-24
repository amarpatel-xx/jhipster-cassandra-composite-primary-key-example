import { ISaathratriEntity2, NewSaathratriEntity2 } from './saathratri-entity-2.model';

export const sampleWithRequiredData: ISaathratriEntity2 = {
  entityTypeId: '6aa2f983-feb4-4e09-9e00-26e41a14776d',
};

export const sampleWithPartialData: ISaathratriEntity2 = {
  entityTypeId: '3e249591-0e0f-4ec0-bf09-c7d3d00f22ea',
  yearOfDateAdded: 2195,
  arrivalDate: 9328,
  blogId: 'ae6c70dc-92b1-46ff-9402-e634b95d34ac',
  entityDescription: 'anaesthetise',
  entityCost: 11377.33,
};

export const sampleWithFullData: ISaathratriEntity2 = {
  entityTypeId: '1b23e19f-787b-4e17-87eb-c36c9ef47d2a',
  yearOfDateAdded: 14786,
  arrivalDate: 28354,
  blogId: 'ce17f80c-66d3-4c11-9e4c-390fad83f841',
  entityName: 'sick',
  entityDescription: 'each unit',
  entityCost: 19405.71,
};

export const sampleWithNewData: NewSaathratriEntity2 = {
  entityTypeId: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

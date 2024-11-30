import dayjs from 'dayjs/esm';

import { ISaathratriEntity2, NewSaathratriEntity2 } from './saathratri-entity-2.model';

export const sampleWithRequiredData: ISaathratriEntity2 = {
  entityTypeId: 'a2f983fe-b4e0-49e0-9026-e41a14776d43',
  addedDate: dayjs('2024-11-30'),
};

export const sampleWithPartialData: ISaathratriEntity2 = {
  entityTypeId: '495910e0-fec0-4f09-ac7d-3d00f22ead14',
  arrivalDate: 30644,
  blogId: '6c70dc92-b16f-4f40-92e6-34b95d34ac53',
  entityName: 'blissfully yet lively',
  entityCost: 14731.99,
  addedDate: dayjs('2024-11-30'),
};

export const sampleWithFullData: ISaathratriEntity2 = {
  entityTypeId: 'bc36c9ef-47d2-4a17-8dce-17f80c66d3c1',
  yearOfDateAdded: 28821,
  arrivalDate: 8274,
  blogId: 'c390fad8-3f84-4164-8f95-e7bb5cdfec83',
  entityName: 'infatuated within',
  entityDescription: 'ick',
  entityCost: 2142.73,
  addedDate: dayjs('2024-11-29'),
};

export const sampleWithNewData: NewSaathratriEntity2 = {
  addedDate: dayjs('2024-11-30'),
  entityTypeId: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

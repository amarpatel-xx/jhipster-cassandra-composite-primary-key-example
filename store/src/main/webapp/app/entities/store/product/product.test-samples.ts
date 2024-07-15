import dayjs from 'dayjs/esm';

import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: '2d35d7bb-5480-44dc-82f4-df8a149b21c2',
  title: 'consignment course wherever',
  price: 29578.59,
  addedDate: dayjs('2024-07-15'),
};

export const sampleWithPartialData: IProduct = {
  id: '8b16200f-1630-41d5-b971-f844af264be0',
  title: 'footage underpants cruise',
  price: 25567.26,
  addedDate: dayjs('2024-07-15'),
};

export const sampleWithFullData: IProduct = {
  id: 'ebedee06-6494-4e0f-bc0a-9d2bfdfa8841',
  title: 'ha',
  price: 15462.69,
  image: undefined,
  imageContentType: 'unknown',
  addedDate: dayjs('2024-07-15'),
  addedDateTime: 4682,
};

export const sampleWithNewData: NewProduct = {
  title: 'cultivated mole blowhole',
  price: 19767.18,
  addedDate: dayjs('2024-07-15'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

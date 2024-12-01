import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: '0d24fa4b-12fd-4abd-9283-e21ed8120131',
  title: 'who ew',
  price: 14429.32,
  addedDate: 19526,
};

export const sampleWithPartialData: IProduct = {
  id: '3bde6440-cadb-4da8-912f-567257a2f366',
  title: 'down until gee',
  price: 6999.57,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  addedDate: 9874,
  addedDateTime: 3177,
};

export const sampleWithFullData: IProduct = {
  id: '2b120c55-dafd-49b8-8dfc-a3c5bf4a6332',
  title: 'baptise',
  price: 8357.44,
  image: '../fake-data/blob/hipster.png',
  imageContentType: 'unknown',
  addedDate: 6808,
  addedDateTime: 10646,
};

export const sampleWithNewData: NewProduct = {
  title: 'upwardly slow',
  price: 27255.98,
  addedDate: 20720,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

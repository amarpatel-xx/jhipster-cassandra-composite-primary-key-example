import dayjs from 'dayjs/esm';

export interface ISaathratriEntity5 {
  compositeId: ISaathratriEntity5Id;
  addOnType?: string | null;
  addOnDetailsText?: Map<string, string | null>;
  addOnDetailsDecimal?: Map<string, number | null>;
  addOnDetailsBoolean?: Map<string, boolean | null>;
  addOnDetailsBigInt?: dayjs.Dayjs | null;
}
export interface ISaathratriEntity5Id {
  organizationId: string | null;
  entityType: string | null;
  entityId: string | null;
  addOnId: string | null;
}

export type NewSaathratriEntity5 = Omit<ISaathratriEntity5, 'compositeId'> & { compositeId: ISaathratriEntity5Id };

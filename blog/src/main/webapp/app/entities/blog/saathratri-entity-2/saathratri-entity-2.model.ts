export interface ISaathratriEntity2 {
  compositeId: ISaathratriEntity2Id;
  entityName?: string | null;
  entityDescription?: string | null;
  entityCost?: number | null;
}
export interface ISaathratriEntity2Id {
  entityTypeId: string | null;
  yearOfDateAdded: number | null;
  arrivalDate: number | null;
  blogId: string | null;
}

export type NewSaathratriEntity2 = Omit<ISaathratriEntity2, 'compositeId'> & { compositeId: ISaathratriEntity2Id };

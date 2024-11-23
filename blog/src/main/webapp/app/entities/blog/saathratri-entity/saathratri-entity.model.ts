export interface ISaathratriEntity {
  entityId: string;
  entityName?: string | null;
  entityDescription?: string | null;
  entityCost?: number | null;
}

export type NewSaathratriEntity = Omit<ISaathratriEntity, 'entityId'> & { entityId: string };

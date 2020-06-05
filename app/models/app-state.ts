import DS from 'ember-data';
const { Model, attr } = DS;

export default class AppStateModel extends Model {
  @attr() datapackId!: string;
  @attr() namespaceId!: string;
  @attr() sectionId!: string;
  @attr() modal!: string;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'app-state': AppStateModel;
  }
}

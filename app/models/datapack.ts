import DS from 'ember-data';
import NamespaceModel from './namespace';
const { Model, attr, hasMany } = DS;

export default class DatapackModel extends Model {
  @attr() name!: string;
  @attr() description!: string;
  // @ts-ignore for dependent local storage key
  @hasMany('namespace', { dependent: 'destroy', autoSave: true }) namespaces!: NamespaceModel[];
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'datapack': DatapackModel;
  }
}

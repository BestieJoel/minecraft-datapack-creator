import DS from 'ember-data';
import NamespaceModel from './namespace';
const { Model, attr, belongsTo } = DS;

export default class TagModel extends Model {
  @attr() name!: string;
  @attr() path!: string;
  //@ts-ignore
  @belongsTo('namespace', { autoSave: true }) namespace!: NamespaceModel;
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'tag': TagModel;
  }
}

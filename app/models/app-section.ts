import DS from 'ember-data';
const { Model, attr } = DS;

export default class AppSectionModel extends Model {
  @attr() label!: string;
  @attr() value!: string;
  @attr() description!: string;
  @attr() shortcut!: string;
  @attr() icon!: string;
  @attr() type!: 'tool' | 'page';
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'app-section': AppSectionModel;
  }
}

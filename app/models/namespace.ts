import DS from 'ember-data';
import DatapackModel from './datapack';
const { Model, attr, hasMany, belongsTo } = DS;

// const NewFileDescriptor = (label: string, model: string): FileDescriptor => ({
//   label: `New ${label}`,
//   type: 'file',
//   new: true,
//   model
// });

// // TODO extension
// const ExistingFileDescriptior = (instances: any[], model: string) => {
//   return instances.map((n: any) => ({
//     id: n.id,
//     label: n.name,
//     type: 'file',
//     model
//   })) as FileDescriptor[] // as... because its getting mad about type not being 'file' lol
// };

export default class NamespaceModel extends Model {
  @attr() name!: string;

  //@ts-ignore
  @belongsTo('datapack', { autoSave: true }) datapack!: DatapackModel;

  //@ts-ignore
  @hasMany('advancement', { dependent: 'destroy' }) advancements!: AdvancementModel[];
  //@ts-ignore
  @hasMany('function', { dependent: 'destroy' }) functions!: FunctionModel[];
  //@ts-ignore
  @hasMany('loot-table', { dependent: 'destroy' }) lootTables!: LootTableModel[];
  //@ts-ignore
  @hasMany('predicate', { dependent: 'destroy' }) predicates!: PredicateModel[];
  //@ts-ignore
  @hasMany('recipe', { dependent: 'destroy' }) recipes!: RecipeModel[];
  //@ts-ignore
  @hasMany('tag', { dependent: 'destroy' }) tags!: TagModel[];


  // async getFolderedNavSchema(): Promise<FileDescriptor[]> {
  //   let tags = await this.tags;
  //   return [
  //     {
  //       label: 'advancements',
  //       type: 'folder',
  //       children: [
  //         NewFileDescriptor('Advancement', 'advancement'),
  //         ...ExistingFileDescriptior(await this.advancements, 'advancement')
  //       ]
  //     },
  //     {
  //       label: 'functions',
  //       type: 'folder',
  //       children: [
  //         NewFileDescriptor('Function', 'function'),
  //         ...ExistingFileDescriptior(await this.functions, 'function')
  //       ]
  //     },
  //     {
  //       label: 'loot_tables',
  //       type: 'folder',
  //       children: [
  //         NewFileDescriptor('Loot Table', 'loot-table'),
  //         ...ExistingFileDescriptior(await this.lootTables, 'loot-table')
  //       ]
  //     },
  //     {
  //       label: 'predicates',
  //       type: 'folder',
  //       children: [
  //         NewFileDescriptor('Predicate', 'predicate'),
  //         ...ExistingFileDescriptior(await this.predicates, 'predicate')
  //       ]
  //     },
  //     {
  //       label: 'recipes',
  //       type: 'folder',
  //       children: [
  //         NewFileDescriptor('Recipe', 'recipe'),
  //         ...ExistingFileDescriptior(await this.recipes, 'recipe')
  //       ]
  //     },
  //     // {
  //     //   label: 'structures',
  //     //   type: 'folder',
  //     //   children: []
  //     // },
  //     {
  //       label: 'tags',
  //       type: 'folder',
  //       children: [
  //         {
  //           label: 'blocks',
  //           type: 'folder',
  //           children: [
  //             NewFileDescriptor('Tag', 'tag'),
  //             ...ExistingFileDescriptior(tags.filterBy('path', 'tags/blocks/'), 'tag')
  //           ]
  //         },
  //         {
  //           label: 'entity_types',
  //           type: 'folder',
  //           children: [
  //             NewFileDescriptor('Tag', 'tag'),
  //             ...ExistingFileDescriptior(tags.filterBy('path', 'tags/entity_types/'), 'tag')
  //           ]
  //         },
  //         {
  //           label: 'fluids',
  //           type: 'folder',
  //           children: [
  //             NewFileDescriptor('Tag', 'tag'),
  //             ...ExistingFileDescriptior(tags.filterBy('path', 'tags/fluids/'), 'tag')
  //           ]
  //         },
  //         {
  //           label: 'functions',
  //           type: 'folder',
  //           children: [
  //             NewFileDescriptor('Tag', 'tag'),
  //             ...ExistingFileDescriptior(tags.filterBy('path', 'tags/functions/'), 'tag')
  //           ]
  //         },
  //         {
  //           label: 'items',
  //           type: 'folder',
  //           children: [
  //             NewFileDescriptor('Tag', 'tag'),
  //             ...ExistingFileDescriptior(tags.filterBy('path', 'tags/items/'), 'tag')
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    'namespace': NamespaceModel;
  }
}

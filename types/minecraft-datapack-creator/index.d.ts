import Ember from 'ember';

declare global {
  interface Array<T> extends Ember.ArrayPrototypeExtensions<T> {}

  interface FileDescriptor {
    id?: string;
    label: string;
    type: 'folder' | 'file';
    children?: FileDescriptor[]; // folder only
    new?: boolean; // file only
    model?: string; // file only, model type for new file
  }

  type NamespaceFeature =
    'advancements' |
    'functions' |
    'lootTables' |
    'predicates' |
    'recipes' |
    'tags';

  interface FileDescriptor {
    id?: string;
    label: string;
    type: 'folder' | 'file';
    path: string;
    children?: FileDescriptor[]; // folder only
    extension?: string;

    // TODO figure these out
    new?: boolean; // file only
    model?: string; // file only, model type for new file
  }
}

export {};

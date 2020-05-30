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
}

export {};

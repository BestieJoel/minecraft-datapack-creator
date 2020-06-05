import Component from '@glimmer/component';
import { action } from '@ember/object';

interface AppSectionFunctionsArgs {}

export default class AppSectionFunctions extends Component<AppSectionFunctionsArgs> {
  /* {
    type: 'file',
    extension: 'json',
    label: 'nested-folder-2-file'
  } */
  get folderSchema() {
    return [
      {
        label: 'functions',
        type: 'folder',
        children: []
      }
    ]
  }

  @action createFile() {

  }

  @action deleteFile() {

  }

  @action editFile() {

  }

  @action createFolder() {

  }

  @action openFile() {

  }
}

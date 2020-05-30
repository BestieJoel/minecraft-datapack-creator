import Component from '@glimmer/component';
import { action } from '@ember/object';

interface FolderDisplayIndexArgs {}

export default class FolderDisplayIndex extends Component<FolderDisplayIndexArgs> {
  @action updateSchema() { console.log('updateSchema'); }
  @action createFile() { console.log('createFile'); }
  @action editFile() { console.log('editFile'); }
  @action deleteFile() { console.log('deleteFile'); }
  @action openFile() { console.log('openFile'); }
}

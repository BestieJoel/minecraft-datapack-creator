import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface FolderDisplayFileArgs {
  model: FileDescriptor;
  path: string;
  createFile: (name: string, path: string, model: FileDescriptor) => void;
  editFile: (name: string, model: FileDescriptor) => void;
  deleteFile: (model: FileDescriptor) => void;
  openFile: (model: FileDescriptor) => void;
}

export default class FolderDisplayFile extends Component<FolderDisplayFileArgs> {
  @tracked inputMode: boolean = false;
  @tracked name: string = this.args.model.label;

  el!: Element;

  @action cacheElement(element: Element) {
    this.el = element;
  }

  @action toggleInputMode() {
    this.inputMode = !this.inputMode;
  }

  @action save(event: any) {
    if (event.target.tagName === "INPUT") {
      if (event.keyCode === 27) { // Esc
        this.toggleInputMode();
        return;
      }
      if (event.keyCode !== 13) { // Enter
        this.name = event.target.value;
        return;
      }
    }

    let isValid = this.name.match(/^[\w-]*$/);

    if (isValid) {
      if (this.args.model.new) {
        this.args.createFile(this.name, this.args.path, this.args.model);
        this.toggleInputMode();
      }
      else {
        this.args.editFile(this.name, this.args.model);
        this.toggleInputMode();
      }
    }
    else {
      alert("Invalid Name. Try format a-z 0-9  _ -  ex: my-name_1");
    }
  }

  @action inputCheck(el: any) {
    // console.log('inputCheck', el, el.value);
    el.value = this.args.model.label;
    el.select();
    el.focus();
  }
}

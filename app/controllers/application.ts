import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import DatapackModel from 'minecraft-datapack-creator/models/datapack';
import AppSectionModel from 'minecraft-datapack-creator/models/app-section';
import NamespaceModel from 'minecraft-datapack-creator/models/namespace';

export default class ApplicationController extends Controller {
  @filterBy('model.sections', 'type', 'tool') toolSchema!: any[];
  @filterBy('model.sections', 'type', 'page') pageSchema!: any[];

  @tracked datapack!: any;
  @tracked namespace!: any;
  @tracked section!: any;

  @action selectSection(section: AppSectionModel) {
    this.section = section;
    this.model.state.sectionId = section.id;
    this.model.state.save();
  }

  @action setModal(modal: string) {
    this.model.state.modal = modal;
    this.model.state.save();
  }

  @action loadDatapack(datapack: DatapackModel) {
    this.model.state.modal = '';

    this.datapack = datapack;
    this.model.state.datapackId = datapack.id;

    this.namespace = datapack.namespaces.rejectBy('name', 'minecraft')?.[0];
    if (this.namespace) {
      this.model.state.namespaceId = this.namespace.id;
    }

    this.model.state.save();
  }

  @action selectNamespace(namespaceId: string) {
    this.namespace = this.datapack.namespaces.findBy('id', namespaceId);
    this.model.state.namespaceId = namespaceId;
    this.model.state.save();
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'application': ApplicationController;
  }
}

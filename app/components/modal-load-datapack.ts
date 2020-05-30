import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import DS from 'ember-data';
import ApplicationController from 'minecraft-datapack-creator/controllers/application';

interface ModalLoadDatapackArgs {
  applicationController: ApplicationController;
}

export default class ModalLoadDatapack extends Component<ModalLoadDatapackArgs> {
  @service store!: DS.Store;

  @tracked newDatapack = false;
  @tracked newDatapackName = '';
  @tracked newDatapackDescription = '';

  get createDisabled() {
    return !this.newDatapackName?.length
      || !this.newDatapackName.match(/^[0-9a-z-_\.]*$/);
  }

  existingDatapacks = [
    {
      label: 'super_block_quest_1',
    },
    {
      label: 'super_block_quest_2',
    },
    {
      label: 'super_block_quest_3',
    },
    {
      label: 'super_block_quest_1',
    },
    {
      label: 'super_block_quest_2',
    },
    {
      label: 'super_block_quest_3',
    },
    {
      label: 'super_block_quest_1',
    },
    {
      label: 'super_block_quest_2',
    },
    {
      label: 'super_block_quest_3',
    },
    {
      label: 'super_block_quest_1',
    },
    {
      label: 'super_block_quest_2',
    },
    {
      label: 'super_block_quest_3',
    }
  ];
  exampleDatapacks = [
    {
      label: 'space_clearing_functions'
    },
    {
      label: 'randomized recipes'
    },
    {
      label: 'super_block_quest_1',
    },
    {
      label: 'super_block_quest_2',
    },
    {
      label: 'super_block_quest_3',
    },
    {
      label: 'super_block_quest_1',
    },
    {
      label: 'super_block_quest_2',
    },
    {
      label: 'super_block_quest_3',
    }
  ];

  @action toggleNew() {
    this.newDatapack = !this.newDatapack;
  }

  @action async createNew() {
    let datapack = this.store.createRecord('datapack', {
      name: this.newDatapackName,
      description: this.newDatapackDescription
    });
    let namespace = this.store.createRecord('namespace', {
      name: this.newDatapackName
    });
    await namespace.save();
    let mcNamespace = this.store.createRecord('namespace', {
      name: 'minecraft'
    });
    await mcNamespace.save();
    datapack.namespaces.pushObjects([namespace, mcNamespace]);
    await datapack.save();
    this.args.applicationController.loadDatapack(datapack);
  }

  @action load(event: Event) {
    console.log('TODO loadDatapack', event);
  }
}

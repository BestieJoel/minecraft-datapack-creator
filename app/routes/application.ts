import Route from '@ember/routing/route';
import AppSectionData from 'minecraft-datapack-creator/data/models/app-sections';
import AppStateModel from 'minecraft-datapack-creator/models/app-state';
import AppSectionModel from 'minecraft-datapack-creator/models/app-section';
import ApplicationController from 'minecraft-datapack-creator/controllers/application';
import DatapackModel from 'minecraft-datapack-creator/models/datapack';

export default class ApplicationRoute extends Route {
  async model() {
    let sections = AppSectionData.map(section => this.store.createRecord('app-section', section));
    let state;

    // Fetch/Create app state
    try {
      state = await this.store.findRecord('app-state', '0') as AppStateModel;
    } catch (error) {
      state = this.store.createRecord('app-state', {
        id: 0,
        modal: 'modal-load-datapack'
      });
      await state.save();
    }

    // Fetch datapacks
    // TODO other models
    let datapacks = await this.store.findAll('datapack');
    await this.store.findAll('namespace');
    await this.store.findAll('function');

    return {
      datapacks,
      sections,
      state
    };
  }

  setupController(controller: ApplicationController, model: {
    state: AppStateModel,
    sections: AppSectionModel[],
    datapacks: DatapackModel[]
  }) {
    super.setupController(controller, model);

    if (model.state.datapackId) {
      let datapack = model.datapacks.findBy('id', model.state.datapackId);
      if (datapack) {
        controller.datapack = datapack;
        if (model.state.namespaceId) {
          let namespace = datapack.namespaces.findBy('id', model.state.namespaceId);
          if (namespace) {
            controller.namespace = namespace;
            if (model.state.sectionId) {
              controller.section = model.sections.findBy('id', model.state.sectionId);
            }
          }
        }
      }
    }
  }
}

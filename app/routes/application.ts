import Route from '@ember/routing/route';
import AppSectionData from 'minecraft-datapack-creator/data/models/app-sections';
import AppStateModel from 'minecraft-datapack-creator/models/app-state';

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

    return {
      datapacks,
      sections,
      state
    };
  }

  setupController(controller: any, model: any) {
    super.setupController(controller, model);

    if (model.state.sectionId) {
      controller.section = model.sections.findBy('id', model.state.sectionId);
    }
  }
}

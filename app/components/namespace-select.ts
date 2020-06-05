import Component from '@glimmer/component';
import NamespaceModel from 'minecraft-datapack-creator/models/namespace';

interface NamespaceSelectArgs {
  namespaces?: NamespaceModel[];
}

export default class NamespaceSelect extends Component<NamespaceSelectArgs> {
  get options() {
    return (this.args?.namespaces ?? []).map((n) => ({
      label: n.name,
      value: n.id
    }));
  }
}

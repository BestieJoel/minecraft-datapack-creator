import Component from '@glimmer/component';
import { action } from '@ember/object';

interface SelectComponentArgs {
  onChange: (s: string) => void;
}

export default class SelectComponent extends Component<SelectComponentArgs> {
  @action onChange(event: { target: { value: string }}) {
    this.args.onChange(event.target.value);
  }
}

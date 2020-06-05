import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | select', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('realFakeData', [
      {
        label: 'Squeezie',
        value: 'squeezie'
      },
      {
        label: 'Duminawumina',
        value: 'duminawumina'
      },
      {
        label: 'Jack',
        value: 'hi_im_h1r0j4ck'
      }
    ]);

    this.set('onChange', (newValue: string) => { })

    await render(hbs`<Select
      @options={{this.realFakeData}}
      @value={{this.realFakeData.2.value}}
      @onChange={{this.onChange}}
    />`);

    assert.dom('select').exists({ count: 1 });
    assert.dom('select option').exists({ count: 3 });
  });
});

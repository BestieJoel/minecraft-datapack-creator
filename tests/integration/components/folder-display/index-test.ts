import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const RealFakeData = [
  {
    label: 'advancements',
    type: 'folder',
    children: [
      {
        type: 'folder',
        label: 'nested-folder-1',
        children: [
          {
            type: 'folder',
            label: 'nested-folder-2',
            children: [
              {
                type: 'file',
                extension: 'json',
                label: 'nested-folder-2-file'
              },
              {
                type: 'file',
                extension: 'json',
                label: 'nested-folder-2-file'
              },
              {
                type: 'file',
                extension: 'json',
                label: 'nested-folder-2-file'
              }
            ]
          },
          {
            type: 'file',
            extension: 'json',
            label: 'nested-folder-1-file'
          },
          {
            type: 'file',
            extension: 'json',
            label: 'nested-folder-1-file'
          },
          {
            type: 'file',
            extension: 'json',
            label: 'nested-folder-1-file'
          }
        ]
      },
      {
        type: 'file',
        extension: 'json',
        label: 'top-level-folder-file'
      },
      {
        type: 'file',
        extension: 'json',
        label: 'top-level-folder-file'
      }
    ]
  }
]

module('Integration | Component | folder-display/index', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('schema', RealFakeData);
    console.log(this.get('schema'));
    await render(hbs`<FolderDisplay::Index @schema={{this.schema}} />`);
    await this.pauseTest();
  });
});

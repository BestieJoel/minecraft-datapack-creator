import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

interface FolderDisplayFolderArgs {}

enum BoxDrawingCharacters {
  HasMore = '├',
  IsLast = '└',
  Vertical = '│'
}

export default class FolderDisplayFolder extends Component<FolderDisplayFolderArgs> {
  @tracked open: boolean = false;

  @action toggleOpen() {
    this.open = !this.open;
  }

  @action newFolder() {
    console.log('new folder');
  }

  @action newFile() {
    console.log('new file');
  }

  @action computePrefix(level: number, index: number, length: number, isLast: boolean) {
    let verticalBars = '';
    let barChar = isLast ? '&nbsp;&nbsp;' : BoxDrawingCharacters.Vertical;
    if (level > 0) {
      for (let i = 0; i < level; i++) {
        verticalBars += `${barChar}&nbsp;`;
      }
    }
    return `${verticalBars}${index === length - 1 ? BoxDrawingCharacters.IsLast : BoxDrawingCharacters.HasMore}`;
  }
}

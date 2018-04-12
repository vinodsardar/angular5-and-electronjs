import { BasicControl } from './basiccontrol';

export class RadioButtonControl extends BasicControl<string> {
  controlType = 'radiobutton';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
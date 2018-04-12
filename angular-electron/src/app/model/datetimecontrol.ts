import { BasicControl } from './basiccontrol';

export class DateControl extends BasicControl<string> {
  controlType = 'date';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
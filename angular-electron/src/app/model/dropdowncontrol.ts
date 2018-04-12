import { BasicControl } from "./basiccontrol";

export class DropdownControl extends BasicControl<string> {
    controlType = 'dropdown';
    options: {key: string, value: string}[] = [];
  
    constructor(options: {} = {}) {
      super(options);
      this.options = options['options'] || [];
    }
  }
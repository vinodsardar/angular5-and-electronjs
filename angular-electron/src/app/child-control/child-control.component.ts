import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasicControl } from '../model/basiccontrol';

@Component({
  selector: 'app-child-control',
  templateUrl: './child-control.component.html',
  styleUrls: ['./child-control.component.css']
})
export class ChildControlComponent implements OnInit {
@Input() samplecontrol:BasicControl<string>;
@Input() form:FormGroup;
  constructor() { }

  ngOnInit() {
  }

}

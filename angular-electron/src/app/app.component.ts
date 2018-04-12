import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { BasicControl } from './model/basiccontrol';
import { TextboxControl } from './model/textboxcontrol';
import { DropdownControl } from './model/dropdowncontrol';
import { ControlToFormGroupService } from './service/controltoformgroup.service';
import * as xml2js from 'xml2js';
import { RadioButtonControl } from './model/radiobuttoncontrol';
import { DateControl } from './model/datetimecontrol';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ControlToFormGroupService]

})
export class AppComponent implements OnInit {
  title = 'app';
  form: FormGroup;
  sampleControls: any[] = [];
  dynamicControls: BasicControl<any>[] = [];
  jsonData: any;
  formdata: any = {};
  json: any;

  constructor(private controlToFormGroupService: ControlToFormGroupService) {

  }
  onSubmit() {
    console.log(this.form.value);
  }

  ngOnInit() {
    // this.form = new FormGroup({
    //   'firstName': new FormControl('Vinod'),
    //   'lastName': new FormControl('Sardar'),
    //   'fullName': new FormControl('Vinod Sardar'),
    //   'gender': new FormControl({
    //     options: [
    //       { key: 'male', value: 'male' },
    //       { key: 'female', value: 'female' }
    //     ]
    //   })
    // });


    // this.sampleControls.push({ key: "firstName", value: "Vinod", label: "First Name", type: "textbox" });
    // this.sampleControls.push({ key: "lastName", value: "Sardar", label: "Last Name", type: "textbox" });
    // this.sampleControls.push({ key: "fullName", value: "Vinod Sardar", label: "Full Name", type: "textbox" });
    // this.sampleControls.push({
    //   key: "gender", value: "male", label: "Gender", type: "dropdown", options: [
    //     { key: 'male', value: 'male' },
    //     { key: 'female', value: 'female' }
    //   ]
    // });

    // var data = this.controlToFormGroupService.getFormData().subscribe(
    // (response)=> console.log(response),
    // (error)=> console.log(error)
    // );
    var self = this;
     this.controlToFormGroupService.getFormData().subscribe(
      function(response){
        console.log("response");
        console.log(response);
      
          xml2js.parseString(response.text(), function (err, result) {
            //console.dir(result); // Prints JSON object!
            self.json = result;
          });
          //self.json = result;
          self.dynamicControls = [];
          self.json.form.control.forEach(function (element) {
            console.log(element.$.key);
            if (element.$.type == "textbox") {
              self.dynamicControls.push(
                new TextboxControl({
                  key: element.$.key,
                  label: element.$.label,
                  value: element.$.value,
                  required: true,
                  order: 1,
                  controlType: "textbox"
                }));
            }
            else if (element.$.type == "dropdown") {
              console.log(element.options[0].option);
              var options = [];
              element.options[0].option.forEach(function (ele) {
                console.log(ele.$);
                options.push(ele.$);
              });
      
      
              self.dynamicControls.push(
                new DropdownControl({
                  key: element.$.key,
                  label: element.$.label,
                  value: element.$.value,
                  options: options,
                  order: 3,
                  controlType: "dropdown"
                }));
            }
            else if (element.$.type == "radiobutton") {
            
              self.dynamicControls.push(
                new RadioButtonControl({
                  key: element.$.key,
                  label: element.$.label,
                  value: element.$.value,
                  order: 3,
                  controlType: "radiobutton"
                }));
            }
            else if (element.$.type == "date") {
            
              self.dynamicControls.push(
                new DateControl({
                  key: element.$.key,
                  label: element.$.label,
                  value: element.$.value,
                  order: 3,
                  controlType: "date"
                }));
            }
      
      
          });

          self.form = self.controlToFormGroupService.toFormGroup(self.dynamicControls);

      },
      function(error){

      }
    );

    // xml2js.parseString(data);
    
    // xml2js.parseString(data, function (err, result) {
    //   //console.dir(result); // Prints JSON object!
    //   self.json = result;
    // });
    


    //Now read and conver to app data


    


    // this.dynamicControls = [



    //   new TextboxControl({
    //     key: 'firstName',
    //     label: 'First name',
    //     value: 'Vinod',
    //     required: true,
    //     order: 1,
    //     controlType: "textbox"
    //   }),
    //   new TextboxControl({
    //     key: 'lastName',
    //     label: 'Last name',
    //     value: 'Sardar',
    //     required: true,
    //     order: 1,
    //     controlType: "textbox"
    //   }),

    //   new TextboxControl({
    //     key: 'emailAddress',
    //     label: 'Email',
    //     type: 'email',
    //     value: 'vinod.sardar@gmail.com',
    //     order: 2,
    //     controlType: "textbox"
    //   }),
    //   new DropdownControl({
    //     key: 'gender',
    //     label: 'Gender',
    //     value: 'male',
    //     options: [
    //       { key: 'male', value: 'Male' },
    //       { key: 'female', value: 'Female' }
    //     ],
    //     order: 3,
    //     controlType: "dropdown"
    //   }),
    //   new DropdownControl({
    //     key: 'access',
    //     label: 'Access',
    //     value: 'public',
    //     options: [
    //       { key: 'public', value: 'public' },
    //       { key: 'private', value: 'private' }
    //     ],
    //     order: 3,
    //     controlType: "dropdown"
    //   })
    // ];

    

  }
}

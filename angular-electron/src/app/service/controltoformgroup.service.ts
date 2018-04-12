import { BasicControl } from "../model/basiccontrol";
import { Injectable } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {Http, RequestOptions , Request, RequestMethod} from '@angular/http';
import { HttpHeaders} from "@angular/common/http";

@Injectable()
export class ControlToFormGroupService {
  constructor(private http: Http) { }

  toFormGroup(basiccontrols: BasicControl<any>[] ) {
    let group: any = {};

    basiccontrols.forEach( control=> {
      group[control.key] = control.required ? new FormControl(control.value || '', Validators.required)
                                              : new FormControl(control.value || '');
    });
    return new FormGroup(group);
  }

  getFormData()
  {
    // let myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Access-Control-Allow-Origin','*');    
    
    // let myParams = new URLSearchParams();
    // myParams.append('id', "vinod");
    // const headers = new HttpHeaders({'Content-Type': 'text/uri-list'});
    // let options = new RequestOptions({headers:myHeaders, params: myParams});
   // return this.http.get("https://ng-test-dynamic-form.firebaseio.com/");

   // return new Request(new RequestOptions({ url: 'test',method: 'GET',body: null, headers: new Headers({'content-type': 'application/json'})}));

  // let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded' });

  // let options = new RequestOptions({ headers: headers, method: RequestMethod.Get});
  // return "<form><control key='firstName' label='First Name' value='Vinod' type='textbox' ></control><control key='gender' label='Gender' value='male' type='dropdown'><options><option key='male' value='male'></option><option key='female' value='female'></option></options></control></form>";

  return this.http.get("./form1.xml");
  }
}
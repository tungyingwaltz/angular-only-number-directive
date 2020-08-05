import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'ONLY NUMBER';
  formGroup = new FormGroup({
    testNumber: new FormControl()
  })
  get testNumber(){return this.formGroup.get('testNumber');}
}

import {Component, Output, Input, EventEmitter} from '@angular/core';


@Component({
  selector: 'dropdown',
  template: ` 
  <div class="col-sm-4">
    <select #sel (change)="select.emit(sel.value)" class="form-control">
      <option *ngFor="let value of values" >
        {{value}}
      </option>
    </select>
  </div>
  `
})
export class DropdownComponent {

  @Output() select = new EventEmitter();

  @Input()
  values: any[];

  //values = ["One","Two"];


}
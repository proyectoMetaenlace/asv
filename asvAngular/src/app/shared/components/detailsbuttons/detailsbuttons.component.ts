import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-detailsbuttons',
  templateUrl: './detailsbuttons.component.html',
  styleUrls: ['./detailsbuttons.component.css']
})
export class DetailsButtonsComponent implements OnInit {

  @Output() onSave = new EventEmitter<any>();
  @Input() returnto;
  @Input() canSave;

  constructor() { }

  ngOnInit(): void {
  }

  gotoSave(){
    this.onSave.next();
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-managementbuttons',
  templateUrl: './managementbuttons.component.html',
  styleUrls: ['./managementbuttons.component.css']
})
export class ManagementButtonsComponent implements OnInit {

  @Output() onGoToCreate = new EventEmitter<any>();
  @Output() onGoToEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  @Input() canCreate=true;
  @Input() canEdit=true;
  @Input() canDelete=true;

  constructor() { }

  ngOnInit(): void {
  }

  gotoCreate(){
    this.onGoToCreate.next();
  }

  gotoEdit(){
    this.onGoToEdit.next();
  }

  gotoDelete(){
    this.onDelete.next();
  }

}

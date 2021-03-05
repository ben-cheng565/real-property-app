import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('formTabs') formTabs: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

  propertyView: IProperty = {
    ID: null,
    Name: '',
    Price: null,
    SellOrRent: null,
    Type: null,
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

  onSubmit(Form: NgForm) {
    console.log(Form);
  }
}

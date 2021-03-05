import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IProperty } from 'src/app/model/iproperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('formTabs') formTabs: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

  propertyView: IPropertyBase = {
    ID: null,
    Name: '',
    Price: null,
    SellOrRent: null,
    PType: null,
    FType: null,
    Bedroom: null,
    Bathroom: null,
    Parking: null,
    BuildArea: null,
    LandArea: null,
    Address: '',
    Suburb: '',
    City: '',
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

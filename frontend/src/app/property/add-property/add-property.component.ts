import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
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
  // @ViewChild('Form') addPropertyForm: NgForm;
  addPropertyForm: FormGroup;

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

  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createPropertyForm();
  }

  createPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        sellrent: [1, Validators.required],
        bedroom: [null, Validators.required],
        bathroom: [null, Validators.required],
        parking: [null, Validators.required],
        propType: [null, Validators.required],
        furnishType: [null],
      }),
      AddressInfo: this.fb.group({
        address: ['', Validators.required],
        suburb: ['', Validators.required],
        city: ['', Validators.required],
      }),
      PriceInfo: this.fb.group({
        price: [null, Validators.required],
        buildArea: [null],
        landArea: [null],
      }),
      OtherInfo: this.fb.group({
        availableFrom: [null],
        age: [null],
        description: [''],
      }),
    });
  }

  // -------------------
  // Getter Methods
  // -------------------
  get BasicInfo() {
    return this.addPropertyForm.controls.BasicInfo as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertyForm.controls.PriceInfo as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls.AddressInfo as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls.OtherInfo as FormGroup;
  }

  get SellRent() {
    return this.BasicInfo.controls.sellrent as FormControl;
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

  onSubmit() {
    console.log(this.addPropertyForm);
  }
}

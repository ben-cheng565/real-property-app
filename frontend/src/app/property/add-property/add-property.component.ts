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
import { Property } from 'src/app/model/property';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { HousingService } from 'src/app/service/housing.service';
import { AlertifyService } from 'src/app/service/alertify.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('formTabs') formTabs: TabsetComponent;
  // @ViewChild('Form') addPropertyForm: NgForm;
  addPropertyForm: FormGroup;
  property = new Property();

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

  searchedAddress: string;

  options = {
    componentRestrictions: {
      country: ['NZ'],
    },
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private housingService: HousingService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.createPropertyForm();

    this.housingService.getCities().subscribe((data) => {
      console.log(data);
    });
  }

  // create property form using reactive form
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
        place: ['', Validators.required],
        address: [{ value: '', disabled: true }, , Validators.required],
        suburb: [{ value: '', disabled: true }],
        city: [{ value: '', disabled: true }, , Validators.required],
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
  get Bedroom() {
    return this.BasicInfo.controls.bedroom as FormControl;
  }
  get Bathroom() {
    return this.BasicInfo.controls.bathroom as FormControl;
  }
  get Parking() {
    return this.BasicInfo.controls.parking as FormControl;
  }
  get PType() {
    return this.BasicInfo.controls.propType as FormControl;
  }
  get FType() {
    return this.BasicInfo.controls.furnishType as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls.address as FormControl;
  }
  get Suburb() {
    return this.AddressInfo.controls.suburb as FormControl;
  }
  get City() {
    return this.AddressInfo.controls.city as FormControl;
  }

  get Price() {
    return this.PriceInfo.controls.price as FormControl;
  }
  get BuildArea() {
    return this.PriceInfo.controls.buildArea as FormControl;
  }
  get LandArea() {
    return this.PriceInfo.controls.landArea as FormControl;
  }

  get AvailableFrom() {
    return this.OtherInfo.controls.availableFrom as FormControl;
  }
  get Age() {
    return this.OtherInfo.controls.age as FormControl;
  }
  get Description() {
    return this.OtherInfo.controls.description as FormControl;
  }

  // active the current tab
  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }

  // map the form attributes with the model fields
  mapProperty(): void {
    this.property.ID = this.housingService.newPropID();
    this.property.SellOrRent = +this.SellRent.value;
    this.property.Bedroom = this.Bedroom.value;
    this.property.Bathroom = this.Bathroom.value;
    this.property.Parking = this.Parking.value;
    this.property.PType = this.PType.value;
    this.property.FType = this.FType.value;

    this.property.Address = this.Address.value;
    this.property.Suburb = this.Suburb.value;
    this.property.City = this.City.value;

    this.property.Price = this.Price.value;
    this.property.BuildArea = this.BuildArea.value;
    this.property.LandArea = this.LandArea.value;

    this.property.AvailableFrom = this.AvailableFrom.value;
    this.property.Age = this.Age.value;
    this.property.Description = this.Description.value;

    this.property.Image = '';
    this.property.PostedOn = new Date().toString();
  }

  onSubmit() {
    this.mapProperty();
    this.housingService.addProperty(this.property);
    this.alertify.success('Property listed successfully');

    // navigate to different pages according to sell or rent value
    if (this.SellRent.value === '2') {
      this.router.navigate(['/rent-property']);
    } else {
      this.router.navigate(['/']);
    }
  }

  // auto compolete the address, and fill in relevant inputs
  public handleAddressChange(address: any) {
    // Do some stuff
    this.searchedAddress = (document.getElementById(
      'googlePlace'
    ) as HTMLInputElement).value;
    console.log(this.searchedAddress);

    // let addr: string =  address.formatted_address;
    // Convert address string into an array,
    // and extract different values
    let array = this.searchedAddress.split(', ');
    if (array.length === 4) {
      this.propertyView.Address = array[0];
      this.propertyView.Suburb = array[1];
      this.propertyView.City = array[2];
    } else if (array.length === 3) {
      this.propertyView.Address = array[0];
      // this.propertyView.Suburb = array[1];
      this.propertyView.City = array[1];
    }
  }
}

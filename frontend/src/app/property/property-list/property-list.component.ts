import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { HousingService } from 'src/app/service/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  properties: IPropertyBase[];
  SellOrRent = 1;

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellOrRent = 2;
    }

    this.housingService.getAllProperties(this.SellOrRent).subscribe(
      (data) => {
        this.properties = data;

        const newProp = JSON.parse(localStorage.getItem('newProperty'));
        if (newProp && newProp.SellOrRent === this.SellOrRent) {
          this.properties.push(newProp);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

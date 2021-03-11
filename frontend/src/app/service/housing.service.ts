import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPropertyBase } from '../model/ipropertybase';
import { IProperty } from '../model/iproperty';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map((properties) => {
        return properties.find((p) => p.ID === id);
      })
    );
  }

  getAllProperties(SellOrRent?: number): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertyArray: Array<IPropertyBase> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProperty'));
        console.log(localProperties);
        if (localProperties) {
          for (const id in localProperties) {
            console.log(id);
            if (SellOrRent) {
              if (
                localProperties.hasOwnProperty(id) &&
                localProperties[id].SellOrRent === SellOrRent
              ) {
                propertyArray.push(localProperties[id]);
              }
            } else {
              propertyArray.push(localProperties[id]);
            }
          }
        }

        for (const id in data) {
          if (SellOrRent) {
            if (data.hasOwnProperty(id) && data[id].SellOrRent === SellOrRent) {
              propertyArray.push(data[id]);
            }
          } else {
            propertyArray.push(data[id]);
          }
        }

        return propertyArray;
      })
    );

    return this.http.get<IProperty[]>('data/properties.json');
  }

  addProperty(property: Property) {
    let newProp = [property];

    // Add new property in array if newProp alreay exists in local storage
    if (localStorage.getItem('newProperty')) {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProperty'))];
    }

    localStorage.setItem('newProperty', JSON.stringify(newProp));
  }
}

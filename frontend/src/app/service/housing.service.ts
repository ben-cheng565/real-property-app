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

        if (localProperties) {
          for (const id in localProperties) {
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
    localStorage.setItem('newProperty', JSON.stringify(property));
  }
}

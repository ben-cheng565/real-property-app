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

  getAllProperties(SellOrRent: number): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertyArray: Array<IPropertyBase> = [];

        for (const id in data) {
          if (data[id].SellOrRent === SellOrRent) {
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

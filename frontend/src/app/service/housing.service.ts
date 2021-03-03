import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from '../property/IProperty.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllProperties(SellOrRent: number): Observable<IProperty[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertyArray: Array<IProperty> = [];

        for (const id in data) {
          if (data[id].SellOrRent === SellOrRent) {
            propertyArray.push(data[id]);
          }
        }

        return propertyArray;
      })
    );
  }
}

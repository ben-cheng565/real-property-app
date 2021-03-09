import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GooglemapsService {
  constructor(private http: HttpClient) {}

  addressGeocode(address: string): Observable<any> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: 'AIzaSyBHcrX3t_GV0v-CTxWw1gKAaQRbGIl02js',
      },
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  public listCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(
      'http://localhost:8080/api/countries',
    );
  }
}

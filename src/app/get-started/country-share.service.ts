import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryDataService {
  private selectedCountrySource = new BehaviorSubject<string>('');
  selectedCountry$ = this.selectedCountrySource.asObservable();

  setSelectedCountry(country: string) {
    this.selectedCountrySource.next(country);
  }
}
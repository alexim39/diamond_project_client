import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PartnerInterface } from '../interface/partner.interface';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsernameCheckService {
  // Define API
  api = 'https://diamondprojectapi-y6u04o8b.b4a.run/';
  //api = 'http://localhost:3000';

  

  constructor(private http: HttpClient) {}
  

  checkUsernameAvailability(username: string): Observable<PartnerInterface> {
    // Make a request to your backend API to check username availability
    return this.http.get<PartnerInterface>(this.api + `/partners/check-username/${username}`);
  }

  recordVisit(username: string | null, channel: string | null): Observable<any> {
    return this.http.post(this.api + `/campaign/visits`, { username, channel });
  }
}


export function minDigitsValidator(minDigits: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value && control.value.toString().length < minDigits) {
      return { minDigits: { requiredLength: minDigits, actualLength: control.value.toString().length } };
    }
    return null;
  };
}
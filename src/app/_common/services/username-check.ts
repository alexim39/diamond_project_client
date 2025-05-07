import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartnerInterface } from '../interface/partner.interface';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ApiService } from './api.service';

@Injectable()
export class UsernameCheckService {
  constructor(private apiService: ApiService) {}

  checkUsernameAvailability(username: string): Observable<any> {
    return this.apiService.get<PartnerInterface>(`partners/check-username/${username}`, undefined, undefined, true);
  }

  recordVisit(username: string | null, channel: string | null): Observable<any> {
    return this.apiService.post<any>(`campaign/visits`, { username, channel }, undefined, true);
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
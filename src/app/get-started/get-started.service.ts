import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { ApiService } from '../_common/services/api.service';

export interface SurveyFormData {
  ageRange: string;
  socialMedia: string[];
  importanceOfPassiveIncome: string;
  onlinePurchaseSchedule: string;
  primaryOnlineBusinessMotivation: string;
  employedStatus: string;
  comfortWithTech: string;
  onlineBusinessTimeDedication: string;
  phoneNumber: string;
  email: string;
  name: string;
  surname: string;
  referral: string;
  referralCode: string;
}
  

@Injectable()
export class SurveyService {
  constructor(private apiService: ApiService) {}

  // user submit survey
  submit(formObject: SurveyFormData): Observable<any> {
    //console.log('form record', formData);
    return this.apiService.post<SurveyFormData>(`survey/submit`, formObject, undefined, true);
  }

  
}
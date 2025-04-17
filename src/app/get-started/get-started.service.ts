import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

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
  // Define API
  api = 'https://diamondprojectapi-y6u04o8b.b4a.run/';
  //api = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Error handling
  private handleError(error: any) {
    let errorMessage: {code: string, message: string};
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = {'code': error.status, 'message': error.message};
    }
    //window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


  // user submit survey
  submit(formData: SurveyFormData): Observable<any> {
    //console.log('form record', formData);
    return this.http
      .post<SurveyFormData>(this.api + '/survey/submit', formData)
      .pipe(retry(1), catchError(this.handleError));
  }

  
}
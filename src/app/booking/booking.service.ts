import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { BookingFormData } from './booking.interface';

@Injectable()
export class BookingService {
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


  // user submit booking
  submit(formData: BookingFormData): Observable<BookingFormData> {
    //console.log('form record', formData);
    return this.http
      .post<BookingFormData>(this.api + '/booking/submit', formData)
      .pipe(retry(1), catchError(this.handleError));
  }

  
}
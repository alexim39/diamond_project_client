import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { PartnerInterface } from '../interface/partner.interface';

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
}
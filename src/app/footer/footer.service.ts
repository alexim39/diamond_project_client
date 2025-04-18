import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../_common/services/api.service';

export interface emailSubscriptionInterface {
  email: string;
}

@Injectable()
export class FooterService {

    constructor(private apiService: ApiService) {}
 

    /**
   * Submits the partner signin data to the backend API.
   * @param formObject The signin data to be submitted.
   * @returns An Observable that emits the API response or an error.
   */
    submit(formObject: emailSubscriptionInterface): Observable<any> {
        return this.apiService.post<emailSubscriptionInterface>(`emailSubscription/subscribe`, formObject, undefined, true);
    }


  

  
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../_common/services/api.service';

export interface ContactFormData {
  name: string;
  surname: string;
  email: string;
  subject: string;
  message: string;
  username?: string;
  consent: boolean;
}

@Injectable()
export class ContactService {
  constructor(private apiService: ApiService) {}

  submit(formObject: ContactFormData): Observable<any> {
    return this.apiService.post<ContactFormData>('contact/submit', formObject);
  }
}

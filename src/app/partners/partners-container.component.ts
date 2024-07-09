import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnersPresenterComponent } from './partners-presenter.component';
import { UsernameCheckService } from '../_common/services/username-check';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PartnerInterface } from '../_common/interface/partner.interface';

/**
 * @title Partners
 */
@Component({
  selector: 'async-partners-container',
  standalone: true,
  imports: [PartnersPresenterComponent, CommonModule],
  providers: [UsernameCheckService],
  template: `
    <async-partners-presentation *ngIf="partner" [partner]="partner"></async-partners-presentation>
  `,
})
export class PartnersContainerComponent implements OnInit, OnDestroy {

  partner!: PartnerInterface;
  subscriptions: Subscription[] = [];

    constructor(
      private router: Router,
      private usernameCheckService: UsernameCheckService
    ) {
      
      const url = window.location.pathname;
      const username = url.substring(url.lastIndexOf('/') + 1);

      // check if username exist
      this.subscriptions.push(
        this.usernameCheckService.checkUsernameAvailability(username).subscribe(
          (returnedObject) => {
            if (returnedObject.username == username) {
              // Store the extracted data in local storage
              localStorage.setItem('username', username);
              this.partner = returnedObject;
            }
          }, error => {
            // No partner with provided username
            // show page not found
            this.router.navigate(['/page/not-found/']);
            localStorage.removeItem('username');
          }
        )
      )
      

      
    }

    ngOnInit() {
    }

    ngOnDestroy() {
      // unsubscribe list
      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    }
}
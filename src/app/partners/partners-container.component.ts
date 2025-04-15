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
    imports: [PartnersPresenterComponent, CommonModule],
    providers: [UsernameCheckService],
    template: `
    <async-partners-presentation *ngIf="partner" [partner]="partner"></async-partners-presentation>
  `
})
export class PartnersContainerComponent implements OnInit, OnDestroy {

  partner!: PartnerInterface;
  subscriptions: Subscription[] = [];

  channel: string | null = null;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private usernameCheckService: UsernameCheckService
    ) {
      /* 
        url format
       http://localhost:4200/business?utm_source=6696bbe2e8d1d5d6edd178e0 
       https://diamondprojectonline.com/business?utm_source=6696bbe2e8d1d5d6edd178e0
      */

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

              // Capture the channel from the query parameters
              this.route.queryParams.subscribe(params => {
                this.channel = params['utm_source'] || 'unknown';
                //console.log('Traffic source - Urchin Tracking Module (channel):', this.channel);

                // You can send the captured information to your backend or analytics service here
                this.recordVisit(username, this.channel);
              });
            }
          }, (error) => {
            if (error.error.code == 400) {
              // No partner with provided username
              // show page not found
              this.router.navigate(['/page/not-found/']);
              localStorage.removeItem('username');
            }
          }
        )
      )      
    }

    ngOnInit() {
    }

    private recordVisit(username: string | null, channel: string | null): void {

      this.subscriptions.push(
        this.usernameCheckService.recordVisit(username, channel).subscribe(
          response => {
            //console.log('Visit recorded:', response);
          },
          error => {
            //console.error('Error recording visit:', error);
          }
        )
      )
    }

    ngOnDestroy() {
      // unsubscribe list
      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    }
}
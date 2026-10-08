import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PartnersPresenterComponent } from './partners-presenter.component';
import { UsernameCheckService } from '../_common/services/username-check';
import { Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PartnerInterface } from '../_common/interface/partner.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/**
 * @title Partners
 */
@Component({
    selector: 'async-partners-container',
    imports: [PartnersPresenterComponent, CommonModule, MatProgressBarModule, RouterModule],
    providers: [UsernameCheckService],
    template: `
    @if (partner) {
      <async-partners-presentation [partner]="partner"/>
    } @else if (failed) {
      <section class="partner-missing">
        <h1>This partner page could not be found</h1>
        <p>The link may be mistyped. <a routerLink="/" (click)="back()">Back to Diamond Project home</a></p>
      </section>
    } @else {
      <mat-progress-bar mode="indeterminate" aria-label="Loading partner page"></mat-progress-bar>
    }
  `,
    styles: [`
      .partner-missing { text-align: center; padding: 4em 1.5em; }
      .partner-missing h1 { font-size: 1.6rem; margin: 0 0 0.5em; }
      .partner-missing p { margin: 0; }
      .partner-missing a { color: inherit; font-weight: 700; }
    `]
})
export class PartnersContainerComponent implements OnInit, OnDestroy {

  partner: PartnerInterface | null = null;
  failed = false;
  subscriptions: Subscription[] = [];

  channel: string | null = null;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private usernameCheckService: UsernameCheckService
    ) {}

    ngOnInit(): void {
      // Username comes from the route (handles trailing slashes + SSR-safe).
      const username = (this.route.snapshot.paramMap.get('partnerUsername') ?? '').trim();
      if (!username) {
        this.failed = true;
        return;
      }

      // check if username exist
      this.subscriptions.push(
        this.usernameCheckService.checkUsernameAvailability(username).subscribe({
          next: (response) => {
            if (response.success) {
              if (response.partner.username == username) {
                // Store the extracted data in local storage
                localStorage.setItem('username', username);
                this.partner = response.partner;

                // Capture the channel from the query parameters (one-shot).
                this.route.queryParams.pipe(take(1)).subscribe(params => {
                  this.channel = params['utm_source'] || 'unknown';

                  // You can send the captured information to your backend or analytics service here
                  this.recordVisit(username, this.channel);
                });
              } else {
                this.failed = true;
              }
            } else {
              this.failed = true;
            }
          },
          error: (error: HttpErrorResponse) => {
            // Only our own key — never wipe the whole storage.
            localStorage.removeItem('username');
            this.failed = true;
          }
        })
      )
    }

    protected back(): void {
      this.router.navigate(['/']);
    }

    private recordVisit(username: string | null, channel: string | null): void {

      this.subscriptions.push(
        this.usernameCheckService.recordVisit(username, channel).subscribe()
      )
    }

    ngOnDestroy() {
      // unsubscribe list
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}

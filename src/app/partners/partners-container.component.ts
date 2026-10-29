import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PartnersPresenterComponent } from './partners-presenter.component';
import { UsernameCheckService } from '../_common/services/username-check';
import { Subscription, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PartnerInterface } from '../_common/interface/partner.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReferralService } from '../_common/services/referral.service';
import { SeoService } from '../_common/services/seo.service';

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
      private usernameCheckService: UsernameCheckService,
      private referral: ReferralService,
      private seo: SeoService
    ) {}

    ngOnInit(): void {
      const username = (this.route.snapshot.paramMap.get('partnerUsername') ?? '').trim();
      if (!username) {
        this.failed = true;
        this.seo.setNotFound('Partner page not found', '/');
        return;
      }

      this.subscriptions.push(
        this.usernameCheckService.checkUsernameAvailability(username).subscribe({
          next: (response) => {
            if (response.success && response.partner?.username === username) {
              this.referral.remember(response.partner);
              this.partner = response.partner;
              this.seo.setPartner(response.partner, username);

              this.route.queryParams.pipe(take(1)).subscribe(params => {
                this.channel = params['utm_source'] || 'unknown';
                this.recordVisit(username, this.channel);
              });
            } else {
              this.failed = true;
              this.referral.clear();
              this.seo.setNotFound('Partner page not found', `/${username}`);
            }
          },
          error: (error: HttpErrorResponse) => {
            this.failed = true;
            if (error.status === 404) this.referral.clear();
            this.seo.setNotFound('Partner page not found', `/${username}`);
          }
        })
      )
    }

    protected back(): void {
      this.router.navigate(['/']);
    }

    private recordVisit(username: string | null, channel: string | null): void {

      this.subscriptions.push(
        this.usernameCheckService.recordVisit(username, channel).subscribe({ error: () => {} })
      )
    }

    ngOnDestroy() {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}

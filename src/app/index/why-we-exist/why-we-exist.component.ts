import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'async-index-why-we-exist',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatButtonModule,  MatFormFieldModule, MatInputModule, CommonModule],
  template: `
    <aside class="why-we-exist">
      <div>

        <span class="mark">
          <strong>Book One-On-One Session: </strong>Book a one-on-one session for comprehensive clarification
          <div class="more">
            <a routerLink="one-on-one-booking" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Book now <i class="fa fa-angle-double-right"></i></a>
          </div>
        </span>

        <span class="mark">
          <strong>Sign Up To Get Started: </strong>Secure your spot now by signing up and begin your journey towards freedom
          <div class="more">
            <a routerLink="plans" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Sign up <i class="fa fa-angle-double-right"></i></a>
          </div>
        </span>

        <span>
          <strong>Start Running Your Business: </strong>Use our user-friendly platform to manage and grow your business, with mentorship from our supportive community and experienced leaders.
          <div class="more">
            <!-- <a routerLink="tow-services" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Know more <i class="fa fa-angle-double-right"></i></a> -->
            <a href="http://partners.diamondprojectonline.com" target="_blank">Sign in <i class="fa fa-angle-double-right"></i></a>
          </div>
        </span>
      </div>


      <!-- <h1>We firmly believe that you can have a comfortable journey to your destination at any hour, whether it’s day or night.</h1> -->
      <h1>Diamond Project Online: Your Online Business Partner</h1>

      <!-- <small>Use our flexible learning path, adjust your learning to suit your time  — all in one place. Open a free account in minutes and learn any time.</small> -->

      <a mat-flat-button color="primary" routerLink="plans" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Start Your Own Business Now</a>
    </aside>
  `,
  styles: [`
  aside {
    padding: 3em 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      margin: 1em;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .mark {
          border-right: 1px dotted #bbb;
          padding-right: 1em;
        }
      span {
        margin: 0.4em;
        color: #AD1457;
        font-family: Verdana;
        strong {
          display: block;
          margin-bottom: 0.5em;
          color: #43041f;
        }
        .more {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          a {
            font-size: 0.8em;
            color: #ffab40;
            font-weight: bolder;
            text-decoration: none;
          }
        }
      }
    }
    h1 {
      font-weight: bolder;
      margin: 1em;
    }
    small {
      text-align: justify;
      margin: 0 1em;
    }
  }


  /* Media Query for Mobile Responsiveness */
@media screen and (max-width: 600px) {
  aside {
    div {
      margin: 1em;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .mark {
        border-bottom: 1px dotted #bbb;
        border-right: 0px dotted #bbb;
        padding-bottom: 1em;
      }
    }
  }
}
  `],
})
export class WhyWeExistComponent implements OnInit{
  // init subscriptions list
  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {  }

   // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }



  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

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
          <strong>Financial Benefits: </strong>
          <ul>
            <li>Earning Potential: Your earning potentail depends on how much you are willing to put into work</li>
            <li>Be Your Own Boss: You to set your own hours to work</li>
            <li>Residual Income: You build an online business that earn even while you are no more working</li>
          </ul>
          <!-- <div class="more">
            <a routerLink="cab-services" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Know more <i class="fa fa-angle-double-right"></i></a>
          </div> -->
        </span>

        <span class="mark">
          <strong>Freedom Benefits: </strong>
          <ul>
            <li>Flexibility: We offer you the flexibility to work online from anywhere around the World and on your own schedule</li>
            <li>Work-Life Balance: You get the ability to achieve a better work-life balance and spend more time with family and friends</li>
            <li>Personal Development: We provide you the opportunities for personal and professional growth through training and development programs</li>
          </ul>
          <!-- <div class="more">
            <a routerLink="courier-services" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Know more <i class="fa fa-angle-double-right"></i></a>
          </div> -->
        </span>

        <span>
          <strong>Additional Benefits: </strong>
          <ul>
            <li>Diamond Project provide the plateform to share your value and story to help others improve their lives.</li>
            <li>Compared to traditional businesses, starting a business online on our platform has lower initial investment costs.</li>
            <li>Diamond Project offer incentive, recognitions, and rewards for your commitment to your business.</li>
          </ul>
          <!-- <div class="more">
            <a routerLink="tow-services" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Know more <i class="fa fa-angle-double-right"></i></a>
          </div> -->
        </span>
      </div>


      <h1>Diamond Project (Online): Your online business<span> partner for personal and financial growth</span> </h1>

      <a  mat-flat-button color="accent" routerLink="../get-started" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()" color="accent">Get Started</a>
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
        ul {
            li {
              margin-bottom: 1.5em;
              text-align: justify;
            }
          }
      span {
        margin: 0.4em;
        //color: #AD1457;
        //font-family: Verdana;
        strong {
          display: block;
          margin-bottom: 0.5em;
        }
        .more {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          a {
            font-size: 0.8em;
            color: #00838f;
            font-weight: bolder;
            text-decoration: none;
          }
        }
      }
    }
    h1 {
      font-weight: bold;
      margin: 1em;
      font-size: 1.8em;
      span {
        color: #ffab40;
      }
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
      margin: 0.5em;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .mark {
        border-bottom: 1px dotted #bbb;
        border-right: 0px dotted #bbb;
        padding-bottom: 1em;
      }
      ul {
        width: 100%;
        li {
          
        }
      }
    }
  }
}

/* iPads/tablet (portrait and landscape) */
@media only screen and (min-device-width: 601px) and (max-device-width: 1024px) {
  aside {
    div {
      margin: 0.5em;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .mark {
        border-bottom: 1px dotted #bbb;
        border-right: 0px dotted #bbb;
        padding-bottom: 1em;
      }
      ul {
        width: 100%;
        li {
          
        }
      }
    }
  }

}
  `],
})
export class WhyWeExistComponent implements OnInit{
  // init subscriptions list
  subscriptions: Subscription[] = [];

  constructor(
  ) { }

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

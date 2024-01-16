import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
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
        <span>Feel free to contact us at any time, we are accessible 24/7 to address your queries.</span>
        <span>Book a one-on-one session for comprehensive clarification.</span>
        <!-- <span> Bet Investment</span> -->
      </div>


      <h1>We are confident that you can still realize your dream lifestyle and accomplish your life objectives.</h1>

      <!-- <small>Use our flexible learning path, adjust your learning to suit your time  — all in one place. Open a free account in minutes and learn any time.</small> -->

      <!-- <a mat-flat-button color="accent" href="tel:+2349130311019">JOIN US NOW</a> -->
      <a mat-flat-button color="accent" routerLink="get-started" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">JOIN US NOW</a>
    </aside>
  `,
  styles: [`
  aside {
    padding: 3em 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //background-color: #eee;
    div {
      margin: 0 1em 0 1em;
      display: flex;
      flex-direction: row;
      span {
        margin-left: 1em;
        color: #AD1457;
        font-family: Verdana;
        display: list-item;
        list-style-type: disc;
        list-style-position: inside;
      }
    }
    h1 {
      font-weight: bolder;
      text-align: justify;
      margin: 1em;
    }
    small {
      text-align: justify;
      margin: 0 1em;
    }
    /* a {
      margin-top: 2em;
    } */
  }
  `],
})
export class WhyWeExistComponent implements OnInit{
  // init subscriptions list
  subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {  }



  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

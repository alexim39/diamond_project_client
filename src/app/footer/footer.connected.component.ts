import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'async-footer-connected',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatInputModule],
  template: `
      <section>
        <h2>Stay Connected</h2>

        <p>Keep up to date with industry insights and latest news</p>

        <article>
          <mat-form-field appearance="outline" [color]="'accent'">
            <mat-label>Outline form field</mat-label>
            <input matInput placeholder="Email address" disabled>
            <!-- <mat-hint>Hint</mat-hint> -->
          </mat-form-field>

          <button mat-flat-button color="accent" disabled>Subscribe</button>
          <br>
          <button mat-raised-button (click)="lunchWhatsAppGroup()" disabled> <span class="fa fa-whatsapp"></span> WhatsApp Us</button>

          <div id="social-media">
            <a href="#" class="fa fa-facebook" title="Facebook"></a>
            <a href="#" class="fa fa-twitter" title="Twitter"></a>
            <!-- <a href="#" class="fa fa-google" title="Google"></a> -->
            <a href="#" class="fa fa-linkedin" title="Linkedin"></a>
            <a href="#" class="fa fa-youtube" title="Youtube"></a>
            <a href="#" class="fa fa-instagram" title="Instagram"></a>
          </div>
        </article>

      </section>
  `,
  styles: [`
    section {
      display: flex;
      flex-direction: column;
      color: white;
      p {
        color: #ccc;
        font-size: 0.8em;
      }
      article {
        display: flex;
        flex-direction: column;
        color: white;

        #social-media {
          display: flex;
          flex-direction: row;
          a {
           margin-top: 2em;
           margin-right: 10px;
          }

          /* Style all font awesome icons */
          .fa {
            padding: 10px;
            font-size: 10px;
            width: 10px;
            text-align: center;
            text-decoration: none;
            border-radius: 50%;
          }

          /* Add a hover effect if you want */
          .fa:hover {
            opacity: 0.7;
          }

          /* Set a specific color for each brand */
          .fa-facebook {
            background: #3B5998;
            color: white;
          }

          .fa-twitter {
            background: #55ACEE;
            color: white;
          }

          .fa-google {
            background: #dd4b39;
            color: white;
          }

          .fa-linkedin {
            background: #007bb5;
            color: white;
          }

          .fa-youtube {
            background: #bb0000;
            color: white;
          }

          .fa-instagram {
            background: #125688;
            color: white;
          }
        }

        button {
          color: #075E54;
          .fa-whatsapp {
            font-size: 1.5em;
          }
        }
      }
    }



  `]
})
export class FooterConnectedComponent {
  lunchWhatsAppGroup() {
    window.open('https://wa.me/message/I5F2NKYKO7JNB1', '_blank');
  }
}

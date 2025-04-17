import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'async-footer',
  imports: [RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="footer-wrapper" id="footer">
      <div class="footer-content">
        <p class="section-label">/ CONTACT US</p>

        <h1 class="heading">
          Ready to embark on your<br />
          transformative journey?
        </h1>

        <p class="description">
          Get in touch with us using the button below and a consultant nearest to your location will reach out to you.
          Begin your journey to self-improvement with the Diamond Project.
        </p>

        <div class="form-container">
          <button mat-flat-button class="btn" routerLink="get-started" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">I'M READY!</button>
        </div>

        <footer>
         
          <p class="contact-email">
            Contact us: <a href="mailto:contacts@diamondprojectonline.com">contacts&#64;diamondprojectonline.com</a>
          </p>

      
          <p class="copyright">
            Diamond Project © {{ currentYear }} All rights reserved.
          </p>

          <div class="footer-links">
            <a routerLink="legal/terms" rel="noopener noreferrer" (click)="scrollToTop()">Terms</a>
            <span class="separator">|</span>
            <a routerLink="legal/privacy" rel="noopener noreferrer" (click)="scrollToTop()">Privacy</a>
          </div>
        </footer>
      </div>

      <div class="logo">
        <img src="assets/images/icon.png" alt="Diamond Logo" />
      </div>

      <div class="back-to-top" (click)="scrollToTop()">BACK TO TOP <mat-icon>arrow_forward</mat-icon></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background-color: #0f0f0f;
      color: #ffffff;
      font-family: 'Helvetica Neue', sans-serif;
      position: relative;
      padding: 4rem 1.5rem;
    }

    .footer-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 2rem;
    }

    .footer-content {
      flex: 1;
      max-width: 700px;
    }

    .section-label {
      color: #d4a941;
      font-size: 0.875rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }

    .heading {
      font-size: 2.5rem;
      font-weight: 600;
      line-height: 1.2;
      margin-bottom: 2rem;

      @media (min-width: 768px) {
        font-size: 3rem;
      }
    }

    .description {
      color: #7e7e7e;
      font-size: 1.125rem;
      margin-bottom: 2.5rem;

      @media (min-width: 768px) {
        font-size: 1.25rem;
      }
    }

    .form-container {
      display: flex;
      align-items: center;
      max-width: 100%;

      input {
        flex: 1;
        padding: 0.75rem 1rem;
        background-color: #181818;
        border: 1px solid #333;
        color: #fff;
        font-size: 1rem;
        outline: none;

        &::placeholder {
          color: #777;
        }

        &:focus {
          border-color: #d4a941;
          box-shadow: 0 0 0 2px #d4a94144;
        }
      }

      .btn {
        width: 50%;
        //font-size: 1.1em;
        //margin-top: 2em;
        background: #ffc107;
      }

     /* button {
        margin-left: 1rem;
        padding: 0.75rem 2rem;
        background-color: #b7892f;
        color: white;
        font-size: 0.875rem;
        font-weight: bold;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #d4a941;
        }
      } */
    }

    .logo {
      flex-shrink: 0;

      @media (max-width: 768px) {
        /* Keep the logo hidden on mobile if that's the desired behavior */
        display: none;
      }

      img {
        height: 3rem;
        width: auto;
      }
    }

    .back-to-top {
      position: absolute;
      right: 0.5rem;
      bottom: 1.5rem;
      font-size: 0.75rem;
      color: #444;
      letter-spacing: 0.15em;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      cursor: pointer;
      display: block; /* Make it visible by default */

      @media (max-width: 768px) {
        /* Adjust position and styling for mobile if needed */
        right: 1rem;
        bottom: 1rem;
        font-size: 0.6rem;
      }
    }

    footer {
      margin-top: 4rem;
      font-size: 0.75rem;
      color: #666;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .footer-links {
      display: flex;
      gap: 1rem;
    }

    .footer-links a {
      color: #666;
      text-decoration: none;
    }

    .footer-links a:hover {
      color: #d4a941;
    }

    .separator {
      color: #444;
    }

    .copyright {
      font-size: 0.75rem;
      color: #666;
    }

    .contact-email {
      font-size: 0.75rem;
      color: #666;
    }

    .contact-email a {
      color: #d4a941;
      text-decoration: none;
    }

    .contact-email a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .footer-wrapper {
        flex-direction: column;
        align-items: flex-start;
      }

      footer {
        align-items: flex-start;
      }

      .footer-links {
        order: 1; /* Move links above copyright on smaller screens if desired */
      }

      .copyright {
        order: 2;
      }

      .contact-email {
        order: 3;
      }
    }
  `]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
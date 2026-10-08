import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@Component({
    selector: 'async-root',
    imports: [RouterModule, FooterComponent],
    template: `
    <div id="container">
      <a class="skip-link" href="#main">Skip to content</a>
      <main id="main">
        <router-outlet id="outlet"/>
      </main>
      <async-footer id="footer"/>
    </div>
  `,
    styles: [`
    #container {
      animation: fadeInAnimation ease 3s;
      position: relative;
    }

    @keyframes fadeInAnimation {
      0% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
    }

    .skip-link {
      position: absolute;
      left: -9999px;
      top: 0;
      background: var(--dp-gold-bright);
      color: #111;
      padding: 0.75em 1.25em;
      font-weight: 700;
      z-index: 2000;
      text-decoration: none;
    }
    .skip-link:focus {
      left: 0;
    }

    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
      #container {
        display: flex;
        flex-direction: column;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #container {
        animation: none;
      }
    }
  `]
})
export class AppComponent {}

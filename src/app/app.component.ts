import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { CookieConsentComponent } from './cookie-consent.component';
import { SiteHeaderComponent } from './_common/components/site-header.component';

@Component({
    selector: 'async-root',
    imports: [RouterModule, FooterComponent, CookieConsentComponent, SiteHeaderComponent],
    template: `
    <div id="container">
      <a class="skip-link" href="#main">Skip to content</a>
      @if (showHeader) {
        <async-site-header/>
      }
      <main id="main">
        <router-outlet id="outlet"/>
      </main>
      @if (showFooter) {
        <async-footer id="footer"/>
      }
      <async-cookie-consent/>
    </div>
  `,
    styles: [`
    #container {
      animation: fadeInAnimation ease 0.3s;
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
export class AppComponent {
  showFooter = true;
  showHeader = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) this.updateLayout();
    });
    this.updateLayout();
  }

  private updateLayout(): void {
    let route: ActivatedRoute | null = this.router.routerState.root;
    let layout = '';
    while (route) {
      const value = route.snapshot?.data?.['layout'];
      if (typeof value === 'string') layout = value;
      route = route.firstChild;
    }
    const path = this.router.url.split('?')[0].split('#')[0];
    this.showFooter = layout !== 'partner';
    this.showHeader = layout !== 'partner' && path !== '/';
  }
}

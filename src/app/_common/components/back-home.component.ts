import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'async-back-home',
  imports: [RouterModule],
  template: `
    <a routerLink="/" class="back-home" aria-label="Back to Diamond Project home">
      <span aria-hidden="true">←</span>
      <span>Back to home</span>
    </a>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 1080px;
      margin: 0 auto 1.25em;
    }
    .back-home {
      display: inline-flex;
      align-items: center;
      gap: 0.5em;
      min-height: 44px;
      color: var(--dp-gold-ink);
      text-decoration: none;
      font-weight: 800;
      font-size: 0.9rem;
      letter-spacing: 0.02em;
    }
    .back-home:hover {
      color: var(--dp-gold);
    }
    .back-home span:first-child {
      font-size: 1.2em;
      line-height: 1;
    }
  `]
})
export class BackHomeComponent {}

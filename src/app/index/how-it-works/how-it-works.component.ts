import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'async-how-it-works',
  imports: [MatButtonModule, RouterModule],
  template: `
    <section class="how-it-works" id="how-it-works">
      <div class="inner">
        <p class="section-label">/ HOW IT WORKS</p>
        <h2>A clear path from curiosity to community.</h2>
        <p class="intro">
          No pressure and no guesswork. Start with a conversation, meet the right mentor,
          and build with training and people around you.
        </p>

        <div class="steps">
          <article class="step">
            <span class="number">01</span>
            <h3>Start a conversation</h3>
            <p>Tell us a little about yourself and what you want to change. It takes about two minutes.</p>
          </article>
          <article class="step">
            <span class="number">02</span>
            <h3>Meet your mentor</h3>
            <p>We connect you with a partner who understands your location, goals and starting point.</p>
          </article>
          <article class="step">
            <span class="number">03</span>
            <h3>Build with support</h3>
            <p>Access training, weekly showcases and a community that helps you take the next step.</p>
          </article>
        </div>

        <div class="actions">
          <a mat-flat-button class="cta" routerLink="/get-started">Start with a conversation</a>
          <a mat-stroked-button class="cta-outline" routerLink="/events">Watch event highlights</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .how-it-works {
      background: var(--dp-paper);
      color: var(--dp-text);
      padding: 3.5em 1.5em;
    }
    .inner {
      max-width: 1080px;
      margin: 0 auto;
    }
    .section-label {
      color: var(--dp-gold-ink);
      font-size: 0.875rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin: 0 0 0.75em;
      font-weight: 700;
    }
    h2 {
      font-family: var(--dp-font-display);
      font-size: clamp(1.8rem, 3.5vw, 2.6rem);
      margin: 0 0 0.4em;
      max-width: 18em;
    }
    .intro {
      color: var(--dp-muted);
      line-height: 1.65;
      max-width: 48em;
      margin: 0 0 2em;
    }
    .steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
      gap: 1em;
    }
    .step {
      background: var(--dp-surface);
      border: 1px solid var(--dp-line);
      border-radius: 12px;
      padding: 1.4em;
    }
    .number {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: var(--dp-night);
      color: var(--dp-gold-bright);
      font-weight: 800;
      margin-bottom: 0.8em;
    }
    h3 {
      margin: 0 0 0.4em;
      font-size: 1.1rem;
    }
    .step p {
      margin: 0;
      color: var(--dp-muted);
      line-height: 1.6;
    }
    .actions {
      display: flex;
      gap: 0.75em;
      flex-wrap: wrap;
      margin-top: 2em;
    }
    .actions a {
      min-height: 48px;
    }
    .cta {
      background: var(--dp-gold-bright);
      color: #111;
      font-weight: 800;
    }
    .cta-outline {
      border-color: var(--dp-gold-ink);
      color: var(--dp-gold-ink);
    }
  `]
})
export class HowItWorksComponent {}

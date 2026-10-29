import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SeoService } from '../_common/services/seo.service';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'async-faq',
  imports: [MatButtonModule, RouterModule],
  template: `
    <section class="faq-page">
      <div class="faq-hero">
        <p class="eyebrow">/ FAQ</p>
        <h1>Questions, answered.</h1>
        <p class="intro">
          Everything you need to know before taking the next step with Diamond Project.
        </p>
      </div>

      <div class="faq-layout">
        <div class="faq-list">
          @for (item of faqs; track item.question) {
            <details class="faq-item">
              <summary>{{ item.question }}</summary>
              <p>{{ item.answer }}</p>
            </details>
          }
        </div>

        <aside class="faq-cta">
          <h2>Still deciding?</h2>
          <p>Talk to a real person. We will answer your questions and help you decide without pressure.</p>
          <a mat-flat-button class="cta-gold" routerLink="/get-started">Get started</a>
          <a mat-stroked-button class="cta-outline" routerLink="/contact">Contact us</a>
        </aside>
      </div>

      <p class="disclaimer">
        Diamond Project does not guarantee income. Results vary with individual effort, consistency and market conditions.
      </p>
    </section>
  `,
  styles: [`
    .faq-page {
      background: var(--dp-paper);
      color: var(--dp-text);
      padding: 3em 1.5em 4em;
    }
    .faq-hero {
      max-width: 1080px;
      margin: 0 auto 2.5em;
    }
    .eyebrow {
      color: var(--dp-gold-ink);
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin: 0 0 0.75em;
    }
    h1 {
      font-family: var(--dp-font-display);
      font-size: clamp(2rem, 4vw, 3rem);
      margin: 0 0 0.4em;
    }
    .intro {
      color: var(--dp-muted);
      font-size: 1.05rem;
      max-width: 42em;
      line-height: 1.6;
      margin: 0;
    }
    .faq-layout {
      max-width: 1080px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 2em;
      align-items: start;
    }
    .faq-list {
      display: grid;
      gap: 0.75em;
    }
    .faq-item {
      background: var(--dp-surface);
      border: 1px solid var(--dp-line);
      border-radius: 10px;
      padding: 1em 1.2em;
    }
    .faq-item summary {
      cursor: pointer;
      font-weight: 700;
      line-height: 1.4;
    }
    .faq-item summary::marker {
      color: var(--dp-gold-ink);
    }
    .faq-item p {
      color: var(--dp-muted);
      line-height: 1.65;
      margin: 0.8em 0 0;
    }
    .faq-cta {
      background: var(--dp-night);
      color: #fff;
      border: 1px solid var(--dp-gold);
      border-radius: 14px;
      padding: 1.5em;
      position: sticky;
      top: 1.5em;
    }
    .faq-cta h2 {
      color: var(--dp-gold-bright);
      margin: 0 0 0.5em;
    }
    .faq-cta p {
      color: rgba(255,255,255,0.75);
      line-height: 1.55;
    }
    .faq-cta a {
      display: flex;
      justify-content: center;
      margin-top: 0.75em;
      min-height: 44px;
    }
    .cta-gold {
      background: var(--dp-gold-bright) !important;
      color: #111 !important;
      font-weight: 800;
    }
    .cta-outline {
      border-color: var(--dp-gold) !important;
      color: var(--dp-gold-bright) !important;
    }
    .disclaimer {
      max-width: 1080px;
      margin: 2em auto 0;
      color: var(--dp-muted);
      font-size: 0.85rem;
    }
    @media (max-width: 860px) {
      .faq-layout {
        grid-template-columns: 1fr;
      }
      .faq-cta {
        position: static;
      }
    }
  `]
})
export class FaqComponent implements OnInit, OnDestroy {
  readonly faqs: FaqItem[] = [
    {
      question: 'What is Diamond Project?',
      answer: 'Diamond Project is a training, mentorship and online business platform built around four pillars: mentorship and capacity building, discipline and stoicism, health optimisation, and financial leverage. Partner pages and the Get Started form are the first step.'
    },
    {
      question: 'Do I need experience or capital to start?',
      answer: 'No prior experience is required. You need a phone, consistent time and a willingness to learn. Any costs or requirements will be explained before you commit — never pay anyone without confirming through official Diamond Project channels.'
    },
    {
      question: 'How much time does this take each week?',
      answer: 'Most people start with 5–10 focused hours a week alongside work, school or family. Consistency matters more than intensity.'
    },
    {
      question: 'What do partners actually do?',
      answer: 'Partners share vetted health and wellness products, invite people to weekly online showcases, follow up with prospects and mentor buyers using the training and scripts provided.'
    },
    {
      question: 'How do I get started?',
      answer: 'Complete the Get Started form. A Diamond Project consultant or partner will contact you to answer your questions and walk you through the next steps. There is no obligation.'
    },
    {
      question: 'What happens after I submit the form?',
      answer: 'We review your details, route you to the right partner or team and contact you using the phone number or email you provided.'
    },
    {
      question: 'Do I have to live in Nigeria?',
      answer: 'Diamond Project supports partners across Nigeria and beyond. Product availability, payment methods and local support may vary by country.'
    },
    {
      question: 'Are earnings guaranteed?',
      answer: 'No. Results depend on effort, consistency, market conditions and other factors. Diamond Project does not guarantee income, and individual results vary.'
    },
    {
      question: 'How is my data used?',
      answer: 'Your details are used to respond to your enquiry and are handled under our Privacy Policy. You can ask us to delete your data by emailing contacts@c21fg.online.'
    }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Frequently Asked Questions | Diamond Project',
      description: 'Answers to common questions about Diamond Project, getting started, the opportunity, training and earnings.',
      path: '/faq'
    });
    this.seo.setJsonLd('dp-faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: this.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    });
  }

  ngOnDestroy(): void {
    this.seo.clearJsonLd('dp-faq-schema');
  }
}

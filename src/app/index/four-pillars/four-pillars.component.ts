import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/** @title Async why you should join page */
@Component({
    selector: 'async-four-pillars',
    imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatSelectModule],
    template: `
    <div class="training-approach" id="four_pillers">
      <!-- <h1>Our Pillars</h1> -->

      <div class="label-title">
        <p class="section-label">/ OUR PILLARS</p>
      </div>

      <h3>
      Our four foundational principles serve as the bedrock upon which we build your journey to greatness.
      </h3>

      <section class="approach-cards">
        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="psychology"></mat-icon>
            <h1>Mentorship & Capacity Building</h1>
          </div>
          <div class="content">
            <p>
            Cultivate your skills and expand your horizons through expert guidance and tailored training programs. Our mentors are industry leaders committed to nurturing your potential and igniting your path to success.
            </p>
          </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon>how_to_reg</mat-icon>
            <h1>Discipline, Regimentation & Stoicism</h1>
          </div>
          <div class="content">
            <p>
            Harness the power of discipline and stoic principles to fortify your mindset and conquer challenges with unwavering resolve. Our structured approach instills resilience, perseverance, and a steadfast commitment to excellence.
            </p>
          </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="health_and_safety"></mat-icon>
            <h1>Health Optimization</h1>
          </div>
          <div class="content">
            <p>
            Elevate your well-being with comprehensive health optimization strategies. From personalized nutrition plans to targeted supplementation and lifestyle modifications, we empower you to thrive physically, mentally, and emotionally.
            </p>
          </div>
        </div>

        <div class="approach-card">
          <div class="title">
            <mat-icon fontIcon="account_balance"></mat-icon>
            <h1>Financial Leverage Mastery</h1>
          </div>
          <div class="content">
            <p>
            Gain a profound understanding of leverage and unlock the keys to financial abundance. Learn how to strategically amplify your resources, maximize returns, and build sustainable wealth through innovative financial leverage systems.
            </p>
          </div>
        </div>
      </section>

      <section class="call-to-action">
        <p>
          Use the button below to join our WhatsApp group, where we provide links to weekly online meetings to showcase our business.
        </p>

        <div class="down-arrow">
          <mat-icon>arrow_downward</mat-icon>
        </div>

        <button mat-raised-button (click)="lunchWhatsAppGroup()">
          <span class="fa fa-whatsapp"></span> WhatsApp Group
        </button>
      </section>
    </div>
  `,
styles: [`

.training-approach {
    background-color: #03010f;
    padding: 3em;
    color: white;

    .label-title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60%;
      .section-label {
        color: #d4a941;
        font-size: 0.875rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        margin-bottom: 1.5rem;
      }
    }
  
    h1 {
      margin-bottom: 1em;
      text-align: center;
    }

    h3 {
      text-align: center;
      margin-bottom: 2em;
    }
  
    .approach-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-gap: 2em;
  
      .approach-card {
        background-color: #121212;
        border-radius: 8px;
        padding: 2em;
  
        .title {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
  
          h1 {
            font-size: 1em;
            margin-top: -0.2em;
            font-family: system-ui;
          }
  
          mat-icon {
            transform: scale(2);
            margin: -2em 1em 0 0;
          }
        }
  
        .content {
          font-size: 1em;
          margin-top: 1em;
  
          p {
            line-height: 2em;
          }
        }
      }
    }
  
    .call-to-action {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 3em;
  
      p {
        font-size: 1.5em;
        color: #ffab40;
        text-align: center;
        max-width: 600px;
      }
  
      button {
        background-color: #075E54;
        color: white;
        margin-top: 2em;
      }
    }
  }
  
  .down-arrow {
    animation: blink 1.5s infinite;
    margin-top: 1em;
  
    mat-icon {
      font-size: 1.2em;
    }
  }
  
  @keyframes blink {
    0%, 50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  /* Media Queries */
  @media only screen and (max-width: 768px) {
    .training-approach {
      padding: 1em;
  
      .approach-cards {
        grid-template-columns: 1fr;
      }
  
      .call-to-action {
        p {
          font-size: 1.2em;
          max-width: 100%;
        }
      }
    }
  }

`]
})
export class FourPillarsnComponent {

  @Input() partnerWhatsappGroupLink!: string | undefined;

  lunchWhatsAppGroup() {
    if (this.partnerWhatsappGroupLink) {
      window.open(this.partnerWhatsappGroupLink, '_blank');
    } else {
      window.open('https://chat.whatsapp.com/EO6Xl6zsDwwA9yZrcVUwP2', '_blank');
    }
    
  }
}
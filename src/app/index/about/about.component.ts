import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'async-about',
    imports: [RouterModule, MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, CommonModule],
    template: `
    <section id="about_us">

      <div class="content-wrapper">

      <div class="label-title">
        <p class="section-label">/ ABOUT US</p>
      </div>

        <div class="left-content">
          <h1>We are dedicated to guiding our partners <br><span>towards becoming the ultimate versions of themselves.</span></h1>

          <p>
            The Diamond Project is an initiative that seeks to unearth the inherent potential within individuals, much like a diamond waiting to be discovered. 
          </p>

          <p>
            We believe that every person has a unique brilliance within them, and given the right conditions, they can shine with unparalleled radiance, becoming an ultimate version of themself.
          </p>

          <p>
            Through personalized mentorship, rigorous training, and the cultivation of financial leverage systems, we enable you to break barriers and achieve unprecedented success. 
          </p>

           <p> 
            Our holistic approach addresses every facet of personal growth, from mental fortitude to physical vitality, ensuring you emerge as a diamond – refined, resilient, and radiant.
          </p>

          <a mat-flat-button color="primary"
            routerLink="get-started" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()"
            class="cta-button"  
            (click)="scrollToTop()">Get Started to Learn More
          </a>
        </div>
        
        <div class="right-content">
          <h1>Real People, Real Results: Success Stories!</h1>
          <div class="video-container">
            <video controls>
              <source src="assets/vid/SUCCESS_STORY_OF _DR_ELIJAH_MBA_RETIRED_MEDICAL_DOCTOR.mp4" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  `,
styles: [`
  section {
    padding: 2em;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: url('/assets/images/about-bg.jpg') center/cover no-repeat;
    overflow: hidden;

    .label-title {
      display: flex;
      align-items: flex-start;
      width: 100%;
      .section-label {
        color: #d4a941;
        font-size: 0.875rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        margin-bottom: 1.5rem;
      }
    }
  }

 

  .content-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1200px;
    width: 100%;
    padding: 2em;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .left-content {
    flex: 1 1 45%;
    margin-right: 2em;
    h1 {
      font-size: 2rem;
      margin-bottom: 1em;
      span {
        color:rgb(224, 128, 3);
      }
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 1em;
    }
    .cta-button {
      margin-top: 1em;
    }
  }

  .right-content {
    flex: 1 1 45%;
    h1 {
      font-size: 1.75rem;
      margin-bottom: 1em;
    }
    .video-container {
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      video {
        width: 100%;
        height: auto;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .content-wrapper {
      flex-direction: column;
      padding: 1em;
    }

    .left-content, .right-content {
      flex: 1 1 100%;
      h1 {
        font-size: 1.5rem;
      }
      p {
        font-size: 0.9rem;
      }
    }
  }

  @media screen and (max-width: 480px) {
    section {
      padding: 1em;
    }

    .content-wrapper {
      padding: 1em;
    }

    .left-content, .right-content {
      h1 {
        font-size: 1.25rem;
      }
      p {
        font-size: 0.85rem;
      }
    }
  }
  `]
})
export class AboutComponent {
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}

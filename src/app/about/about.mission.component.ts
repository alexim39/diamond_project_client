import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

/** @title Async Mission and Core values page */
@Component({
  selector: 'async-mission-corevalues',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatIconModule, MatSelectModule, MatCardModule ],
  template: `

      <div class="mission-vision-corevalues">

        <mat-card class="mision-vision">
          <mat-card-content>

            <div class="mission">
              <h1>Our Mission</h1>
              <p>
              <small>
                “Our mission is to foster personal growth and financial stability by providing comprehensive mentorship, capacity-building training programs, and creating robust financial leverage systems. 
                We are committed to helping individuals harness their potential and achieve their aspirations.”
              </small>
              </p>
            </div>

            <div class="vision">
              <h1>Our Vision</h1>
              <p>
              <small>
                “Our vision is a world where every individual is empowered to become the ultimate version of themselves - a world where everyone shines like a diamond. 
                We aim to create these conditions by providing comprehensive mentorship, training programs, and building financial leverage systems.”
              </small>
              </p>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="core-values">
          <mat-card-content>
            <h1>Our Core Pillars</h1>

            <ul>
              <li><div><strong>Mentorship & Capacity Building:</strong> </div>Cultivate your skills and expand your horizons through expert guidance and tailored training programs. Our mentors are industry leaders committed to nurturing your potential and igniting your path to success.</li>
              <li><div><strong>Discipline, Regimentation & Stoicism:</strong></div> Harness the power of discipline and stoic principles to fortify your mindset and conquer challenges with unwavering resolve. Our structured approach instills resilience, perseverance, and a steadfast commitment to excellence.</li>
              <li><div><strong>Health Optimization:</strong> </div>Elevate your well-being with comprehensive health optimization strategies. From personalized nutrition plans to targeted supplementation and lifestyle modifications, we empower you to thrive physically, mentally, and emotionally.</li>
              <li><div><strong>Financial Leverage Mastery:</strong></div> Gain a profound understanding of leverage and unlock the keys to financial abundance. Learn how to strategically amplify your resources, maximize returns, and build sustainable wealth through innovative financial leverage systems.</li>
            </ul>
          </mat-card-content>
        </mat-card>

      </div>

  `,
  styles: [`
    .mission-vision-corevalues {
      display: flex;
      flex-direction: row;
      padding: 2em;
      h1 {
        color: #050111;
      }

      .mision-vision {
        padding: 1em;
        font-family: system-ui;
        text-align: justify;
        display: flex;
        justify-content: space-evenly;

        box-shadow: 10px 10px 20px black, 0 20px 55px #050111, 0 0 15px #050111 ;

        .mission, .vision {
          p {
            font-size: 1em;
            small: {
              font-family: vaderna;
              width: 10em;
            }
          }
        }
      }

      .core-values {
        display: flex;
        font-family: system-ui;
        text-align: justify;
        margin-left: 3em;

        box-shadow: 10px 10px 20px black, 0 20px 55px #050111, 0 0 15px #050111 ;

        ul {
          li {
             padding-top: 2em;
             strong {
              color: #ffab40;
              /* color: #ffab40; */
             }
          }
        }
      }
  }




/* Extra small devices (phones, 1000px and down) */
@media only screen and (max-width: 1000px) {
  .mission-vision-corevalues {
      display: flex;
      flex-direction: column;
      .mision-vision {
        margin-bottom: 3em;
      }
      .core-values {
        margin-left: 0;
      }
      h1 {
        font-size: 1.3em;
        text-align: left;
      }
  }
}
  `],
})
export class MissionCorevaluesComponent {}

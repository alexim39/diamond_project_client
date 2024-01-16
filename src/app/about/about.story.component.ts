import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

/** @title Simple form field */
@Component({
  selector: 'async-about-story',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,MatIconModule, MatSelectModule,],
  template: `



      <div class="our-story">

        <div class="img-content">
            <img src="assets/img/story.jpg" alt="About Async Solutions">
        </div>

        <div class="text-content">
          <!-- <h1>
              Our Story?
            </h1> -->

           <!--  <p>
              Async Groups: <strong>Your Partner in Progress.</strong> Since our inception, we’ve been more than just a conglomerate. 
              We’re a partner to our clients, delivering top-tier solutions across public and private sectors in Nigeria. 
              Our journey began with Async Solutions Limited, our IT arm, where we harnessed the power of technology to drive innovation and deliver quality services. 
              We’ve helped businesses transform their operations, making them more efficient and competitive in the digital age.
            </p>

            <p>
              But we didn’t stop there. Recognizing the critical role of transportation and logistics in Nigeria’s economy, we established Async Edge Limited. 
              Our goal was simple: to ensure the smooth flow of people, goods and services across the country. And we’ve done just that. 
              From small businesses to large corporations, we’ve provided reliable, efficient, and innovative logistics solutions that have kept Nigeria moving forward.            
            </p>

            <p>
              At Async Groups, we’re not just providing services; we’re building relationships based on trust and mutual growth. We’re proud of the work we’ve done, and we’re excited about what the future holds. 
              Because at Async Groups, we believe that our success is tied to the success of our customers.            
            </p> -->

            <h3>Impact and Growth: Building Financially Free Community</h3>
            <p>
              The Diamond Project is more than just a business; it’s a movement towards personal growth, financial stability, and community development. 
              We invite you to join us on this transformative journey and together, let’s create a world where everyone has the opportunity to shine like a diamond.
            </p>

            <p>
            As we look to the future, we are excited about the opportunities for growth and expansion. 
            We are dedicated to reaching more individuals, enhancing our programs, and continuing to make a positive impact.
            </p>

        </div>


      </div>



  `,
  styles: [`

      .our-story {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-grow: 1;
        padding: 4em;

        .img-content {
            width: 50%;
            margin-bottom: -0.5em;
            img {
              width: 100%;
              border-radius: 5%;
            }
        }
      .text-content {
        width: 45%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 2em;
        h1 {
          text-align: right;
        }
        p {
          text-align: left;
          font-family: system-ui;
        }
      }
    }


/* Extra small devices (phones, 750px and down) */
@media only screen and (max-width: 750px) {
  .our-story {
    display: flex;
    flex-direction: row;
    padding: 1em;


    .img-content {
      display: none;
    }
    .text-content {
      width: 100%;
      text-align: justify;
    }
  }
}
  `],
})
export class AboutStoryComponent {}

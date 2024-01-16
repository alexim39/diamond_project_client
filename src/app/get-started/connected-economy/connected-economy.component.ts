import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConnectedEconomyVideosComponent } from './connected-economy-vid.component';
import { FormsModule } from '@angular/forms';
import { CountryDataService } from '../country-share.service';

export interface Video {
  title: string;
  subtitle: string;
  description: string;
  embedUrl: string;
  thumbnailUrl: string;
}

/**
 * @title Customer feedback
 */
@Component({
  selector: 'async-connected-economy',
  standalone: true,
  providers: [],
  imports: [MatButtonModule, CommonModule, FormsModule, MatDialogModule, MatDividerModule, RouterModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
  template: `
  <section class="head">

  <article>
      <h2>Diamond Project Connected Economy</h2>
      <!-- <h3>{{course.subTitle}}</h3> -->
      <p>See more videos of members testimonials and how they got to where they are in Diamond Project</p>
    </article>
  </section>

   <section class="breadcrumb-wrapper">
      <div class="breadcrumb">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a> &gt;
          <a routerLink="/get-started" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Get Started</a> &gt;
          <a routerLink="/get-started/testimonials" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Testimonials</a> &gt;
          <span>connected economy</span>
      </div>
   </section>


  <section class="body">
    <article class="writeup">
      <h3>Featured Testimonials On Connected Economy</h3>
      
      <form #videoForm="ngForm">
      <div class="video-gallery">
        <div *ngFor="let video of videos" class="video-item" (click)="openVideoModal(video)">
          <div class="play-overlay">
            <div class="play-button">&#9654;</div>
          </div>
          <img class="thumbnail" [src]="video.thumbnailUrl" alt="Video Thumbnail">
          <div class="video-details">
            <h2>{{ video.title }}</h2>
            <p class="subtitle">{{ video.subtitle }}</p>
            <p class="description">{{ video.description }}</p>
          </div>
        </div>
      </div>

      <mat-form-field>
        <mat-label>Choose your country</mat-label>
        <mat-select required [(ngModel)]="selectedCountry" name="selectedCountry" #countrySelect="ngModel">
          <mat-option value=""></mat-option>
          <mat-option value="Ghana">Ghana</mat-option>
          <mat-option value="Kenya">Kenya</mat-option>
          <mat-option value="Nigeria">Nigeria</mat-option>
          <mat-option value="Zambia">Zambia</mat-option>
        </mat-select>
        <mat-error *ngIf="countrySelect.invalid && countrySelect.touched">
          Country is required
        </mat-error>
      </mat-form-field>

      <div class="next-view">
        <button mat-raised-button color="accent" class="back" (click)="onPrevious()">
          <i class="fa fa-angle-double-left"></i> Previous
        </button>
        <button id="onNext" mat-raised-button color="primary" (click)="onNext()" [disabled]="!countrySelect.valid">
          Get Involved Now <i class="fa fa-angle-double-right"></i>
        </button>
      </div>

      </form>


    </article>

   </section>
  `,
  styles: [`
.head {
  background: #00838F;
  article {
    color: white;
    padding: 2em 1em 2em 8em;
    h2 {
      font-family: Garamond, serif;
      font-size: 2em;
    }
    h3 {
      font-family: Georgia, serif;
      font-size: 1em;
    }
    p {
      text-align: justify;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.5em;
    }
    a {
      color: white;
      text-decoration: underline;
      font-weight: bold;
    }
  }
}

.body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;

    .writeup {
      padding: 2em;
      width: 60%;
      mat-form-field {
        width: 30%;
      }
      h3 {
        color: #ffab40;
      }
      p {
        text-align: justify;
        /* font-family: 'Courier New', monospace; */
        font-size: 14px;
        line-height: 1.5em;
      }
      .next-view {
        margin-top: 2em;
        text-align: center;
        button {
          width: 20%;
          margin-left: 1em;
        }
      }
    }



.video-gallery {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 2em;
}

.video-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  //opacity: 0;
  transition: opacity 0.3s;
}

.play-button {
  font-size: 40px;
  color: #fff;
}

.thumbnail {
  width: 100%;
  height: auto;
}

.video-item:hover .play-overlay {
  opacity: 0.5;
}

.video-details {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  z-index: 1;
}

.subtitle {
  font-weight: bold;
  margin-bottom: 5px;
  padding: 0 1em;
}

.description {
  font-size: 14px;
  margin-bottom: 0;
  padding: 0 2em 0 1em;
}


}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
.head {
    article {
      width: 100%;
      padding: 1em;
      h2 {
        font-size: 1.4em;
      }
      h3 {
        font-size: 1em;
      }
      p {
        width: 90%;
      }
    }
}

.body {
  .writeup {
    h3 {
        padding-left: 1em;
    }
    width: 100%;
    padding: 1em;
    mat-form-field {
      width: inherit;
    }
    .next-view {
      display: flex;
      flex-direction: column;
      
        button {
          width: auto;
          margin-top: 1em;
        }
        .back {
          order: 1;
        }
    }
  }
}
}

/* iPads/tablet (portrait and landscape) */
@media only screen and (min-device-width: 601px) and (max-device-width: 1024px) {
  .body {
    .writeup {
      mat-form-field {
        width: inherit;
      }
      .next-view {
        display: flex;
        flex-direction: row;
      button {
        width: 50%;
        margin-left: 1em;
      }
    }
    }
  }
  
}
`]
})
export class ConnectedEconomyComponent {
  selectedCountry: string = '';

  videos: Video[] = [
 
    {
      title: 'The Connected Economy',
      subtitle: 'Join the Movement, Shape the Future',
      description: 'Imagine being part of a dynamic community where ideas flourish, opportunities abound, and connections thrive. Join us as we are shaping a future where every connection is a step towards success. Be part of something bigger – join the Diamond Project and let\'s build the connected economy together.',
      embedUrl: 'assets/vid/The_Connected_Economy.mp4',
      thumbnailUrl: 'assets/img/connected_economy.PNG'
    },
   
    // Add more video objects with different details
  ];

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private dataService: CountryDataService
  ) {}

  onNext(): void {
    if (this.selectedCountry) {
      this.dataService.setSelectedCountry(this.selectedCountry);
      this.router.navigateByUrl('get-started/get-involved');
    } else {
      console.error('Please select a country before proceeding.');
    }
  }

  onPrevious(): void {
    this.router.navigateByUrl('get-started/testimonials');
  }

  openVideoModal(video: Video): void {
    this.dialog.open(ConnectedEconomyVideosComponent, {
      data: video,
    });
  }
}
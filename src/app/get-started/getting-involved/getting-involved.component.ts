import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { GettingInvolvedVideosComponent } from './getting-involved-vid.component';
import { CountryDataService } from '../country-share.service';
import { countryVideos } from './country-vid';

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
  selector: 'async-getting-involved',
  standalone: true,
  providers: [],
  imports: [MatButtonModule, CommonModule, MatButtonModule, MatDialogModule, RouterModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
  <section class="head">

  <article>
      <h2>Diamond Project - Basic Business Principles</h2>
      <!-- <h3>{{course.subTitle}}</h3> -->
      <p>View a video that gives a concise summary of the fundamental principles guiding the operations of the Diamond Project</p>
    </article>
  </section>

   <section class="breadcrumb-wrapper">
      <div class="breadcrumb">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Home</a> &gt;
          <a routerLink="/get-started" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Get Started</a> &gt;
          <!-- <a routerLink="/get-started/testimonials" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Testimonials</a> &gt; -->
          <a routerLink="/get-started/connected-economy" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Connected Economy</a> &gt;
          <span>getting involved</span>
      </div>
   </section>


  <section class="body">
    <article class="writeup">
      <h3>Get Started And Be A Member From {{this.selectedCountry}}</h3>
      
      <!-- <div class="video-gallery">
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
      </div> -->

      <div  class="infor">
        <p>  By joining us, you not only step into a community of like-minded individuals but also unlock unparalleled opportunities for growth and collaboration. </p>
        <p> If you're ready to get started, use the button below to become a member and gain access to exclusive information that will pave the way for your success. </p>
        <p> Your journey to excellence starts now. Be a part of something extraordinary! </p>
      </div>

      
      <div class="next-view">
        <button mat-raised-button color="accent" class="back" (click)="onPrevious()"><i class="fa fa-angle-double-left"></i> Previous</button>
        <button mat-stroked-button color="primary" class="whatsapp" (click)="onNext()"><i class="fa fa-whatsapp"></i> Chat With A Consultant </button>
        <!-- <button mat-stroked-button color="primary" (click)="onNext()"><i class="fa fa-whatsapp"></i> Need More Info? </button> -->
        <button mat-flat-button color="primary" (click)="moreInfo()"><i class="fa fa-info-circle"></i> Need More Info? </button> 
      </div>

    </article>

   </section>
  `,
  styles: [`
.head {
  //background: #00838F;
  background: #050111;
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
      h3 {
        color: #ffab40;
      }
      p {
        text-align: justify;
        /* font-family: 'Courier New', monospace; */
        font-size: 14px;
        line-height: 1.5em;
      }
      .infor {
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          width: 60%;
        }
      }
      .next-view {
        margin-top: 2em;
        text-align: center;
        button {
          //width: 20%;
          margin-left: 1em;
          
        }
        .whatsapp {
          background: #075e54;
          color: white;
        }
      }
    }



.video-gallery {
  /* display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px; */
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
  opacity: 0;
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
  opacity: 1;
}

iframe {
  width: 100%;
  height: 100%;
}

.video-details {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  //padding: 10px;
  z-index: 1;
  h2 {
    padding-left: 1em;
  }
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
    .infor {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          width: 100%;
        }
    }
  }
}
}

/* iPads/tablet (portrait and landscape) */
@media only screen and (min-device-width: 601px) and (max-device-width: 1024px) {
  .body {
    .writeup {
      
      .next-view {
        display: flex;
        flex-direction: row;
        button {
          width: 50%;
          margin-left: 1em;
          /* .fa {
            color: 	#075e54;
            font-size: 8em;
          }
          .fa-whatsapp {
            color: 	#075e54;
            font-size: 8em;
          } */
        }
      }
      .infor {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          width: 80%;
        }
    }
    }
  }
  
}
`]
})
export class GettingInvolvedComponent implements OnInit {

   // Define videos for each country
   countryVideos: { [country: string]: Video[] } = countryVideos;

  selectedCountry: string = '';
  videos: Video[] = [];

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private dataService: CountryDataService
  ) {}

  ngOnInit() {
    this.dataService.selectedCountry$.subscribe(country => {
      this.selectedCountry = country ? country : 'Nigeria';
      this.loadVideosForCountry(this.selectedCountry);
    });
  }

  onNext(): void {
   // window.open('https://wa.me/message/I5F2NKYKO7JNB1', '_blank'); // Adeyemi
    window.open(' https://wa.me/message/GQ6P3GATFO4IB1', '_blank');
  }

  moreInfo(): void {
    this.router.navigateByUrl('about-our-business');
  }

  onPrevious(): void {
    this.router.navigateByUrl('get-started/connected-economy');
  }

  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openVideoModal(video: Video): void {
    this.dialog.open(GettingInvolvedVideosComponent, {
      data: video,
      width: '1000px',
    });
  }

  private loadVideosForCountry(country: string): void {
    // Load videos based on the selected country
    this.videos = this.countryVideos[country] || [];
  }
}
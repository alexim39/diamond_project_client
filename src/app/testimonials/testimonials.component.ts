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
import { TestimonialsVideosComponent } from './testimonials-vid.component';
import { videos } from './testimonials-vid';

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
    selector: 'async-testimonials',
    imports: [MatButtonModule, CommonModule, MatDialogModule, MatDividerModule, RouterModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
    template: `
  <section class="head">

  <article>
      <h2>Hear Direct from Others Who Achieved Financial Freedom</h2>
      <!-- <h3>{{course.subTitle}}</h3> -->
      <p>Don't just take our word for it. 
        These real people finally broke through and left the rat race behind by following our proven financial freedom training. Hear their stories in their own words
      </p>
    </article>
  </section>

   <section class="breadcrumb-wrapper">
      <div class="breadcrumb">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Home</a> &gt;
          <!-- <a routerLink="/get-started" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Get Started</a> &gt; -->
          <span>testimonials</span>
      </div>
   </section>


  <section class="body">
    <article class="writeup">
      <h3>Featured Testimonials</h3>
      

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

      <!-- <div class="next-view">
        <button mat-raised-button color="accent" class="back" (click)="onPrevious()"><i class="fa fa-angle-double-left"></i> Previous</button>
        <button mat-raised-button color="primary" (click)="onNext()">Get Connected Now <i class="fa fa-angle-double-right"></i></button>
      </div> -->

    </article>

   </section>
  `,
    styleUrls: ['testimonials.component.scss']
})
export class TestimonialsComponent {
  videos: Video[] = videos;

  constructor(private router: Router, public dialog: MatDialog) {}

  onNext(): void {
    this.router.navigateByUrl('get-started/connected-economy');
  }

  onPrevious(): void {
    this.router.navigateByUrl('get-started');
  }

  openVideoModal(video: Video): void {
    this.dialog.open(TestimonialsVideosComponent, {
      data: video,
      width: '700px',
    });
  }

  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Subject, Subscription, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'async-index-testimonials',
  standalone: true,
  styleUrls: ['testimonials.component.scss'],
  imports: [MatButtonModule, MatDividerModule, MatIconModule, RouterModule, CommonModule],
  template: `
   <article class="testimonial">
      <h1>Testimonials</h1>

      <div class="carousel">
        <section [@carouselAnimation]="currentIndex">
          <figure class="snip1139" *ngFor="let testimonial of visibleTestimonials(); let i = index">
            <blockquote class="quote">
              {{ testimonial.quote }}
              <div class="arrow"></div>
            </blockquote>
            <div class="author" style="text-align: center;">
              <img src="assets/img/default_pp.png" alt="Customer image">
              <h5>{{ testimonial.author.name }} </h5>
              <div class="social">
                  <a class="facebook" href="{{testimonial.author.facebook}}" target="_blank"><i class="fa fa-facebook" title="Facebook"></i></a>
                  <!-- <a class="facebook" routerLink="#" target="_blank"><i class="fa fa-facebook" title="Facebook"></i></a> -->
              </div>
            </div>
          </figure>
        </section>
        <button mat-icon-button (click)="prevTestimonial()" class="nav-button">
          <mat-icon>chevron_left</mat-icon>
        </button>
        <button mat-icon-button (click)="nextTestimonial()" class="nav-button">
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
    </article>
  `,
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials = [
    {
      quote: "The Diamond Project has been a game-changer for me. The mentorship and training programs have equipped me with the skills and confidence I needed to excel in my career. The financial leverage systems have empowered me to take control of my financial future. I am now a more confident, skilled, and financially stable individual, all thanks to the Diamond Project.",
      author: { name: "Adeyemi Sanya", role: "", facebook: "https://www.facebook.com/adeyemitemitopesanya" },
    },
    {
      quote: "Joining the Diamond Project was one of the best decisions I’ve ever made. The capacity-building training programs have helped me unlock my potential and become the best version of myself. The financial leverage systems have given me the tools to achieve financial independence. The Diamond Project has not just transformed me; it has transformed my life.",
      author: { name: "Imenwo Alex", role: "", facebook: "https://www.facebook.com/imenwo/" },
    },
    {
      quote: "The Diamond Project has had a profound impact on my life. The mentorship program has provided me with invaluable guidance and support, helping me navigate my personal and professional journey. The financial leverage systems have taught me about financial planning and investments, enabling me to build a strong financial foundation. I am grateful for the Diamond Project and the positive changes it has brought to my life.",
      author: { name: "Ozoemenam Angela ", role: "", facebook: "https://www.facebook.com/angela.nnaamani"  },
    },
    {
      quote: "I will always recommend this project to anyone who needs training for reliable sources of income",
      author: { name: "Linda Adeyemi", role: "", facebook: "https://www.facebook.com/linda.aaron.75"  },
    },
  ];

  currentIndex = 0;
  private destroy$ = new Subject<void>();

  private intervalSubscription: Subscription | undefined;

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
  }

  prevTestimonial() {
    this.currentIndex =
      this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
  }

  visibleTestimonials(): any[] {
    const startIndex = this.currentIndex;
    const endIndex = (this.currentIndex + 2) % this.testimonials.length;

    if (startIndex < endIndex) {
      return this.testimonials.slice(startIndex, endIndex + 1);
    } else {
      return [
        ...this.testimonials.slice(startIndex),
        ...this.testimonials.slice(0, endIndex + 1),
      ];
    }
  }

  ngOnInit(): void {
    this.startAutoSlideInterval();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopAutoSlideInterval();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.stopAutoSlideInterval();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.startAutoSlideInterval();
  }

  private startAutoSlideInterval() {
    this.intervalSubscription = interval(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.nextTestimonial());
  }

  private stopAutoSlideInterval() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = undefined;
    }
  }
}

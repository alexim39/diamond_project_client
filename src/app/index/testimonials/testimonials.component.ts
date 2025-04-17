import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'async-index-testimonials',
  imports: [CommonModule],
  template: `
    <section class="testimonial-section redesigned">
      <div class="container">
        <h1 class="section-title">What Our Partners Say</h1>

        <div class="testimonial-slider"
             (mouseenter)="pauseAutoSlide()"
             (mouseleave)="startAutoSlide()">
          <div class="slider-wrapper" [style.transform]="transformStyle">
            <div class="testimonial-slide" *ngFor="let testimonial of testimonials">
              <div class="testimonial-card">
                <blockquote class="quote">
                  <p>{{ testimonial.quote }}</p>
                </blockquote>
                <div class="author-info">
                  <div class="author-image">
                    <img [src]="testimonial?.author?.image || 'assets/images/default_pp.png'" alt="Author Image" />
                  </div>
                  <div class="author-details">
                    <h5 class="author-name">{{ testimonial.author.name }}</h5>
                    <div class="social-links" *ngIf="testimonial.author.facebook">
                      <a href="{{ testimonial.author.facebook }}" target="_blank" class="social-icon facebook">
                        <i class="fa fa-facebook"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="slider-navigation">
            <button class="nav-button prev" (click)="prevTestimonial()" aria-label="Previous Testimonial">
              <i class="fa fa-chevron-left"></i>
            </button>
            <button class="nav-button next" (click)="nextTestimonial()" aria-label="Next Testimonial">
              <i class="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* General Styles */
    .testimonial-section.redesigned {
      padding: 40px 20px;
      background:rgb(233, 233, 233);
      color: #333;
      text-align: center;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 20px; /* Add some padding for smaller screens */
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 30px;
      color: #2c3e50;
    }

    /* Testimonial Slider */
    .testimonial-slider {
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(7, 37, 103, 0.1);
      background: #fff;
      cursor: pointer; /* Indicate interaction */
    }

    .slider-wrapper {
      display: flex;
      transition: transform 0.5s ease-in-out;
    }

    .testimonial-slide {
      flex: 0 0 100%;
      min-width: 100%; /* Ensure each slide takes full width */
      padding: 30px;
      box-sizing: border-box;
      text-align: left; /* Align content within the slide */
      background:rgb(232, 232, 232);

    }

    /* Testimonial Card */
    .testimonial-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }

    .quote {
      font-size: 1.2rem;
      line-height: 1.7;
      font-style: italic;
      color: #555;
      margin-bottom: 15px;
    }

    .author-info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
    }

    .author-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
    }

    .author-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .author-details {
      display: flex;
      flex-direction: column;
    }

    .author-name {
      font-size: 1.1rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }

    .social-links {
      display: flex;
      gap: 8px;
    }

    .social-icon {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background:rgb(172, 170, 170);
      color: #777;
      font-size: 0.9rem;
      transition: background-color 0.3s ease;
    }

    .social-icon:hover {
      background-color: #2c3e50;
      color: #fff;
    }

    /* Slider Navigation */
    .slider-navigation {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      transform: translateY(-50%);
      z-index: 10;
    }

    .nav-button {
      background: rgba(108, 108, 108, 0.3);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .nav-button:hover {
      background: rgba(0, 0, 0, 0.6);
    }

    .nav-button.prev {
      left: 10px;
    }

    .nav-button.next {
      right: 10px;
    }

    /* Mobile Responsiveness */
    @media (max-width: 768px) {
      .section-title {
        font-size: 2rem;
        margin-bottom: 20px;
      }

      .testimonial-slide {
        padding: 20px;
      }

      .quote {
        font-size: 1.1rem;
      }

      .author-info {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
      }

      .slider-navigation {
        padding: 0 5px;
      }

      .nav-button {
        width: 30px;
        height: 30px;
        font-size: 1rem;
      }

      .author-details {
        align-items: flex-start;
      }
    }

    @media (max-width: 480px) {
      .section-title {
        font-size: 1.8rem;
      }
    }
  `],
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials = [
    {
      quote: `
        The Diamond Project has been a game-changer for me. The mentorship and training programs have equipped me with the skills and confidence I needed to excel in my career. The financial leverage systems have empowered me to take control of my financial future. I am now a more confident, skilled, and financially stable individual, all thanks to the Diamond Project.
      `,
      author: { name: "Adeyemi Sanya", facebook: "https://www.facebook.com/adeyemitemitopesanya", image: '' },
    },
    {
      quote: `
        Joining the Diamond Project was one of the best decisions I’ve ever made. The capacity-building training programs have helped me unlock my potential and become the best version of myself. The financial leverage systems have given me the tools to achieve financial independence. The Diamond Project has not just transformed me; it has transformed my life.
      `,
      author: { name: "Imenwo Alex", facebook: "https://www.facebook.com/imenwo/", image: '' },
    },
    {
      quote: `
        The Diamond Project has had a profound impact on my life. The mentorship program has provided me with invaluable guidance and support, helping me navigate my personal and professional journey. The financial leverage systems have taught me about financial planning and investments, enabling me to build a strong financial foundation. I am grateful for the Diamond Project and the positive changes it has brought to my life.
      `,
      author: { name: "Ozoemenam Angela", facebook: "https://www.facebook.com/angela.nnaamani", image: '' },
    },
    {
      quote: `
        I will always recommend this project to anyone who needs training for reliable sources of income
      `,
      author: { name: "Linda Adeyemi", facebook: "https://www.facebook.com/linda.aaron.75", image: '' },
    },
  ];

  currentIndex = 0;
  transformStyle: string = '';
  private destroy$ = new Subject<void>();
  private intervalSubscription: Subscription | undefined;
  private isMouseOver = false;

  ngOnInit(): void {
    this.updateTransform();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopAutoSlide();
  }

  nextTestimonial(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.updateTransform();
  }

  prevTestimonial(): void {
    this.currentIndex =
      this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
    this.updateTransform();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.updateTransform();
    this.stopAutoSlide(); // Stop auto-slide when manually navigating
    this.startAutoSlide(); // Restart auto-slide
  }

  private updateTransform(): void {
    this.transformStyle = `translateX(-${this.currentIndex * 100}%)`;
  }

  startAutoSlide(): void {
    this.stopAutoSlide(); // Ensure only one interval is running
    if (!this.isMouseOver) {
      this.intervalSubscription = interval(5000)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.nextTestimonial());
    }
  }

  private stopAutoSlide(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = undefined;
    }
  }

  pauseAutoSlide(): void {
    this.isMouseOver = true;
    this.stopAutoSlide();
  }
}
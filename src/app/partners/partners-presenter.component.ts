import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, } from '@angular/router';
import { FourPillarsnComponent } from '../index/four-pillars/four-pillars.component';
import { MatButtonModule } from '@angular/material/button';
import { BrandsComponent } from './brands.component';
import { PartnerInterface } from '../_common/interface/partner.interface';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../index/banner/banner.component';
import { AboutComponent } from '../index/about/about.component';

/**
 * @title Partners
 */
@Component({
  selector: 'async-partners-presentation',
  imports: [CommonModule, RouterModule, FourPillarsnComponent, MatButtonModule, BrandsComponent, BannerComponent, AboutComponent],
  template: `

<async-index-banner [isUsernamePage]="isUsernamePage"/>
<async-about/>

<section class="partners-background">

  <section class="breadcrumb-wrapper">
    <div class="breadcrumb">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Home</a> &gt;
      <span>Success Stories</span>
    </div>
  </section>

  <section>

    <article class="partner-testimonial-section">
      <h2 class="section-title">Real People, Real Results: Our Success Stories!</h2>
      <p class="section-subtitle">Join Our Community Today And Get Mentored Into A New Life</p>

      <div class="testimonial-card" *ngIf="partner.testimonial">
        <div class="testimonial-content">
          <blockquote class="testimonial-quote">
            {{partner.testimonial}}
          </blockquote>
          <div class="testimonial-author">
            <strong>{{partner.name}} {{partner.surname}}</strong>
            <small *ngIf="partner.jobTitle" class="job-title"> - {{partner.jobTitle}}</small>
          </div>
        </div>
        <div class="testimonial-social">
          <a *ngIf="partner.facebookPage" href="{{partner.facebookPage}}" class="social-icon facebook" title="Facebook" target="_blank"><i class="fa fa-facebook"></i></a>
          <a *ngIf="partner.twitterPage" href="{{partner.twitterPage}}" class="social-icon twitter" title="Twitter" target="_blank"><i class="fa fa-twitter"></i></a>
          <a *ngIf="partner.linkedinPage" href="{{partner.linkedinPage}}" class="social-icon linkedin" title="Linkedin" target="_blank"><i class="fa fa-linkedin"></i></a>
          <a *ngIf="partner.youtubePage" href="{{partner.youtubePage}}" class="social-icon youtube" title="Youtube" target="_blank"><i class="fa fa-youtube"></i></a>
          <a *ngIf="partner.instagramPage" href="{{partner.instagramPage}}" class="social-icon instagram" title="Instagram" target="_blank"><i class="fa fa-instagram"></i></a>
          <a *ngIf="partner.tiktokPage" href="{{partner.tiktokPage}}" class="social-icon tiktok" title="Tiktok" target="_blank"><i class="fa fa-tiktok"></i></a>
        </div>
      </div>

      <div class="testimonial-card">
        <div class="testimonial-content">
          <blockquote class="testimonial-quote">
            The job market after graduation was brutal... Now I have the flexibility to be there for them while creating an income stream.
          </blockquote>
          <div class="testimonial-author">
            <strong>Adeyemi Temitope</strong>
            <small class="job-title"> - Entrepreneur & Mentor</small>
          </div>
        </div>
        <div class="testimonial-social">
          <a href="https://web.facebook.com/adeyemitemitopesanya" class="social-icon facebook" title="Facebook" target="_blank"><i class="fa fa-facebook"></i></a>
          <a href="https://www.linkedin.com/in/temitope-sanya-adeyemi-siirsm-79ab2963/" class="social-icon linkedin" title="Linkedin" target="_blank"><i class="fa fa-linkedin"></i></a>
        </div>
      </div>

      <div class="testimonial-card">
        <div class="testimonial-content">
          <blockquote class="testimonial-quote">
            I was tired of the corporate grind... Diamond Project offered a chance to be my own boss and build something meaningful.
          </blockquote>
          <div class="testimonial-author">
            <strong>Imenwo Alex</strong>
            <small class="job-title"> - Chief Technology Officer</small>
          </div>
        </div>
        <div class="testimonial-social">
          <a href="https://web.facebook.com/imenwo?_rdc=1&_rdr" class="social-icon facebook" title="Facebook" target="_blank"><i class="fa fa-facebook"></i></a>
          <a href="https://x.com/ImenwoAlex" class="social-icon twitter" title="Twitter" target="_blank"><i class="fa fa-twitter"></i></a>
          <a href="https://www.linkedin.com/in/alex-imenwo-2b38b298/" class="social-icon linkedin" title="Linkedin" target="_blank"><i class="fa fa-linkedin"></i></a>
        </div>
      </div>

      <div class="call-to-action">
        <a mat-flat-button color="accent" routerLink="../get-started" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">
          Get Started Today
        </a>
      </div>

    </article>

  </section>

  <async-four-pillars [partnerWhatsappGroupLink]="partner.whatsappGroupLink"/>

  <div class="partners">
    <h3 class="title">Our Partners</h3>
    <async-brands-logos></async-brands-logos>
  </div>

</section>
    
    `,
styles: [`

.partners-background {

  .partner-testimonial-section {
    padding: 2em;
    display: flex;
    flex-direction: column;
    align-items: center; /* Center the content */
  }

  .section-title {
    font-size: 2.5em;
    margin-bottom: 0.5em;
    text-align: center;
    color: #333;
  }

  .section-subtitle {
    font-size: 1.1em;
    color: #777;
    text-align: center;
    margin-bottom: 2em;
  }

  .testimonial-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 2em;
    margin-bottom: 2em;
    width: 80%; /* Adjust width as needed */
    max-width: 700px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .testimonial-content {
    margin-bottom: 1.5em;
  }

  .testimonial-quote {
    font-size: 1.2em;
    font-style: italic;
    color: #555;
    line-height: 1.6;
    margin-bottom: 1em;
    padding-left: 1.5em;
    border-left: 3px solid var(--accent-color, #007bff); /* Use a theme variable if available */
  }

  .testimonial-author {
    text-align: right;
    font-weight: bold;
    color: #333;
  }

  .job-title {
    font-style: italic;
    color: #777;
  }

  .testimonial-social {
    display: flex;
    justify-content: flex-end;
    gap: 0.5em;
  }

  .social-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }

  .social-icon.facebook {
    background-color: #4267B2;
  }

  .social-icon.twitter {
    background-color: #1da1f2;
  }

  .social-icon.linkedin {
    background-color: #0e76a8;
  }

  .social-icon.youtube {
    background-color: #FF0000;
  }

  .social-icon.instagram {
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  }

  .social-icon.tiktok {
    background-color: #010101;
  }

  .social-icon:hover {
    transform: scale(1.1);
  }

  .call-to-action {
    text-align: center;
    margin-top: 3em;
  }

  .call-to-action a {
    font-size: 1.2em;
    padding: 12px 30px;
    border-radius: 6px;
  }

  .partners {
    padding: 3em 0;
    text-align: center;
  }

  .partners .title {
    font-size: 2em;
    margin-bottom: 1em;
    color: #333;
  }
}

/* Responsive adjustments (example) */
@media (max-width: 768px) {
  .partner-testimonial-section {
    padding: 1.5em;
  }
  .testimonial-card {
    width: 95%;
  }
  .section-title {
    font-size: 2em;
  }
  .section-subtitle {
    font-size: 1em;
  }
}


`]
})
export class PartnersPresenterComponent {

  @Input() partner!: PartnerInterface;
  isUsernamePage = true;

  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
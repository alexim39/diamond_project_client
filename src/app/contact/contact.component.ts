import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ContactFormData, ContactService } from './contact.service';
import { ReferralService } from '../_common/services/referral.service';
import { SeoService } from '../_common/services/seo.service';

@Component({
  selector: 'async-contact',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule
  ],
  providers: [ContactService],
  template: `
    <section class="contact-page">
      <div class="contact-hero">
        <p class="eyebrow">/ CONTACT</p>
        <h1>Let's talk about your next step.</h1>
        <p class="intro">
          Questions about the opportunity, training or how partnership works?
          Send us a message or reach out directly.
        </p>
      </div>

      <div class="contact-grid">
        <aside class="contact-card">
          <h2>Reach us directly</h2>
          <a class="contact-line" href="mailto:contacts@c21fg.online">
            <mat-icon>mail</mat-icon>
            <span>contacts&#64;c21fg.online</span>
          </a>
          <a class="contact-line" href="https://chat.whatsapp.com/Ff5Z07p3sNP8S9WySrZJRm" target="_blank" rel="noopener">
            <span class="fa fa-whatsapp" aria-hidden="true"></span>
            <span>Join our WhatsApp community</span>
          </a>
          <a class="contact-line" routerLink="/get-started">
            <mat-icon>person_add</mat-icon>
            <span>Prefer a consultant? Get started</span>
          </a>
          <p class="note">We aim to respond within one business day.</p>
        </aside>

        <form class="contact-form" [formGroup]="contactForm" (ngSubmit)="onSubmit()">
          <div class="field-grid">
            <mat-form-field appearance="outline">
              <mat-label>First name</mat-label>
              <input matInput formControlName="name" autocomplete="given-name" />
              <mat-error *ngIf="contactForm.get('name')?.hasError('required')">First name is required</mat-error>
              <mat-error *ngIf="contactForm.get('name')?.hasError('minlength')">At least 2 characters</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Surname</mat-label>
              <input matInput formControlName="surname" autocomplete="family-name" />
              <mat-error *ngIf="contactForm.get('surname')?.hasError('required')">Surname is required</mat-error>
              <mat-error *ngIf="contactForm.get('surname')?.hasError('minlength')">At least 2 characters</mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline">
            <mat-label>Email address</mat-label>
            <input matInput type="email" formControlName="email" autocomplete="email" />
            <mat-error *ngIf="contactForm.get('email')?.hasError('required')">Email is required</mat-error>
            <mat-error *ngIf="contactForm.get('email')?.hasError('email')">Enter a valid email address</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Subject</mat-label>
            <input matInput formControlName="subject" />
            <mat-error *ngIf="contactForm.get('subject')?.hasError('required')">Subject is required</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Message</mat-label>
            <textarea matInput formControlName="message" rows="5"></textarea>
            <mat-error *ngIf="contactForm.get('message')?.hasError('required')">Message is required</mat-error>
            <mat-error *ngIf="contactForm.get('message')?.hasError('minlength')">Please add a little more detail</mat-error>
          </mat-form-field>

          <div class="consent-block">
            <mat-checkbox formControlName="consent">I agree to the Privacy Policy and Terms of Service.</mat-checkbox>
            <p class="consent-links">
              <a routerLink="/legal/privacy">Privacy Policy</a>
              <span aria-hidden="true">·</span>
              <a routerLink="/legal/terms">Terms of Service</a>
            </p>
            <p class="consent-error" role="alert" *ngIf="contactForm.get('consent')?.invalid && contactForm.get('consent')?.touched">
              Please agree before submitting.
            </p>
          </div>

          <mat-progress-bar mode="indeterminate" *ngIf="isSpinning"></mat-progress-bar><br>

          <div class="form-actions">
            <button mat-raised-button color="primary" type="submit" [disabled]="isSpinning">
              Send message <i class="fa fa-angle-double-right" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .contact-page {
      background: var(--dp-paper);
      color: var(--dp-text);
      padding: 3em 1.5em 4em;
    }
    .contact-hero {
      max-width: 1080px;
      margin: 0 auto 2.5em;
    }
    .eyebrow {
      color: var(--dp-gold-ink);
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin: 0 0 0.75em;
    }
    h1 {
      font-family: var(--dp-font-display);
      font-size: clamp(2rem, 4vw, 3rem);
      margin: 0 0 0.4em;
    }
    .intro {
      color: var(--dp-muted);
      font-size: 1.05rem;
      max-width: 42em;
      line-height: 1.6;
      margin: 0;
    }
    .contact-grid {
      max-width: 1080px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 2em;
      align-items: start;
    }
    .contact-card {
      background: var(--dp-night);
      color: #fff;
      border-radius: 14px;
      padding: 1.5em;
      border: 1px solid var(--dp-gold);
    }
    .contact-card h2 {
      margin: 0 0 1em;
      font-size: 1.2rem;
      color: var(--dp-gold-bright);
    }
    .contact-line {
      display: flex;
      align-items: center;
      gap: 0.6em;
      color: #fff;
      text-decoration: none;
      padding: 0.7em 0;
      border-bottom: 1px solid rgba(255,255,255,0.12);
      font-weight: 600;
    }
    .contact-line:last-of-type {
      border-bottom: 0;
    }
    .contact-line:hover {
      color: var(--dp-gold-bright);
    }
    .contact-line mat-icon,
    .contact-line .fa {
      color: var(--dp-gold-bright);
    }
    .note {
      margin: 1em 0 0;
      color: rgba(255,255,255,0.62);
      font-size: 0.85rem;
      line-height: 1.5;
    }
    .contact-form {
      background: var(--dp-surface);
      border: 1px solid var(--dp-line);
      border-radius: 14px;
      padding: 1.5em;
    }
    .field-grid {
      display: flex;
      gap: 1em;
    }
    .field-grid mat-form-field {
      flex: 1;
    }
    mat-form-field {
      width: 100%;
    }
    .consent-block {
      margin: 0.5em 0 1.25em;
      padding: 1em 1.25em;
      border: 1px solid var(--dp-line);
      border-radius: 10px;
    }
    .consent-links {
      margin: 0.35em 0 0;
      font-size: 0.85em;
      color: var(--dp-muted);
    }
    .consent-links a {
      color: var(--dp-gold-ink);
      font-weight: 700;
    }
    .consent-links span {
      margin: 0 0.4em;
    }
    .consent-error {
      margin: 0.35em 0 0;
      font-size: 0.85em;
      color: var(--dp-error);
    }
    .form-actions {
      display: flex;
      justify-content: flex-start;
    }
    .form-actions button {
      min-height: 48px;
    }
    @media (max-width: 860px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
      .field-grid {
        flex-direction: column;
        gap: 0;
      }
    }
  `]
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup = new FormGroup({});
  isSpinning = false;
  private subscriptions: Subscription[] = [];
  private username = 'business';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private referral: ReferralService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.username = this.referral.getPartner()?.username || 'business';
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      username: [this.username],
      consent: [false, Validators.requiredTrue],
    });

    this.seo.setPage({
      title: 'Contact | Diamond Project',
      description: 'Contact Diamond Project for questions about the opportunity, training, partnership or your next step.',
      path: '/contact'
    });
  }

  onSubmit(): void {
    this.isSpinning = true;
    Object.keys(this.contactForm.controls).forEach((key) => this.contactForm.get(key)?.markAsTouched());

    if (this.contactForm.invalid) {
      this.isSpinning = false;
      this.scrollToFirstError();
      return;
    }

    const formData = this.contactForm.value as ContactFormData;
    this.subscriptions.push(
      this.contactService.submit(formData).subscribe({
        next: (response) => {
          this.isSpinning = false;
          this.contactForm.reset({ username: this.username, consent: false });
          Swal.fire({
            position: 'bottom',
            icon: 'success',
            title: 'Message sent',
            text: response?.message ?? 'Thank you. We will respond shortly.',
            showConfirmButton: true,
            confirmButtonColor: '#ffab40',
          });
        },
        error: (error: HttpErrorResponse) => {
          this.isSpinning = false;
          const message = error.error?.message ?? 'Could not send your message. Please try again or email contacts@c21fg.online.';
          Swal.fire({
            position: 'bottom',
            icon: 'error',
            text: message,
            showConfirmButton: true,
            confirmButtonColor: '#ffab40',
          });
        }
      })
    );
  }

  private scrollToFirstError(): void {
    const invalid = Object.keys(this.contactForm.controls).find((key) => this.contactForm.get(key)?.invalid);
    if (!invalid) return;
    const element = document.querySelector(`[formControlName="${invalid}"]`);
    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus({ preventScroll: true });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}

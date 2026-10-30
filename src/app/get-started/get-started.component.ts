import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { Subscription, of, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, catchError, tap } from 'rxjs/operators';
import { SurveyFormData, SurveyService, PublicPartner } from './get-started.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpErrorResponse } from '@angular/common/http';
import { ReferralPartner, ReferralService } from '../_common/services/referral.service';
import { SeoService } from '../_common/services/seo.service';
import { ConsentService } from '../_common/services/consent.service';

/**
 * @title Survey form for getting started
 */
@Component({
selector: 'async-feedback',
providers: [SurveyService],
    imports: [MatButtonModule, MatProgressBarModule, MatCheckboxModule, MatRadioModule, CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule],
templateUrl: 'get-started.component.html',
styles: [`

  
  .head {
    background: radial-gradient(120% 140% at 50% 0%, #1a1440 0%, #050111 55%, #0f0f0f 100%);
    //background: #00838F;
    article {
      color: white;
      padding: 2em 1em 2em 8em;
      .eyebrow {
        font-size: 0.78em;
        font-weight: 800;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--dp-gold);
        margin: 0 0 0.6em;
      }
      .back-home {
        margin-top: 1em;
        min-height: 44px;
        color: var(--dp-gold-bright);
        border: 1px solid var(--dp-gold);
        border-radius: 999px;
        padding: 0 1.25em;
        text-decoration: none;
      }
      .back-home:hover {
        text-decoration: none;
      }
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
      .quick-help {
        margin-top: 0.5em;
        a {
          color: var(--dp-gold-bright);
          font-weight: 700;
        }
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
          color: var(--dp-gold-soft);
        }
        p {
          text-align: justify;
          font-size: 14px;
          line-height: 1.5em;
        }
        form {
          display: flex;
          flex-direction: column;
          padding: 0 1em;
          .q-section {
            background: var(--dp-surface, #ffffff);
            border: 1px solid var(--dp-line, #e4ddcd);
            border-radius: 10px;
            padding: 1.25em 1.25em 0.5em;
            margin-bottom: 1.25em;
          }
          .q-eyebrow {
            font-size: 0.78em;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: var(--dp-gold-ink, #6e5218);
            margin: 0 0 1em;
            padding-bottom: 0.6em;
            border-bottom: 2px solid var(--dp-gold);
          }
          /* Standalone rows run full-bleed; pairs share the row 49/49. */
          mat-form-field {
            width: 100%;
          }
          .form-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 0.75em;
            mat-form-field {
              flex: 1 1 0;
              min-width: 0;
            }

            .range {
              width: 49%;
              margin-bottom: 25px;
              h4 {
                text-align: left;
              }
              mat-radio-group, section {
                display: flex;
                flex-wrap: wrap;
                mat-radio-button, mat-checkbox {
                  border-left: 1px dotted #ccc;
                  margin-right: 10px;
                }
              }
            }
          }
           .btn {
            display: flex;
            justify-content: center;
            text-align: center;
            button {
              width: 40%;
              min-width: 220px;
              min-height: 48px;
              font-size: 1.05em;
              font-weight: 700;
            }
          }
          .consent-block {
            text-align: left;
            margin: 0 0 1.25em;
            padding: 1em 1.25em;
            border: 1px solid var(--dp-line, #e4ddcd);
            border-radius: 10px;
            background: var(--dp-surface, #ffffff);
            .consent-links {
              margin: 0.35em 0 0;
              font-size: 0.85em;
              color: var(--dp-muted, #6e6e6e);
              a {
                color: var(--dp-gold-ink, #6e5218);
                font-weight: 700;
              }
              span {
                margin: 0 0.4em;
              }
            }
            .consent-error {
              margin: 0.35em 0 0;
              font-size: 0.85em;
              color: var(--dp-error, #b71c1c);
            }
          }
        }
      }
  }


.invalid-field {
  border: 1px solid var(--dp-error, #b71c1c);
  border-radius: 4px;
  background: rgba(183, 28, 28, 0.04);
}

.ref-opt { display: flex; align-items: center; gap: 0.7em; padding: 0.2em 0; }
.ref-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; flex: none; }
.ref-initials { display: inline-flex; align-items: center; justify-content: center; font-weight: 800; color: #111; background: linear-gradient(135deg, #ffc107, #a97f2c); }
.ref-text { display: flex; flex-direction: column; line-height: 1.2; }
.ref-text small { color: #6e6e6e; }
  


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
      form {
        .form-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            mat-form-field {
              width: 100%;
            }
            .range {
              width: 100%;
              margin-bottom: 25px;
              h4 {
                text-align: left;
              }
              mat-radio-group, section {
                display: flex;
                flex-wrap: wrap;
                mat-radio-button, mat-checkbox {
                  border-left: 1px dotted #ccc;
                  margin-right: 10px;
                }
              }
            }
          }
      }
    }
  }
}
  
/* iPads/tablet (portrait and landscape) */
@media only screen and (min-device-width: 601px) and (max-device-width: 1024px) {
  .body {
    .writeup {
      padding: 2em;
      width:70%;
      h3 {
        padding-left: 1em;
      }
      width: 100%;
      padding: 1em;
      form {
        .form-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            mat-form-field {
              width: 100%;
            }
            .range {
              width: 100%;
              margin-bottom: 25px;
              h4 {
                text-align: left;
              }
              mat-radio-group, section {
                display: flex;
                flex-wrap: wrap;
                mat-radio-button, mat-checkbox {
                  border-left: 1px dotted #ccc;
                  margin-right: 10px;
                }
              }
            }
          }
      }
    }
  }
}


`]
})
export class GetStartedComponent implements OnInit, OnDestroy {

  surveyForm: FormGroup = new FormGroup({}); // Assigning a default value
  subscriptions: Subscription[] = [];
  isSpinning = false;
  userDevice = '';
  username: string = 'business';
  private referralPartner: ReferralPartner | null = null;

  // Referral picker — searchable partner dropdown with free-text fallback.
  filteredPartners: PublicPartner[] = [];
  isSearchingPartners = false;
  referralSearchFailed = false;


  countries: string[] = [
    'Nigeria',
    'Ghana',
    'Kenya',
    'South Africa',
    'United States',
    'Egypt',
    'Morocco',
    'Algeria',
    'Ethiopia',
    'Tanzania',
    'Uganda',
    'Rwanda',
    'Senegal',
    'Cameroon',
    'Ivory Coast',
    'Zimbabwe',
    'Zambia',
    'Botswana',
    'Namibia',
    'Mozambique',
    'Madagascar',
    'Tunisia',
    'Libya',
    'Sudan',
    'Angola',
    'Democratic Republic of the Congo',
    'Somalia',
    'Mauritius',
    'Seychelles',
    'Cape Verde',
    'Gambia',
    'Burkina Faso',
    'Mali',
    'Niger',
    'Chad',
    'Malawi',
    'Eswatini',
    'Lesotho',
    'Djibouti',
    'Eritrea',
    'Central African Republic',
    'Equatorial Guinea',
    'Gabon',
    'Sao Tome and Principe',
    'Comoros',
    'Israel',
    'Jordan',
    'Lebanon',
    'Syria',
    'Saudi Arabia',
    'Yemen',
    'Oman',
    'United Arab Emirates',
    'Qatar',
    'Kuwait',
    'Bahrain',
    'United Kingdom',
    'Canada',
    'Germany',
    'France',
    'Netherlands',
    'Spain',
    'Italy',
    'India',
    'Pakistan',
    'Philippines',
    'Malaysia',
    'Indonesia',
    'Australia'
  ];
  // Example country list
  states: string[] = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 
    'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 
    'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT (Abuja)'
  ]; // List of Nigerian states
  isNigeria = true; // Tracks whether the selected country is Nigeria



  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private platform: Platform,
    private referral: ReferralService,
    private seo: SeoService,
    private consent: ConsentService
  ) {
    if (this.platform.ANDROID || this.platform.IOS) {
      this.userDevice = 'mobile'
    } else {
      this.userDevice = 'desktop'
    }

    const stored = this.referral.getPartner();
    const refFromUrl = (this.route.snapshot.queryParamMap.get('ref') ?? '').trim();
    if (refFromUrl && refFromUrl !== 'business' && stored?.username !== refFromUrl) {
      this.referralPartner = { username: refFromUrl };
      this.referral.remember(this.referralPartner);
    } else {
      this.referralPartner = stored;
    }
    this.username = this.referralPartner?.username || 'business';
  }

    ngOnInit(): void {
      this.surveyForm = this.fb.group({
        ageRange: ['', Validators.required],
        socialMedia: this.fb.array([], Validators.required), // FormArray for socialMedia checkboxes
        importanceOfPassiveIncome: ['', Validators.required],
        onlinePurchaseSchedule: ['', Validators.required],
        primaryOnlineBusinessMotivation: ['', Validators.required],
        employedStatus: ['', Validators.required],
        comfortWithTech: ['', Validators.required],
        onlineBusinessTimeDedication: ['', Validators.required],
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.minLength(2)]],
        surname: ['', [Validators.required, Validators.minLength(2)]],
        referral: ['', Validators.required],
        referralCode: ['', [Validators.required, Validators.minLength(2)]],
        userDevice: this.userDevice,
        username: this.username,
        consent: [false, Validators.requiredTrue],

        country: ['Nigeria', [Validators.required]], // Default to Nigeria
        state: ['', [Validators.required]], // State is required
      });

      this.prefillReferral();
  
      this.surveyForm.get('referral')?.valueChanges.subscribe(value => {
        if (value === 'Referral') {
          this.surveyForm.get('referralCode')?.setValidators([Validators.required]);
        } else {
          this.surveyForm.get('referralCode')?.clearValidators();
          // Stale hidden value must not ride along.
          this.surveyForm.get('referralCode')?.setValue('', { emitEvent: false });
          this.filteredPartners = [];
        }
        this.surveyForm.get('referralCode')?.updateValueAndValidity();
      });

      // Referral picker: debounced public search while Referral is active.
      // Free-text fallback stays valid — friends/family may not be partners.
      this.subscriptions.push(
        (this.surveyForm.get('referralCode')!.valueChanges as Observable<unknown>).pipe(
          filter(() => this.surveyForm.get('referral')?.value === 'Referral'),
          tap(() => { this.referralSearchFailed = false; }),
          debounceTime(300),
          distinctUntilChanged(),
          filter((v: unknown): v is string => typeof v === 'string' && v.trim().length >= 2),
          tap(() => { this.isSearchingPartners = true; }),
          switchMap((v: string) =>
            this.surveyService.searchPartners(v.trim()).pipe(
              catchError(() => {
                this.referralSearchFailed = true;
                return of({ partners: [], success: false });
              })
            )
          ),
        ).subscribe({
          next: (res) => {
            this.isSearchingPartners = false;
            this.filteredPartners = res.partners ?? [];
          },
          error: () => {
            this.isSearchingPartners = false;
            this.referralSearchFailed = true;
            this.filteredPartners = [];
          }
        })
      );

      // Initialize `isNigeria` based on the default country
      this.isNigeria = this.surveyForm.get('country')?.value === 'Nigeria';

      this.seo.setPage({
        title: 'Get Started | Diamond Project',
        description: 'Complete the Diamond Project survey and a consultant will contact you about the mentorship, training and online business opportunity.',
        path: '/get-started'
      });
    }

    private prefillReferral(): void {
      if (!this.referralPartner) return;
      const { username, name, surname } = this.referralPartner;
      const fullName = `${name ?? ''} ${surname ?? ''}`.trim();
      this.surveyForm.get('referral')?.setValue('Referral', { emitEvent: false });
      this.surveyForm.get('referralCode')?.setValue(fullName ? `${fullName} (@${username})` : `@${username}`, { emitEvent: false });
      this.surveyForm.get('username')?.setValue(username, { emitEvent: false });
    }

    /** Label stored on select: verifiable + readable, backward compatible. */
    referralLabel(p: PublicPartner): string {
      const full = `${p.name ?? ''} ${p.surname ?? ''}`.trim() || p.username;
      return `${full} (@${p.username})`;
    }

    referralInitials(p: PublicPartner): string {
      const parts = `${p.name ?? ''} ${p.surname ?? ''}`.trim().split(/\s+/).filter(Boolean);
      if (!parts.length) return (p.username?.[0] ?? '?').toUpperCase();
      return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
    }

    referralSubtitle(p: PublicPartner): string {
      return [p.jobTitle, [p.city, p.state].filter(Boolean).join(', ')].filter(Boolean).join(' · ');
    }

    /** Single-line dropdown caption — avoids `@` control-flow pitfalls in the template. */
    referralOptionLine(p: PublicPartner): string {
      const sub = this.referralSubtitle(p);
      return sub ? `@${p.username} · ${sub}` : `@${p.username}`;
    }

    onReferralSelected(event: MatAutocompleteSelectedEvent): void {
      const p = event.option.value as PublicPartner;
      this.surveyForm.get('referralCode')?.setValue(this.referralLabel(p), { emitEvent: false });
      this.surveyForm.get('username')?.setValue(p.username, { emitEvent: false });
      this.referralPartner = { username: p.username, name: p.name, surname: p.surname };
      this.referral.remember(this.referralPartner);
      this.filteredPartners = [p];
    }

    referralTypedValue(): string {
      return String(this.surveyForm.get('referralCode')?.value ?? '').trim();
    }

    onCountryChange(selectedCountry: string): void {
      const wasNigeria = this.isNigeria;
      this.isNigeria = selectedCountry === 'Nigeria';

      // Only clear the state when switching between Nigerian states and
      // free-text mode — same-mode changes keep what the user typed.
      if (wasNigeria !== this.isNigeria) {
        this.surveyForm.get('state')?.reset();
      }

      // Update validation for the state field
      if (this.isNigeria) {
        this.surveyForm.get('state')?.setValidators([Validators.required]);
      } else {
        this.surveyForm.get('state')?.setValidators([Validators.required, Validators.minLength(2)]);
      }
      this.surveyForm.get('state')?.updateValueAndValidity();
    }

    // Get FormArray for socialMedia
    get socialMedia(): FormArray {
      return this.surveyForm.get('socialMedia') as FormArray;
    }

  // Add or remove checkbox values in the FormArray
  onCheckboxChange(event: any) {
    const formArray: FormArray = this.surveyForm.get('socialMedia') as FormArray;

    if (event.checked) {
      // Add the value to the FormArray
      formArray.push(this.fb.control(event.source.value));
    } else {
      // Remove the value from the FormArray
      const index = formArray.controls.findIndex(x => x.value === event.source.value);
      formArray.removeAt(index);
    }
  }

   // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit(): void {
    this.isSpinning = true;

    // Mark all form controls as touched to trigger the display of error messages
    this.markAllAsTouched();

    if (this.surveyForm.valid) {
      // Send the form value to your Node.js backend
      const formData: SurveyFormData = this.surveyForm.value;
      this.subscriptions.push(
        this.surveyService.submit(formData).subscribe({
          next: (response) => {
            this.isSpinning = false;
            this.referral.clear();
            this.consent.trackConversion('AW-307794612/pPxdCIWS4osZELSl4pIB');
            Swal.fire({
              position: "bottom",
              icon: 'success',
              title: 'Thank you!',
              text: response?.message ?? 'Your details have been submitted.',
              footer: 'Check your email for next steps. A Diamond Project consultant will contact you shortly.',
              showConfirmButton: true,
              confirmButtonColor: "#ffab40",
            }).then(() => {
              this.router.navigateByUrl('/');
            });
          },
          error: (error: HttpErrorResponse) => {
            this.isSpinning = false;
            let errorMessage = 'Server error occurred, please try again.'; // default error message.
            if (error.error && error.error.message) {
              errorMessage = error.error.message; // Use backend's error message if available.
            }
            Swal.fire({
              position: "bottom",
              icon: 'error',
              text: errorMessage,
              showConfirmButton: true,
              confirmButtonColor: "#ffab40",
            });

          }
        })
      )
    } else {
     this.isSpinning = false;
     this.surveyForm.markAllAsTouched(); // Highlight invalid fields
     this.scrollToFirstError();
    }
    
  }

  /** Focus the first invalid field so users see what to fix. */
  private scrollToFirstError(): void {
    const invalid = Object.keys(this.surveyForm.controls).find((k) => this.surveyForm.get(k)?.invalid);
    if (!invalid) return;
    const el = document.querySelector(`[formControlName="${invalid}"]`);
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus({ preventScroll: true });
    }
  }

  // Helper method to mark all form controls as touched
  private markAllAsTouched() {
    Object.keys(this.surveyForm.controls).forEach(controlName => {
      this.surveyForm.get(controlName)?.markAsTouched();
    });
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import Swal from 'sweetalert2';
import { Subscription, of, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, catchError, tap } from 'rxjs/operators';
import { SurveyFormData, SurveyService, PublicPartner } from './get-started.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { minDigitsValidator } from '../_common/services/username-check';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';

/**
 * @title Survey form for getting started
 */
@Component({
selector: 'async-feedback',
providers: [SurveyService],
imports: [MatButtonModule, MatDividerModule, MatProgressBarModule, MatCheckboxModule, MatRadioModule, CommonModule, ReactiveFormsModule, RouterModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatAutocompleteModule],
templateUrl: 'get-started.component.html',
styles: [`

  
.head {
    background: #050111;
    //background: #00838F;
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
          font-size: 14px;
          line-height: 1.5em;
        }
        form {
          display: flex;
          flex-direction: column;
          padding: 0 1em;
          .form-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            mat-form-field {
              width: 49%;
              
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
            }
          }
        }
      }
  }


.invalid-field {
  border: 1px solid rgb(216, 159, 159);
  border-radius: 4px;
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
    'Bahrain'
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
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private platform: Platform
  ) {
    if (this.platform.ANDROID || this.platform.IOS) {
      //console.log('User is using a mobile device.');
      this.userDevice = 'mobile'
    } else {
      //console.log('User is using a desktop device.');
      this.userDevice = 'desktop'
    }

    const storedUsername = localStorage.getItem('username');
    // Retrieve the data from local storage
    if (storedUsername) {
      this.username = storedUsername;
      //console.log('Retrieved data from local storage:', this.username);
    } else {
      //console.log('Data not found in local storage');
    }
    
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
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{11,}$')]],
        email: ['', [Validators.required, Validators.minLength(10), Validators.email]],
        name: ['', [Validators.required, Validators.minLength(3)]],
        surname: ['', [Validators.required, Validators.minLength(3)]],
        referral: ['', Validators.required],
        referralCode: ['', [Validators.required, Validators.minLength(3)]],
        userDevice: this.userDevice,
        username: this.username,

        country: ['Nigeria', [Validators.required]], // Default to Nigeria
        state: ['', [Validators.required]], // State is required
      });
  
      this.surveyForm.get('referral')?.valueChanges.subscribe(value => {
        if (value === 'Referral') {
          this.surveyForm.get('referralCode')?.setValidators([Validators.required]);
        } else {
          this.surveyForm.get('referralCode')?.clearValidators();
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
      // Store verifiable label; @username inside keeps upline credit exact.
      this.surveyForm.get('referralCode')?.setValue(this.referralLabel(p), { emitEvent: false });
      this.filteredPartners = [p];
    }

    referralTypedValue(): string {
      return String(this.surveyForm.get('referralCode')?.value ?? '').trim();
    }

    onCountryChange(selectedCountry: string): void {
      this.isNigeria = selectedCountry === 'Nigeria';
  
      // Reset the state field when the country changes
      this.surveyForm.get('state')?.reset();
  
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
            Swal.fire({
              position: "bottom",
              icon: 'success',
              text: response.message,
              showConfirmButton: true,
              timer: 10000,
              confirmButtonColor: "#ffab40",
            })
            this.isSpinning = false;
            this.router.navigateByUrl('/');
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
              showConfirmButton: false,
              timer: 4000
            });  

          }
        })
      )
    } else {
     this.isSpinning = false;
     this.surveyForm.markAllAsTouched(); // Highlight invalid fields
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
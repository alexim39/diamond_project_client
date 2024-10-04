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
import Swal from 'sweetalert2';
import { SurveyFormData } from './get-started.interface';
import { Subscription } from 'rxjs';
import { SurveyService } from './get-started.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { minDigitsValidator } from '../_common/services/username-check';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

/**
 * @title Survey form for getting started
 */
@Component({
  selector: 'async-feedback',
  standalone: true,
  providers: [SurveyService],
  imports: [MatButtonModule, MatDividerModule, MatProgressBarModule, MatCheckboxModule, MatRadioModule, CommonModule, ReactiveFormsModule, RouterModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
  templateUrl: 'get-started.component.html',
  styleUrls: ['get-started.component.scss', 'get-started.mobile.scss']
})
export class GetStartedComponent implements OnInit, OnDestroy {

  surveyForm: FormGroup = new FormGroup({}); // Assigning a default value
  subscriptions: Subscription[] = [];
  isSpinning = false;
  userDevice = '';
  username: string = 'business';

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
        phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        referral: ['', Validators.required],
        referralCode: ['', Validators.required],
        userDevice: this.userDevice,
        username: this.username
      });
  
      this.surveyForm.get('referral')?.valueChanges.subscribe(value => {
        if (value === 'Referral') {
          this.surveyForm.get('referralCode')?.setValidators([Validators.required]);
        } else {
          this.surveyForm.get('referralCode')?.clearValidators();
        }
        this.surveyForm.get('referralCode')?.updateValueAndValidity();
      });
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
        this.surveyService.submit(formData).subscribe(res => {
          Swal.fire({
            position: "top-end",
            icon: 'success',
            text: 'Thank you for completing the survey form. Your responses have been submitted, and we will be in touch with you soon',
            showConfirmButton: false,
            timer: 10000
          });
          this.isSpinning = false;
          this.router.navigateByUrl('get-started/connected-economy');
        }, error => {
          this.isSpinning = false;
          Swal.fire({
            position: "top-end",
            icon: 'info',
            text: 'Server error occured, please try again',
            showConfirmButton: false,
            timer: 4000
          });
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
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
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SurveyFormData } from './get-started.interface';
import { Subscription } from 'rxjs';
import { SurveyService } from './get-started.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Platform } from '@angular/cdk/platform';

/**
 * @title Survey form for getting started
 */
@Component({
  selector: 'async-feedback',
  standalone: true,
  providers: [SurveyService],
  imports: [MatButtonModule, MatDividerModule, MatProgressBarModule, CommonModule, ReactiveFormsModule, RouterModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
  templateUrl: 'get-started.component.html',
  styleUrls: ['get-started.component.scss']
})
export class GetStartedComponent implements OnInit, OnDestroy {

  surveyForm: FormGroup = new FormGroup({}); // Assigning a default value
  subscriptions: Subscription[] = [];
  isSpinning = false;
  userDevice = '';

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
  }

  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      doYouFeelNeedForChange: ['', Validators.required],
      employedStatus: ['', Validators.required],
      interestedInEarningAdditionaIcome: ['', Validators.required],
      doYouBelieveInTraining: ['', Validators.required],
      areYouOpenToBeCoached: ['', Validators.required],
      ifSessionIsSet: ['', Validators.required],
      // Add form controls for other questions
      phoneNumber: ['', Validators.required],
      //phoneNumber: ['', Validators.required, Validators.pattern('0\\d{10}')],
      email: ['', [Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      referralCode: ['',],
      referral: ['', Validators.required],
      userDevice: this.userDevice
    });
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
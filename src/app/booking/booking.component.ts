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
import { BookingFormData } from './booking.interface';
import { Subscription } from 'rxjs';
import { BookingService } from './booking.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { minDigitsValidator } from '../_common/services/username-check';

/**
 * @title Booking component
 */
@Component({
  selector: 'async-booking',
  templateUrl: 'booking.component.html',
  styleUrls: ['booking.component.scss'],
  standalone: true,
  providers: [BookingService],
  imports: [MatButtonModule, MatDividerModule, MatProgressBarModule, CommonModule, ReactiveFormsModule, RouterModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
})
export class BookingComponent implements OnInit, OnDestroy {

  bookinForm: FormGroup = new FormGroup({}); // Assigning a default value
  subscriptions: Subscription[] = [];
  isSpinning = false;
  username: string = 'business';

  minDate = new Date(); // Today's date
  userDevice = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private bookingService: BookingService,
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
    this.bookinForm = this.fb.group({
      reason: ['', Validators.required],
      description: ['',],
      referralCode: ['',],
      consultDate: ['', Validators.required],
      consultTime: ['', Validators.required],
      contactMethod: ['', Validators.required],
      referral: ['', Validators.required],
      phone: ['', [Validators.required, minDigitsValidator(6)]],
      //phoneNumber: ['', Validators.required, Validators.pattern('0\\d{10}')],
      email: ['', [Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      userDevice: this.userDevice,
      username: this.username
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

    if (this.bookinForm.valid) {
      // Send the form value to your Node.js backend
     const formData: BookingFormData = this.bookinForm.value;
      this.subscriptions.push(
        this.bookingService.submit(formData).subscribe((res: any) => {
          Swal.fire({
            position: "top-end",
            icon: 'success',
            text: 'Thank you for booking a session with us. We hope to meet with you at your booked date and time',
            showConfirmButton: false,
            timer: 10000
          });
          this.isSpinning = false;
          //this.router.navigateByUrl('get-started/connected-economy');
        }, (error: Error) => {
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
    Object.keys(this.bookinForm.controls).forEach(controlName => {
      this.bookinForm.get(controlName)?.markAsTouched();
    });
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
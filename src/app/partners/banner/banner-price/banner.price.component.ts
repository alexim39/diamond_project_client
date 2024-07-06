import { Component, Input, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { CourseInterface } from '../../../course.interface';
import { PaystackService } from 'src/app/_common/services/paystack.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from 'src/app/auth/auth.component';
import { UserInterface, UserService } from 'src/app/_common/services/user.service';
import Swal from 'sweetalert2';
import { LoadingSpinnerService } from 'src/app/_common/services/loader/spinner.service';
import { LoadingSpinnerComponent } from 'src/app/_common/spinner.compnent';
import { PaymentUpdaterService } from 'src/app/portal/payment/payment-updater.service';

@Component({
  selector: 'async-banner-price',
  standalone: true,
  providers: [PaystackService, UserService, PaymentUpdaterService],
  imports: [MatToolbarModule, RouterModule, LoadingSpinnerComponent, MatIconModule, MatButtonModule, MatTooltipModule, CommonModule],
  template: `
  <async-loading-spinner *ngIf="loadingSpinnerService.isShowing()"></async-loading-spinner>

    <article class="banner-price">
      <p><span class="current">{{course.currentPrice | currency:"NGN":"&#8358;" }}</span> <span class="divider"> </span> <em *ngIf="removeOldPrice"> | </em> <span class="old" *ngIf="removeOldPrice"> {{course.oldPrice | currency:"NGN":"&#8358;" }}</span></p>
      <small [innerHTML]="course.panelMsg"></small>

      <hr>

      <a *ngIf="!isUserEnrolled" mat-flat-button color="primary" (click)="joinNow()">Join Now</a>
      
      <a *ngIf="isUserEnrolled" mat-flat-button color="accent" (click)="initiatePayment()" [disabled]="isCoursePaidFor">Make Payment</a>
      <div class="already-reg" *ngIf="!isCoursePaidFor && isUserEnrolled">
        <small >You are already registered in this course</small>
      </div>
    </article>

  `,
  styleUrls: [`banner.price.component.scss`]
})
export class BannerPriceComponent implements OnInit {
  //window.open('https://paystack.com/pay/async-training');
  authenticated = false;
  subscriptions: Subscription[] = [];
  @Input() course!: CourseInterface
  removeOldPrice = true;
  user!: UserInterface;
  isUserEnrolled = false;
  currentRouteCourseId = '';
  isCoursePaidFor = false;

  constructor(
    private router: Router,
    private paystackService: PaystackService,
    public dialog: MatDialog,
    private userService: UserService,
    public loadingSpinnerService: LoadingSpinnerService,
    private paymentUpdaterService: PaymentUpdaterService
    ) { }

  ngOnInit(): void {
    if (this.course.currentPrice == this.course.oldPrice) this.removeOldPrice = false

   // check current route of user
   const parts = this.router.url.split('/');
   this.currentRouteCourseId = parts[parts.length - 1]; // This will print "64f1a27ce709366c3d55e247"

    this.subscriptions.push(
      this.userService.getUser().subscribe(
        res => {
          this.user = res as UserInterface
          //Emitters.authEmitter.emit(true);
          this.authenticated = true;

          // check if user have already registered for this course
          res.courses.forEach((course: CourseInterface) => {
            if(course._id === this.currentRouteCourseId) {
              this.isUserEnrolled = true;

              // check if user have paid for course
              // Subscribe to check if user has already paid for course
              this.paystackService.getPaymentRecords(this.user._id, this.course._id).subscribe((res) => {
                // disable payment button
                if (res.status == "success") {
                  this.isCoursePaidFor = true;
                } else {
                  this.isCoursePaidFor = false;
                }
              })
            }
          })
        },
        error => {
          //Emitters.authEmitter.emit(false);
          this.authenticated = false;
        }
      ),

      // Subscribe to the payment complete action
      this.paymentUpdaterService.action$.subscribe((res) => {
        // disable payment button - if res is true
        this.isCoursePaidFor = res;
      }),

    )

  }

  initiatePayment(): void {
    // check if authenticated
    if (!this.authenticated) {
      this.openAuthComponent();
    } else {

       // Replace with user's email and payment amount
       const email = this.user.email;
       const amount = this.course.currentPrice; // 1000 NGN
 
       this.subscriptions.push(
         this.paystackService.initiatePayment(amount, email, this.course._id, this.user._id).subscribe(response => {
           // Handle the response from Paystack, which may include a redirect URL for payment
           window.open(response.data.authorization_url, "_blank");
         // window.location.href = response.data.authorization_url;
 
         })
       )
    }
  }

  joinNow(): void {
    this.loadingSpinnerService.show();

    // check if authenticated
    if (!this.authenticated) {
      this.openAuthComponent();
      this.loadingSpinnerService.hide()
    } else {

      if(this.user && this.currentRouteCourseId.length === 24) {
        // user successfully joined
  
        this.subscriptions.push(
          this.userService.registerCourse(this.currentRouteCourseId).subscribe(
            res => {
              //console.log('=== ',res)
              Swal.fire({
                position: 'bottom',
                icon: 'success',
                text: 'Course have been registered successully go ahead to make payment',
                showConfirmButton: true,
                confirmButtonText: 'Make Payment',
              }).then((result) => {
                if (result.isConfirmed) {
                  // show payment
                  this.initiatePayment();
                } 
              })
             /*  Swal.fire({
                position: 'bottom',
                icon: 'success',
                text: 'Course have been registered successully, go ahead to make payment',
                showConfirmButton: false,
                timer: 4000
              }); */
              this.isUserEnrolled = true;
              this.loadingSpinnerService.hide()
            },
            error => {
              //console.log(error)
              if (error) {// user not found
                Swal.fire({
                  position: 'bottom',
                  icon: 'info',
                  text: 'Error occured and course was not registered',
                  showConfirmButton: false,
                  timer: 4000
                });
              }
              this.loadingSpinnerService.hide()
            }
          )
        )
  
      }       
    }

  }

  openAuthComponent() {
    this.dialog.open(AuthComponent);
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

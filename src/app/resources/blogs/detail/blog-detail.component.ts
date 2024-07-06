import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BlogCommentFormData, BlogCommentService } from '../blogs.service';
import { MatButtonModule } from '@angular/material/button';
import { Platform } from '@angular/cdk/platform';


/**
 * @title Blog details
 */
@Component({
    selector: 'async-blogs-detail',
    templateUrl: 'blog-detail.component.html',
    styleUrls: ['blog-detail.component.scss'],
    standalone: true,
    providers: [BlogCommentService],
    imports: [RouterModule,CommonModule, MatProgressBarModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
})
export class BlogDetailComponent implements OnInit, OnDestroy  {
    
    blogUrl!: string | null;

    commentForm: FormGroup = new FormGroup({}); // Assigning a default value
    subscriptions: Subscription[] = [];
    isSpinning = false;
    userDevice = '';

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private blogCommentService: BlogCommentService,
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

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.blogUrl = params.get('url');
            // Fetch blog details using this ID

            console.log('---',this.blogUrl)
        });

        this.commentForm = this.fb.group({
            comment: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            name: ['', Validators.required],
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

    if (this.commentForm.valid) {
      // Send the form value to your Node.js backend
     const formData: BlogCommentFormData = this.commentForm.value;
      this.subscriptions.push(
        this.blogCommentService.submit(formData).subscribe((res: any) => {
          Swal.fire({
            position: "top-end",
            icon: 'success',
            text: 'Thank you for reaching out to us. We will respond to your message within the next few hours',
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
    Object.keys(this.commentForm.controls).forEach(controlName => {
      this.commentForm.get(controlName)?.markAsTouched();
    });
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

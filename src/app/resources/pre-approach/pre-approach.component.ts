import { Component, OnDestroy, OnInit, } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DownloadFormData, PreapproachService } from './pre-approach.service';
import { HttpClient } from '@angular/common/http';


/**
 * @title Preapproach
 */
@Component({
    selector: 'async-pre-approach',
    standalone: true,
    imports: [RouterModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatProgressBarModule],
    templateUrl: 'pre-approach.component.html',
    styleUrls: ['pre-approach.component.scss'],
    providers: [PreapproachService]
})
export class PreapproachComponent implements OnInit, OnDestroy {
  downloadForm: FormGroup = new FormGroup({}); // Assigning a default value
  subscriptions: Subscription[] = [];
  isSpinning = false;
  isDownloadReady = true;

    constructor( 
        private router: Router,
        private fb: FormBuilder,
        private preapproachService: PreapproachService,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.downloadForm = this.fb.group({
            phone: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            name: ['', Validators.required],
            surname: ['', Validators.required],
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

    if (this.downloadForm.valid) {
      // Send the form value to your Node.js backend
     const formData: DownloadFormData = this.downloadForm.value;
      this.subscriptions.push(
        this.preapproachService.submit(formData).subscribe((res: any) => {
          Swal.fire({
            position: "top-end",
            icon: 'success',
            text: 'Thank you for your interest in our guide. You can now click the download button below.',
            showConfirmButton: false,
            timer: 10000
          });
          this.isSpinning = false;
          this.isDownloadReady = false;

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

  downloadPdf() {
    const pdfUrl = 'assets/doc/pre-approach_tool_for_Diamondprojectonline.pdf';
    
    this.http.get(pdfUrl, { responseType: 'blob' as 'json' }).subscribe((res: any) => {
      const blob = new Blob([res], { type: 'application/pdf' });

      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'pre-approach_tool_for_Diamondprojectonline.pdf';
      downloadLink.click();
    });
  }

  // Helper method to mark all form controls as touched
  private markAllAsTouched() {
    Object.keys(this.downloadForm.controls).forEach(controlName => {
      this.downloadForm.get(controlName)?.markAsTouched();
    });
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConnectedEconomyVideosComponent } from './connected-economy-vid.component';
import { FormsModule } from '@angular/forms';
import { CountryDataService } from '../country-share.service';

export interface Video {
  title: string;
  subtitle: string;
  description: string;
  embedUrl: string;
  thumbnailUrl: string;
}

/**
 * @title Customer feedback
 */
@Component({
    selector: 'async-connected-economy',
    providers: [],
    imports: [MatButtonModule, CommonModule, FormsModule, MatDialogModule, MatDividerModule, RouterModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
    templateUrl: 'connected-economy.component.html',
    styleUrls: ['connected-economy.component.scss']
})
export class ConnectedEconomyComponent {
  selectedCountry: string = '';

  videos: Video[] = [
 
    {
      title: 'The Connected Economy',
      subtitle: 'Join the Movement, Shape the Future',
      description: 'Imagine being part of a dynamic community where ideas flourish, opportunities abound, and connections thrive. Join us as we are shaping a future where every connection is a step towards success. Be part of something bigger – join the Diamond Project and let\'s build the connected economy together.',
      embedUrl: 'assets/vid/The_Connected_Economy.mp4',
      thumbnailUrl: 'assets/img/connected_economy.PNG'
    },
   
    // Add more video objects with different details
  ];

  constructor(
    private router: Router, 
    public dialog: MatDialog,
    private dataService: CountryDataService
  ) {}

   // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onNext(): void {
    if (this.selectedCountry) {
      this.dataService.setSelectedCountry(this.selectedCountry);
      this.router.navigateByUrl('get-started/get-involved');
    } else {
      console.error('Please select a country before proceeding.');
    }
  }

  onPrevious(): void {
    this.router.navigateByUrl('get-started');
  }

  openVideoModal(video: Video): void {
    this.dialog.open(ConnectedEconomyVideosComponent, {
      data: video,
    });
  }
}
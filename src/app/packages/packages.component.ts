import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

/**
 * @title Packages component
 */
@Component({
  selector: 'async-packages',
  templateUrl: 'packages.component.html',
  styleUrls: ['packages.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatCardModule, RouterModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
})
export class PackagesComponent {

    // scroll to top when clicked
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

}
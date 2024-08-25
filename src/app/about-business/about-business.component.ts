import {Component} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';


/** @title Simple form field */
@Component({
  selector: 'async-about-our-business',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterModule],
  templateUrl: "about-business.component.html",
  styleUrls: ["about-business.component.scss"],
})
export class AboutBusinessComponent {
  
  
    // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

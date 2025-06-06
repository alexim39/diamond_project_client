import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'async-cookies',
    templateUrl: './cookies.component.html',
    imports: [MatButtonModule, MatDividerModule, CommonModule, MatListModule, RouterModule],
    styles: [`
    .content {
      p {
        text-align: justify;
      }
      ul, ol {
        li {
          margin-bottom: 10px;
          text-align: justify;
        }
      }
    }
  `]
})
export class CookiesComponent {
  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

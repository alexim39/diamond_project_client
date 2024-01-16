import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'async-logo',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  template: `
    <a [routerLink]="['/']" [style.color]="color">
      <span><!-- <mat-icon [style.margin-top]="marginTop">sync</mat-icon> -->Diamond Project Online</span>
    </a>
  `,
  styles: [`
    a {
      text-decoration: none;
      span {
        display: flex;
        justify-content: center;
        font-family: "Audiowide", sans-serif;
        font-size: 20px;
        font-weight: bold;
        mat-icon {
          margin-right: -1px;
        }
      }
    }
  `]
})
export class LogoComponent {
  @Input() color = '#006064';
  @Input() marginTop = '6px';
}

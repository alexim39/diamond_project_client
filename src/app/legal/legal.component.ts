import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'async-legal',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, CommonModule, MatListModule, RouterModule],
  template: `
    <section class="legal">
      
      <div class="legal-menu">
        <mat-list>
            <mat-list-item> 
                <a [routerLink]="['terms']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Terms of Service</a>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item> 
                <a [routerLink]="['privacy']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Privacy Policy</a>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>
                <a [routerLink]="['cookies']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Cookies Policy</a>
            </mat-list-item>
            <mat-divider></mat-divider>
        </mat-list>
      </div>

      <div class="legal-content">
          <router-outlet></router-outlet>
      </div>
    </section>
  `,
  styles: [`
    .legal {
      padding: 0 4em;
      display: flex;
      .legal-menu {
        flex: 20%;
        width: 100%;
        margin-right: 2em;
        mat-list {
          mat-list-item {
            a {
              text-decoration: none;
              color: rgb(56, 56, 56);
              font-weight: bold;
            }
            a:hover {
              color: rgb(151, 149, 149);
            }
            a.active {
              color: rgb(151, 149, 149);
            }
          }
        }
      }
      .legal-content {
        flex: 80%;
      }
    }
  `]
})
export class LegalComponent { }

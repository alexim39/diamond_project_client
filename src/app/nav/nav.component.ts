import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogoComponent } from '../_common/logo.component';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
// declare jquery as any
declare const $: any;
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationBannerComponent } from './notification-banner/notification-banner.component';
import { Emitters } from '../_common/emitters/emitters';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { BreadcrumbComponent } from '../_common/breadcrumb.component';
import { LoadingSpinnerService } from '../_common/services/loader/spinner.service';
import { LoadingSpinnerComponent } from '../_common/spinner.compnent';
import { ThemeTogglerService } from '../_common/services/theme-toggler.service';


@Component({
  selector: 'async-nav',
  standalone: true,
  providers: [],
  imports: [MatToolbarModule, BreadcrumbComponent, LoadingSpinnerComponent, MatDialogModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule, LogoComponent, CommonModule, MatMenuModule, NotificationBannerComponent, HttpClientModule],
  template: `
  <async-loading-spinner *ngIf="loadingSpinnerService.isShowing()"></async-loading-spinner>
  <!-- THIS IS A TEMPORARY NOTIFICATION BANNER - FOR TRAILING EVENT -->
  <!-- <async-notification-banner></async-notification-banner> -->


   <mat-toolbar class="nav">
    <mat-toolbar-row>

    <span class="logo"><async-logo></async-logo></span>

    <span class="spacer"></span>

    <a class="view-on-desktop" color="primary" mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
    <a class="view-on-desktop" color="primary" mat-stroked-button routerLink="about-us" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">About Us</a>
    <a class="view-on-desktop" color="accent" mat-stroked-button routerLink="get-started" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Get Started</a>
    


    <!-- <span matTooltip="Whatsapp Us" (click)="lunchWhatsAppGroup()" class="fa fa-whatsapp"></span> -->

    <!-- light and dark theme toggle -->
    <i matTooltip="Toggle light to dark mode" class="fa fa-moon-o" (click)="toggleTheme()" *ngIf="!isDarkMode"></i>
    <i matTooltip="Toggle dark to light mode" class="fa fa-sun-o" (click)="toggleTheme()" *ngIf="isDarkMode"></i>

      <i class="fa fa-bars" (click)="toggleMobileNav()" id="toggle"></i>

    </mat-toolbar-row>



    <mat-toolbar-row class="mobile-nav" id="mobile-nav" *ngIf="showMobileNav">
      <a mat-button routerLink="/">Home</a>
      <a mat-stroked-button routerLink="about-us">About Us</a>
      <a mat-stroked-button routerLink="get-started">Get Started</a>
      
      <span class="spacer"></span>

    </mat-toolbar-row>


   </mat-toolbar>

  `,
  styleUrls: [`nav.component.scss`]
})
export class NavComponent implements OnInit, OnDestroy {
  // init subscriptions list
  subscriptions: Subscription[] = [];

  isDarkMode: boolean = false;
  showMobileNav = false;

  authenticated = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private themeTogglerService: ThemeTogglerService,
    public loadingSpinnerService: LoadingSpinnerService
  ) { }

  ngOnInit() {
    // listern to auth event emitter to check if user is signed in or not
    this.subscriptions.push(
      Emitters.authEmitter.subscribe(
        (auth: boolean) => {
          this.authenticated = auth;
        }
      )
    )

    const currentTheme = this.themeTogglerService.getTheme();
    this.themeTogglerService.setTheme(currentTheme);
  }


  toggleMobileNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  toggleTheme() {
    const currentTheme = this.themeTogglerService.getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    // toggle icon
    if (newTheme === 'dark') {
      this.isDarkMode = true;
    } else {
      this.isDarkMode = false;
    }
    this.themeTogglerService.setTheme(newTheme);
  }

  lunchWhatsAppGroup() {
    window.open('https://wa.me/message/BQ4PN6TYXNE5D1', '_blank');
  }



  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

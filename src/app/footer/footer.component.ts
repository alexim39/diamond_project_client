import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogoComponent } from '../_common/logo.component';
import { FooterContactComponent } from './footer.contact.component';
import { FooterConnectedComponent } from './footer.connected.component';
import { FooterIntroComponent } from './footer.intro.component';

@Component({
  selector: 'async-footer',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule, LogoComponent, FooterContactComponent, FooterConnectedComponent, FooterIntroComponent],
  template: `
   <footer>
    <article>
      <async-footer-intro></async-footer-intro>
      <async-footer-contact></async-footer-contact>
      <async-footer-connected></async-footer-connected>
    </article>

    <aside>
      <div class="courtesy">© {{ currentYear }} Diamond Project Online. All Rights Reserved</div>
      <div class="policies">
        <a href="#">T&C</a>
        <a href="#">Privacy</a>
        <a href="#">Cookies</a>
        <a href="#">Security</a>
      </div>
    </aside>
    
   </footer>
  `,
  styles: [`
    footer {
      background: #0e0e2c;
      text-align: center;
      
      article {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 4em 10em;
        text-align: left;
      }
      aside {
        color: #ccc;
        font-size: 0.6em;
        display: flex;
        justify-content: space-around;
        padding-bottom: 1em;
        .courtesy {
          color: white;
        }
        .policies {
          
          a {
            color: white;
            text-decoration: none;
            margin-left: 2em;
          }
        }
      }
      
    }


/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  footer {
    article {
      display: flex;
      flex-direction: column;
      padding: 1em;
    }
    aside {
      display: flex;
      flex-direction: column;
      .policies {
        margin-top: 1em;
      }
    }
  }
}

/* iPads/tablet (portrait and landscape) */
@media only screen and (min-device-width: 601px) and (max-device-width: 1024px) {
  footer {
    article {
      display: flex;
      flex-direction: column;
      padding: 1em;
      
    }
  }
}

`]
})
export class FooterComponent {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
  
}

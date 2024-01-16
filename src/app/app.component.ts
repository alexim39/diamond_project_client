import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
@Component({
  selector: 'async-root',
  standalone: true,
  imports: [ RouterModule,  FooterComponent, NavComponent],
  template: `
    <div id="container">

      

      <async-nav id="nav"></async-nav>

      <router-outlet id="outlet">
        <!-- <async-home></async-home> -->
      </router-outlet>

      <async-footer id="footer"></async-footer>
    </div>
  `,
  styles: [`
  #container {
    animation: fadeInAnimation ease 3s;
  }

  @keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
  }

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  #container {
    display:flex;
    flex-direction: column;
  }
}

  `]
})
export class AppComponent {}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@Component({
    selector: 'async-root',
    imports: [RouterModule, FooterComponent],
    template: `
    <div id="container">
      <router-outlet id="outlet"></router-outlet>
      <async-footer id="footer"></async-footer>
      <!-- <div class="whatsapp-chat">
        <a href="https://wa.link/xm8alj" target="_blank" class="whatsapp-button" aria-label="Chat on WhatsApp">
          <i class="fa fa-whatsapp"></i>
        </a>
        <div class="chat-tooltip">
          Chat with us on WhatsApp!
        </div>
      </div> -->
    </div>
  `,
    styles: [`
    #container {
      animation: fadeInAnimation ease 3s;
      position: relative;
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
        display: flex;
        flex-direction: column;
      }
    }

    /* WhatsApp Chat Button Styles */
    .whatsapp-chat {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }

    .whatsapp-button {
      background-color: #25D366;
      color: white;
      font-size: 24px;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      text-decoration: none;
    }

    .whatsapp-button:hover {
      transform: translateX(-10px);
    }

    .chat-tooltip {
      display: none;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      position: absolute;
      right: 70px;
      bottom: 20px;
      white-space: nowrap;
      transition: opacity 0.3s ease;
    }

    .whatsapp-chat:hover .chat-tooltip {
      display: block;
      opacity: 1;
    }

    .whatsapp-chat:hover .whatsapp-button {
      transform: translateX(-15px);
    }
  `]
})
export class AppComponent {}

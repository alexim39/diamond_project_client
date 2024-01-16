import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';


/**
 * @title Application top notifcation banner
 */
@Component({
  selector: 'async-notification-banner',
  standalone: true,
  imports: [ RouterModule],
  template: `
    <section>
        <p>Elevate your skills in Word, Excel, PowerPoint, Teams, and Outlook for maximum workplace productivity. <a routerLink="courses/details/64f1a27ce709366c3d55e247">JOIN LUNCH-TIME OFFICE TOOLS MASTERY SESSION NOW</a></p>
    </section>
  `,
  styles: [`
    section {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #00838F;
        color: white;
        font-family: ui-rounded;
        padding-left: 1em;
        padding-right: 1em;
        a {
            text-decoration: none;
            color: white; 
            font-size: 1em;   
            color: yellow;  
            /* color: #ffab40;  */ 
            font-weight: bolder;    
        }
    }
  `]
})
export class NotificationBannerComponent {}
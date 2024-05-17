import { Routes } from "@angular/router";
import {EbooksComponent} from './ebooks.component';

export const ebooksRoutes: Routes = [
    /* {
        path: '',
        redirectTo: 'home'
    }, */
    { 
        path: '', 
        //component: IndexComponent, 

        children: [
            { path: '', 
                component: EbooksComponent, 
                title: "eBooks - eBooks resources for diamond project",
            },
           /*  { path: 'testimonials', 
                component: TestimonialsComponent, 
                title: "Members Testimonials - See members testimonies"
            }, */
           /*  { path: 'connected-economy', 
                component: ConnectedEconomyComponent, 
                title: "Connected Economy - See more members testimonies"
            }, */
           /*  { path: 'get-involved', 
                component: GettingInvolvedComponent, 
                title: "Project Summary - Get involved as a member"
            }, */

        ]
    },

]

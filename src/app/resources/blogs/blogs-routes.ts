import { Routes } from "@angular/router";
import {BlogsComponent} from './blogs.component';

export const blogsRoutes: Routes = [
    /* {
        path: '',
        redirectTo: 'home'
    }, */
    { 
        path: '', 
        //component: IndexComponent, 

        children: [
            { path: '', 
                component: BlogsComponent, 
                title: "Blogs - Blogs resources for diamond project",
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

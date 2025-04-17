import { Routes } from "@angular/router";
import { GetStartedComponent } from "./get-started.component";

export const getStartedRoutes: Routes = [
    /* {
        path: '',
        redirectTo: 'home'
    }, */
    { 
        path: '', 
        //component: IndexComponent, 

        children: [
            { path: '', 
                component: GetStartedComponent, 
                title: "Diamond Project Online - Get trained to get financially free",
            },
           /*  { path: 'testimonials', 
                component: TestimonialsComponent, 
                title: "Members Testimonials - See members testimonies"
            }, */
        ]
    },

]

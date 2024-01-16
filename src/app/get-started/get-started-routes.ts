import { Routes } from "@angular/router";
import { GetStartedComponent } from "./get-started.component";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
import { ConnectedEconomyComponent } from "./connected-economy/connected-economy.component";
import { GettingInvolvedComponent } from "./getting-involved/getting-involved.component";

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
            { path: 'testimonials', 
                component: TestimonialsComponent, 
                title: "Members Testimonials - See members testimonies"
            },
            { path: 'connected-economy', 
                component: ConnectedEconomyComponent, 
                title: "Connected Economy - See more members testimonies"
            },
            { path: 'get-involved', 
                component: GettingInvolvedComponent, 
                title: "Project Summary - Get involved as a member"
            },

        ]
    },

]

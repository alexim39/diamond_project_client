import { Routes } from "@angular/router";
import { PartnersContainerComponent } from "./partners-container.component";
/* import {BlogsComponent} from './blogs.component';
import { BlogDetailComponent } from "./detail/blog-detail.component"; */

export const partnersRoutes: Routes = [
    { 
        path: '', 
        //component: IndexComponent, 

        children: [
            { path: '', 
                component: PartnersContainerComponent, 
                title: "Partner - Welcome to Diamond Project Online partner page",
            },
           /*  {
                path: ':url',
                component: BlogDetailComponent,
                title: "Blog Detail"
            } */

        ]
    },

]

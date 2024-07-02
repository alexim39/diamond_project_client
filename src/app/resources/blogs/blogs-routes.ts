import { Routes } from "@angular/router";
import {BlogsComponent} from './blogs.component';
import { BlogDetailComponent } from "./detail/blog-detail.component";

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
            {
                path: ':url',
                component: BlogDetailComponent,
                title: "Blog Detail"
            }

        ]
    },

]

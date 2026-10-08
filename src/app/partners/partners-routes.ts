import { Routes } from "@angular/router";
import { PartnersContainerComponent } from "./partners-container.component";
import { PageNotFoundComponent } from './../page-not-found.component';

export const partnersRoutes: Routes = [
    {
        path: '',

        children: [
            { path: '',
                component: PartnersContainerComponent,
                title: "Partner - Welcome to Diamond Project Online partner page",
            },

        ]
    },
    // should be the last path on routes
  {path: '**', component: PageNotFoundComponent}

]

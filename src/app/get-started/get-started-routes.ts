import { Routes } from "@angular/router";
import { GetStartedComponent } from "./get-started.component";

export const getStartedRoutes: Routes = [
    {
        path: '',
        children: [
            { path: '',
                component: GetStartedComponent,
                title: "Diamond Project Online - Get trained to get financially free",
            },
            { path: '**', redirectTo: '' },
        ]
    },

]

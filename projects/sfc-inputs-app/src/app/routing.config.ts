import { Route, Routes } from "@angular/router";
import {
    TextAreaPresentationComponent,
    TextPresentationComponent
} from "../presentations";

const indexRoute: Route = {
    path: "",
    pathMatch: 'full',
    redirectTo: 'text'
};

const fallbackRoute: Route = {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'text'
};

export const routes: Routes = [
    {
        path: 'text',
        component: TextPresentationComponent
    },
    {
        path: 'textarea',
        component: TextAreaPresentationComponent
    },
    fallbackRoute,
    indexRoute
];
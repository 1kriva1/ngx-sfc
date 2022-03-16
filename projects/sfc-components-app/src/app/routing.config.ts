import { Route, Routes } from "@angular/router";
import {
    ButtonsBorderedPresentationComponent,
    ButtonsPresentationComponent,
    ButtonsFilledPresentationComponent,
    ButtonsTextedPresentationComponent,
    ButtonsRoundedPresentationComponent,
    ButtonsCircledPresentationComponent,
    ButtonsRoundedFilledPresentationComponent
} from "../presentations";

const indexRoute: Route = {
    path: "",
    pathMatch: 'full',
    redirectTo: 'buttons'
};

const fallbackRoute: Route = {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'buttons'
};

export const routes: Routes = [
    {
        path: 'buttons',
        component: ButtonsPresentationComponent,
        children: [
            {
                path: 'bordered',
                component: ButtonsBorderedPresentationComponent
            },
            {
                path: 'filled',
                component: ButtonsFilledPresentationComponent
            },
            {
                path: 'texted',
                component: ButtonsTextedPresentationComponent
            },
            {
                path: 'rounded',
                component: ButtonsRoundedPresentationComponent
            },
            {
                path: 'circled',
                component: ButtonsCircledPresentationComponent
            },
            {
                path: 'rounded-filled',
                component: ButtonsRoundedFilledPresentationComponent
            },
            {
                path: '',
                component: ButtonsBorderedPresentationComponent
            },
            {
                path: '**',
                component: ButtonsBorderedPresentationComponent
            }
        ]
    },
    fallbackRoute,
    indexRoute
];
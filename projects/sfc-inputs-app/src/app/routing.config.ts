import { Route, Routes } from "@angular/router";
import {
    FileInputPresentationComponent,
    FilePresentationComponent,
    InlineFileInputPresentationComponent,
    TextAreaPresentationComponent,
    TextPresentationComponent,
    CheckboxPresentationComponent,
    TogglePresentationComponent,
    TagsPresentationComponent
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
    {
        path: 'file',
        component: FilePresentationComponent,
        children: [
            {
                path: 'input',
                component: FileInputPresentationComponent
            },
            {
                path: 'inline',
                component: InlineFileInputPresentationComponent
            },
            {
                path: '',
                component: FileInputPresentationComponent
            },
            {
                path: '**',
                component: FileInputPresentationComponent
            }
        ]
    },
    {
        path: 'checkbox',
        component: CheckboxPresentationComponent
    },
    {
        path: 'toggle',
        component: TogglePresentationComponent
    },
    {
        path: 'tags',
        component: TagsPresentationComponent
    },
    fallbackRoute,
    indexRoute
];
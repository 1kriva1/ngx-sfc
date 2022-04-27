import { Route, Routes } from "@angular/router";
import {
    ButtonsBorderedPresentationComponent,
    ButtonsPresentationComponent,
    ButtonsFilledPresentationComponent,
    ButtonsTextedPresentationComponent,
    ButtonsRoundedPresentationComponent,
    ButtonsCircledPresentationComponent,
    ButtonsRoundedFilledPresentationComponent,
    TooltipsPresentationComponent,
    LoadersPresentationComponent,
    LoadersBouncePresentationComponent,
    LoadersCirclePresentationComponent,
    LoadersCircleFadingPresentationComponent,
    ModalsPresentationComponent,
    TabsPresentationComponent,
    ToggleSwitchersPresentationComponent,
    TabsLinePresentationComponent,
    TabsIconPresentationComponent,
    MenusPresentationComponent,
    MenusSidePresentationComponent,
    MenusDropdownPresentationComponent,
    MenusNavigationPresentationComponent,
    StarsPresentationComponent,
    AvatarsPresentationComponent,
    ProgressPresentationComponent,
    ProgressLinePresentationComponent,
    ProgressCirclePresentationComponent,
    ProgressSemiCirclePresentationComponent,
    TagsPresentationComponent,
    SlidersPresentationComponent
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
    {
        path: 'tooltips',
        component: TooltipsPresentationComponent
    },
    {
        path: 'loaders',
        component: LoadersPresentationComponent,
        children: [
            {
                path: 'bounce',
                component: LoadersBouncePresentationComponent
            },
            {
                path: 'circle',
                component: LoadersCirclePresentationComponent
            },
            {
                path: 'circle-fading',
                component: LoadersCircleFadingPresentationComponent
            },
            {
                path: '',
                component: LoadersBouncePresentationComponent
            },
            {
                path: '**',
                component: LoadersBouncePresentationComponent
            }
        ]
    },
    {
        path: 'modals',
        component: ModalsPresentationComponent
    },
    {
        path: 'toggle-switchers',
        component: ToggleSwitchersPresentationComponent
    },
    {
        path: 'tabs',
        component: TabsPresentationComponent,
        children: [
            {
                path: 'line',
                component: TabsLinePresentationComponent
            },
            {
                path: 'icon',
                component: TabsIconPresentationComponent
            },
            {
                path: '',
                component: TabsLinePresentationComponent
            },
            {
                path: '**',
                component: TabsLinePresentationComponent
            }
        ]
    },
    {
        path: 'menus',
        component: MenusPresentationComponent,
        children: [
            {
                path: 'side',
                component: MenusSidePresentationComponent
            },
            {
                path: 'dropdown',
                component: MenusDropdownPresentationComponent
            },
            {
                path: 'navigation',
                component: MenusNavigationPresentationComponent
            },
            {
                path: '',
                component: MenusSidePresentationComponent
            },
            {
                path: '**',
                component: MenusSidePresentationComponent
            }
        ]
    },
    {
        path: 'stars',
        component: StarsPresentationComponent
    },
    {
        path: 'avatars',
        component: AvatarsPresentationComponent
    },
    {
        path: 'progress',
        component: ProgressPresentationComponent,
        children: [
            {
                path: 'line',
                component: ProgressLinePresentationComponent
            },
            {
                path: 'circle',
                component: ProgressCirclePresentationComponent
            },
            {
                path: 'semi-circle',
                component: ProgressSemiCirclePresentationComponent
            },
            {
                path: '',
                component: ProgressLinePresentationComponent
            },
            {
                path: '**',
                component: ProgressLinePresentationComponent
            }
        ]
    },
    {
        path: 'tags',
        component: TagsPresentationComponent
    },
    {
        path: 'sliders',
        component: SlidersPresentationComponent
    },
    fallbackRoute,
    indexRoute
];
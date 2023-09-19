import { Route, Routes } from "@angular/router";
import {
    FileInputPresentationComponent,
    FilePresentationComponent,
    InlineFileInputPresentationComponent,
    TextAreaPresentationComponent,
    TextPresentationComponent,
    CheckboxPresentationComponent,
    TogglePresentationComponent,
    TagsPresentationComponent,
    NumberPresentationComponent,
    StarsPresentationComponent,
    DateTimePresentationComponent,
    DateInputPresentationComponent,
    TimeInputPresentationComponent,
    DateTimeInputPresentationComponent,
    YearsInputPresentationComponent,
    ImagePresentationComponent,
    RangePresentationComponent,
    HorizontalRangePresentationComponent,
    VerticalRangePresentationComponent,
    RadioPresentationComponent,
    HorizontalRadioPresentationComponent,
    VerticalRadioPresentationComponent,
    AutoCompletePresentationComponent,
    SelectPresentationComponent,
    CommonSelectPresentationComponent,
    MultipleSelectPresentationComponent,
    GroupSelectPresentationComponent,
    CommonTextPresentationComponent,
    BorderedTextPresentationComponent,
    CommonTextAreaPresentationComponent,
    BorderedTextAreaPresentationComponent,
    CommonFileInputPresentationComponent,
    BorderedFileInputPresentationComponent,
    CommonTagsPresentationComponent,
    BorderedTagsPresentationComponent,
    CommonNumberPresentationComponent,
    EditNumberPresentationComponent,
    BorderedDateTimeInputPresentationComponent,
    CommonAutoCompletePresentationComponent,
    BorderedAutoCompletePresentationComponent,
    BorderedCommonSelectPresentationComponent
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
        component: TextPresentationComponent,
        children: [
            {
                path: 'common',
                component: CommonTextPresentationComponent
            },
            {
                path: 'bordered',
                component: BorderedTextPresentationComponent
            },
            {
                path: '',
                component: CommonTextPresentationComponent
            },
            {
                path: '**',
                component: CommonTextPresentationComponent
            }
        ]
    },
    {
        path: 'textarea',
        component: TextAreaPresentationComponent,
        children: [
            {
                path: 'common',
                component: CommonTextAreaPresentationComponent
            },
            {
                path: 'bordered',
                component: BorderedTextAreaPresentationComponent
            },
            {
                path: '',
                component: CommonTextAreaPresentationComponent
            },
            {
                path: '**',
                component: CommonTextAreaPresentationComponent
            }
        ]
    },
    {
        path: 'file',
        component: FilePresentationComponent,
        children: [
            {
                path: 'input',
                component: FileInputPresentationComponent,
                children: [
                    {
                        path: 'common',
                        component: CommonFileInputPresentationComponent
                    },
                    {
                        path: 'bordered',
                        component: BorderedFileInputPresentationComponent
                    },
                    {
                        path: '',
                        component: CommonFileInputPresentationComponent
                    },
                    {
                        path: '**',
                        component: CommonFileInputPresentationComponent
                    }
                ]
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
        component: TagsPresentationComponent,
        children: [
            {
                path: 'common',
                component: CommonTagsPresentationComponent
            },
            {
                path: 'bordered',
                component: BorderedTagsPresentationComponent
            },
            {
                path: '',
                component: CommonTagsPresentationComponent
            },
            {
                path: '**',
                component: CommonTagsPresentationComponent
            }
        ]
    },
    {
        path: 'number',
        component: NumberPresentationComponent,
        children: [
            {
                path: 'common',
                component: CommonNumberPresentationComponent
            },
            {
                path: 'edit',
                component: EditNumberPresentationComponent
            },
            {
                path: '',
                component: CommonNumberPresentationComponent
            },
            {
                path: '**',
                component: CommonNumberPresentationComponent
            }
        ]
    },
    {
        path: 'stars',
        component: StarsPresentationComponent
    },
    {
        path: 'datetime',
        component: DateTimePresentationComponent,
        children: [
            {
                path: 'date',
                component: DateInputPresentationComponent
            },
            {
                path: 'time',
                component: TimeInputPresentationComponent
            },
            {
                path: 'datetime',
                component: DateTimeInputPresentationComponent
            },
            {
                path: 'years',
                component: YearsInputPresentationComponent
            },
            {
                path: 'bordered',
                component: BorderedDateTimeInputPresentationComponent
            },
            {
                path: '',
                component: DateInputPresentationComponent
            },
            {
                path: '**',
                component: DateInputPresentationComponent
            }
        ]
    },
    {
        path: 'image',
        component: ImagePresentationComponent
    },
    {
        path: 'range',
        component: RangePresentationComponent,
        children: [
            {
                path: 'horizontal',
                component: HorizontalRangePresentationComponent
            },
            {
                path: 'vertical',
                component: VerticalRangePresentationComponent
            },
            {
                path: '',
                component: HorizontalRangePresentationComponent
            },
            {
                path: '**',
                component: HorizontalRangePresentationComponent
            }
        ]
    },
    {
        path: 'radio',
        component: RadioPresentationComponent,
        children: [
            {
                path: 'horizontal',
                component: HorizontalRadioPresentationComponent
            },
            {
                path: 'vertical',
                component: VerticalRadioPresentationComponent
            },
            {
                path: '',
                component: VerticalRadioPresentationComponent
            },
            {
                path: '**',
                component: VerticalRadioPresentationComponent
            }
        ]
    },
    {
        path: 'autocomplete',
        component: AutoCompletePresentationComponent,
        children: [
            {
                path: 'common',
                component: CommonAutoCompletePresentationComponent
            },
            {
                path: 'bordered',
                component: BorderedAutoCompletePresentationComponent
            },
            {
                path: '',
                component: CommonSelectPresentationComponent
            },
            {
                path: '**',
                component: CommonSelectPresentationComponent
            }
        ]
    },
    {
        path: 'select',
        component: SelectPresentationComponent,
        children: [
            {
                path: 'common',
                component: CommonSelectPresentationComponent
            },
            {
                path: 'bordered',
                component: BorderedCommonSelectPresentationComponent
            },
            {
                path: 'multiple',
                component: MultipleSelectPresentationComponent
            },
            {
                path: 'group',
                component: GroupSelectPresentationComponent
            },
            {
                path: '',
                component: CommonSelectPresentationComponent
            },
            {
                path: '**',
                component: CommonSelectPresentationComponent
            }
        ]
    },
    fallbackRoute,
    indexRoute
];
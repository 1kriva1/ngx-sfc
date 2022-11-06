import { Component, OnInit } from '@angular/core';
import { faAdjust, faMicrochip, faSubscript, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { equalOrInclude, IRadioItemModel } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../../base-presentations.component';

@Component({
  templateUrl: './radio-vertical-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class VerticalRadioPresentationComponent extends BasePresentationComponent
  implements OnInit {

  items: IRadioItemModel[] = [
    {
      value: 1,
      label: "option asdasdasdasd 1"
    },
    {
      value: 2,
      label: "option 2"
    },
    {
      value: 3,
      label: "option 3"
    },
    {
      value: 4,
      label: "option aaa 4"
    }
  ];

  itemsIcons: IRadioItemModel[] = [
    {
      value: 1,
      label: "option 1",
      icon: faSubscript
    },
    {
      value: 2,
      label: "option 2",
      icon: faMicrochip
    },
    {
      value: 3,
      label: "option 3",
      icon: faAdjust
    },
    {
      value: 4,
      label: "option 4",
      icon: faUserCog
    }
  ];

  itemsMix: IRadioItemModel[] = [
    {
      value: 1,
      label: "option 1"
    },
    {
      value: 2,
      label: "option 2",
      icon: faMicrochip
    },
    {
      value: 3,
      label: "option 3",
      icon: faAdjust
    },
    {
      value: 4,
      label: "option 4"
    }
  ];

  itemsDisabled: IRadioItemModel[] = [
    {
      value: 1,
      label: "option 1",
      disabled: true
    },
    {
      value: 2,
      label: "option 2"
    },
    {
      value: 3,
      label: "option 3",
      disabled: true
    },
    {
      value: 4,
      label: "option 4"
    }
  ];

  itemsMixDisabled: IRadioItemModel[] = [
    {
      value: 1,
      label: "option 1",
      disabled: true
    },
    {
      value: 2,
      label: "option 2",
      icon: faMicrochip
    },
    {
      value: 3,
      label: "option 3",
      disabled: true,
      icon: faAdjust
    },
    {
      value: 4,
      label: "option 4"
    }
  ];

  itemsDefault: IRadioItemModel[] = [
    {
      value: 1,
      label: "option 1",
      default: false
    },
    {
      value: 2,
      label: "option 2"
    },
    {
      value: 3,
      label: "option 3",
      default: true
    },
    {
      value: 4,
      label: "option 4"
    }
  ];

  itemsMixDefault: IRadioItemModel[] = [
    {
      value: 1,
      label: "option 1",
      disabled: true
    },
    {
      value: 2,
      label: "option 2",
      icon: faMicrochip
    },
    {
      value: 3,
      label: "option 3",
      icon: faAdjust,
      disabled: true
    },
    {
      value: 4,
      label: "option 4"
    }
  ];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        inputRadioNull: [null],
        inputRadioWithIcon: [3],
        inputRadioWithIconHelper: [null],
        inputRadioNullDisabled: [{
          value: 2,
          disabled: true
        }, []],
        inputRadioWithIconDisabled: [{
          value: 4,
          disabled: true
        }, []],
        inputRadioWithIconHelperDisabled: [{
          value: null,
          disabled: true
        }, []],
        inputRadioNullIcons: [null],
        inputRadioWithIconIcons: [2],
        inputRadioWithIconHelperIcons: [null],
        inputRadioNullMix: [null],
        inputRadioWithIconMix: [4],
        inputRadioWithIconHelperMix: [null],
        inputRadioNullMixDisabled: [{
          value: 2,
          disabled: true
        }, []],
        inputRadioWithIconMixDisabled: [{
          value: 3,
          disabled: true
        }, []],
        inputRadioWithIconHelperMixDisabled: [{
          value: null,
          disabled: true
        }, []],
        inputRadioItemDisabled: [null],
        inputRadioIconItemDisabled: [null],
        inputRadioItemValueDisabled: [3],
        inputRadioMixItemDisabled: [null],
        inputRadioMixIconItemDisabled: [null],
        inputRadioMixItemValueDisabled: [3],
        inputRadioItemDefault: [null],
        inputRadioItemDefaultValue: [2],
        inputRadioItemDefaultValueIcon: [3],
        inputRadioValidation: [null, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioValueValidValidation: [2, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioValueInvalidValidation: [3, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioValidationCustomMessage: [null, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioValueValidValidationCustomMessage: [2, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioValueInvalidValidationCustomMessage: [3, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioSmall: [4],
        inputRadioLarge: [4],
        inputRadioCustom: [4]
      }
    );
  }
}

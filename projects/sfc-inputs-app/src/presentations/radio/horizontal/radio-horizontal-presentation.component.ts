import { Component, OnInit } from '@angular/core';
import { faAdjust, faMicrochip, faSubscript, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { Direction } from 'ngx-sfc-common';
import { equalOrInclude, IRadioItemModel } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../../base-presentations.component';

@Component({
  templateUrl: './radio-horizontal-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class HorizontalRadioPresentationComponent extends BasePresentationComponent
  implements OnInit {

  Direction = Direction;

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
        inputRadioHorizontal: [null],
        inputRadioHorizontalIcon: [4],
        inputRadioHorizontalIconHelper: [null],
        inputRadioHorizontalDisabled: [{
          value: 2,
          disabled: true
        }, []],
        inputRadioHorizontalIconDisabled: [{
          value: 3,
          disabled: true
        }, []],
        inputRadioHorizontalIconHelperDisabled: [{
          value: null,
          disabled: true
        }, []],
        inputRadioHorizontalNullIcons: [1],
        inputRadioHorizontalWithIconIcons: [null],
        inputRadioHorizontalIconHelperIcons: [3],
        inputRadioHorizontalNullMix: [1],
        inputRadioHorizontalWithIconMix: [null],
        inputRadioHorizontalWithIconHelperMix: [3],
        inputRadioHorizontalNullMixDisabled: [{
          value: 2,
          disabled: true
        }, []],
        inputRadioHorizontalWithIconMixDisabled: [{
          value: 3,
          disabled: true
        }, []],
        inputRadioHorizontalWithIconHelperMixDisabled: [{
          value: null,
          disabled: true
        }, []],
        inputRadioHorizontalItemDisabled: [null],
        inputRadioHorizontalIconItemDisabled: [null],
        inputRadioHorizontalItemValueDisabled: [3],
        inputRadioHorizontalMixItemDisabled: [null],
        inputRadioHorizontalMixItemValueDisabled: [3],
        inputRadioHorizontalItemDefault: [null],
        inputRadioHorizontalItemDefaultValue: [2],
        inputRadioHorizontalItemDefaultValueIcon: [3],
        inputRadioHorizontalValidation: [null, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioHorizontalValueValidValidation: [2, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioHorizontalValueInvalidValidation: [3, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioHorizontalValidationCustomMessage: [null, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioHorizontalValueValidValidationCustomMessage: [2, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioHorizontalValueInvalidValidationCustomMessage: [3, {
          validators: [equalOrInclude(2)]
        }],
        inputRadioHorizontalSmall: [4],
        inputRadioHorizontalLarge: [4],
        inputRadioHorizontalCustom: [4]
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { equalOrInclude, maxArrayLength, IBubbleModel } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../base-presentations.component';

@Component({
  templateUrl: './bubbles-presentation.component.html',
  styleUrls: ['../../shared/styles/shared.component.scss']
})
export class BubblesPresentationComponent extends BasePresentationComponent
  implements OnInit {

  faStar = faStar;

  items: IBubbleModel[] = [
    {
      key: 0,
      icon: faStar,
      label: 'Monday'
    },
    {
      key: 1,
      imageSrc: '../assets/argentina_messi.png',
      label: 'Tuesday'
    },
    {
      key: 2,
      label: 'Wednesday'
    },
    {
      key: 3,
      label: 'Thursday'
    },
    {
      key: 4,
      label: 'Friday'
    },
    {
      key: 5,
      label: 'Saturday'
    },
    {
      key: 6,
      label: 'Sunday'
    }
  ];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        inputBubblesNull: [null],
        inputBubblesLabel: [null],
        inputBubblesEmpty: [null],
        inputBubblesIcon: [null],
        inputBubblesLabelIcon: [null],
        inputBubblesHelperText: [null],
        inputBubblesLabelIconHelperText: [null],
        inputBubblesDisabled: [{
          value: [null],
          disabled: true
        }],
        inputBubblesValue: [[0, 2, 4]],
        inputBubblesValueDisabled: [{
          value: [0, 3],
          disabled: true
        }],
        inputBubblesOneItem: [null],
        inputBubblesTwoItem: [[0, 1]],
        inputBubblesValidation: [null, {
          validators: [equalOrInclude(5)]
        }],
        inputBubblesValidationValue: [[0, 1, 2, 3], {
          validators: [maxArrayLength(4)]
        }],
        inputBubblesValidationMessage: [[3], {
          validators: [equalOrInclude(5)]
        }],
        inputBubblesSmall: [[0, 4]],
        inputBubblesLarge: [[0, 4]],
        inputBubblesCustom: [[0, 4]]
      }
    );
  }
}

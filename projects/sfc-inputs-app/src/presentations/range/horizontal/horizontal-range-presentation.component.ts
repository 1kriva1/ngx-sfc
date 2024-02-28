import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { equalOrInclude } from 'ngx-sfc-inputs';
import { BasePresentationComponent } from '../../base-presentations.component';

@Component({
    templateUrl: './horizontal-range-presentation.component.html',
    styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class HorizontalRangePresentationComponent extends BasePresentationComponent implements OnInit {

    faPlus = faPlus;
    faMinus = faMinus;

    ngOnInit(): void {
        this.formGroup = this.formBuilder.group(
            {
                inputRangeNull: [null],
                inputRangeLabel: [null],
                inputRangeIcon: [null],
                inputRangeHelper: [null],
                inputRangeLabelIcon: [null],
                inputRangeLabelIconHelper: [null],

                inputRangeNullLimits: [null],
                inputRangeLabelLimits: [null],
                inputRangeIconLimits: [null],
                inputRangeHelperLimits: [null],
                inputRangeLabelIconLimits: [null],
                inputRangeLabelIconHelperLimits: [null],

                inputRangeNullLimitIcons: [null],
                inputRangeLabelLimitIcons: [null],
                inputRangeIconLimitIcons: [null],
                inputRangeHelperLimitIcons: [null],
                inputRangeLabelIconLimitIcons: [null],
                inputRangeLabelIconHelperLimitIcons: [null],

                inputRangeNullShowValue: [7],
                inputRangeLabelShowValue: [1],
                inputRangeIconShowValue: [99],
                inputRangeHelperShowValue: [51],
                inputRangeLabelIconShowValue: [43],
                inputRangeLabelIconHelperShowValue: [77],

                inputRangeHelperWithoutTooltip: [10],
                inputRangeLabelIconWithoutTooltip: [21],
                inputRangeLabelIconHelperWithoutTooltip: [44],

                inputRangeNullDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputRangeLabelDisabled: [{
                    value: 44,
                    disabled: true
                }],
                inputRangeIconDisabled: [{
                    value: 17,
                    disabled: true
                }],
                inputRangeHelperDisabled: [{
                    value: {from:10, to:57},
                    disabled: true
                }],
                inputRangeLabelIconDisabled: [{
                    value: 99,
                    disabled: true
                }],
                inputRangeLabelIconHelperDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputRangeNullValidation: [null, {
                    validators: [Validators.max(10)]
                }],
                inputRangeLabelValidation: [null, {
                    validators: [Validators.min(20)]
                }],
                inputRangeIconValidation: [null, {
                    validators: [equalOrInclude(12)]
                }],
                inputRangeHelperValidation: [null, {
                    validators: [equalOrInclude(100)]
                }],
                inputRangeLabelIconValidation: [null, {
                    validators: [equalOrInclude(1)]
                }],
                inputRangeLabelIconHelperValidation: [null, {
                    validators: [Validators.min(100)]
                }],
                inputRangeNullValidationMessage: [12, {
                    validators: [Validators.max(10)]
                }],
                inputRangeLabelValidationMessage: [21, {
                    validators: [Validators.min(20)]
                }],
                inputRangeIconValidationMessage: [null, {
                    validators: [equalOrInclude(12)]
                }],
                inputRangeHelperValidationMessage: [100, {
                    validators: [equalOrInclude(100)]
                }],
                inputRangeLabelIconValidationMessage: [2, {
                    validators: [equalOrInclude(1)]
                }],
                inputRangeLabelIconHelperValidationMessage: [null, {
                    validators: [Validators.min(100)]
                }],
                inputRangeSmall: [10],
                inputRangeLarge: [60],
                inputRangeCustom: [90],
                inputRangeMultipleSmall: [{from:10, to:57}],
                inputRangeMultipleLarge: [{from:0, to:99}],
                inputRangeMultipleCustom: [{from:90, to:91}]
            }
        );
    }
}
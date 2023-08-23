import { TestBed } from "@angular/core/testing";
import { FormBuilder, FormControl, FormGroup, UntypedFormControl } from "@angular/forms";
import { equalOrInclude, match, maxArrayLength, minArrayLength } from "./common.validators";

describe('Validations', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: []
        }).compileComponents();
    });

    describe('Common', () => {
        describe('EqualOrInclude', () => {
            describe('Primitive', () => {
                fit('Should be invalid', () => {
                    const testValue = 1,
                        includes = 3,
                        validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue)),
                        expectedResult = { 'sfc-equal-or-include': true };
                    expect(validationResult).toEqual(expectedResult);
                });

                fit('Should be valid', () => {
                    const testValue = 3,
                        includes = 3,
                        validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue));
                    expect(validationResult).toBeNull();
                });
            });

            describe('Object', () => {
                fit('Should be invalid', () => {
                    const testValue = { key: 1, groupKey: 1 },
                        includes = { key: 1, groupKey: 2 },
                        validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue)),
                        expectedResult = { 'sfc-equal-or-include': true };
                    expect(validationResult).toEqual(expectedResult);
                });

                fit('Should be valid', () => {
                    const testValue = { key: 1, groupKey: 2 },
                        includes = { key: 1, groupKey: 2 },
                        validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue));
                    expect(validationResult).toBeNull();
                });
            });

            describe('Array', () => {
                describe('Primitive', () => {
                    fit('Should be invalid', () => {
                        const testValue = 2,
                            includes = [3, 1],
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue)),
                            expectedResult = { 'sfc-equal-or-include': true };
                        expect(validationResult).toEqual(expectedResult);
                    });

                    fit('Should be valid', () => {
                        const testValue = 1,
                            includes = [3, 1],
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue));
                        expect(validationResult).toBeNull();
                    });

                    fit('Should be invalid for multiple', () => {
                        const testValue = [1, 2],
                            includes = [2, 3],
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue)),
                            expectedResult = { 'sfc-equal-or-include': true };
                        expect(validationResult).toEqual(expectedResult);
                    });

                    fit('Should be valid for multiple', () => {
                        const testValue = [3, 2],
                            includes = [2, 3],
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue));
                        expect(validationResult).toBeNull();
                    });

                    fit('Should be invalid for not multiple', () => {
                        const testValue = [1, 2],
                            includes = 3,
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue)),
                            expectedResult = { 'sfc-equal-or-include': true };
                        expect(validationResult).toEqual(expectedResult);
                    });

                    fit('Should be valid for not multiple', () => {
                        const testValue = [1, 2],
                            includes = 2,
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue));
                        expect(validationResult).toBeNull();
                    });
                });

                describe('Object', () => {
                    fit('Should be invalid', () => {
                        const testValue = { key: 2, groupKey: 1 },
                            includes = [{ key: 1, groupKey: 2 }, { key: 1, groupKey: 1 }],
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue)),
                            expectedResult = { 'sfc-equal-or-include': true };
                        expect(validationResult).toEqual(expectedResult);
                    });

                    fit('Should be valid', () => {
                        const testValue = { key: 1, groupKey: 1 },
                            includes = [{ key: 1, groupKey: 2 }, { key: 1, groupKey: 1 }],
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue));
                        expect(validationResult).toBeNull();
                    });

                    fit('Should be invalid for multiple', () => {
                        const testValue = [{ key: 1, groupKey: 1 }, { key: 1, groupKey: 2 }],
                            includes = [{ key: 2, groupKey: 1 }, { key: 2, groupKey: 2 }],
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue)),
                            expectedResult = { 'sfc-equal-or-include': true };
                        expect(validationResult).toEqual(expectedResult);
                    });

                    fit('Should be valid for multiple', () => {
                        const testValue = [{ key: 2, groupKey: 1 }, { key: 2, groupKey: 2 }],
                            includes = [{ key: 2, groupKey: 1 }, { key: 2, groupKey: 2 }],
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue));
                        expect(validationResult).toBeNull();
                    });

                    fit('Should be invalid for not multiple', () => {
                        const testValue = [{ key: 1, groupKey: 1 }, { key: 1, groupKey: 2 }],
                            includes = { key: 2, groupKey: 1 },
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue)),
                            expectedResult = { 'sfc-equal-or-include': true };
                        expect(validationResult).toEqual(expectedResult);
                    });

                    fit('Should be valid for not multiple', () => {
                        const testValue = [{ key: 1, groupKey: 1 }, { key: 1, groupKey: 2 }],
                            includes = { key: 1, groupKey: 1 },
                            validationResult = equalOrInclude(includes)(new UntypedFormControl(testValue));
                        expect(validationResult).toBeNull();
                    });
                });
            });
        });

        describe('MaxLength', () => {
            fit('Should be invalid', () => {
                const value = ['test1', 'test2', 'test3'],
                    validationResult = maxArrayLength(2)(new UntypedFormControl(value)),
                    expectedResult = { 'sfc-max-array-length': { requiredLength: 2, actualLength: 3, value: value } };
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid', () => {
                const value = ['test1', 'test2'],
                    validationResult = maxArrayLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });

            fit('Should be valid, when value is null', () => {
                const value = null,
                    validationResult = maxArrayLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });

            fit('Should be valid, when value is not array', () => {
                const value = 'test',
                    validationResult = maxArrayLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });
        });

        describe('MinLength', () => {
            fit('Should be invalid', () => {
                const value = ['test1', 'test2', 'test3'],
                    validationResult = minArrayLength(4)(new UntypedFormControl(value)),
                    expectedResult = { 'sfc-min-array-length': { requiredLength: 4, actualLength: 3, value: value } };
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid', () => {
                const value = ['test1', 'test2'],
                    validationResult = minArrayLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });

            fit('Should be valid, when value is null', () => {
                const value = null,
                    validationResult = minArrayLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });

            fit('Should be valid, when value is not array', () => {
                const value = 1,
                    validationResult = minArrayLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });
        });

        describe('Match', () => {
            fit('Should be invalid', () => {
                const fb: FormBuilder = new FormBuilder(),
                    formGroup: FormGroup<any> = fb.group({
                        password: new FormControl(null),
                        confirmPassword: new FormControl(null, [match('password', false)]),
                    });

                formGroup.setValue({ password: '123', confirmPassword: '12' });

                expect(formGroup.get('confirmPassword')?.errors).toEqual({ 'sfc-match': true });
            });

            fit('Should be invalid when parent group not exist', () => {
                const validationResult = match('password')(new UntypedFormControl('123'))

                expect(validationResult).toEqual({ 'sfc-match': true });
            });

            fit('Should be valid when reversed', () => {
                const fb: FormBuilder = new FormBuilder(),
                    formGroup: FormGroup<any> = fb.group({
                        password: new FormControl(null),
                        confirmPassword: new FormControl(null, [match('password', true)]),
                    });

                formGroup.setValue({ password: '123', confirmPassword: '12' });

                expect(formGroup.get('confirmPassword')?.errors).toBeNull();
            });

            fit('Should be valid when values match', () => {
                const fb: FormBuilder = new FormBuilder(),
                    formGroup: FormGroup<any> = fb.group({
                        password: new FormControl(null),
                        confirmPassword: new FormControl(null, [match('password', false)]),
                    });

                formGroup.setValue({ password: '123', confirmPassword: '123' });

                expect(formGroup.get('confirmPassword')?.errors).toBeNull();
            });
        });
    });
});
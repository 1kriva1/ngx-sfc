import { TestBed } from "@angular/core/testing";
import { UntypedFormControl } from "@angular/forms";
import { equalOrInclude, maxLength, minLength } from "./common.validators";

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
                        expectedResult = { sfcEqualOrInclude: true };
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
                        expectedResult = { sfcEqualOrInclude: true };
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
                            expectedResult = { sfcEqualOrInclude: true };
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
                            expectedResult = { sfcEqualOrInclude: true };
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
                            expectedResult = { sfcEqualOrInclude: true };
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
                            expectedResult = { sfcEqualOrInclude: true };
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
                            expectedResult = { sfcEqualOrInclude: true };
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
                            expectedResult = { sfcEqualOrInclude: true };
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
                    validationResult = maxLength(2)(new UntypedFormControl(value)),
                    expectedResult = { sfcMaxLength: { requiredLength: 2, actualLength: 3, value: value } };
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid', () => {
                const value = ['test1', 'test2'],
                    validationResult = maxLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });

            fit('Should be valid, when value is null', () => {
                const value = null,
                    validationResult = maxLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });

            fit('Should be valid, when value is not array', () => {
                const value = 'test',
                    validationResult = maxLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });
        });

        describe('MinLength', () => {
            fit('Should be invalid', () => {
                const value = ['test1', 'test2', 'test3'],
                    validationResult = minLength(4)(new UntypedFormControl(value)),
                    expectedResult = { sfcMinLength: { requiredLength: 4, actualLength: 3, value: value } };
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid', () => {
                const value = ['test1', 'test2'],
                    validationResult = minLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });

            fit('Should be valid, when value is null', () => {
                const value = null,
                    validationResult = minLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });

            fit('Should be valid, when value is not array', () => {
                const value = 1,
                    validationResult = minLength(2)(new UntypedFormControl(value));
                expect(validationResult).toBeNull();
            });
        });
    });
});
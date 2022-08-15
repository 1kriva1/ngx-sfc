import { TestBed } from "@angular/core/testing";
import { FormControl } from "@angular/forms";
import { fileExtensions, fileMaxSize, fileMinSize } from "./file.validators";

describe('Validations', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: []
        }).compileComponents();
    });

    describe('File', () => {
        describe('FileMaxSize', () => {
            fit('Should be invalid', () => {
                const mockFile = getHugeFile('testFile.jpg', 1024),
                    validationResult = fileMaxSize(10)(new FormControl(mockFile)),
                    expectedResult = { sfcFileMaxSize: { requiredSize: 10, actualSize: 1024, file: mockFile } };
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid', () => {
                const mockFile = getHugeFile('testFile.jpg', 1024),
                    validationResult = fileMaxSize(1024)(new FormControl(mockFile)),
                    expectedResult = null;
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid, because its not a file', () => {
                const mockFile = { test: 1 },
                    validationResult = fileMaxSize(1024)(new FormControl(mockFile)),
                    expectedResult = null;
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid, because value is null', () => {
                const mockFile = null,
                    validationResult = fileMaxSize(1024)(new FormControl(mockFile)),
                    expectedResult = null;
                expect(validationResult).toEqual(expectedResult);
            });
        });

        describe('FileMinSize', () => {
            fit('Should be invalid', () => {
                const mockFile = getHugeFile('testFile.jpg', 10),
                    validationResult = fileMinSize(1024)(new FormControl(mockFile)),
                    expectedResult = { sfcFileMinSize: { requiredSize: 1024, actualSize: 10, file: mockFile } };
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid', () => {
                const mockFile = getHugeFile('testFile.jpg', 1024),
                    validationResult = fileMinSize(10)(new FormControl(mockFile)),
                    expectedResult = null;
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid, because its not a file', () => {
                const mockFile = { test: 1 },
                    validationResult = fileMinSize(10)(new FormControl(mockFile)),
                    expectedResult = null;
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid, because value is null', () => {
                const mockFile = null,
                    validationResult = fileMinSize(10)(new FormControl(mockFile)),
                    expectedResult = null;
                expect(validationResult).toEqual(expectedResult);
            });
        });

        describe('FileExtensions', () => {
            fit('Should be invalid', () => {
                const mockFile = getHugeFile('testFile.jpg', 10),
                    allowedExtensions = ["png", "jpeg"],
                    validationResult = fileExtensions(allowedExtensions)(new FormControl(mockFile)),
                    expectedResult = { sfcFileExtension: { allowedExtensions: allowedExtensions, actualExtension: 'jpg', file: mockFile } };
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid', () => {
                const mockFile = getHugeFile('testFile.png', 10),
                    allowedExtensions = ["png", "jpeg"],
                    validationResult = fileExtensions(allowedExtensions)(new FormControl(mockFile)),
                    expectedResult = null;
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid, because value is empty array', () => {
                const mockFile = getHugeFile('testFile.png', 10),
                    allowedExtensions: string[] = [],
                    validationResult = fileExtensions(allowedExtensions)(new FormControl(mockFile)),
                    expectedResult = null;
                expect(validationResult).toEqual(expectedResult);
            });

            fit('Should be valid, because its not a file', () => {
                const mockFile = { test: 1 },
                    allowedExtensions = ["png", "jpeg"],
                    validationResult = fileExtensions(allowedExtensions)(new FormControl(mockFile)),
                    expectedResult = null;
                expect(validationResult).toEqual(expectedResult);
            });
        });
    });

});

function getHugeFile(name: string, size: number): File {
    const file = new File([''], name);
    Object.defineProperty(
        file, 'size', { value: size, writable: false });
    return file;
}
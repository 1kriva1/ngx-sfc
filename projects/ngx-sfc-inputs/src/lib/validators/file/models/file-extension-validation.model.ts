export interface IFileExtensionValidationModel {
    allowedExtensions: string[];
    actualExtension: string;
    file: File
}
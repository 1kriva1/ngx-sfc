import { CommonConstants } from "../constants";
import { isDefined } from "./common.utils";

/**
 * Return parsed file size as string
 * @param bytes Bytes count
 * @param decimals Value after dot
 * @returns Parsed file size
 */
export function parseFileSize(bytes: number, decimals = 2): string {
    if (bytes === 0)
        return '0';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Return file extension
 * @param file File value 
 * @returns File extension
 */
export function getFileExtension(file: File): string {
    if (!isDefined(file))
        return CommonConstants.EMPTY_STRING;

    if (file.name.indexOf('.') === CommonConstants.NOT_FOUND_INDEX) {
        return CommonConstants.EMPTY_STRING;
    }

    return file.name.split('.').pop() as string;
}

/**
 * Read file as data URL
 * @param file File value
 * @param onLoad On load action
 */
export function readAsDataURL(file: File, onLoad: (result: string | ArrayBuffer | null) => void): void {
    if (isDefined(file)) {
        const reader = new FileReader();
        reader.onload = () => onLoad(reader.result);
        reader.readAsDataURL(file);
    } else
        throw new Error('File utils | Read as data URL function --> File is empty.');
}

/**
 * Return true if file is image
 * @param file File value
 * @returns True if file is image
 */
export function isImage(file: File): boolean {
    return isDefined(file) && (/\.(gif|jpe?g|jpg|tiff|png|webp|bmp)$/i).test(file.name);
}

/**
 * Convert file to base64 string
 * @param file File value
 * @returns Base64 string
 */
export function convertToBase64String(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });
}

/**
 * Convert base64 string to file
 * @param base64 Base64 string
 * @param name File name
 * @returns File value
 */
export async function convertFromBase64String(base64: string, name: string): Promise<File> {
    const res: Response = await fetch(base64),
        blob: Blob = await res.blob(),
        extension = base64.substring("data:image/".length, base64.indexOf(";base64"));

    return new File([blob], `${name}.${extension}`, { type: `image/${extension}` });
}
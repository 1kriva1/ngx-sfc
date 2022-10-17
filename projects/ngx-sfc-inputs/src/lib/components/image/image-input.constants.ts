import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

export class ImageInputConstants {
    static DEFAULT_ICON: any = faUserCircle;
    static DEFAULT_IMAGE = "data:image/png;base64,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";
}
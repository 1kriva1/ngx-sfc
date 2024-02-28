import { CommonConstants } from "ngx-sfc-common";

export class AvatarImageModel {

    NormalizedRadius: number;

    ImageRadius: number;

    Circumference: number;

    Height: number;

    Width: number;

    ImageId: string;

    Stroke: number;

    constructor(private radius: number, private stroke: number, private image: string | File) {
        this.NormalizedRadius = this.radius - this.stroke * 2;
        this.Circumference = Math.round(this.NormalizedRadius * 2 * Math.PI);
        this.Height = this.Width = this.radius * 2;
        this.ImageRadius = this.NormalizedRadius - (this.NormalizedRadius * 0.15);
        this.ImageId = image instanceof File ? '' : Math.random() + ((this.image as string)?.split(/(\\|\/)/g).pop() || CommonConstants.EMPTY_STRING);
        this.Stroke = stroke;
    }
}

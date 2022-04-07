import { CommonConstants } from "ngx-sfc-common";

export class AvatarImageModel {

    NormalizedRadius: number;

    ImageRadius: number;

    Circumference: number;

    Height: number;

    Width: number;

    ImageId: string;

    constructor(private radius: number, private stroke: number, private image: string) {
        this.NormalizedRadius = this.radius - this.stroke * 2;
        this.Circumference = Math.round(this.NormalizedRadius * 2 * Math.PI);
        this.Height = this.Width = this.radius * 2;
        this.ImageRadius = this.NormalizedRadius - (this.NormalizedRadius * 0.15);
        this.ImageId = Math.random() + (this.image?.split(/(\\|\/)/g).pop() || CommonConstants.EMPTY_STRING);
    }
}

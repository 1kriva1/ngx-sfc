import { Directive } from "@angular/core";
import { ComponentSize } from "ngx-sfc-common";

@Directive()
export abstract class ProgressPresentationBase {

    ComponentSize = ComponentSize;

    progress = 10;

    getColor(value: number): string {
        if (value < 33) {
            return 'red';
        } else if (value >= 33 && value < 66) {
            return 'yellow';
        } else if (value >= 66 && value < 100) {
            return 'green';
        }

        return 'green';
    }

    increase() {
        this.progress += 10

        if (this.progress >= 100)
            this.progress = 0
    }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sfcRepeat' })
export class RepeatPipe implements PipeTransform {

    transform(value: number): number[] {
        return [].constructor(value);
    }
}
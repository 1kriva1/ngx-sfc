import { Pipe, PipeTransform } from '@angular/core';
import { SortingDirection } from '../../enums';
import { any, isNullOrEmptyString, sortByPath } from '../../utils';

@Pipe({ name: 'sfcSortBy' })
export class SortByPipe implements PipeTransform {
  transform(value: any[], path: string, direction: SortingDirection = SortingDirection.Ascending): any[] {
    if (!any(value)) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (isNullOrEmptyString(path)) { return value; } // no path

    return sortByPath(value, path, direction)
  }
}
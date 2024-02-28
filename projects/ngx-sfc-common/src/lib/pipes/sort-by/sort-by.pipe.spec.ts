import { SortingDirection } from "../../enums";
import { SortByPipe } from "./sort-by.pipe";

describe('Pipe: SortBy', () => {
    const pipe = new SortByPipe();

    fit('Should not transform empty array', () => {
        expect(pipe.transform([], '')).toEqual([]);
    });

    fit('Should not transform array aith one item', () => {
        expect(pipe.transform([1], '')).toEqual([1]);
    });

    fit('Should not transform array with one item', () => {
        expect(pipe.transform([1], '')).toEqual([1]);
    });

    fit('Should not transform array with empty path', () => {
        expect(pipe.transform([2, 1], '')).toEqual([2, 1]);
    });

    fit('Should transform with default direction', () => {
        expect(pipe.transform([{ value: 2 }, { value: 1 }], 'value'))
            .toEqual([{ value: 1 }, { value: 2 }]);
    });

    fit('Should transform with defined direction', () => {
        expect(pipe.transform([{ value: 1 }, { value: 2 }], 'value', SortingDirection.Descending))
            .toEqual([{ value: 2 }, { value: 1 }]);
    });
});
import { combineLatest, map, Observable, startWith, Subject } from 'rxjs';
import { SliderMoveType } from './slider-move-type.enum';
import { ISliderMoveEvent } from './slider-move.event';
import { ISliderMoveModel } from './slider-move.model';

export class SliderService {

  // hold current image index
  private index: number = 0;

  private moveSubject: Subject<ISliderMoveEvent> = new Subject<ISliderMoveEvent>();

  private move$: Observable<ISliderMoveEvent> = this.moveSubject.asObservable();

  public model$!: Observable<ISliderMoveModel>;

  init(count$: Observable<number>) {
    this.model$ = combineLatest([
      this.move$.pipe(startWith({ type: SliderMoveType.Select, index: this.index })),
      count$.pipe(startWith(0))
    ]).pipe(
      map(([event, count]) => {
        switch (event.type) {
          case SliderMoveType.Select:
            this.index = event.index ?? this.index;
            break;
          case SliderMoveType.Next:
            this.index++;
            break;
          case SliderMoveType.Previous:
            this.index--;
            break;
        }

        if (this.index == count)
          this.index = 0;

        if (this.index < 0)
          this.index = count - 1;

        return { index: this.index, count };
      })
    );
  }

  move(type: SliderMoveType) {
    this.moveSubject.next({ type });
  }

  select(index: number) {
    this.moveSubject.next({ type: SliderMoveType.Select, index });
  }
}

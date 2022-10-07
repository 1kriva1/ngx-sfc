import { Component, OnInit } from '@angular/core';
import { BasePresentationComponent } from '../../base-presentations.component';

@Component({
  templateUrl: './years-input-presentation.component.html',
  styleUrls: ['../../../shared/styles/shared.component.scss']
})
export class YearsInputPresentationComponent extends BasePresentationComponent implements OnInit {

  minDate!: Date;

  ngOnInit(): void {
    this.minDate = new Date();

    this.formGroup = this.formBuilder.group(
      {
        inputYear: [null],
        inputRealTime: [new Date()],
        inputRealMin: [null]
      });

    this.repeatEvery(() => {
      console.log('UPDATE TIME!');
      this.formGroup.get("inputRealTime")?.setValue(new Date());
    }, 60000);

    this.repeatEvery(() => {
      console.log('UPDATE MIN LIMIT!');
      this.minDate = new Date();
    }, 60000);
  }

  repeatEvery(func: () => void, interval: number) {
    // Check current time and calculate the delay until next interval
    const now: any = new Date(),
      delay = interval - now % interval;

    function start() {
      // Execute function now...
      func();
      // ... and every interval
      setInterval(func, interval);
    }

    // Delay execution until it's an even interval
    setTimeout(start, delay);
  }
}

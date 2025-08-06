import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  CommonModule,
  CountdownIntervalComponent,
  CountdownIntervalModule
} from '@c8y/ngx-components';

@Component({
  selector: 'tut-countdown-example',
  templateUrl: './countdown-example.component.html',
  standalone: true,
  imports: [CommonModule, CountdownIntervalModule]
})
export class CountdownExampleComponent implements AfterViewInit {
  @ViewChild(CountdownIntervalComponent)
  countdownIntervalComponent: CountdownIntervalComponent;

  ngAfterViewInit(): void {
    this.startCountdown(); // We need to start the countdown at some point, for example, in AfterViewInit
  }

  startCountdown(): void {
    this.countdownIntervalComponent.start();
  }

  stopCountdown(): void {
    this.countdownIntervalComponent.stop();
  }

  stopCountdownAtZero(): void {
    this.countdownIntervalComponent.stop(true);
  }

  resetCountdown(): void {
    this.countdownIntervalComponent.reset();
  }

  onCountdownEnded(): void {
    // eslint-disable-next-line no-console
    console.log('Countdown Ended!');

    this.resetCountdown();
  }
}

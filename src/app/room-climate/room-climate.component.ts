import { Component, OnInit } from '@angular/core';
import { first, interval, startWith } from 'rxjs';
import { RoomClimateData } from '../data/schema/roomClimateData';
import { EnvironmentService } from '../data/service/environment.service';

@Component({
  selector: 'app-room-climate',
  templateUrl: './room-climate.component.html',
  styleUrls: ['./room-climate.component.scss'],
})
export class RoomClimateComponent implements OnInit {
  roomClimateData: RoomClimateData | undefined;
  temperatureColor: String | undefined;
  humidityColor: String | undefined;
  alert: boolean = false;

  private MAX_TEMPERATURE = 25;
  private MIN_HUMIDITY = 30;
  private MAX_HUMIDITY = 60;

  constructor(private environmentService: EnvironmentService) {}

  ngOnInit(): void {
    this.roomClimateData = {
      temperature: 31,
      humidity: 50,
      time: new Date(),
    };

    interval(5000)
      .pipe(startWith(0))
      .subscribe(() =>
        this.environmentService
          .getRoomClimateData()
          .pipe(first())
          .subscribe((data) => {
            this.roomClimateData = data;
            this.temperatureColor =
              data.temperature > this.MAX_TEMPERATURE ? 'red' : 'green';
            this.humidityColor =
              data.humidity > this.MAX_HUMIDITY ||
              data.humidity < this.MIN_HUMIDITY
                ? 'red'
                : 'green';
            this.alert =
              data.temperature > this.MAX_TEMPERATURE ||
              data.humidity > this.MAX_HUMIDITY ||
              data.humidity < this.MIN_HUMIDITY;
          })
      );
  }
}

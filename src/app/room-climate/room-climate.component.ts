import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { first, interval } from 'rxjs';
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

  constructor(private environmentService: EnvironmentService) {}

  ngOnInit(): void {
    this.roomClimateData = {
      temperature: 31,
      humidity: 50,
      time: new Date(),
    };

    this.temperatureColor =
      this.roomClimateData.temperature > 30 ? 'red' : 'green';
    this.humidityColor = this.roomClimateData.humidity > 60 ? 'red' : 'green';
    this.alert =
      this.roomClimateData.temperature > 30 ||
      this.roomClimateData.humidity > 60;

    interval(5000).subscribe(() =>
      this.environmentService
        .getRoomClimateData()
        .pipe(first())
        .subscribe((data) => {
          this.roomClimateData = data;
          this.temperatureColor = data.temperature > 30 ? 'red' : 'green';
          this.humidityColor =
            this.roomClimateData.humidity > 60 ? 'red' : 'green';
          this.alert =
            this.roomClimateData.temperature > 30 ||
            this.roomClimateData.humidity > 60;
        })
    );
  }
}

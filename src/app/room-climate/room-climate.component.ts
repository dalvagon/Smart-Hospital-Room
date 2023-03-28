import { Component, OnInit } from '@angular/core';
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

  constructor(private environmentService: EnvironmentService) {}

  ngOnInit(): void {
    interval(5000).subscribe(() =>
      this.environmentService
        .getRoomClimateData()
        .pipe(first())
        .subscribe((data) => {
          this.roomClimateData = data;
        })
    );
  }
}

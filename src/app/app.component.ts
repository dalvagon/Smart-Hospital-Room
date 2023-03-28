import { EnvironmentService } from './data/service/environment.service';
import { RoomClimateData } from './data/schema/roomClimateData';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'smart-hospital';
}

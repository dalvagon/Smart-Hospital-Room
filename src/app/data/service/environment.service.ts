import { Humidity } from './../schema/humidity';
import { Temperature } from './../schema/temperature';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoomClimateData } from '../schema/roomClimateData';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private API_URL = environment.API_URL;

  constructor(private _httpClient: HttpClient) {}

  getRoomClimateData(): Observable<RoomClimateData> {
    return this._httpClient.get<RoomClimateData>(`${this.API_URL}/latest`);
  }

  getTemperatureHistory(): Observable<Temperature[]> {
    return this._httpClient.get<Temperature[]>(
      `${this.API_URL}/temperature/history`
    );
  }

  getHumidityHistory(): Observable<Humidity[]> {
    return this._httpClient.get<Humidity[]>(`${this.API_URL}/humidity/history`);
  }
}

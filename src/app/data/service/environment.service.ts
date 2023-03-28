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
    return this._httpClient.get<RoomClimateData>(`${this.API_URL}/data`);
  }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoomAvailabilityService {
  private readonly baseURL = environment.apiURL;
  // private readonly baseURL = "http://localhost:8000/api/";
  constructor(private http: HttpClient) {}
  getRoomAvailabilityByDate(dates: any): Observable<any> {
    return this.http.post(this.baseURL + "availableRoomByDate", dates);
  }
}

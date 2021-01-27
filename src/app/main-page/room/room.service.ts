import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  sideSection: boolean;
  public roomComponent: boolean;
  public bookComponent: boolean;
  constructor(private http: HttpClient) {}

  private readonly baseURL = environment.apiURL;

  getRoomCategory(): Observable<any> {
    return this.http.get(this.baseURL + "available");
  }

  addBooking(booking: any): Observable<any> {
    return this.http.post(this.baseURL + "multipleBooking", booking);
  }
}

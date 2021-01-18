import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RoomService {
  constructor(private http: HttpClient) {}

  private readonly baseURL = environment.apiURL + "room_categories";

  getRoomCategory(): Observable<any> {
    return this.http.get(this.baseURL);
  }
}

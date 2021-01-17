import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CheckRoomService {
  checkInOutDate: any;
  checkOutDate: Date;

  constructor() {}
}

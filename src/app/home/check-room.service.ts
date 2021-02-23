import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CheckRoomService {
  // availableRoomByDates: any;
  checkDates: any;
  availableRoomByDates: any[] = [];

  private dataSourceAvailableRoomByDates = new BehaviorSubject<any>(
    this.availableRoomByDates
  );

  currentAvailableRoomByDates = this.dataSourceAvailableRoomByDates.asObservable();

  constructor() {}
  changeAvailableRoomByDates(availableRoomByDates: any) {
    this.dataSourceAvailableRoomByDates.next(availableRoomByDates);
  }
}

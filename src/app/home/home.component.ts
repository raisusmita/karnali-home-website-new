import { RoomService } from "./../main-page/room/room.service";
import { RoomAvailabilityService } from "./../shared/services/room-availability.service";
import { CheckRoomService } from "./check-room.service";
import { MvHome } from "./home.model";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  arrival: string;
  departure: string;
  searchDisable: boolean;
  date: MvHome = {} as MvHome;
  constructor(
    private roomCheckService: CheckRoomService,
    private router: Router,
    private roomAvailabilityService: RoomAvailabilityService,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.arrival = " Arrival Date";
    this.departure = " Departure Date";
    this.searchDisable = false;
  }

  checkRoomAvailability() {
    const roomAvailabilityDatesParams = {
      check_in_date: this.date.checkInDate,
      check_out_date: this.date.checkOutDate,
    };

    this.roomCheckService.checkDates = roomAvailabilityDatesParams;
    this.roomAvailabilityService
      .getRoomAvailabilityByDate(roomAvailabilityDatesParams)
      .subscribe((result) => {
        if (result && result.success) {
          setTimeout(() => {
            this.roomCheckService.changeAvailableRoomByDates(result.data);
            this.roomService.fromSearchByDates = true;
            if (this.roomCheckService) {
              this.router.navigate(["/room"]);
            }
          });
        }
      });
  }
}

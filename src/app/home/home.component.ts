import { CheckRoomService } from "./check-room.service";
import { MvHome } from "./home.model";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  arrival: string;
  departure: string;
  searchDisable: boolean;
  date: MvHome = {} as MvHome;
  constructor(
    private roomCheckService: CheckRoomService,
    private router: Router
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
    this.roomCheckService.checkInOutDate = this.date;
    if (this.roomCheckService) {
      this.router.navigate(["/room"]);
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { CheckRoomService } from "../../check-room.service";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"],
})
export class RoomComponent implements OnInit {
  constructor(private roomCheckService: CheckRoomService) {}

  ngOnInit() {
    console.log("from room" + this.roomCheckService.checkInOutDate);
  }
}

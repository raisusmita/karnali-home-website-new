import { CheckRoomService } from "./../../home/check-room.service";
import { RoomService } from "./../room/room.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  providers: [RoomService, CheckRoomService],
})
export class HeaderComponent implements OnInit {
  // components: any[] = [
  //   { name: "ROOM", path: "room" },
  //   { name: "BOOKING", path: "booking" },
  //   { name: "GALLERY", path: "gallery" },
  //   { name: "CONTACT", path: "contact" },
  // ];
  constructor(
    private roomService: RoomService,
    private checkRoomService: CheckRoomService
  ) {}

  ngOnInit() {}

  getRoomSideSec() {
    this.roomService.roomComponent = true;
    this.roomService.bookComponent = false;
    this.roomService.fromSearchByDates = false;
    this.checkRoomService.checkDates.length = 0;
  }
}

import { RoomService } from "./../room/room.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  // components: any[] = [
  //   { name: "ROOM", path: "room" },
  //   { name: "BOOKING", path: "booking" },
  //   { name: "GALLERY", path: "gallery" },
  //   { name: "CONTACT", path: "contact" },
  // ];
  constructor(private roomService: RoomService) {}

  ngOnInit() {}

  getRoomSideSec() {
    this.roomService.roomComponent = true;
    this.roomService.bookComponent = false;
    console.log(this.roomService.sideSection);
  }
}

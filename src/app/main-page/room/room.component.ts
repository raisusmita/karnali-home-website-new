import { RoomService } from "./room.service";
import { Component, OnInit } from "@angular/core";
import { CheckRoomService } from "src/app/home/check-room.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"],
})
export class RoomComponent implements OnInit {
  nearLocation: any[] = [
    {
      icon: "environment",
      location: "Charumati Stupa",
      distance: "15 min drive",
    },
    { icon: "environment", location: "Boudhanath", distance: "16 min drive" },
    {
      icon: "environment",
      location: "Riwoche Monastery",
      distance: "18 min drive",
    },
    {
      icon: "environment",
      location: "Kathmandu (KTM-Tribhuvan Intl.)",
      distance: "9 min drive",
    },
  ];

  services: any[] = [
    { serviceName: "Parking Included" },
    { serviceName: "Room Service" },
    { serviceName: "Karnali Home" },
  ];

  availableRoom: any[];
  availableRoomCategories: any[] = [];

  constructor(
    private roomCheckService: CheckRoomService,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.availableRoom = this.roomCheckService.availableRoomByDates;

    if (this.availableRoom) {
      Object.values(this.availableRoom).map((room) => {
        this.availableRoomCategories.push({
          category: room[0].room_category.room_category,
          image:
            environment.serverURL + "storage/" + room[0].room_category.image,
          type: room[0].room_category.room_type,
          price: room[0].room_category.room_price,
          totalNumber: room.length,
          showCount: true,
        });
      });
    } else {
      this.roomService.getRoomCategory().subscribe((result) => {
        if (result) {
          Object.values(result.data).map((room) => {
            this.availableRoomCategories.push({
              category: room["room_category"],
              image: room["image"],
              type: room["room_type"],
              price: room["room_price"],
              showCount: false,
            });
          });
        }
      });

      console.log(this.availableRoomCategories);
    }
  }
}

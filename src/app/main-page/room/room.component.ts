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

  constructor(private roomCheckService: CheckRoomService) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.availableRoom = this.roomCheckService.availableRoomByDates;

    if (this.availableRoom) {
      Object.values(this.availableRoom).map((x) => {
        this.availableRoomCategories.push({
          category: x[0].room_category.room_category,
          image: environment.serverURL + "storage/" + x[0].room_category.image,
          type: x[0].room_category.room_type,
          price: x[0].room_category.room_price,
          totalNumber: x.length,
        });
      });
    }
  }
}

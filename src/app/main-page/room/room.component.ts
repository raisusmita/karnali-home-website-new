import { MvBookDates } from "./../../shared/model/booking/booking.model";
import { MvCustomer } from "./../../shared/model/customer/customer.model";
import { Router } from "@angular/router";
import { RoomService } from "./room.service";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { CheckRoomService } from "src/app/home/check-room.service";
import { environment } from "src/environments/environment";
import { MvBooking } from "src/app/shared/model/booking/booking.model";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.scss"],
})
export class RoomComponent implements OnInit, AfterViewInit {
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
  roomComponent: boolean;
  bookComponent: boolean;
  arrival: string;
  departure: string;

  customer: MvCustomer = {} as MvCustomer;
  booking: MvBooking = {} as MvBooking;
  bookingDates: MvBookDates = {} as MvBookDates;
  checked: boolean = true;
  selectedRoomCategory: any;
  checkedRoom: any = {};

  constructor(
    private roomCheckService: CheckRoomService,
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.availableRoom = this.roomCheckService.availableRoomByDates;
    this.roomComponent = true;
    this.bookComponent = false;
    this.arrival = " Arrival Date";
    this.departure = " Departure Date";
    if (this.availableRoom) {
      Object.values(this.availableRoom).map((room) => {
        this.availableRoomCategories.push({
          room_category_id: room[0].room_category.id,
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
              room_category_id: room["id"],
              category: room["room_category"],
              image: room["image"],
              type: room["room_type"],
              price: room["room_price"],
              showCount: false,
            });
          });
        }
      });
    }
  }

  bookRoom(availableRoomCategory) {
    this.roomService.roomComponent = false;
    this.roomService.bookComponent = true;
    if (this.roomCheckService.checkDates) {
      this.booking.check_in_date = this.roomCheckService.checkDates.check_in_date;
      this.booking.check_out_date = this.roomCheckService.checkDates.check_out_date;
    } else {
      this.booking.check_in_date = null;
      this.booking.check_out_date = null;
    }
    this.selectedRoomCategory = availableRoomCategory;
    this.checkedRoom[availableRoomCategory.room_category_id] = true;
  }

  onChecked(e, room_category_id) {
    this.checkedRoom[room_category_id] = e.target.checked;
    // let roomNum = document.getElementById(
    //   "roomNum" + room_category_id
    // ) as HTMLInputElement;
    // roomNum.required = true;
    // let adultNum = document.getElementById(
    //   "adultNum" + room_category_id
    // ) as HTMLInputElement;
    // adultNum.required = true;
    // let childNum = document.getElementById(
    //   "childNum" + room_category_id
    // ) as HTMLInputElement;
    // childNum.required = true;
  }

  onSubmit(form) {
    form.value.bookingDates.checkInDate = new Date(
      form.value.bookingDates.checkInDate
    );
    form.value.bookingDates.checkOutDate = new Date(
      form.value.bookingDates.checkOutDate
    );
    const bookParams = form.value;

    this.roomService.addBooking(bookParams).subscribe((result) => {
      console.log(result);
    });
  }

  ngAfterViewInit() {
    if ((this.roomService.sideSection = true)) {
      this.roomComponent = true;
    }
  }
}

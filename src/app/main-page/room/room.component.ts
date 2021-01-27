import { MvBookDates } from "./../../shared/model/booking/booking.model";
import { MvCustomer } from "./../../shared/model/customer/customer.model";
import { Router } from "@angular/router";
import { RoomService } from "./room.service";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { CheckRoomService } from "src/app/home/check-room.service";
import { environment } from "src/environments/environment";
import { MvBooking } from "src/app/shared/model/booking/booking.model";
import { NzNotificationService } from "ng-zorro-antd";

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
  arrival: string;
  departure: string;

  customer: MvCustomer = {} as MvCustomer;
  booking: MvBooking = {} as MvBooking;
  bookingDates: MvBookDates = {} as MvBookDates;
  checked: number;
  selectedRoomCategory: any = {};
  checkedRoom: any = {};
  availableRoomCount: any = {};

  constructor(
    private roomCheckService: CheckRoomService,
    private roomService: RoomService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.availableRoom = this.roomCheckService.availableRoomByDates;
    this.roomService.roomComponent = true;
    this.roomService.bookComponent = false;
    this.arrival = " Arrival Date";
    this.departure = " Departure Date";
    this.booking = {
      check_in_date: null,
      check_out_date: null,
      room_category_detal: "",
      room_category_id: 0,
      room_category: [
        { number_of_rooms: 0, number_of_adults: 0, number_of_children: 0 },
      ],
      number_of_rooms: 0,
      number_of_adults: 0,
      number_of_children: 0,
    };
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
        this.booking.room_category.push({
          number_of_rooms: null,
          number_of_adults: null,
          number_of_children: null,
        });
        this.availableRoomCount[room[0].room_category.id] = room.length;
      });
    } else {
      this.roomService.getRoomCategory().subscribe((result) => {
        if (result) {
          Object.values(result.data).map((room) => {
            this.booking.room_category.push({
              number_of_rooms: null,
              number_of_adults: null,
              number_of_children: null,
            });
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
    this.selectedRoomCategory[availableRoomCategory.room_category_id] = true;
    this.checkedRoom[availableRoomCategory.room_category_id] = true;
  }

  onChecked(e, room_category_id) {
    this.checkedRoom[room_category_id] = e.target.checked;
    if (!e.target.checked) {
      this.booking.room_category[room_category_id].number_of_rooms = null;
      this.booking.room_category[room_category_id].number_of_adults = null;
      this.booking.room_category[room_category_id].number_of_children = null;
    }
  }

  unselectRow(room_category_id) {
    if (
      this.booking.room_category[room_category_id].number_of_rooms == null &&
      this.booking.room_category[room_category_id].number_of_adults == null &&
      this.booking.room_category[room_category_id].number_of_children == null
    ) {
      this.selectedRoomCategory[room_category_id] = false;
    } else {
      this.selectedRoomCategory[room_category_id] = true;
    }
  }

  onSubmit(form) {
    const bookParams = form.value;
    this.roomService.addBooking(bookParams).subscribe((result) => {
      if (result.success) {
        //reset form
        form.reset();
        //unchecked all the checkbox
        Object.keys(this.selectedRoomCategory).map(
          (checkedRoom) => (this.selectedRoomCategory[checkedRoom] = false)
        );
        this.notification.create(
          "success",
          "Success",
          "The room has been booked successfully!!"
        );
      } else {
        this.notification.create(
          "error",
          "Booking Failed",
          "Please, contact us directly!!"
        );
      }
    });
  }
}

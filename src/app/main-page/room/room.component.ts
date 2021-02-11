import { RoomAvailabilityService } from "./../../shared/services/room-availability.service";
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

  bookComponent: boolean;
  roomComponent: boolean;
  constructor(
    private roomCheckService: CheckRoomService,
    private roomService: RoomService,
    private notification: NzNotificationService,
    private roomAvailabilityService: RoomAvailabilityService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.availableRoomCategories.length = 0;
    this.availableRoom = this.roomCheckService.availableRoomByDates;
    this.roomService.roomComponent = true;
    this.roomService.bookComponent = false;
    this.roomComponent = this.roomService.roomComponent;
    this.bookComponent = this.roomService.bookComponent;
    this.arrival = " Arrival Date";
    this.departure = " Departure Date";
    this.booking = {
      check_in_date: null,
      check_out_date: null,
      room_category_detal: "",
      room_category_id: 0,
      room_category: {
        0: { number_of_rooms: 0, number_of_adults: 0, number_of_children: 0 },
      },
      number_of_rooms: 0,
      number_of_adults: 0,
      number_of_children: 0,
    };
    this.getDataForSearchOrAllAvailable();
  }

  getDataForSearchOrAllAvailable() {
    if (this.availableRoom && this.roomService.fromSearchByDates) {
      Object.values(this.availableRoom).map((room) => {
        this.availableRoomCategories.push({
          room_category_id: room[0].room_category.id,
          category: room[0].room_category.room_category,
          image: environment.apiURL + "storage/" + room[0].room_category.image,
          type: room[0].room_category.room_type,
          price: room[0].room_category.room_price,
          totalNumber: room.length,
          showCount: true,
        });
        this.booking.room_category[room[0].room_category.id] = {
          number_of_rooms: null,
          number_of_adults: null,
          number_of_children: null,
        };
        this.availableRoomCount[room[0].room_category.id] = room.length;
      });
    } else {
      this.roomService.getRoomCategory().subscribe((result) => {
        if (result) {
          Object.keys(result.data).map((key) => {
            this.booking.room_category[result.data[key][0].room_category_id] = {
              number_of_rooms: null,
              number_of_adults: null,
              number_of_children: null,
            };
            this.availableRoomCategories.push({
              room_category_id: result.data[key][0].room_category_id,
              category: result.data[key][0].room_category.room_category,
              image:
                environment.apiURL +
                "storage/" +
                result.data[key][0].room_category.image,
              type: result.data[key][0].room_category.room_type,
              price: result.data[key][0].room_category.room_price,
              totalNumber: result.data[key].length,
              showCount: false,
            });
            this.availableRoomCount[result.data[key][0].room_category_id] =
              result.data[key].length;
          });
        }
      });
    }
  }

  bookRoom(availableRoomCategory) {
    this.roomService.roomComponent = false;
    this.roomService.bookComponent = true;
    this.roomComponent = this.roomService.roomComponent;
    this.bookComponent = this.roomService.bookComponent;
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
    this.selectedRoomCategory[room_category_id] = e.target.checked;
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

  getupdatedRoomCategoryBySearch(): Promise<any> {
    return new Promise((resolve1, reject) => {
      if (this.availableRoom) {
        this.roomAvailabilityService
          .getRoomAvailabilityByDate(this.roomCheckService.checkDates)
          .subscribe((result) => {
            if (result && result.success) {
              this.roomCheckService.availableRoomByDates = result.data;
              resolve1(true);
            }
          });
      }
    });
  }

  onSubmit(form): Promise<any> {
    return new Promise((resolve1, reject) => {
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
          // tslint:disable-next-line: no-unused-expression
          new Promise((resolve, reject) => {
            Promise.all([this.getupdatedRoomCategoryBySearch()]).then(
              ([response]) => {
                this.initialize();
                resolve(true);
              },
              reject
            );
            resolve1(true);
          });
        } else {
          // tslint:disable-next-line: no-unused-expression
          new Promise((resolve, reject) => {
            this.notification.create(
              "error",
              "Booking Failed",
              "Please, contact us directly!!"
            );
            resolve(true);
          });
          resolve1(true);
        }
      });
    });
  }
}

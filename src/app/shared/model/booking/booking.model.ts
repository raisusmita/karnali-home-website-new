export interface MvBooking {
  check_in_date: Date;
  check_out_date: Date;
  room_category_detal: any;
  room_category_id: number;
  room_category: [
    {
      number_of_rooms: 0;
      number_of_adults: 0;
      number_of_children: 0;
    }
  ];
  number_of_rooms: number;
  number_of_adults: number;
  number_of_children: number;
}

export interface MvBookDates {
  check_in_date: Date;
  check_out_date: Date;
}

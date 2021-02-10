import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { MainPageModule } from "./main-page/main-page.module";
import { RoomAvailabilityService } from "./shared/services/room-availability.service";
import { CheckRoomService } from "./home/check-room.service";
import { RoomService } from "./main-page/room/room.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, MainPageModule],
  providers: [RoomService, CheckRoomService, RoomAvailabilityService],
  bootstrap: [AppComponent],
})
export class AppModule {}

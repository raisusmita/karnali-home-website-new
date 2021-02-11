import { CheckRoomService } from "./../home/check-room.service";
import { RoomService } from "./room/room.service";
import { HomeComponent } from "./../home/home.component";
import { RouterModule } from "@angular/router";
import { MainPageComponent } from "./main-page.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from "src/app/app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RoomComponent } from "./room/room.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { GalleryComponent } from "./gallery/gallery.component";
import { ContactComponent } from "./contact/contact.component";
import { RoomAvailabilityService } from "../shared/services/room-availability.service";
registerLocaleData(en);

@NgModule({
  declarations: [
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    RoomComponent,
    HomeComponent,
    GalleryComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    FlexLayoutModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  exports: [],
})
export class MainPageModule {}

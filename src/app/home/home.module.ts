import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { AppRoutingModule } from "../app-routing.module";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { RoomComponent } from "./room/room.component";
import { FlexLayoutModule } from "@angular/flex-layout";

registerLocaleData(en);

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    RoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  exports: [],
})
export class HomeModule {}

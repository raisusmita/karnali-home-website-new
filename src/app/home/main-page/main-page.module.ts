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
import { NgZorroAntdModule } from "ng-zorro-antd";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    MainPageComponent,
    HeaderComponent,
    FooterComponent,
    RoomComponent,
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
  ],
})
export class MainPageModule {}

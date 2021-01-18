import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { MainPageModule } from "./main-page/main-page.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, MainPageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { RoomComponent } from "./home/main-page/room/room.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { MainPageComponent } from "./home/main-page/main-page.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "room",
    component: MainPageComponent,
    children: [{ path: "room-search", component: RoomComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

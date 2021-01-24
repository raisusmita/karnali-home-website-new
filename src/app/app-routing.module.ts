import { ContactComponent } from "./main-page/contact/contact.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { RoomComponent } from "./main-page/room/room.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { GalleryComponent } from "./main-page/gallery/gallery.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    component: MainPageComponent,
    children: [
      { path: "room", component: RoomComponent },
      { path: "gallery", component: GalleryComponent },
      { path: "contact", component: ContactComponent },
    ],
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

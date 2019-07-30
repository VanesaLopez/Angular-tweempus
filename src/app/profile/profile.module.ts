import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileComponent } from './profile.component';
import { MyTwimpsComponent } from './my-twimps/my-twimps.component';
import { FavoriteTwimpsComponent } from './favorite-twimps/favorite-twimps.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [ProfileComponent, MyTwimpsComponent, FavoriteTwimpsComponent]
})
export class ProfileModule { }

import { Component, Input } from '@angular/core';

import { Twimp } from '../twimp.model';

@Component({
  selector: 'tweempus-twimp-list',
  templateUrl: './twimp-list.component.html',
  styleUrls: ['./twimp-list.component.css']
})
export class TwimpListComponent {
  @Input() twimps: Twimp[];

  updateFavorite(event) {
    this.twimps.forEach(twimp => {
      if (twimp.id === event) {
        twimp.favorite = !twimp.favorite;
      }
    });
  }

  trackByTwimps(index: number, twimp: Twimp) {
    return twimp.id;
  }
}

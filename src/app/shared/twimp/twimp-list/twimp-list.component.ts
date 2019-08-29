import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Twimp } from '../twimp.model';

@Component({
  selector: 'tweempus-twimp-list',
  templateUrl: './twimp-list.component.html',
  styleUrls: ['./twimp-list.component.css']
})
export class TwimpListComponent {
  @Input() twimps: Twimp[];
  @Output() updateTwimps = new EventEmitter;

  updateFavorite(event) {
    this.updateTwimps.emit(event);
  }

  trackByTwimps(index: number, twimp: Twimp) {
    return twimp.id;
  }
}

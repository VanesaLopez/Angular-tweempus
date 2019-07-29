import { Component, EventEmitter , Input, Output } from '@angular/core';

import { Twimp } from '../twimp.model';

@Component({
  selector: 'tweempus-twimp-card',
  templateUrl: './twimp-card.component.html',
  styleUrls: ['./twimp-card.component.css']
})
export class TwimpCardComponent {
  @Input() twimp: Twimp;
  @Output() updateFavorite = new EventEmitter();

  setFavorite(twimpId: string) {
    this.updateFavorite.emit(twimpId);
  }
}

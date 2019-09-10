import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../shared/author/author.service';
import { Twimp } from '../shared/twimp/twimp.model';
import { TwimpService } from '../shared/twimp/twimp.service';
import { from } from 'rxjs';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'tweempus-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  twimpList: Twimp[] = [];

  constructor(
      private authorService: AuthorService,
      private twimpService: TwimpService,
      private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.twimpService.getTwimps().subscribe(twimps => {
      from(twimps).subscribe(twimp => {
        this.authorService.getAuthor(twimp.author.id).subscribe(author => {
          twimp.author = author;
          this.twimpService.getFavoritesByAuthor(twimp.author.id, twimp.id).subscribe(favorite => {
            twimp.favorite = favorite;
            this.twimpList.push(twimp);
          });
        })
      });
    });
  }

  updateTwimps(event) {
    const favoriteTwimps: string[] = [];

    this.twimpList.forEach(twimp => {
      if (twimp.author.id === event.author.id) {
        if (twimp.id === event.id ) {
          twimp.favorite = !twimp.favorite;
        }
        if (twimp.favorite) {
          favoriteTwimps.push(twimp.id);
        }
      }
    });
    this.twimpService.updateFavoritesByAuthor(event.author.id, favoriteTwimps).subscribe();
  }
}

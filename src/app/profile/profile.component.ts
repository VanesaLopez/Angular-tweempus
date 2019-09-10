import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../shared/author/author.service';
import { AuthenticationService } from '../core/authentication.service';
import { Author } from '../shared/author/author.model';

@Component({
  selector: 'tweempus-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  idAuthor: string = null;
  author: Author = null;
  // observableId: Observable<{}> = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    // this.observableId = this.route.params.pipe(
    //   switchMap((params: Params) => params['id']),
    // );
    // this.idAuthor = this.observableId.subscribe(id => id);
    this.idAuthor = this.route.snapshot.params['id'];
    this.authorService.getAuthor(this.idAuthor).subscribe(author => this.author = author);
  }

  checkLogin() {
    if (this.authService.token !== null) {
      return this.idAuthor === this.authService.token.idAuthor;
    }
    return false;
  }

}

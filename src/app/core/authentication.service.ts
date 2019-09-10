import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthorService } from '../shared/author/author.service';
import { Token } from './token.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {

  private url = `${environment.url}authenticated`;

  token: Token = null;

  constructor(
    private httpClient: HttpClient,
    private authorService: AuthorService,
    private router: Router
  ) {
    if (localStorage.getItem('token') != null) {
      const tokenLS = JSON.parse(localStorage.getItem('token'));
      this.token = new Token(tokenLS['_key'], tokenLS['_idAuthor']);
    }
   }

  login(idAuthor: string): void {
    this.authorService.getAuthor(idAuthor).subscribe(author => {
      const tokenGenerated = this.generateToken();
      this.saveSession(tokenGenerated, author.id).subscribe(response => {
        this.token = new Token(response['id'], response['author']);
        localStorage.setItem('token', JSON.stringify(this.token));
        this.router.navigate(['/dashboard']);
      });
    });
  }

  logout(): void {
    if (this.token) {
      this.deleteSession().subscribe(response => {
        this.token = null;
        this.deleteLocalToken();
      });
    } else {
      this.deleteLocalToken();
    }
  }

  generateToken(): string {
    const date: number = new Date().getTime();
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    text += date;

    return text;
  }

  saveSession(tokenGenerated: string, idAuthor: string): Observable<Object> {
    const session = { 'id': tokenGenerated, 'author': idAuthor };

    return this.httpClient.post(this.url, session).pipe(
      catchError(this.handleError)
    );
  }

  deleteLocalToken() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }

  deleteSession(): Observable<object> {
    return this.httpClient.delete(`${this.url}/${this.token.key}`).pipe(
      catchError(this.handleError)
    );
  }

  isLoginInLocal() {
    return localStorage.getItem('token');
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

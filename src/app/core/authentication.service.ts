import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthorService } from '../shared/author/author.service';
import { Token } from './token.model';

@Injectable()
export class AuthenticationService {

  private url = 'http://localhost:3000/authenticated';

  token: Token = null;

  constructor(
    private httpClient: HttpClient,
    private authorService: AuthorService,
    private router: Router
  ) { }

  login(idAuthor: string): void {
    this.authorService.getAuthor(idAuthor).subscribe(author => {
      const tokenGenerated = this.generateToken();
      this.saveSession(tokenGenerated, author.id).subscribe(response => {
        this.token = new Token(response['id'], response['author']);
        localStorage.setItem('token', tokenGenerated);
        this.router.navigate(['/dashboard']);
      });
    });
  }

  logout(): void {
    this.deleteSession().subscribe(response => {
      this.token = null;
      if (localStorage.getItem('token')) localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
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

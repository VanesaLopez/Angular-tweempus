import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Twimp } from './twimp.model';
import { Author } from '../author/author.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class TwimpService {

  private url = `${environment.url}twimps`;
  private urlFavorite = `${environment.url}author-favorites`;

  constructor(private httpClient: HttpClient) { }

  getTwimps(): Observable<Twimp[]> {
    const twimps: Twimp[] = [];

    return this.httpClient.get(this.url).pipe(
      map(dbTwimpList => {
        for (const i in dbTwimpList) {
          if (i) {
            const twimp = new Twimp(dbTwimpList[i].id, `localhost:4200/twimp/${dbTwimpList[i].id}`,
              new Author(dbTwimpList[i].author), dbTwimpList[i].content, dbTwimpList[i].timestamp);
            twimps.push(twimp);
          }
        }
        return twimps;
      })
    );
  }

  getFavoritesByAuthor(idAuthor: string, idTwimp: string): Observable<boolean> {
      return this.httpClient.get(`${this.urlFavorite}/${idAuthor}`).pipe(
        map(response => {
          const favorites: string[] = response['twimps'];
          if (favorites.indexOf(idTwimp) === -1) {
            return false;
          } else {
            return true;
          }
        }),
        catchError(this.handleError)
      );
  }

  updateFavoritesByAuthor(idAuthor: string, twimps: string[]): Observable<any> {
    const favorite = {id: idAuthor, twimps};
    return this.httpClient.patch(`${this.urlFavorite}/${idAuthor}`, favorite).pipe(
      map(response => {
        console.log(response);
      }),
      catchError(this.handleError)
    );
}

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  setTwimp(twimp: Twimp): Observable<any> {
    const dbTwimp: any = {
      'id': twimp.id,
      'author': twimp.author.id,
      'by': twimp.author.fullName,
      'content': twimp.content,
      'timestamp': twimp.timestamp
    };

    return this.httpClient.post(this.url, dbTwimp).pipe(
      catchError(this.handleError)
    );
  }

  getAuthorTwimps(idAuthor: string): Observable<Twimp[]> {
    let twimps: Twimp[] = [];

    return this.httpClient.get(this.url).pipe(
      map(dbTwimpList => {
        for (let i in dbTwimpList) {
          if (dbTwimpList[i].author === idAuthor) {
            let twimp: Twimp = new Twimp(dbTwimpList[i].id, 'localhost:4200/twimp/' + dbTwimpList[i].id, new Author(dbTwimpList[i].author), dbTwimpList[i].content, dbTwimpList[i].timestamp);
            twimps.push(twimp);
          }
        }
        return twimps;
      }),
      catchError(this.handleError)
    );
  }

}

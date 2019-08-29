import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Twimp } from './twimp.model';
import { Author } from '../author/author.model';

@Injectable()
export class TwimpService {

  private url = 'http://localhost:3000/twimps';
  private urlFavorite = 'http://localhost:3000/author-favorites';

  constructor(private httpClinet: HttpClient) { }

  getTwimps(): Observable<Twimp[]> {
    const twimps: Twimp[] = [];

    return this.httpClinet.get(this.url).pipe(
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
      return this.httpClinet.get(`${this.urlFavorite}/${idAuthor}`).pipe(
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
    return this.httpClinet.patch(`${this.urlFavorite}/${idAuthor}`, favorite).pipe(
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

}

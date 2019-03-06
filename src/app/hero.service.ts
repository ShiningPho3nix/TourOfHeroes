import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroesDataObject'; /* Const welche in-memory-data service */

  constructor(private http: HttpClient, private messageService: MessageService) { }
  /* Wichtig das die Methode erst nach dem Constructor kommt, sonst funktioniert das Program nicht!*/
  getHeroes(): Observable<Hero[]> {
    log('fetched all Heroes');
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHero(id: number): Observable<Hero> {
    log(`fetched hero ID=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.addMessage(`HeroService: ${message}`);
  }
}

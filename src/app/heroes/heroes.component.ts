import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  /*selectedHero: Hero;*/
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  /**onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }*/

  /**getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
    Holt die mock heroes aus der mockdatei über den hero service provider
    Ist Synchron, da es lediglich aus einem festen array ausgelsen wird.
     Klappt nicht wenn die Daten von einem Server kommen sollen, da erst gewartet werdeen muss bis der Server geantwortet hat.
  }*/

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    /*heroes => this.heroes = heroes -> eine Funktion welche eine Hero[] heroes annimmt und ein Hero[] zurückgibt.
     Im prinzip wird das durch heroservice erhaltene heroes array in this.heroes geschrieben.*/
  }

  add(name: string): void {
    name = name.trim(); // Whitespaces entfernen.
    if (!name) { return; };
    this.heroService.addHero({ name } as Hero) // muss name sein, kann nicht wie von mir ursprünglich heroName sein, da das feld in der Hero klasse name heißt.
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  deleteHero(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  ngOnInit() {
    this.getHeroes();
  }

}

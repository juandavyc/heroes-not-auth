import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { every } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {


  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroService: HeroesService,
    private router: Router
  ) {

  }
  searchHero() {
    // tratar de no usar el nunable | null
    const value: string = this.searchInput.value || '';
    this.heroService.getSuggestions(value)
      .subscribe(heroes => {
        this.heroes = heroes;
      })

  }

  onSelectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero); // enviar al input
    this.selectedHero = hero;

    this.router.navigateByUrl(`heroes/${hero.id}`)

  }
}

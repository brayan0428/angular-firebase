import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes:any[] = [];
  constructor(private heroesService:HeroesService) {
    this.heroesService.getHeroes().subscribe(data => {
      this.heroes = data;
    })
  }

  ngOnInit() {
  }

  eliminarHeroe(key$:string){
    this.heroesService.eliminarHeroe(key$).subscribe(data => {
      delete this.heroes[key$];
    })
  }
}

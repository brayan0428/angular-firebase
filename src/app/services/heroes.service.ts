import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interfaces/heroe.interface';
import {map} from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  heroesURL:string = 'https://heroesapp-5cf7b.firebaseio.com/heroes.json';
  heroeURL:string = 'https://heroesapp-5cf7b.firebaseio.com/heroes';
  constructor(private http:Http) {}

  nuevoHeroe(heroe:Heroe){
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.post(this.heroesURL,body,{headers}).pipe(map(res => {
        return res.json();
      }))
  }

  actualizarHeroe(heroe:Heroe,key$:string){
    let url = `${this.heroeURL}/${key$}.json`;
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-Type':'application/json'
    });

    return this.http.put(url,body,{headers}).pipe(map(res => {
      return res.json();
    }))
  }

  getHeroe(key$:string){
    let url = `${this.heroeURL}/${key$}.json`;
    return this.http.get(url).pipe(map( res => {
      return res.json();
    }))
  }

  getHeroes(){
    return this.http.get(this.heroesURL).pipe(map(res => {
      return res.json();
    }))
  }

  eliminarHeroe(key$:string){
    let url = `${this.heroeURL}/${key$}.json`;
    return this.http.delete(url).pipe(map(res => {
      return res.json();
    }))
  }
}

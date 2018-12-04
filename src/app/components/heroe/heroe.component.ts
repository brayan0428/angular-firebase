import { Component, OnInit } from '@angular/core';
import { Heroe } from 'src/app/interfaces/heroe.interface';
import { HeroesService } from 'src/app/services/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
  heroe:Heroe = {
    nombre : '',
    bio : '',
    casa : 'Marvel'
  }

  id:string = "";
  constructor(private heroeService:HeroesService,
              private router:Router,
              private activatedRoute:ActivatedRoute) {
                this.activatedRoute.params.subscribe(params => {
                    this.id = params["id"];
                    if(this.id != "nuevo"){
                      this.heroeService.getHeroe(this.id).subscribe(data => {
                        this.heroe = data;
                      })
                    }
                })
              }

  ngOnInit() {}

  guardar(){
    if(this.id == "nuevo"){
      this.heroeService.nuevoHeroe(this.heroe).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/heroe',data.name]);
        },
        error => console.log(error)
      )
    }else{
      this.heroeService.actualizarHeroe(this.heroe,this.id).subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error)
      )
    }
  }

  agregarNuevo(forma:NgForm){
    this.router.navigate(['/heroe','nuevo']);
    forma.reset({
      'casa': 'Marvel'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
 cars: Car[] = [];
  dataLoaded=false;
  constructor(private carService:CarService , private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
     if(params["brandId"])
     {
       this.getCarsByBrand(params["brandId"])
     } 
      else if(params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }
      else{this.getCarsDetails()}
    
    })
  }
  getCarsDetails(){
   this.carService.getCarDetails().subscribe(response => {
      this.cars = response.data
       this.dataLoaded = true;
  })
  }
   getCarsByCar(carId:number){
    this.carService.getCarsByBrand(carId).subscribe(response=>{
      this.cars=response.data;
    })
  }
    getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data;
     
    })
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data;
    })
  }
 
}

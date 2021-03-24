import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';



@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  
   cars: Car[]=[];
  carImages:CarImage[]=[];
   apiUrl: string =  "https://localhost:44338/";

  constructor( private carImageService:CarimageService, private activatedRoute: ActivatedRoute,
    private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['carId']){
        this.getCarImagesById(params['carId'])
        this.getCarsByCar(params['carId'])
      }
    })
  }
   getCarImagesById(carId:number){
    this.carImageService.getCarImagesById(carId).subscribe(response=>{
      this.carImages=response.data;
    })
   }
  getCarsByCar(carId:number){
    this.carService.getCarsByCar(carId).subscribe(response=>{
      this.cars=response.data;
   
    })
  }
  
  getSliderClassName(index:Number){
    if(index == 0){
      return "carousel-item active";
    } else {
      return "carousel-item";
    }
  }


 
    
  
  }


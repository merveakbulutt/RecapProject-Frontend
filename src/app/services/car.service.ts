import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {

    apiUrl="https://localhost:44338/api/";
   
 
  constructor(private httpClient:HttpClient) { }
  
   getCarDetails():Observable<ListResponseModel<Car>>{
     let newPath=this.apiUrl + "cars/getcardetails"
   return this.httpClient.get<ListResponseModel<Car>>(newPath);
    }
      getCarsByCar(carId:number):Observable<ListResponseModel<Car>>{
     let newPath=this.apiUrl +"cars/getcardetailsbycarid?carId="+carId
   return this.httpClient.get<ListResponseModel<Car>>(newPath);
   
    }
    
   getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
     let newPath=this.apiUrl +"cars/getcardetailsbybrandid?brandId="+brandId
   return this.httpClient.get<ListResponseModel<Car>>(newPath);

    }
     getCarsByColor(colorId:Number):Observable<ListResponseModel<Car>>{
     let newPath=this.apiUrl +"cars/getcarsdetailsbycolorid?colorId="+colorId
   return this.httpClient.get<ListResponseModel<Car>>(newPath);

    }
    
  }



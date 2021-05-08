import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  isCardExist(card: Card): Observable<ResponseModel> {
    let newPath = this.apiUrl + "cards/iscardexist"
    return this.httpClient.post<ResponseModel>(newPath, card);
  }

  add(card: Card): Observable<ResponseModel> {
    let newPath = this.apiUrl + "cards/add"
    return this.httpClient.post<ResponseModel>(newPath, card)
  }
  update(card: Card): Observable<ResponseModel> {
    let newPath = this.apiUrl + "cards/update"
    return this.httpClient.put<ResponseModel>(newPath, card)
  }
  get(): Observable<ListResponseModel<Card>> {
    let newPath = this.apiUrl + "cards/getall";
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }
  delete(card: Card): Observable<ListResponseModel<Card>> {
    let newPath = this.apiUrl + "cards/delete";
    return this.httpClient.post<ListResponseModel<Card>>(newPath, card);
  }
  getByCustomerId(customerId: number): Observable<ListResponseModel<Card>> {
    return this.httpClient.get<ListResponseModel<Card>>(this.apiUrl + "cards/getbycustomerid?customerId=" + customerId)
  }




}

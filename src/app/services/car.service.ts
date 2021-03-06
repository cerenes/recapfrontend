import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { environment } from 'src/environments/environment';
import { CarDetail } from '../models/carDetail';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44320/api/';

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbybrand?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "cars/getbycolor?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetailsById(Id:number):Observable<ListResponseModel<CarDetail>>{
    let newPath = environment.apiUrl+"/cars/getbycardetail="+Id;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  add(car:Car): Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add", car)
  }
  update(car: Car): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl, car);
 }
 getCarById(Id: number): Observable<SingleResponseModel<Car>> {
  let newPath: string = this.apiUrl + 'cars/getbyid?Id=' + Id;
  return this.httpClient.get<SingleResponseModel<Car>>(newPath);
}
}
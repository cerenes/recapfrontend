import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';

import { CarResponseModel } from 'src/app/models/carResponseModel';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  filterText = '';
  brandId: number;
  colorId: number;
  dataLoaded = false;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
        this.getColors();
        this.getBrands();
       
      }
    });
  }
  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });

  }
  
}

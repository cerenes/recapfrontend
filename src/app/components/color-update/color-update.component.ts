import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
   selector: 'app-color-update',
   templateUrl: './color-update.component.html',
   styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

   // @ts-ignore
   colorUpdateForm: FormGroup;
   color!: Color;

   constructor(private formBuilder: FormBuilder,
               private colorService: ColorService,
               private activatedRoute: ActivatedRoute,
               private toastrService: ToastrService) {
   }

   ngOnInit(): void {
      this.activatedRoute.params.subscribe(param => {
         this.getColorById(param['colorId']);
      });
   }

   getColorById(colorId: number) {
      this.colorService.getColorById(colorId).subscribe(response => {
         this.color = response.data;
         this.createColorUpdateForm();
      });
   }

   createColorUpdateForm() {
      this.colorUpdateForm = this.formBuilder.group({
         colorId: [this.color.colorId, Validators.required],
         colorName: [this.color.colorName, Validators.required]
      });
   }

   update() {
      let color: Color = this.colorUpdateForm.value

      if (!this.colorUpdateForm.valid) {
         this.toastrService.warning('Lütfen boş bilgi bırakmayın', 'Dikkat');
         return;
      }

      this.colorService.update(color).subscribe(responseSuccess => {
         return this.toastrService.success(responseSuccess.message, 'Başarılı');
      }, responseError => {
         if (responseError.error.ValidationErrors.length == 0) {
            this.toastrService.error(responseError.error.Message, responseError.error.StatusCode);
            return;
         }

         for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(
               responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası'
            );
         }
      });
   }
}
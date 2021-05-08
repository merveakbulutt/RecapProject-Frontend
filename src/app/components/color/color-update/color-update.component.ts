import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  color: Color;
  colorUpdateForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private colorService: ColorService, private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["colorId"]) {
        this.getColorById(params["colorId"]);
        this.createColorUpdateForm();
      }
    });
  }
  getColorById(colorId: number) {
    this.colorService.getColorById(colorId).subscribe((response) => {
      this.color = response.data
    })
  }
  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: ["", Validators.required],
      colorName: ["", Validators.required]
    })
  }
  updateColor() {
    this.colorUpdateForm.patchValue({ colorId: this.color.colorId })
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value)
      this.colorService.update(colorModel).subscribe((response) => {
        this.toastrService.success(response.message, "Başarılı")
        this.router.navigate(["/colors/list"])
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'Doğrulama hatası'
            );
          }
        }
      })
    }
    else {
      this.toastrService.error("Formunuz eksik", "Dikkat")
    }
  }

}



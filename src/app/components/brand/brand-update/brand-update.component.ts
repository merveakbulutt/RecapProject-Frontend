import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {
  brand: Brand;
  brandUpdateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private brandService: BrandService, private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandById(params['brandId']);
        this.createBrandUpdateForm();
      }
    });
  }
  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: ["", Validators.required],
      brandName: ["", Validators.required]
    });
  }

  getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
      this.createBrandUpdateForm();
    });
  }

  updateBrand() {
    this.brandUpdateForm.patchValue({ brandId: this.brand.brandId })
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
        response => {
          this.toastrService.success(response.message, "Başarılı")
          this.router.navigate(["/brands/list"])
        },
        responseError => {
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


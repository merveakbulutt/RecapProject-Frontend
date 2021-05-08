import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
  providers: [DatePipe],
})
export class RentalComponent implements OnInit {
  customers: Customer[];
  customerId: Number;
  rentDate: Date;
  returnDate: Date;
  @Input() car: Car;

  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;

  rental: Rental;
  cars: Car;

  constructor(private customerService: CustomerService,
    private datePipe: DatePipe, private router: Router, private toastrService: ToastrService,
    private rentalService: RentalService) { }

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe(response => {
      this.customers = response.data
    })
  }

  setCustomerId(customerId: string) {
    this.customerId = +customerId;
    console.log(this.customerId);
  }

  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }
  addRental() {
    let rental: Rental;
    if (localStorage.getItem('token') && this.rentDate != undefined) {
      rental = {
        rentDate: this.rentDate,
        returnDate: this.returnDate,
        dailyPrice: this.car.dailyPrice,
        carId: this.car.carId,
        customerId: parseInt(this.customerId.toString())
      }
    }

    this.rentalService.add(rental).subscribe(response => {
      this.toastrService.success("Araba kiralama için uygun", "Başarılı");
      console.log(response.message)
      this.toastrService.info("Ödeme sayfasına yönlendiriliyorsunuz.", "Ödeme işlemleri")
      this.router.navigate(['/payment/', JSON.stringify(rental)]);
    }, responseError => {
      this.toastrService.error(
        responseError.error.message,
        'Kiralama işlemi başarısız'
      )
    })
  }


  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }


}
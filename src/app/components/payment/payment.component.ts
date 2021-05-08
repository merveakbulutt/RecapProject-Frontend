import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { Rental } from 'src/app/models/rental';
import { Car } from 'src/app/models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { Card } from 'src/app/models/card';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { HttpResponseBase } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {

  paymentAddForm: FormGroup;
  rental: Rental;
  car: Car;
  customers: Customer[] = [];

  cardId: number;
  cardNumber: string;
  cardOwnerName: string;
  expirationDate: string;
  cardCvv: string;

  cards: Card[] = [];

  amount: number = 0;

  constructor(
    private cardService: CardService,
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private rentalService: RentalService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.createPaymentAddForm();
        this.getCarsByCar();

      }
    })

  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      cardId: ['', Validators.required],
      cardOwnerName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cardCvv: ['', Validators.required],
    });
  }

  getCarsByCar() {
    this.carService.getCarsByCar(this.rental.carId).subscribe(response => {
      this.car = response.data[0];
      this.totalPayment();
    })
  }


  totalPayment() {
    if (this.rental.returnDate != null) {
      var returnDate = new Date(this.rental.returnDate.toString());
      var rentDate = new Date(this.rental.rentDate.toString());
      var difference = returnDate.getTime() - rentDate.getTime();

      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      this.amount = numberOfDays * this.car.dailyPrice;


    }
  }


  payment() {
    let paymentModel: Payment = {
      amount: this.amount
    }
    this.paymentService.addPayment(paymentModel).subscribe(response => {
      this.toastrService.success("Ödeme işlemi tamamlandı", "Başarılı")
    }, responseError => {
      this.toastrService.error(responseError.erorr)
    })
  }







}

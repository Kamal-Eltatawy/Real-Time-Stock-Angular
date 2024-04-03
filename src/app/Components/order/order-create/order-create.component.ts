import { OrderService } from './../../../Services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrder } from '../../../Interfaces/iorder';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css',
})
export class OrderCreateComponent implements OnInit {
  public stockSymbol: string = '';
  public successMessage: string = '';
  public errorMessage: { [key: string]: string[] } = {};
  public errorMessageKeys: string[] = [];
  orderForm: FormGroup = new FormGroup({
    type: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
  });
  get getType(): any {
    return this.orderForm.controls['type'];
  }
  get getquantity(): any {
    return this.orderForm.controls['quantity'];
  }
  constructor(
    public orderservice: OrderService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.stockSymbol = this.activatedRoute.snapshot.params['symbol'];
    if (this.stockSymbol == '') {
      this.router.navigate(['/Stock']);
    }
    console.log(this.stockSymbol);
  }
  onSubmit() {
    if (this.orderForm.invalid) {
      return;
    }

    const orderData: IOrder = {
      type: this.orderForm.value.type,
      quantity: this.orderForm.value.quantity,
      Symbol: this.stockSymbol,
    };

    this.orderservice.createOrder(orderData).subscribe({
      next: (response) => {
        this.successMessage = 'Order created successfully.';
        this.router.navigate(['/Stock']);
      },
      error: (err) => {
        console.log(err);
        if (err.error && err.error.errors) {
          for (const key of Object.keys(err.error.errors)) {
            this.errorMessage = err.error.errors;
            this.errorMessageKeys = Object.keys(this.errorMessage);
          }
        } else {
          this.errorMessage = {
            general: ['Failed to create order. Please try again.'],
          };
          this.errorMessageKeys = ['general'];
        }
        this.successMessage = '';
      },
    });
  }
}

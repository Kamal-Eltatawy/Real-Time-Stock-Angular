import { OrderService } from './../../Services/order.service';
import { Component, OnInit } from '@angular/core';
import { IOrderResponse } from '../../Interfaces/iorder-response';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit {
  orders: IOrderResponse[] = [];
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    console.log('On int');
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}

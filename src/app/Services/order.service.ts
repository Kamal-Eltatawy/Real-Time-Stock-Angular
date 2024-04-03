import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOrder } from '../Interfaces/iorder';
import { IOrderResponse } from '../Interfaces/iorder-response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private createOrderapiUrl = 'https://localhost:7110/api/Orders/Create';
  private getOrderapiUrl = 'https://localhost:7110/api/Orders';

  constructor(private http: HttpClient) {}

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.createOrderapiUrl, order);
  }

  getAllOrders(): Observable<IOrderResponse[]> {
    return this.http.get<IOrderResponse[]>(this.getOrderapiUrl);
  }
}

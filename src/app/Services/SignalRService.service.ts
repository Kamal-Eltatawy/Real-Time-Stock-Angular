import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: HubConnection;
  private stockDataSubject = new Subject<any>();
  public stockData$: Observable<any[]> = this.stockDataSubject.asObservable();

  constructor() {}

  public startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7110/stockTickerHub') 
      .build();

    this.hubConnection.on('receiveStockUpdate', (data: any) => {
      console.log('Received stock updates:', data);
      this.stockDataSubject.next(data);
    });

    this.hubConnection.start().catch((err) => console.error(err));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IStock } from '../Interfaces/istock';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(private http: HttpClient) {}
  private getStockapiUrl = 'https://localhost:7110/api/stocks';

  // getRealTimeStockData(intervalMs: number): Observable<IStock[]> {
  //   return interval(intervalMs).pipe(
  //     switchMap(() => this.http.get<IStock[]>(this.apiUrl))
  //   );
  // }
  getRealTimeStockData(): Observable<IStock[]> {
    return this.http.get<IStock[]>(this.getStockapiUrl);
  }
}

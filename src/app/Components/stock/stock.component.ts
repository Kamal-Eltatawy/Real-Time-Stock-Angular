import { Component, OnInit } from '@angular/core';
import { StockService } from '../../Services/stock.service';
import { IStock } from '../../Interfaces/istock';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css',
})
export class StockComponent implements OnInit {
  Stocks: IStock[] = [];
  constructor(private stockService: StockService) {}
  ngOnInit(): void {
    console.log('On int');
    this.stockService.getRealTimeStockData().subscribe({
      next: (data) => {
        this.Stocks = data;
        console.log(data);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
}

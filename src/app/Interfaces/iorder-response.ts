export interface IOrderResponse {
  orderId: number;
  stockName: string;
  symbol: string;
  quantity: number;
  type: string;
  timeStamp: Date;
}

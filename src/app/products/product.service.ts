import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { IProduct } from "./product";
import { Observable } from "rxjs/observable";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";

@Injectable()
export class ProductService {
  private _productUrl = "./api/products/products.json";

  constructor(private _http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this._http
      .get<IProduct[]>(this._productUrl)
      .do((data) => console.log("All: " + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return Observable.throw(err.message);
  }
}

import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: "pm-products",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filterProducts = this.listFilter
      ? this.performFilter(this.listFilter)
      : this.products;
  }

  filterProducts: IProduct[];
  products: IProduct[] = [];

  constructor(private _productSerivce: ProductService) {}

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.products = this._productSerivce.getProducts();
    this.filterProducts = this.products;
  }

  performFilter(filterby: string): IProduct[] {
    filterby = filterby.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) =>
        product.productName.toLocaleLowerCase().indexOf(filterby) !== -1
    );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = "Product List " + message;
    this.filterProducts = this.products;
  }
}

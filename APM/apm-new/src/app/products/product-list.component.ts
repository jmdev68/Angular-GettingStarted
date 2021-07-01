import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css' ]

})

export class ProductListComponent implements OnInit, OnDestroy{
  
  constructor(private productService: ProductService) {}; 

    pageTitle: string = 'Product List new';
    imageWidth = 50;
    imageMargin = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    sub!: Subscription;

    
    private _listFilter: string = '';
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      console.log('In listFilter setter value: ', value , '  -- string: ' , this._listFilter);
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[]=[];


    products: IProduct[] = [];
 
    performFilter(filterBy: string): IProduct[]{
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string): void{
      this.pageTitle = 'Product List: ' + message;
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      
      this.sub = this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      });      
    }

    ngOnDestroy(): void{
      this.sub.unsubscribe();
    }
}
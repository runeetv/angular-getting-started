import { Component  , OnDestroy, OnInit} from "@angular/core";
import { Subscription } from "rxjs";
import {IProduct} from './product';
import { ProductService } from "./product.service";

@Component({
    //selector : 'pm-products',
    templateUrl : './product-list.component.html',
    styleUrls : ['./product-list.component.css']
})
export class ProductListComponent implements OnInit , OnDestroy{

    pageTitle: string = 'Product List!';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;    
    private _listFilter: string = '';
    errorMessage: string = "";
    sub! : Subscription;
    //private _productService;
    //listFilter: string = 'cart';

    constructor(private productService : ProductService){}

    get listFilter():string{
        return this._listFilter;
    }

    set listFilter(value:string){
        this._listFilter = value;        
        console.log('In setter:' , value);
        this.filteredProducts = this.PerformFilter(value);
    }

    filteredProducts: IProduct[]=[];

    products: IProduct[] = [];
    

      PerformFilter(filterBy: string): IProduct[] {

        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter( (product : IProduct) => 
                product.productName.toLocaleLowerCase().includes(filterBy) );
     }

      toggleImage():void{          
        this.showImage = !this.showImage;
      }

      ngOnInit(): void{          
          // this.products = this.productService.getProducts();
          this.sub = this.productService.getProducts().subscribe({
            next: products => {
              this.products = products;
              this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
          });

          
          console.log('In OnInit');
        }

        ngOnDestroy(){
          this.sub.unsubscribe();
        }

        onRatingClicked(message:string):void{
          this.pageTitle = 'Product List: ' + message;
        }
}


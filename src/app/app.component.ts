import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { v4 as uuid } from 'uuid';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  AddProductForm:any;
  productList:any = [];
  filterProductList:any = [];
  cartProductList:any[] = [];
  productListView = true;
  constructor(private formbuilder:FormBuilder,private apiService:ApiService) { 
  }
  ngOnInit(): void {
    this.AddProductForm=this.formbuilder.group({
      productName:['',[Validators.required]],
      quantity:['',[Validators.required]]
    })
    this.getProductList();

    let storageItems:any = localStorage.getItem('cartItems');
    if(storageItems != null) {
      this.cartProductList = JSON.parse(storageItems);
    }
  }
  getProductList() {
    this.apiService.productsList().subscribe(
      (res) => {
        this.productList = res;
        for(let i=0; i<this.productList.length;i++) {
          if(this.productList[i].productName) {
            this.filterProductList.push(this.productList[i]);
          }
        }
        return this.filterProductList;
      },
      (error) => {
        console.log(error);
      }
    )
  }
  addProductToCart(product:any) {
    let data_object={
      "orderId": product.productId,
      "customerId": product.productId,
      "productId": product.productId,
      "quantity": 1
    }
    this.apiService.orderproduct(data_object).subscribe(
      (res:any)=>{
        if(res == true){
          const productExistInCart:any = this.cartProductList.find(({productId}) => productId === product.productId); // cart listing
          if (!productExistInCart) {
            this.cartProductList.push({...product, num:1});
          }
          else {
            productExistInCart.num += 1;
          }
          this.getProductList();
          localStorage.setItem('cartItems', JSON.stringify(this.cartProductList));
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  AddNewProduct(){
    const addproduct={
      productName:this.AddProductForm.value.productName,
      productId:uuid(),
      availableQuantity:this.AddProductForm.value.quantity,
    }
    this.apiService.NewProductAdd(addproduct).subscribe(
      (res)=>{
        if(res == true){
          this.getProductList();
          this.AddProductForm.reset();
          this.productListView = true;
        }
      },
      (error)=>{
        console.log(error)
      }
    )
  }
  createProduct() {
    this.productListView = false;
  }
  showProducts() {
    this.productListView = true;
  }
}



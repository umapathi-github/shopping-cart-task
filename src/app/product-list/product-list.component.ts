import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Input() products:Array<any>=[];
  @Output() productAdded = new EventEmitter();
  @Output() productCreate = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  addProductToCart(product:any) {
    this.productAdded.emit(product);
  }
  createProduct() {
    this.productCreate.emit();
  }
}

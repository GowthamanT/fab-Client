import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CredentialService } from 'src/app/services/credential.service';
import { WardrobeService } from 'src/app/services/wardrobe.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  data:any = [];
  prodId:any = '';

  product:any = [];
  productData:any={};

  constructor(private wardrobeService: WardrobeService, private route: Router, private activeRoute: ActivatedRoute,
    private credentials:CredentialService) { }

  ngOnInit(): void {
    this.data = this.wardrobeService.getData();
    console.log(this.data);

    this.productData = this.credentials.productData;
    console.log(this.productData);
    
    window.scrollTo(0, 0);
  }

  getSpecificProd() {
    this.data.forEach( (item:any)=> {
      if(item._id == this.prodId) {
        this.product.push(item);
      }
    });
    console.log(this.product);
  }

}

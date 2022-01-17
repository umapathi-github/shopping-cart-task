import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const baseUrl: any = environment.base_url;

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    constructor(private http: HttpClient) { }

    productsList() {
        return this.http.get(baseUrl + '/Product');
    }
    orderproduct(data:object){
        return this.http.post(baseUrl+'/OrderProducts',data);
    }
    NewProductAdd(data:object){
        return this.http.post(baseUrl+'/Product',data)
    }
}
import {Injectable} from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class GetDataService{
    constructor(private http:Http){
        console.log("get data service is initialized");
    }

getPostData(){
    return this.http.get('http://192.168.150.69:3000/getData')
        .map((res:Response) => res.json());

}
}
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class gitapi {
    constructor(private _http: Http) {
        
    }
gitsearch(search):Observable<any>{
    var authHeader = new Headers();
    authHeader.append('Content-Type', 'application/json');
    return this._http.get(search, { headers: authHeader }).map((response: Response) => {
        let local_masterdata= response.json();
    
        if(!local_masterdata){
            return {msg:'No results found'}
        }
        if (local_masterdata.total_count == 0) {
            return {msg:'No results found'}
        } else {
            
            return local_masterdata;
        }
    }).catch(e => {
        if (e.status === 401) {
            return Observable.throw('Unauthorized');
        }
        else if(e.status === 403) {
            return Observable.throw('Forbidden Search');
        }
        else if(e.status === 422) {
            return Observable.throw('Unprocessable Entity');
        }
    });
   
}
}
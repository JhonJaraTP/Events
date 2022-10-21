import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { 

  }

  // Gett

  GetEmployee(CCMSID: number, IdEvent: number){
    const path = environment.apiUrl + '/api/SearchEmployee';
    return this.http.post(path, {CCMSID, IdEvent});
  }
  GetGender(){
    const path = environment.apiUrl + '/api/SearchGender';
    return this.http.post(path, {});
  }
  GetCity(){
    const path = environment.apiUrl + '/api/SearchCity';
    return this.http.post(path, {});
  }
  GetActivity(){
    const path = environment.apiUrl + '/api/SearchActivity';
    return this.http.post(path, {});
  }

  GetEvent(Id: number){
    const path = environment.apiUrl + '/api/SearchEvent';
    return this.http.post(path, {Id});
  }
  GetResultEvent(Id: number){
    const path = environment.apiUrl + '/api/SearchResultEvent';
    return this.http.post(path, {Id});
  }
  // Sett


  SetRegister(CCMSID: number,Name: string,IdFical:number,IdCity: number, IdGender:number,Age:number,IdEvent:  number){
    const path = environment.apiUrl + '/api/CreateRegister';
    return this.http.post(path, {CCMSID,Name,IdFical,IdCity,IdGender,Age,IdEvent});
  }
  SetResultEvent(IdRegister: number,IdActivity:number,Result: number){
    const path = environment.apiUrl + '/api/CreateResultEvent';
    return this.http.post(path, {IdRegister,IdActivity,Result});
  }


}
 
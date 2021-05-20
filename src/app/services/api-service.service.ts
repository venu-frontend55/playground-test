import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPatients() {
    return this.httpClient.get(environment.queryURI + '/Patient',
      { headers: this.getHeaders() });
  }

  getPatientsFilter(filter="") {
    if(!filter){
      filter = 'birthdate=ge1960-01-01&birthdate=lt1966-01-01&_sort=birthdate';
    }
    return this.httpClient.get(environment.queryURI + '/Patient?'+filter,
      { headers: this.getHeaders() });
  }

  
  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/fhir+json'
    });
    return headers;
  }
}



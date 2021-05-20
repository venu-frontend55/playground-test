import { Component, OnInit } from '@angular/core';
import { ApiService } from '../app/services/api-service.service';
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'fhir-app-test';
  patients:any = [];
  apiCalledTime:any;
  apiExecTime:any;
  disableBtn:boolean = false;
  fname:any;
  dob:any;
  dataLoaded = false;
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    var t0 = performance.now();
    this.apiCalledTime = new Date();
    
    
    this.apiService.getPatientsFilter().subscribe((data:any) => {
        console.log(data);
        var t1 = performance.now();
        this.apiExecTime = (t1-t0);
        this.formatData(data);
        this.dataLoaded = true;
      }
    )
  }
  formatData(data){
    this.patients = [];
    _.forEach(data.entry, (patient:any)=>{
      let obj = {
        id: _.get(patient, 'resource.id',''),
        family: _.get(patient, 'resource.name[0].family','--'),
        given: _.get(patient, 'resource.name[0].given[0]','--'),
        dob: _.get(patient, 'resource.birthDate','--'),
        phone: _.get(patient, 'resource?.telecom[0].value','--'),
        gender: _.get(patient, 'resource.gender','--'),
        maritalStatus: _.get(patient, 'resource.maritalStatus.text','--'),
      }
      this.patients.push(obj);
    });
  }
  
  search(){
    this.disableBtn = true;
    this.dataLoaded = false;
    let filter = '';
    if(this.fname){
      filter = `given:contains=${this.fname}`;
    }
    if(this.dob){
      if(this.fname){
        filter +='&';
      }
      filter += `birthdate=${this.dob}`
    }
    this.apiService.getPatientsFilter(filter).subscribe((data:any) => {
      this.formatData(data);
      this.disableBtn = false;
      this.fname = '';
      this.dob = '';
      this.dataLoaded = true;
    }
  )

  }
}


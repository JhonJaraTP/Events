import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ShowAlert } from '../Controller/ShowAlert';
import { RequestsService } from '../services/request.service';

@Component({
  selector: 'app-register-result-event',
  templateUrl: './register-result-event.component.html',
  styleUrls: ['./register-result-event.component.css']
})
export class RegisterResultEventComponent implements OnInit {

  constructor(private requets: RequestsService, private Formbuilder: FormBuilder) {
    this.FormData();
  }

  public subcriptionRequest: Subscription;
  public subcriptionGender: Subscription;
  public showAlert: ShowAlert = new ShowAlert;

  FormEvent: FormGroup;
  FormResult: FormGroup;
  public DataEvent: any[] = []
  public DataActivity: any[] = []
  FormView: boolean

  ngOnInit(): void {
    this.SearchBasicData()
    this.FormView = false
  }

  private FormData() {
    this.FormEvent = this.Formbuilder.group({
      IdEvent: ['1', [Validators.required]],
    })
    this.FormResult = this.Formbuilder.group({
      Activity1: ['', [Validators.required]],
      Activity2: ['', [Validators.required]],
      Activity3: ['', [Validators.required]],
    })
  }

  public SearchEvent() {

    this.showAlert.UplodadData("Looking for Data", "Looking for Information in the System")
    if (this.subcriptionRequest) { this.subcriptionRequest.unsubscribe(); }
    this.subcriptionRequest = this.requets.GetEvent(parseInt(this.FormEvent.value.IdEvent))
      .subscribe((res: any[]) => {
        console.log(res)
        
        if (res.length > 0) {
            let date = new Date();
            let dateEvent = Date.parse(res[0]["DateEvent"])
            let dateConvert = new Date(dateEvent)
            if (date.getDate() >= dateConvert.getDate()+1) {
              this.DataEvent = res;
              this.FormEvent.controls.IdEvent.disable();
              this.FormView = true
              Swal.close();
            } else {
              this.showAlert.NotRegister("Access denied", "Registration for the event has ended")
              this.FormView = false
            }
          
        } else {
          this.showAlert.NotRegister("Error", "Event not found")
          this.FormView = false
        }

        //Swal.close();
      },
        err => {
          console.log(err);

          Swal.close();
        });
  }

  public CreateResult(Id) {
    this.showAlert.UplodadData("Looking for Data", "Looking for Information in the System")
    if (this.subcriptionRequest) { this.subcriptionRequest.unsubscribe(); }
    this.subcriptionRequest = this.requets.SetResultEvent(parseInt(Id), 1, parseInt(this.FormResult.value.Activity1))
      .subscribe((res: any[]) => {
        this.subcriptionRequest = this.requets.SetResultEvent(parseInt(Id), 2, parseInt(this.FormResult.value.Activity2))
          .subscribe((res: any[]) => {
            this.subcriptionRequest = this.requets.SetResultEvent(parseInt(Id), 3, parseInt(this.FormResult.value.Activity3))
              .subscribe((res: any[]) => {
                this.showAlert.SuccessProcces("Successful Registration")
                
              }, err => { console.log("3: "+err); Swal.close(); });
          }, err => { console.log("2: "+err); Swal.close(); });
      }, err => { console.log("1: "+err); Swal.close(); });

    console.log(this.FormResult.value);

  }

  private SearchBasicData() {
    if (this.subcriptionGender) { this.subcriptionGender.unsubscribe(); }
    this.subcriptionGender = this.requets.GetActivity()
      .subscribe((res: any[]) => {
        console.log(res);

        this.DataActivity = res
      },
        err => {
          Swal.close();
        });

  }

}

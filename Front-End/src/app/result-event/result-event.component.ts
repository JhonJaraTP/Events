import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { ShowAlert } from '../Controller/ShowAlert';
import { RequestsService } from '../services/request.service';

@Component({
  selector: 'app-result-event',
  templateUrl: './result-event.component.html',
  styleUrls: ['./result-event.component.css']
})
export class ResultEventComponent implements OnInit {

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
    this.subcriptionRequest = this.requets.GetResultEvent(parseInt(this.FormEvent.value.IdEvent))
      .subscribe((res: any[]) => {
        console.log(res)
        
        if (res.length > 0) {
            let date = new Date();
            let dateEvent = Date.parse(res[0]["DateEvent"])
            let dateConvert = new Date(dateEvent)
            if (date.getDate() >= dateConvert.getDate() +1) {
              this.DataEvent = res;
              this.FormEvent.controls.IdEvent.disable();
              Swal.close();
            } else {
              this.showAlert.NotRegister("Access denied", "The event is still valid")
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

}

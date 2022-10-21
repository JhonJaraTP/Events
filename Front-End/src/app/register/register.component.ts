import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from '../services/request.service';
import Swal from 'sweetalert2';
import { ShowAlert } from 'src/app/Controller/ShowAlert';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(private requets: RequestsService, private Formbuilder: FormBuilder) {
    this.FormData();
  }

  public subcriptionRequest: Subscription;
  public subcriptionGender: Subscription;
  public subcriptionCity: Subscription;
  public showAlert: ShowAlert = new ShowAlert;

  FormSeach: FormGroup;
  FormValid: FormGroup;
  FormEvent: FormGroup;
  public DataGender: any[] = []
  public DataCity: any[] = []
  public DataEvent: any[] = []
  FormView:boolean

  ngOnInit(): void {
    
    this.SearchBasicData();
    this.FormView = false
  }

  private FormData() {
    this.FormValid = this.Formbuilder.group({
      IDCCMS: ['12345', [Validators.required]],
    })
    this.FormSeach = this.Formbuilder.group({
      Name: ['', [Validators.required]],
      IdFiscal: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Age: ['',[Validators.required]]
    })

    this.FormEvent = this.Formbuilder.group({
      IdEvent: ['1', [Validators.required]],
    })

    this.FormSeach.controls.Name.disable();
    this.FormSeach.controls.IdFiscal.disable();
    this.FormSeach.controls.City.disable();
    this.FormSeach.controls.Gender.disable();
    this.FormSeach.controls.Age.disable();
  }

  public SearchEvent(){
    
    //this.showAlert.UplodadData("Looking for Data", "Looking for Information in the System")
    if (this.subcriptionRequest) { this.subcriptionRequest.unsubscribe(); }
    this.subcriptionRequest = this.requets.GetEvent(parseInt(this.FormEvent.value.IdEvent))
      .subscribe((res: any[]) => {
        console.log(res)
        this.DataEvent = res;
        if(res.length > 0){
          if(res.length < res[0]["LimitPeople"]){
            let date = new Date();
            let dateEvent = Date.parse(res[0]["DateEvent"])
            let dateConvert = new Date(dateEvent)
            if(date.getDate() < dateConvert.getDate() -2){
              console.log("Aprobado");
              
              this.FormEvent.controls.IdEvent.disable();
              this.FormView = true
              //Swal.close();
            }else {
              this.showAlert.NotRegister("Access denied", "Registration for the event has ended")
              this.FormView = false
            }
          }else{
            this.showAlert.NotRegister("Access denied", "The event is already full")
            this.FormView = false
          }
        }else{
          this.showAlert.NotRegister("Error", "Event not found")
          this.FormView = false
        }
      },
        err => {
          console.log(err);
          
          Swal.close();
        });
  }



  public SearchCCMSID() {
    this.showAlert.UplodadData("Looking for Data", "Looking for Information in the System")
    if (this.subcriptionRequest) { this.subcriptionRequest.unsubscribe(); }
    this.subcriptionRequest = this.requets.GetEmployee(parseInt(this.FormValid.value.IDCCMS), this.FormEvent.value.IdEvent)
      .subscribe((res: any[]) => {
        
        if(this.DataEvent.find(data => data.CCMSID  === res[0]["CCMSID"])){
          this.showAlert.NotRegister("Access denied", "This CCMSID is already registered in this event")
          return
        }

        if (res.length > 0) {
          if (res[0]["Position"] == 1) {
            this.FormSeach.controls.Name.enable();
            this.FormSeach.controls.IdFiscal.enable();
            this.FormSeach.controls.City.enable();
            this.FormSeach.controls.Gender.enable();
            this.FormSeach.controls.Age.enable();
            Swal.close();
            this.FormValid.controls.IDCCMS.disable();
            this.SearchEvent();

          } else {
            this.showAlert.NotRegister("Access denied", "The position found of " + res[0]["CCMSID"] + " does not belong to that of an agent, currently the position found is " + res[0]["PositionName"] + ".")
          }

        } else {
          this.showAlert.NotRegister("Error", "CCMS ID not found")
        }
        //console.log(res[0]["CCMSID"])
        //this.GenerateTable(res);

      },
        err => {
          Swal.close();
        });
  }

  private SearchBasicData() {
    if (this.subcriptionGender) { this.subcriptionGender.unsubscribe(); }
    this.subcriptionGender = this.requets.GetGender()
      .subscribe((res: any[]) => {
        this.DataGender = res
      },
        err => {
          Swal.close();
        });
    if (this.subcriptionCity) { this.subcriptionCity.unsubscribe(); }
    this.subcriptionCity = this.requets.GetCity()
      .subscribe((res: any[]) => {
        this.DataCity = res
      },
        err => {
          Swal.close();
        });
  }

  public RegisterInfo() {
    if (this.FormSeach.valid) {
      this.showAlert.UplodadData("Loading data", "Creating Records in the system")
      if (this.subcriptionRequest) { this.subcriptionRequest.unsubscribe(); }
      this.subcriptionRequest = this.requets.SetRegister(
        parseInt(this.FormValid.value.IDCCMS),
        this.FormSeach.value.Name,
        parseInt(this.FormSeach.value.IdFiscal),
        parseInt(this.FormSeach.value.City),
        parseInt(this.FormSeach.value.Gender),
        parseInt(this.FormSeach.value.Age),
        parseInt(this.FormEvent.value.IdEvent)
        )
        .subscribe((res: any[]) => {
          console.log(res)
          if(res.length == 0){
            this.showAlert.SuccessProcces("Successful Registration")
            this.FormSeach.reset();
            this.FormValid.reset();
            this.FormSeach.controls.Name.disable();
            this.FormSeach.controls.IdFiscal.disable();
            this.FormSeach.controls.City.disable();
            this.FormSeach.controls.Gender.disable();
            this.FormSeach.controls.Age.disable();
            this.FormValid.controls.IDCCMS.enable();
          }

        },
          err => {
            Swal.close();
          });
    }
  }


  ngOnDestroy() {
    if (this.subcriptionRequest) { this.subcriptionRequest.unsubscribe(); }
  }

}

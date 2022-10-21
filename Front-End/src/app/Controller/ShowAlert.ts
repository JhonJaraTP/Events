import Swal from 'sweetalert2';

export class ShowAlert {
  constructor() { }

  public NotRegister(Tittle: string, Msj: string) {

    Swal.fire({
      title: ''+Tittle,
      html: '' + Msj,
      icon: 'error',
      showLoaderOnConfirm: false,
      timer: 5000,
    })
    Swal.showLoading();
  }

  public UplodadData(Title: String, Mesagge: string) {

    Swal.fire({
      title: '' + Title,
      html: '' + Mesagge,
      icon: 'warning',
      allowOutsideClick: false,
    })
    Swal.showLoading();
  }

  public SuccessProcces(Data: string) {
    Swal.fire({
      title: '¡Súper!',
      text: '' + Data,
      icon: "success",
      timer: 3000,
      showLoaderOnConfirm: false,

    });
  }


}
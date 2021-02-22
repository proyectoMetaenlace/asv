import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(tittle: string, body: string) {
    this.toastr.success(body, tittle);
  }

  showError(tittle: string, body: string) {
    this.toastr.error(body, tittle);
  }

  showWarning(tittle: string, body: string) {
    this.toastr.warning(body, tittle);
  }

  showInfo(tittle: string, body: string) {
    this.toastr.info(body, tittle);
  }

  notificationResponse(data: any, showWhenSuccess: boolean = true) {

    switch (data.status) {
      case 0: {
          if(showWhenSuccess){
            this.showSuccess('Action completed', '');
          }
        break;
      }
      case 1: {
        this.showWarning('Alert', data.message);
        break;
      }
      case 2: {
        this.showError('Error', data.message);
        break;
      }
      default: {
        break;
      }
    }

  }
}

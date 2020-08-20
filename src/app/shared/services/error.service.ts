import { Injectable, TranslateService, Router } from 'vendor/angular';
// import { SnackBarService } from 'app/shared/snackbar/snackbar.service';
import { ERROR_CODES, RESPONSE_STATUS_ENUM } from 'app/app.enum';

@Injectable()
export class ErrorService {

    constructor(private translateService: TranslateService,
        private router: Router) {
    }

    handleError(error) {
        if (error.status === ERROR_CODES.UNAUTHORIZED) {
            this.router.navigate(['401']);
        } else if (error.status === ERROR_CODES.SERVICE_NOT_FOUND) {
           // this.snackBarService.showError(this.translateService.instant('error.requestError404'));
        } else if (error.status === ERROR_CODES.BACKEND_NOT_AVAILABLE) {
            //this.snackBarService.showError(this.translateService.instant('error.requestError504'));
        } else if (error.status === ERROR_CODES.FILE_NOT_FOUND) {
           // this.snackBarService.showError(this.translateService.instant('error.requestError510'));
        } else if (error.status === ERROR_CODES.FILE_READ_ERROR) {
         //   this.snackBarService.showError(this.translateService.instant('error.requestError511'));
        }

        else {
          //  this.snackBarService.showError(this.translateService.instant('error.requestError500'));
        }
    }

    handleFailure(statusCode) {
        if (statusCode === RESPONSE_STATUS_ENUM.UNACCEPTABLE_DATA) {
           // this.snackBarService.showSuccess(this.translateService.instant('dashboard.equipmentInfo.importDataIncorrect'));
        } else if (statusCode === RESPONSE_STATUS_ENUM.UNACCEPTABLE_FORMAT) {
         //   this.snackBarService.showSuccess(this.translateService.instant('invalidImportFileFormat'));
        } else if (statusCode === RESPONSE_STATUS_ENUM.NO_MAIL_FOUND) {
       //     this.snackBarService.showSuccess(this.translateService.instant('mailNotFound'));
        } else if (statusCode === RESPONSE_STATUS_ENUM.NO_IDENTIFIER_FOUND) {
          //  this.snackBarService.showSuccess(this.translateService.instant('noIdentifierFound'));
        } else if (statusCode === RESPONSE_STATUS_ENUM.INVALID_IMAGE_SIZE) {
            //this.snackBarService.showSuccess(this.translateService.instant('invalidImageSize'));
        } else {
            //this.snackBarService.showError(this.translateService.instant('error.requestError500'));
        }
    }
}

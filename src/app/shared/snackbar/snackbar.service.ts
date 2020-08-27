import { Injectable } from 'vendor/angular';
import { MatSnackBar, MatSnackBarConfig } from 'vendor/material';
import { configError, configSuccess, configInfo, configWarning } from './snackbar.config';

@Injectable()
export class SnackBarService {

    errorConfiguration = configError;
    successConfiguration = configSuccess;
    warningConfiguration = configWarning;
    infoConfiguration = configInfo;

    constructor(public snackBar: MatSnackBar) {
    }

    private showToaster(msg: string, data: any | null, config: MatSnackBarConfig) {
        this.snackBar.open(msg, 'close', config);
    }

    showSuccess(messageKey: string) {
        this.showToaster(messageKey, 'close', this.successConfiguration);
    }

    showError(messageKey: string) {
        this.showToaster(messageKey, 'close', this.errorConfiguration);
    }

    showWarning(messageKey: string) {
        this.showToaster(messageKey, 'close', this.warningConfiguration);
    }

    showInfo(messageKey: string) {
        this.showToaster(messageKey, 'close', this.infoConfiguration);
    }
}

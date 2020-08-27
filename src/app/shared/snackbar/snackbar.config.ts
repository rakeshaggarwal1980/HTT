import * as _ from 'lodash';

const snackBarConfig: any = {
  duration: '5000',
  horizontalPosition: 'right',
  panelClass: ''
};



export const configSuccess = _.merge({}, snackBarConfig, { 'panelClass': ['style-success'] });
export const configError = _.merge({}, snackBarConfig, { 'panelClass': ['style-error'] });
export const configWarning = _.merge({}, snackBarConfig, { 'panelClass': ['style-warning'] });
export const configInfo = _.merge({}, snackBarConfig, { 'panelClass': ['style-info'] });

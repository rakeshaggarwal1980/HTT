import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UtilityService {

    constructor(private translateService: TranslateService) {
    }

    showTranslatedText(key): any {
        let values = '';
        this.translateService.get(key).subscribe(
            data => {
                values = data;
            });
        return values;
    }

    onControlFocus(ngForm, formField, formErrors) {
        const control = ngForm.get(formField);
        const controlvalue = control.value;
        if (controlvalue !== undefined) {
            if (controlvalue.trim() === '') {
                ngForm.controls[formField].setValue('');
            }
            formErrors[formField] = '';
        }
    }

    validateEmail(email) {
        const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email !== '' && !emailRegexp.test(email)) {
            return false;
        }
        return true;
    }

    isNumberWithMaxValue(input: string, maxDigits: number) {
        const pattern = /^[0-9]{0,2}$/;
        if (!pattern.test(input)) {
            return true;
        }
        return false;
    }

    isNumber(input: string) {
        const pattern = /^-?[0-9]*$/;
        if (!pattern.test(input)) {
            return true;
        }
        return false;
    }

    downloadFile(binary: any, type: string, fileName: string): void {
        const blob = this.b64toBlob(binary, type);
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const blobUrl = URL.createObjectURL(blob);
            link.setAttribute('href', blobUrl);
            link.setAttribute('download', fileName);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    previewFile(binary: any, type: string): void {
        const fileWindow = window.open('');
        const iframeContent = '<iframe width="100%" height="100%" src="data:' + type + ';base64, ' + encodeURI(binary) + '"></iframe>';
        fileWindow.document.write(iframeContent);
    }

    b64toBlob(b64Data, contentType = '', sliceSize = 512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

}

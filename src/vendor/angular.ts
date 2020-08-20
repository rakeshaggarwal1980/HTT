export { CommonModule, APP_BASE_HREF, DatePipe, DecimalPipe } from '@angular/common';
export { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export {
    NgModule, Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter,
    Injectable, DebugElement, Injector, Inject, ViewChild, CUSTOM_ELEMENTS_SCHEMA, DoCheck,
    OnDestroy, Pipe, PipeTransform, Directive, ElementRef, NO_ERRORS_SCHEMA, AfterViewInit,
    Renderer2, HostListener, SimpleChange, SimpleChanges, OnChanges, ChangeDetectorRef
} from '@angular/core';

export {
    HttpClientModule, HttpClient, HTTP_INTERCEPTORS, HttpEvent,
    HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse,
    HttpHeaders, HttpParams
} from '@angular/common/http';


export {
    ActivatedRoute, Router, Routes, RouterModule,
    CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';

export {
    FormsModule, ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators,
    FormGroupDirective, FormControl, AbstractControl, NgForm
} from '@angular/forms';

export { TestBed, ComponentFixture, getTestBed, async } from '@angular/core/testing';
export { RouterTestingModule } from '@angular/router/testing';
export { By, BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';

export { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
export { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpClientModule} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

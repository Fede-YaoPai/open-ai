import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { AppStateService } from '../services/app-state.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private apiCalls: number = 0;

  constructor(private store: AppStateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.apiCalls++;
    this.store.loading = true;

    return next.handle(request).pipe(
      finalize(() => {
        this.apiCalls--;

        if (!this.apiCalls) this.store.loading = false;
      })
    );
  }
}

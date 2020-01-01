import { finalize, tap } from 'rxjs/operators';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class InvoiceHttpInterceptor implements HttpInterceptor {

    count = 0;

    constructor(private _fuseProgressBarService: FuseProgressBarService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this._fuseProgressBarService.show();

        this.count++;

        return next.handle(req)

            .pipe(finalize(() => {

                this.count--;

                if (this.count == 0) this._fuseProgressBarService.hide();
            })
            );
    }
}
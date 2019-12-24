import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { LoginRequestPayload, LoginResponse } from '../../../interfaces/user.interface';
import { NotificationService } from '../../../services/notification.service';
import { SNACK_BAR_MSGS } from '../../../constants/notification.constants';
import { SessionService } from '../../../services/session.service';
import { SESSION_STORAGE } from '../../../constants/session.constants';
import * as _ from 'lodash';
import * as moment from 'moment'; 

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _userService: UserService,
        private _notificationService: NotificationService,
        private _sessionService:SessionService
    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    login(): void {
        const requestPaylod: LoginRequestPayload = {
            email_id: this.email.value,
            password: this.password.value
        }
        
        this._userService.login(requestPaylod).subscribe((data:LoginResponse) => {
            const statusCode=_.get(data,'statusCode');
            if(statusCode==='0000'){
                this._sessionService.setItem(SESSION_STORAGE.currentUser,data);
                this._router.navigate(['/dashboard']);
            }else{
              this._notificationService.show(data.msg, "error");  
            }
        }, (err) => {            
            this._notificationService.show(SNACK_BAR_MSGS.genericError, "error");
        });
    }
    get email() {
        return this.loginForm.get('email');
    }
    get password() {
        return this.loginForm.get('password');
    }
}

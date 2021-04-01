import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthorizeService implements CanActivate {
    private KEY_USUARIO = 'R00001';
    private KEY_SESSION = 'R00002';

    constructor(private router: Router) { }

    canActivate(): boolean {
        const logged = localStorage.getItem(this.KEY_SESSION);
        if (logged === '1') {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }

    setSession = (data) => {
        localStorage.setItem(this.KEY_USUARIO, JSON.stringify(data));
        localStorage.setItem(this.KEY_SESSION, '1');
    }

    closeSession = () => {
        localStorage.removeItem(this.KEY_USUARIO);
        localStorage.removeItem(this.KEY_SESSION);
    }

    getUser = () => JSON.parse(localStorage.getItem(this.KEY_USUARIO) );

}

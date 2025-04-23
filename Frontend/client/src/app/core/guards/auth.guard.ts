import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.accountService.isLoggedIn();
    const userRole = this.accountService.getRole();  // Kullanıcının rolünü alıyoruz
    const requiredRoles = next.data['roles']; // Rotaların gerektirdiği roller

    if (!isLoggedIn) {
      // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir
      if (state.url !== '/account/login') {
        this.router.navigate(['/account/login']);
      }
      return false;
    } else {
      // Kullanıcı giriş yapmışsa, rol kontrolü yapalım
      if (requiredRoles && !requiredRoles.includes(userRole)) {
        // Eğer kullanıcının rolü geçerli rotalarla uyumsuzsa, yönlendirme yap
        this.router.navigate(['/home']);
        return false;
      }

      // Eğer giriş yapılmış ve doğru rolde ise yönlendirmeye izin ver
      if (state.url === '/account/login') {
        this.router.navigate(['/home']);
        return false;
      }
    }

    return true;
  }
}

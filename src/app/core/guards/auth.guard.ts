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

    if (!isLoggedIn) {
      // Kullanıcı giriş yapmamışsa, her durumda login sayfasına yönlendir
      if (state.url !== '/account/login') {
        this.router.navigate(['/account/login']);
      }
      return false;
    } else {
      // Kullanıcı giriş yapmışsa, hatalı rotaları kontrol et
      if (state.url === '/account/login') {
        // Eğer kullanıcı login olmuşsa, login sayfasına gitmesine izin verme, Home'a yönlendir
        this.router.navigate(['/home']);
        return false;
      }

      // Kullanıcı giriş yaptıysa ve hatalı rota varsa, Home'a yönlendir
      const validRoutes = ['/home', '/admin/dashboard'];
      if (!validRoutes.includes(state.url)) {
        this.router.navigate(['/home']);
        return false;
      }
    }

    return true;
  }
  
  // Hatalı rota kontrolü
  private isInvalidRoute(url: string): boolean {
    const validRoutes = ['/home', '/account/login', '/account/register', '/admin/dashboard'];
    return !validRoutes.includes(url); // Eğer URL geçerli rotalarda yoksa true döner
  }
  
  
}

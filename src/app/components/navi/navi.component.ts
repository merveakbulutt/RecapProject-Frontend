import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {


  constructor(private toastrService: ToastrService, private authService: AuthService, private localStorageService: LocalStorageService, private userService: UserService) { }

  ngOnInit(): void {

  }

  isAuth() {
    if (this.authService.isAuthenticed()) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.authService.logOut()
    this.toastrService.success("Çıkış başarılı!");
  }


}

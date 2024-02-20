import { Component } from '@angular/core';
import { LogoutService } from '../../../../services/api/security/logout/logout.service';
import { UserService } from '../../../../services/api/user/user.service';
import { DetailService } from '../../../../services/api/detail/detail.service';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Userdetail } from '../../../../interfaces/userdetail';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-userslist',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.css'
})
export class UserslistComponent {
  constructor(public logoutSecurityService: LogoutService, public userService: UserService, public detailService: DetailService) { }
  public dataSource: MatTableDataSource<Userdetail> = new MatTableDataSource<Userdetail>;
  public allusers: Userdetail[] = [];

  public displayedColumns: string[] = ['name', 'surname', 'birthdate', 'actions'];

  public getAllDetails() {
    this.detailService.getAllDetails().subscribe((res) => {
      this.allusers = res
      this.dataSource = new MatTableDataSource(this.allusers);
    })

  }

  private deleteUser(id: number) {
    return this.userService.deleteUser(id).subscribe((res) => {
      console.log(res)
    })
  }

  public filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filtro;
  }

  public delete(id: number) {
    this.deleteUser(id)
  }


  ngOnInit() {
    this.getAllDetails()
  }




}

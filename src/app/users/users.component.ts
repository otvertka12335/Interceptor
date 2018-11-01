import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {fromEvent, Observable} from 'rxjs';
import {User} from '../common/users/user';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: Array<User>;
  user: User;
  searchableFields;
  @ViewChild('userSearch') serchString: ElementRef;


  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getUsersList();
    fromEvent(this.serchString.nativeElement, 'input')
      .pipe(debounceTime(500))
      .subscribe(() => {
        if (this.serchString.nativeElement.value.length >= 2) {
          this.getUserByUsername(this.serchString.nativeElement.value);
        } else if (this.serchString.nativeElement.value.length === -1) {
          this.getUsersList();
        }
      });
  }

  output() {
    this.deleteRows();

  }

  getUsersList() {
    return this.http.get('/users').subscribe(
      (data: Array<User>) => this.usersList = data
    );
  }

  getUserByUsername(username: string) {
    return this.http.get('/users?username=' + username).subscribe(user => {
      this.user = user[0];
    });
  }

  deleteRows() {
    for (let i = 0; i < this.usersList.length; ++i) {
      this.usersList.splice(i);
    }
  }
}

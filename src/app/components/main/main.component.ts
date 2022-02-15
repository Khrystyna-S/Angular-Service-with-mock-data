import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/admin/admin.interface';
import { IUsers } from 'src/app/shared/interfaces/user/user.interface';
import { AdminService } from 'src/app/shared/services/admin/admin.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public byPosts: IBlog[] = [];
  public users: IUsers[] = [];

  public showModalIn = false;
  public showModalUp = false;
  public showModalAddPost = false;
  public logIn = true;
  public addEdited = true;
  public btnDisabled = true;
  public statusValid = false;

  public indexPost!: number;

  public userEmail!: string;
  public userPassword!: string;
  public checkUser!: string;
  public title!: string;
  public description!: string;

  public newUserName!: string;
  public newUserEmail!: string;
  public newUserPassword!: string;

  public statusWarningOne!: boolean;
  public statusWarningTwo!: boolean;
  public statusWarningThree!: boolean;
  public modalName!: string;
  public modalEmail!: string;
  public modalPassword!: string;

  public Name = /^[A-Za-z]{4,16}$/;
  public Password = /^[\w._-]{4,16}$/;
  public Email = /^\w[\w-.]*\w[@][A-Za-z]+[.][A-Za-z]+$/;

  public testName = true;
  public testPass = true;
  public testEmail = true;


  constructor(
    private adminBlog: AdminService
  ) { }

  ngOnInit(): void {
    this.byPosts = this.adminBlog.getPostBlog();
    this.users = this.adminBlog.getUsers();
  }

  openSignIn(): void {
    this.showModalIn = true;
    this.statusValid = false;
  }

  openSignUp(): void {
    this.showModalUp = true;
  }

  closeModalIn(): void {
    this.showModalIn = false;
    this.statusValid = false;
    this.userEmail = '';
    this.userPassword = '';
  }

  closeModalUp(): void {
    this.showModalUp = false;
    this.btnDisabled = true;
    this.newUserName = '';
    this.newUserEmail = '';
    this.newUserPassword = '';
    this.statusWarningOne = false;
    this.statusWarningTwo = false;
    this.statusWarningThree = false;
  }

  closeModalAdd(): void {
    this.showModalAddPost = false;
  }

  signInUser(): void {
    this.users.forEach(element => {
      if (this.userEmail === element.email) {
        if (this.userPassword === element.password) {
          this.checkUser = element.username;
          this.logIn = false;
          this.showModalIn = false;
          this.userEmail = '';
          this.userPassword = '';
        }
      }
      this.statusValid = true;
    });
  }

  addUser(): void {
    if (this.statusWarningOne === false && this.statusWarningTwo === false) {
      const user = {
        id: this.users.length + 1,
        username: this.newUserName,
        email: this.newUserEmail,
        password: this.newUserPassword
      };
      this.adminBlog.addUser(user);
      this.showModalUp = false;
      this.newUserName = '';
      this.newUserEmail = '';
      this.newUserPassword = '';
    }
  }

  addBlog(): void {
    let newDate: any = new Date();
    if (this.title != '' && this.description != '') {
      const blogs: object = {
        id: this.byPosts.length + 1,
        postedBy: this.checkUser,
        topic: this.title,
        date: newDate,
        message: this.description,
      };
      this.adminBlog.addBlog(blogs);
      this.showModalAddPost = false;
    }
  }

  showAddBlog(): void {
    this.showModalAddPost = true;
    this.title = '';
    this.description = '';
  }

  signOut(): void {
    this.logIn = true;
    this.checkUser = '';
  }

  showEditBlog(item: IBlog, index: number): void {
    this.showModalAddPost = true;
    this.addEdited = false;
    this.title = item.topic;
    this.description = item.message;
    this.indexPost = index;
  }

  editBlog(): void {
    let newDate: any = new Date();
    this.adminBlog.editBlog(this.title, this.description, newDate, this.indexPost);
    this.showModalAddPost = false;
  }

  deleteBlog(item: IBlog): void {
    this.adminBlog.deleteBlog(item.id);
  }

  checkTitle(): void {
    if (this.title == '') {
      this.btnDisabled = true;
    } else if (this.title != '' && this.description != '') {
      this.btnDisabled = false;
    }
  }

  checkDescription(): void {
    if (this.description == '') {
      this.btnDisabled = true;
    } else if (this.title != '' && this.description != '') {
      this.btnDisabled = false;
    }
  }

  checkName(): void {
    this.testName = this.Name.test(this.newUserName);
    if (this.testName) {
      for (let i = 0; i <= this.users.length; i++) {
        if (this.users[i].username != this.newUserName) {
          this.statusWarningOne = false;
        }
        else {
          this.modalName = "Таке ім'я вже зареєстроване!";
          this.statusWarningOne = true;
        }
      }
      if (this.testName && this.testPass && this.testEmail && this.newUserName != '' && this.newUserPassword != '' && this.newUserEmail != '' && !this.statusWarningOne) {
        this.btnDisabled = false;
      }
    }
    else {
      this.modalName = "Ім'я повинне містити від 4 до 16 символів";
      this.statusWarningOne = true;
    }
  }

  checkEmail(): void {
    this.testEmail = this.Email.test(this.newUserEmail);
    if (this.testEmail) {
      for (let i = 0; i <= this.users.length; i++) {
        if (this.users[i].email != this.newUserEmail) {
          this.statusWarningTwo = false;
        }
        else {
          this.modalEmail = "Такий eMail вже зареєстрований!";
          this.statusWarningTwo = true;
        }
      }
      if (this.testName && this.testPass && this.testEmail && this.newUserName != '' && this.newUserPassword != '' && this.newUserEmail != '' && !this.statusWarningTwo) {
        this.btnDisabled = false;
      }
    }
    else {
      this.modalEmail = "Введіть корректно email-адрес!";
      this.statusWarningTwo = true;
    }
  }

  checkPass(): void {
    this.testPass = this.Password.test(this.newUserPassword);
    if (this.testPass) {
      this.statusWarningThree = false;
      if (this.newUserName != '' && this.newUserPassword != '' && this.newUserEmail != ''
        && this.statusWarningOne != true && this.statusWarningTwo != true) {
        this.btnDisabled = false;
      }
    }
    else {
      this.modalPassword = "Пароль повинен містити від 4 до 16 символів!";
      this.statusWarningThree = true;
    }
  }
}

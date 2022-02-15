import { Injectable } from '@angular/core';
import { IBlog } from '../../interfaces/admin/admin.interface';
import { IUsers } from '../../interfaces/user/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public sDate: any = new Date(2021, 11, 25, 12, 30);

  private postBlog: Array<IBlog> = [
    {
      id: 1,
      postedBy: 'Admin',
      topic: 'Fist Post',
      date: this.sDate,
      message: 'Sign up to create your account and start to Use Angular Blog' 
    }
  ];

  private users: Array<IUsers> = [
    {
      id: 1,
      username: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin123'
    }
  ]

  constructor() { }

  getPostBlog(): Array<IBlog> {
    return this.postBlog;
  }

  getUsers(): Array<IUsers> {
    return this.users;
  }

  addUser(user: any): void {
    this.users.push(user);
  }

  addBlog(blog: any): void {
    this.postBlog.push(blog);
  }

  editBlog(top: string, text: string, date: any, i: number): void {
    this.postBlog[i].topic = top;
    this.postBlog[i].message = text;
    this.postBlog[i].date = date;
  }

  deleteBlog(id: number): void {
    const index = this.postBlog.findIndex(blog => blog.id === id);
    this.postBlog.splice(index, 1);
  }
}

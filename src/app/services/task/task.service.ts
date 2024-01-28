import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../../interfaces/task';

const baseUrl = "http://localhost:3000/task/query/getTasks";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  http = inject(HttpClient);

  getTasks(/*task?: string, */status?: number, sort?: string, sortOrder?: string, date?: string) {
    let url = baseUrl + '?';
    //url += task ? `task=${task}&` : '';
    url += status ? `status=${status}&` : '';
    url += sort ? `sort=${sort}&` : '';
    url += sortOrder ? `sortOrder=${sortOrder}&` : '';
    url += date ? `date=${date}&` : '';
    return this.http.get<ITask[]>(url);
  }
  getTasksNum(/*task?: string, */status?: number, date?: string) {
    let url = baseUrl + '?';
    //url += task ? `task=${task}&` : '';
    url += status ? `status=${status}&` : '';
    url += date ? `date=${date}&` : '';
    url += 'length=true&';
    return this.http.get<{ num: number }>(url);
  }
}


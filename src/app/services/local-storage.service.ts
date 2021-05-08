import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;
  constructor() { this.localStorage = window.localStorage; }

  get(key: string) {
    return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  remove(key: string) {
    localStorage.removeItem(key)
  }
  clean() {
    localStorage.clear();
  }




}

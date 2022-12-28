import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() {}

  saveItemToLocalStorage(key: string, object: unknown) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  getItemFromLocalStorage(key: string): unknown {
    const data = localStorage.getItem(key)
    return data === null ? null : JSON.parse(data)
  }
}

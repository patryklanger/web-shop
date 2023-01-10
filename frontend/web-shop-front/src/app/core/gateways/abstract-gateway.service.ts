import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type BodyParams = { [param: string]: string | number | boolean | readonly (string | number | boolean)[] };

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractGatewayService {

  constructor(private http: HttpClient) {}

  protected get$<T>(url?: string, params?: HttpParams): Observable<T> {
    return this.http.get(`${this.getBaseUrl()}/${url}`, { params: params }) as Observable<T>
  }

  protected post$<T>(url: string, body?: any): Observable<T> {
    return this.http.post(`${this.getBaseUrl()}/${url}`, body) as Observable<T>
  }

  protected put$<T>(url: string, body: any): Observable<T> {
    return this.http.put(`${this.getBaseUrl()}/${url}`, body) as Observable<T>
  }

  protected patch$<T>(url: string, body: HttpParams | BodyParams = {}): Observable<T> {
    return this.http.patch(`${this.getBaseUrl()}/${url}`, body) as Observable<T>
  }

  protected delete$<T>(url: string): Observable<T> {
    return this.http.delete(`${this.getBaseUrl()}/${url}`) as Observable<T>
  }

  protected abstract getBaseUrl(): string;

  protected abstract getResourceName(): string;
}

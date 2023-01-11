import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class ImageGatewayService<T> {
  abstract uploadImage$(image: File, objectId: number): Observable<T>;
}

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class TagGatewayService<T> {
  abstract setTags$(tags: string[], objectId: number): Observable<T>;
}

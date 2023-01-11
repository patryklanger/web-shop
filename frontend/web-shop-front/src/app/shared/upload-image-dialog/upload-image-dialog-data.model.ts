import { Subject } from "rxjs";
import { ImageGatewayService } from "src/app/core/gateways/abstract-image.service";

export interface UploadImageDialogData {
  id: number,
  service: ImageGatewayService<unknown>,
  objectChanged$: Subject<unknown>
}

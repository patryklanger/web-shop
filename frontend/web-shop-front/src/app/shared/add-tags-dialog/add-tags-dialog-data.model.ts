import { Subject } from "rxjs";
import { TagGatewayService } from "src/app/core/gateways/abstract-tag.service";

export interface AddTagsDialogData {
  id: number,
  service: TagGatewayService<unknown>,
  currentTags: string[],
  objectChanged$: Subject<unknown>
}

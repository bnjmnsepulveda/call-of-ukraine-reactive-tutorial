import { EntityBase } from "../../lib/EntityBase";
import { Resource } from "./Resource";

export interface RussianTarget extends EntityBase {
    city: string;
    resources: Resource
}

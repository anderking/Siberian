import { ServiceDetail } from "./serviceDetail";
import { User } from "./user";

export class Skill {
    id: string;
    name: string;
    description: string;
    status: string;
    serviceDetails: Array<ServiceDetail> = new Array<ServiceDetail>();
    users: Array<User> = new Array<User>();
    createdAt:Date;
    updatedAt:Date;
}
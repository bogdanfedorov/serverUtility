import { BaseModel, Repository } from "../core";

export class CreateCatDto {
  name: string;
}

export class CatsModel extends BaseModel {
  public readonly name: string;

  constructor(dto: CreateCatDto | CatsModel) {
    if (dto instanceof CreateCatDto) {
      super();
      this.name;
    } else {
      super(dto._id);
      this.name;
    }
  }
}

export const CatRepository = new Repository<CatsModel>("clients", CatsModel);

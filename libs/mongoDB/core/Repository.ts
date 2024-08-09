import {
  Collection,
  CountDocumentsOptions,
  Document,
  Filter,
  FindOptions,
  ObjectId,
  UpdateFilter,
} from "mongodb";
import { ErrorLogger } from "../config";
import { getCollection } from "./connection";
import {
  ConnectionError,
  NotCreated,
  NotFound,
  NotValidId,
  OnCountError,
  OnDeleteError,
  OnFindError,
  OnUpdateError,
} from "./errors";
import { IFindDto, IPagination } from "./types";

export class Repository<Model extends Document> {
  private readonly colectionName: string;
  private readonly EntityClass: any;

  constructor(colectionName: string, EntityClass: any) {
    this.colectionName = colectionName;
    this.EntityClass = EntityClass;
  }

  public async findOne(
    filter: Filter<Document> = {},
    options?: FindOptions,
  ): Promise<Model> {
    const col = await this.getCollection();

    let entity: Model | null;
    try {
      entity = await col.findOne<Model>(filter, options);
    } catch (e) {
      ErrorLogger(e);
      throw OnFindError;
    }

    if (!entity) {
      throw NotFound;
    }

    return new this.EntityClass(entity);
  }

  public async find(filter: Filter<Document> = {}, options?: FindOptions) {
    const col = await this.getCollection();

    let entitys: Model[] | null;
    try {
      entitys = await col.find<Model>(filter, options).toArray();
    } catch (e) {
      ErrorLogger(e);
      throw OnFindError;
    }

    if (!entitys || !entitys.length) {
      throw NotFound;
    }

    return this.castToArrayObjects(entitys);
  }

  public async create(dto: any): Promise<Model> {
    const col = await this.getCollection();

    const entity = new this.EntityClass(dto);

    try {
      await col.insertOne(entity);
    } catch (e) {
      ErrorLogger(e);
      throw NotCreated;
    }

    return entity;
  }

  public async update(
    id: ObjectId | string,
    updateDto: UpdateFilter<Document>,
  ) {
    const col = await this.getCollection();
    const filter = { _id: this.castToObjectId(id) };
    try {
      await col.findOneAndUpdate(filter, updateDto);
    } catch (e) {
      ErrorLogger(e);
      throw OnUpdateError;
    }

    return this.findById(id);
  }

  public async delete(id: ObjectId | string) {
    const col = await this.getCollection();

    const filter = { _id: this.castToObjectId(id) };
    try {
      await col.findOneAndDelete(filter);
    } catch (e) {
      ErrorLogger(e);
      throw OnDeleteError;
    }

    return this.findById(id);
  }

  public async count(
    filter: Filter<Document> = {},
    options?: CountDocumentsOptions,
  ): Promise<number> {
    const col = await getCollection(this.colectionName);

    let count: number = 0;
    try {
      count = await col.countDocuments(filter, options);
    } catch (e) {
      ErrorLogger(e);
      throw OnCountError;
    }

    return count;
  }

  public async findById(id: ObjectId | string): Promise<Model> {
    const filter = { _id: this.castToObjectId(id) };

    const entity = await this.findOne(filter);

    return this.castToObject(entity);
  }

  public async pagination(findDto: IFindDto): Promise<IPagination<Model>> {
    const page = Number(findDto.page || 0);
    const limit = Number(findDto.limit || 10);
    const skip = page * limit;

    const options = {
      limit,
      skip,
    };
    if (findDto.sort) {
      Object.assign(options, { sort: findDto.sort });
    }

    const filter = {};

    const count = await this.count(filter);
    const entitys = await this.find(filter, options);

    return {
      data: entitys,
      metadata: {
        limit: limit,
        page: page,
        total: count,
      },
    };
  }

  private castToObject(rawEntity: Model): Model {
    return new this.EntityClass(rawEntity);
  }

  private castToArrayObjects(rawEntity: Array<Model>): Model[] {
    return rawEntity.map(this.castToObject);
  }

  private async getCollection(): Promise<Collection<Document>> {
    let collection: Collection<Document>;
    try {
      collection = await getCollection(this.colectionName);
    } catch {
      throw ConnectionError;
    }

    return collection;
  }

  private castToObjectId(id: string | ObjectId): ObjectId {
    if (id instanceof ObjectId) {
      return id;
    }

    let newObjectId: ObjectId;
    try {
      newObjectId = new ObjectId(id);
    } catch (e) {
      ErrorLogger(e);
      throw NotValidId;
    }

    return newObjectId;
  }
}

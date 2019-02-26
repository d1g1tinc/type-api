import {axiosDriver, IOptions} from './drivers/axios'

import {Api, IResponseObject, IError} from './api'

import {driver} from './decorators'

declare type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer U>
    ? DeepPartial<U>[]
    : T[K] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[K]>
}
@driver(axiosDriver)
export class RestApi<T_MODEL = any, T_MODEL_LIST = T_MODEL[]> extends Api {
  async create(data: T_MODEL, options?: IOptions): Promise<T_MODEL> {
    return await this.post<T_MODEL>('', data, options)
  }

  async update(id: number | string, data: T_MODEL, options?: IOptions): Promise<T_MODEL> {
    return await this.put<T_MODEL>(`${id}`, data, options)
  }

  async findById(id: string | number, options?: IOptions): Promise<T_MODEL> {
    return await this.get<T_MODEL>(`${id}`, options)
  }

  async findAll(options?: IOptions): Promise<T_MODEL_LIST> {
    return await this.get<T_MODEL_LIST>('', options)
  }

  async find(params: Object, options: any = {}): Promise<T_MODEL_LIST> {
    options.params = params

    return await this.get<T_MODEL_LIST>('', options)
  }

  async findOne(params: Object, options: any = {}): Promise<T_MODEL> {
    options.params = params

    const result = await this.get<T_MODEL>('', options)

    return result && result[0]
  }

  async updateAttributes(id: number | string, data: DeepPartial<T_MODEL>, options?: IOptions): Promise<T_MODEL> {
    return await this.patch<T_MODEL>(`${id}`, data, options)
  }

  async destroy(id: number | string, options?: IOptions): Promise<T_MODEL> {
    return await this.delete<T_MODEL>(`${id}`, options)
  }
}

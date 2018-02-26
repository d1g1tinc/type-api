import {axiosDriver, IOptions} from './drivers/axios'

import {Api, IResponseObject, IError} from './api'

import {driver} from './decorators'

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
}

@driver(axiosDriver)
export class RestApi<T_MODEL = any, T_MODEL_LIST = T_MODEL[]> extends Api {
    async create(data: T_MODEL, options?: any): Promise<T_MODEL> {
        try {
            return await this.post<T_MODEL>('', data, options)
        } catch (error) {
            throw error
        }
    }

    async update(id: number | string, data: T_MODEL, options?: any): Promise<T_MODEL> {
        try {
            return await this.put<T_MODEL>(`${id}`, data, options)
        } catch (error) {
            throw error
        }
    }

    async findById(id: string | number, options?: any): Promise<T_MODEL> {
        try {
            return await this.get<T_MODEL>(`${id}`, options)
        } catch (error) {
            throw error
        }
    }

    async findAll(options?: any): Promise<T_MODEL_LIST> {
        try {
            return await this.get<T_MODEL_LIST>('', options)
        } catch (error) {
            throw error
        }
    }

    async find(params: Object, options: any = {}): Promise<T_MODEL_LIST> {
        options.params = params

        try {
            return await this.get<T_MODEL_LIST>('', options)
        } catch (error) {
            throw error
        }
    }

    async updateAttributes(id: number | string, data: RecursivePartial<T_MODEL>, options?: any): Promise<T_MODEL> {
        try {
            return await this.patch<T_MODEL>(`${id}`, data, options)
        } catch (error) {
            throw error
        }
    }

    async destroy(id: number | string, options?: any): Promise<T_MODEL> {
        try {
            return await this.delete<T_MODEL>(`${id}`, options)
        } catch (error) {
            throw error
        }
    }
}

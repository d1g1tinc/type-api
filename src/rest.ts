import {AxiosDriver, IOptions} from './drivers/axios'

import {Api} from './api'

import {driver} from './decorators'

export interface IResponseObject {
    data: any
}

export interface IError {
    error: string
}

@driver(AxiosDriver)
export class RestApi<T_MODEL = any, T_MODEL_LIST = T_MODEL[]> extends Api {
    driver: any
    endpoint: ''
    beforeRequest = []

    async create<T_RESPONSE = T_MODEL, T_REQUEST = T_MODEL>(data: T_REQUEST, options?: any): Promise<T_RESPONSE> {
        try {
            return await this.post<T_RESPONSE>('', data, options)
        } catch (error) {
            throw error
        }
    }

    async update<T_RESPONSE = T_MODEL, T_REQUEST = T_MODEL>(id: number | string, data: T_REQUEST, options?: any): Promise<T_RESPONSE> {
        try {
            return await this.put<T_RESPONSE>(`${id}`, data, options)
        } catch (error) {
            throw error
        }
    }

    async findById<T_RESPONSE = T_MODEL>(id: string | number, options?: any): Promise<T_RESPONSE> {
        try {
            return await this.get<T_RESPONSE>(`${id}`, options)
        } catch (error) {
            throw error
        }
    }

    async findAll<T_RESPONSE = T_MODEL_LIST>(options?: any): Promise<T_RESPONSE> {
        try {
            return await this.get<T_RESPONSE>('', options)
        } catch (error) {
            throw error
        }
    }

    async find<T_RESPONSE = T_MODEL_LIST>(params: Object, options: any = {}): Promise<T_RESPONSE> {
        options.params = params

        try {
            return await this.get<T_RESPONSE>('', options)
        } catch (error) {
            throw error
        }
    }

    async updateAttributes<T_RESPONSE = T_MODEL, T_REQUEST = T_MODEL>(id: number | string, data: T_REQUEST, options?: any): Promise<T_RESPONSE> {
        try {
            return await this.patch<T_RESPONSE>(`${id}`, data, options)
        } catch (error) {
            throw error
        }
    }

    async destroy<T_RESPONSE = T_MODEL>(id: number | string, options?: any): Promise<T_RESPONSE> {
        try {
            return await this.delete<T_RESPONSE>(`${id}`, options)
        } catch (error) {
            throw error
        }
    }
}

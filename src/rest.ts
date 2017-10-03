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
export class RestApi extends Api {
    driver: any
    endpoint: ''
    beforeRequest = []

    async create<T = any>(data: any, options?: any): Promise<T> {
        try {
            return await this.post<T>('', data, options)
        } catch (error) {
            throw error
        }
    }

    async update<T = any>(id: number | string, data: any, options?: any): Promise<T> {
        try {
            return await this.put<T>(`${id}`, data, options)
        } catch (error) {
            throw error
        }
    }

    async findById<T = any>(id: string | number, options?: any): Promise<T> {
        try {
            return await this.get<T>(`${id}`, options)
        } catch (error) {
            throw error
        }
    }

    async findAll<T = any>(options?: any): Promise<T> {
        try {
            return await this.get<T>('', options)
        } catch (error) {
            throw error
        }
    }

    async find<T = any>(params: Object, options: any = {}): Promise<T> {
        options.params = params

        try {
            return await this.get<T>('', options)
        } catch (error) {
            throw error
        }
    }

    async updateAttributes<T = any>(id: number | string, data: any, options?: any): Promise<T> {
        try {
            return await this.patch<T>(`${id}`, data, options)
        } catch (error) {
            throw error
        }
    }

    async destroy<T = any>(id: number | string, options?: any): Promise<T> {
        try {
            return await this.delete<T>(`${id}`, options)
        } catch (error) {
            throw error
        }
    }
}

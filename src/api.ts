import {AxiosDriver, IOptions} from './drivers/axios'

import {driver} from './decorators'

export interface IResponseObject {
    data: any
}

export interface IError {
    error: string
}

@driver(AxiosDriver)
export class Api {
    driver: any
    endpoint: ''

    prepareRequest(endpoint: string, postData: any, options: any) {
        if (!options) {
            options = {}
        }

        const beforeRequest = Reflect.getMetadata('beforeRequest', Object.getPrototypeOf(this))

        if (!beforeRequest) {
            return {
                endpoint,
                postData,
                options
            }
        }

        beforeRequest.forEach((middleware: any) => {
            const resp = middleware(endpoint, postData, options)

            endpoint = resp.endpoint
            postData = resp.postData
            options = resp.options
        })

        return {
            endpoint,
            postData,
            options
        }
    }

    afterResponse(response: any) {
        const afterRequest = Reflect.getMetadata('afterRequest', this.constructor)

        if (!afterRequest) {
            return response
        }

        afterRequest.forEach((middleware: any) => {
            response = middleware(response)
        })

        return response
    }

    handlerError(error: any) {
        const onError = Reflect.getMetadata('onError', Object.getPrototypeOf(this))

        if (!onError) {
            return error
        }

        onError.forEach((middleware: any) => {
            error = middleware(error)
        })

        return error
    }

    async post<T = any>(initialEndpoint: string, initialPostData: any, initialOptions?: any): Promise<T> {
        try {
            const {endpoint, postData, options} = this.prepareRequest(`${this.endpoint}/${initialEndpoint}`, initialPostData, initialOptions)

            let response = await this.driver.post(endpoint, postData, options)

            response = this.afterResponse(response)

            return <T>response.data
        } catch (error) {
            throw this.handlerError(error)
        }
    }

    async put<T = any>(initialEndpoint: string, initialPostData: any, initialOptions?: any): Promise<T> {
        try {
            const {endpoint, postData, options} = this.prepareRequest(`${this.endpoint}/${initialEndpoint}`, initialPostData, initialOptions)

            let response = await this.driver.put(endpoint, postData, options)

            response = this.afterResponse(response)

            return <T>response.data
        } catch (error) {
            throw this.handlerError(error)
        }
    }

    async get<T = any>(initialEndpoint: string, initialOptions?: any): Promise<T> {
        try {
            const urlBuild = []

            if (this.endpoint && this.endpoint !== '') {
                urlBuild.push(this.endpoint)
            }

            urlBuild.push(initialEndpoint)

            const {endpoint, options} = this.prepareRequest(urlBuild.join('/'), null, initialOptions)

            let response = await this.driver.get(endpoint, options)

            response = this.afterResponse(response)

            return <T>response.data
        } catch (error) {
            console.log(error)

            throw this.handlerError(error)
        }
    }
}

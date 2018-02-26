import {axiosDriver, IOptions} from './drivers/axios'

import {driver} from './decorators'

export interface IResponseObject {
    data: any
}

export interface IError {
    error: string
}

@driver(axiosDriver)
export class Api {
    driver: any

    getDriver() {
        return this.driver
    }

    setDriver(driverInstance: any) {
        this.driver = driverInstance
    }

    prepareRequest(endpoint: string, postData: any, options: any = {}) {
        if (!this.driver) {
            this.driver = Reflect.getMetadata('driver', this.constructor)
        }

        const beforeRequest = Reflect.getMetadata('beforeRequest', this.constructor)

        let request = {
            endpoint,
            postData,
            options
        }

        if (!beforeRequest) {
            return request
        }

        beforeRequest.forEach((middleware: any) => {
            request = middleware(request.endpoint, request.postData, request.options)
        })

        return request
    }

    public getEndpoint() {
        return Reflect.getMetadata('endpoint', this.constructor)
    }

    buildUrl(initialEndpoint: string) {
        const urlBuild = [Reflect.getMetadata('baseUrl', this.constructor)]

        if (this.getEndpoint() && this.getEndpoint() !== '') {
            urlBuild.push(this.getEndpoint())
        }

        urlBuild.push(initialEndpoint)

        return urlBuild.map(urlPath => urlPath.replace(/^\/?|\/?$/, '')).join('/')
    }

    afterResponse(response: any) {
        const afterRequest = Reflect.getMetadata('afterRequest', this.constructor)

        let processedResponse = response

        if (!afterRequest) {
            return processedResponse
        }

        afterRequest.forEach((middleware: any) => {
            processedResponse = middleware(processedResponse)
        })

        return processedResponse
    }

    handlerError(error: any) {
        const onError = Reflect.getMetadata('onError', this.constructor)
        let processedError = error

        if (!onError) {
            return processedError
        }

        onError.forEach((middleware: any) => {
            processedError = middleware(processedError)
        })

        return processedError
    }

    async post<T = any>(initialEndpoint: string, initialPostData: any, initialOptions?: any): Promise<T> {
        try {
            const {endpoint, postData, options} = this.prepareRequest(this.buildUrl(initialEndpoint), initialPostData, initialOptions)

            let response = await this.driver.post(endpoint, postData, options)

            response = this.afterResponse(response)

            return <T>response.data
        } catch (error) {
            throw this.handlerError(error)
        }
    }

    async put<T = any>(initialEndpoint: string, initialPostData: any, initialOptions?: any): Promise<T> {
        try {
            const {endpoint, postData, options} = this.prepareRequest(this.buildUrl(initialEndpoint), initialPostData, initialOptions)

            let response = await this.driver.put(endpoint, postData, options)

            response = this.afterResponse(response)

            return <T>response.data
        } catch (error) {
            throw this.handlerError(error)
        }
    }

    async patch<T = any>(initialEndpoint: string, initialPostData: any, initialOptions?: any): Promise<T> {
        try {
            const {endpoint, postData, options} = this.prepareRequest(this.buildUrl(initialEndpoint), initialPostData, initialOptions)

            let response = await this.driver.patch(endpoint, postData, options)

            response = this.afterResponse(response)

            return <T>response.data
        } catch (error) {
            throw this.handlerError(error)
        }
    }

    async delete<T = any>(initialEndpoint: string, initialOptions?: any): Promise<T> {
        try {
            const {endpoint, postData, options} = this.prepareRequest(this.buildUrl(initialEndpoint), null, initialOptions)

            let response = await this.driver.delete(endpoint, options)

            response = this.afterResponse(response)

            return <T>response.data
        } catch (error) {
            throw this.handlerError(error)
        }
    }

    async get<T = any>(initialEndpoint: string, initialOptions?: any): Promise<T> {
        try {
            const {endpoint, options} = this.prepareRequest(this.buildUrl(initialEndpoint), null, initialOptions)

            let response = await this.driver.get(endpoint, options)

            response = this.afterResponse(response)

            return <T>response.data
        } catch (error) {
            console.log(error)

            throw this.handlerError(error)
        }
    }
}

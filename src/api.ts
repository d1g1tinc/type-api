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
  baseUrl = ''
  endpoint = ''

  getDriver() {
    return this.driver
  }

  setDriver(driverInstance: any) {
    this.driver = driverInstance
  }

  prepareRequest(endpoint: string, postData: any, options: IOptions = {}) {
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

  buildUrl(initialEndpoint: string) {
    const urlBuild = [this.baseUrl]
    console.error(this)

    if (this.endpoint && this.endpoint !== '') {
      urlBuild.push(this.endpoint)
    }

    urlBuild.push(initialEndpoint)

    return urlBuild
      .filter(urlPath => !!urlPath)
      .map(urlPath => urlPath.replace(/^\/?|\/?$/, ''))
      .join('/')
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

  async post<T = any>(initialEndpoint: string, initialPostData: any, initialOptions?: IOptions): Promise<T> {
    try {
      const {endpoint, postData, options} = this.prepareRequest(this.buildUrl(initialEndpoint), initialPostData, initialOptions)

      let response = await this.driver.post(endpoint, postData, options)

      response = this.afterResponse(response)

      return <T> response.data
    } catch (error) {
      console.error('error', error)
      throw this.handlerError(error)
    }
  }

  async put<T = any>(initialEndpoint: string, initialPostData: any, initialOptions?: IOptions): Promise<T> {
    try {
      const {endpoint, postData, options} = this.prepareRequest(this.buildUrl(initialEndpoint), initialPostData, initialOptions)

      let response = await this.driver.put(endpoint, postData, options)

      response = this.afterResponse(response)

      return <T> response.data
    } catch (error) {
      throw this.handlerError(error)
    }
  }

  async patch<T = any>(initialEndpoint: string, initialPostData: any, initialOptions?: IOptions): Promise<T> {
    try {
      const {endpoint, postData, options} = this.prepareRequest(this.buildUrl(initialEndpoint), initialPostData, initialOptions)

      let response = await this.driver.patch(endpoint, postData, options)

      response = this.afterResponse(response)

      return <T> response.data
    } catch (error) {
      throw this.handlerError(error)
    }
  }

  async delete<T = any>(initialEndpoint: string, initialOptions?: IOptions): Promise<T> {
    try {
      const {endpoint, postData, options} = this.prepareRequest(this.buildUrl(initialEndpoint), undefined, initialOptions)

      let response = await this.driver.delete(endpoint, options)

      response = this.afterResponse(response)

      return <T> response.data
    } catch (error) {
      throw this.handlerError(error)
    }
  }

  async get<T = any>(initialEndpoint: string, initialOptions?: IOptions): Promise<T> {
    try {
      const {endpoint, options} = this.prepareRequest(this.buildUrl(initialEndpoint), undefined, initialOptions)

      let response = await this.driver.get(endpoint, options)

      response = this.afterResponse(response)

      return <T> response.data
    } catch (error) {
      throw this.handlerError(error)
    }
  }
}

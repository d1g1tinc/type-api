import axios from 'axios'

export interface IOptions {
    headers: any
}

export class AxiosDriver {
    public baseUrl: string = ''
    public instance: any = axios

    constructor(baseUrl?: string) {
        if (baseUrl) {
            this.baseUrl = baseUrl
        }
    }

    public get(url: string, options?: IOptions): Promise<any> {
        return axios.get(`${this.baseUrl}${url}`, options)
    }

    public post(url: string, postData: IOptions, options?: IOptions): Promise<any> {
        return axios.post(`${this.baseUrl}${url}`, postData, options)
    }

    public put(url: string, putData: IOptions, options?: IOptions): Promise<any> {
        return axios.put(`${this.baseUrl}${url}`, putData, options)
    }

    public patch(url: string, patchData: IOptions, options?: IOptions): Promise<any> {
        return axios.patch(`${this.baseUrl}${url}`, patchData, options)
    }

    public delete(url: string, options?: IOptions): Promise<any> {
        return axios.delete(`${this.baseUrl}${url}`, options)
    }
}

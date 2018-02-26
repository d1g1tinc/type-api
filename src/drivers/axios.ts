import axios from 'axios'
import moxios from 'moxios'

export interface IOptions {
    headers: any
}

export class AxiosDriver {
    public instance: any = axios
    public moxios: typeof moxios = moxios

    public enableMoxios() {
        this.moxios.install(this.instance)
    }

    public get(url: string, options?: IOptions): Promise<any> {
        return this.instance.get(`${url}`, options)
    }

    public post(url: string, postData: IOptions, options?: IOptions): Promise<any> {
        return this.instance.post(`${url}`, postData, options)
    }

    public put(url: string, putData: IOptions, options?: IOptions): Promise<any> {
        return this.instance.put(`${url}`, putData, options)
    }

    public patch(url: string, patchData: IOptions, options?: IOptions): Promise<any> {
        return this.instance.patch(`${url}`, patchData, options)
    }

    public delete(url: string, options?: IOptions): Promise<any> {
        return this.instance.delete(`${url}`, options)
    }
}

export const axiosDriver = new AxiosDriver()

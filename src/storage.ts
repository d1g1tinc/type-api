export class JWTSession {
    readonly keepAliveUrl = ''
    private token = ''

    constructor (config: any) {
        const token = localStorage.getItem('JWTSession.token')

        if (token) {
            this.token = token
        }

        this.keepAliveUrl = config.keepAliveUrl
    }

    authorize (response: any) {
        if (!response || !response.token) {
            return
        }

        this.token = response.token

        localStorage.setItem('JWTSession.token', this.token)

        return response
    }

    deauthorize (response?: any) {
        this.token = ''

        localStorage.removeItem('JWTSession.token')

        return response
    }

    secure (endpoint: any, postData: any, options: any) {
        if (!this.token) {
            return {endpoint, postData, options}
        }

        if (!options.headers) {
            options.headers = {
                'Authorization': `JWT ${this.token}`
            }
        } else {
            options.headers.Authorization = `JWT ${this.token}`
        }

        return {endpoint, postData, options}
    }
}

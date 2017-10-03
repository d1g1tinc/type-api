import 'reflect-metadata'

export function driver(api: any) {
    return (target: any) => {
        target.prototype.driver = new api()

        return target
    }
}

export function rest({endpoint, baseUrl}: {endpoint: string, baseUrl: string}) {
    return (target: any) => {
        target.prototype.endpoint = endpoint

        if (baseUrl && target.prototype.driver) {
            target.prototype.driver.baseUrl = baseUrl
        }

        return target
    }
}

export function before (requestHandler: any): any {
    return (target: any, propertyName: any, descriptor: any) => {
      const beforeRequest = Reflect.getMetadata('beforeRequest', target) || []

      beforeRequest.push(requestHandler)

      Reflect.defineMetadata(
        'beforeRequest',
        beforeRequest,
        target
      )

      return target
    }
}

export function after(responseHandler: any): any {
    return (target: any, propertyName: string, descriptor: any) => {
        // Method
        if (descriptor) {
            const method = descriptor.value

            descriptor.value = async function (...args: any[]) {
                if (!method) {
                    return
                }

                let data

                try {
                    data = await method.apply(this, args)
                } catch (err) {
                    throw err
                }

                return responseHandler(data)
            }

            return
        }

        const afterRequest = Reflect.getMetadata('afterRequest', target) || []

        afterRequest.push(responseHandler)

        Reflect.defineMetadata(
            'afterRequest',
            afterRequest,
            target
        )

        return target
    }
}

export function errorHandler(responseHandler: any): any {
    return (target: any, propertyName: string, descriptor: any) => {
        // class
        const onError = Reflect.getMetadata('onError', target) || []

        onError.push(responseHandler)

        Reflect.defineMetadata(
            'onError',
            onError,
            target
        )

        return target
    }
}

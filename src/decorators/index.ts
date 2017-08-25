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
      console.log('before', descriptor, target)
      const beforeRequest = Reflect.getMetadata('beforeRequest', Object.getPrototypeOf(target.prototype)) || []

      beforeRequest.push(requestHandler)

      Reflect.defineMetadata(
        'beforeRequest',
        beforeRequest,
        Object.getPrototypeOf(target.prototype)
      )

      return target
    }
}

export function after (responseHandler: any): any {
    return (target: any, propertyName: string, descriptor: any) => {
        console.log('after', descriptor, target)
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

        // class
        const afterRequest = Reflect.getMetadata('afterRequest', Object.getPrototypeOf(target.prototype)) || []

        afterRequest.push(responseHandler)

        Reflect.defineMetadata(
            'afterRequest',
            afterRequest,
            Object.getPrototypeOf(target.prototype)
        )

        return target
    }
}

export function errorHandler (responseHandler: any): any {
    return (target: any, propertyName: string, descriptor: any) => {
        console.log('error', descriptor, target)
        // class
        const onError = Reflect.getMetadata('onError', Object.getPrototypeOf(target.prototype)) || []

        onError.push(responseHandler)

        Reflect.defineMetadata(
            'onError',
            onError,
            Object.getPrototypeOf(target.prototype)
        )

        return target
    }
}

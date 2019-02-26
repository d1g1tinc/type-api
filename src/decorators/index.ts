import 'reflect-metadata'

export function driver(driverInstance: any) {
  return (target: any) => {
    Reflect.defineMetadata(
      'driver',
      driverInstance,
      target
    )

    return target
  }
}

export function before(requestHandler: any): any {
  return (target: any, propertyName: any, descriptor: any) => {
    // Method
    if (descriptor) {
      const method = descriptor.value

      descriptor.value = async function(...args: any[]) {
        if (!method) {
          return
        }

        const data = requestHandler(...args)

        return await method.apply(this, [data.endpoint, data.data, data.options])
      }

      return
    }

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

      descriptor.value = async function(...args: any[]) {
        if (!method) {
          return
        }

        const data = await method.apply(this, args)

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

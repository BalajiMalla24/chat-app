class Apierror extends Error{
    constructor(statuscode , message="something went wrong"){
        super(message)
        this.statuscode = statuscode
        this.success = false
        this.data = null
        this.message = message
        // this.errors =errors
        // if (stack) {
        //     this.stack = stack
        // } else{
        //     Error.captureStackTrace(this, this.constructor)
        // }
    }
}

export {Apierror}
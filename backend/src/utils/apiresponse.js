class apiresponse{
    constructor( statuscode , message="success"  , data  , success){
        this.data = data;
        this.message =message
        this.statuscode = statuscode
        this.success = statuscode < 400

    }
}
export {apiresponse}
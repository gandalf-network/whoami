// TypeScript file generated from C:\Users\user\AppData\Roaming\npm\node_modules\@gandalf-network\eyeofsauron\dist\scripts\templates\errors.txt 
 enum GandalfErrorCode {
    InvalidSignature    = 'INVALID_SIGNATURE',
    InvalidService      = 'PROTOCOL_NOT_SUPPORTED',
    RecordNotFound      = 'RECORD_NOT_FOUND',
    InternalServerError = 'INTERNAL_SERVER_ERROR'
}
    
class GandalfError extends Error {
    code: GandalfErrorCode
    constructor(message: string, code: GandalfErrorCode) {
        super(message);

        Object.setPrototypeOf(this, GandalfError.prototype);
        this.name = this.constructor.name;
        this.code = code;
    }
}

function handleErrors(error: any): GandalfError {
    if (error?.response?.errors?.[0]?.extensions?.code) {
        switch (error.response.errors[0].extensions.code) {
            case "INVALID_SIGNATURE":
                return new GandalfError(
                    error.response.errors[0].message + ' verify your private key', 
                    GandalfErrorCode.InvalidSignature,
                ) 
            case "RECORD_NOT_FOUND":
                return new GandalfError(
                    error.response.errors[0].message, 
                    GandalfErrorCode.RecordNotFound,
                ) 
            case "PROTOCOL_NOT_SUPPORTED":
                return new GandalfError(
                    error.response.errors[0].message, 
                    GandalfErrorCode.InvalidService,
                ) 
            default:
                return new GandalfError(
                    error.response.errors[0].message, 
                    GandalfErrorCode.InternalServerError,
                ) 
        }
    } else return new GandalfError(
        error.message, 
        GandalfErrorCode.InternalServerError,
    ) 
}
    
export { GandalfError, GandalfErrorCode, handleErrors };
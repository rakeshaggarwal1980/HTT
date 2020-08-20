export enum RESPONSE_STATUS_ENUM {
    SUCCESS = 1,
    FAILED = 0,
    UNACCEPTABLE_DATA = 429,
    UNACCEPTABLE_FORMAT = 430,
    NO_MAIL_FOUND = 431,
    NO_IDENTIFIER_FOUND = 432,
    INVALID_IMAGE_SIZE = 406
}

export enum ERROR_CODES {
    UNAUTHORIZED = 401,
    SERVICE_NOT_FOUND = 404,
    BACKEND_NOT_AVAILABLE = 504,
    BACKEND_ISSUE = 500,
    FILE_NOT_FOUND = 510,
    FILE_READ_ERROR = 511
}

export enum REQUEST_TYPE {
    REQUEST = 'Request',
    SHARE = 'SHARE',
    BILL_OF_MATERIAL = 'BillOfMaterial',
    MATERIAL = 'Material',
    EQUIPMENT = 'Equipment'
}


export enum HTTP_REQUEST_TYPE {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export enum SORT_DIRECTION {
    ASC = 'ASC',
    DESC = 'DESC'
}




export enum LOADING_STATUS {
    STARTED = 'started',
    COMPLETED = 'completed'
}

export enum EXPRESSION_OPERATION {
    EQUALS = 'Equals',
    GREATER_THAN = 'GreaterThan',
    LESS_THAN = 'LessThan',
    GREATER_OR_EQUAL = 'GreaterThanOrEqual',
    LESS_OR_EQUAL = 'LessThanOrEqual',
    CONTAINS = 'Contains',
    STARTS_WITH = 'StartsWith',
    ENDS_WITH = 'EndsWith'
}

export enum FILE_TYPES {
    PDF = 'pdf',
    IMG = 'img',
    CSV = 'csv'
}

export enum EntityStatus {
    Active = 0,
    Deleted = 1,
    InProgress = 2,
    Finished = 3,
    Accept = 4,
    Deny = 5
}

/**
 * Basic JSON response for controllers
 */
export type BasicResponse = {
    message: string
}

/**
 * Error JSON response for Controllers
 */
export type ErrorResponse = {
    error: string,
    message: string
}

export type DateResponse = {
    message: string,
    Date: Date
}
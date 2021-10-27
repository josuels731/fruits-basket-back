import { Request, Response } from 'express'

interface RequestPostNew extends Request {
    body: {
        name: string
        biography: string
        email: string
        password: string
    }
}
interface ResponsePostNew {
    error?: string
    email?: string
    name?: string
}

interface RequestPostLogin extends Request {
    body: {
        email: string
        password: string
    }
}
interface ResponsePostLogin {
    error?: string
    token?: string
    name?: string
}

interface RequestDelete extends Request {
    body: {
        id: string
    }
}
interface ResponseDelete {
    error?: string
    name?: string
    email?: string
}

interface RequestPatch extends Request {
    body: {
        id: string
        name?: string
        biography?: string
        email?: string
        password?: string
    }
}
interface ResponsePatch {
    error?: string
    name?: string
    biography?: string
    email?: string
}
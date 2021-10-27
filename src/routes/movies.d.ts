import { Request, Response } from 'express'

interface RequestPostNew extends Request {
    body: {

    }
}
interface ResponsePostNew {
    error?: string
}

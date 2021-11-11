import { Request, Response } from 'express'
import { Schema } from 'mongoose'
import { Comment } from '../models/comment'

interface RequestGetMovie extends Request {
    params: {
        id: string
    }
}
interface ResponseGetMovie {
    error?: string,
    comments?: Comment[]
}

interface RequestGetUser extends Request {
    params: {
        id: Schema.Types.ObjectId
    }
}
interface ResponseGetUser {
    error?: string
    comments?: Comment[]
}

interface RequestPostNew extends Request {
    body: Comment
}
interface ResponsePostNew {
    error?: string,
}
import axios, { AxiosPromise } from 'axios'
import { env } from '../../env'

export default class Service {
    private api
    constructor() {
        this.api = axios.create({
            baseURL: env.VITE_BASE_URL_API,
            headers: {
                Accept: 'application/json',
            },
        })
    }

    public async searchUsers(query: string): AxiosPromise {
        return await this.api.get(`users/?q=${query}`)
    }

    public async postFile(file: FormData): AxiosPromise {
        return await this.api.post(`files/`, file, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }
}

import * as $ from 'jquery';

interface Params {
    url: string,
    opts: object,
    type?: string
}

const ajax = (url: string, params: Params): any => {
    return new Promise((resolve, reject) => {
        params = Object.assign(params, {
            url: url,
            type: params.type || 'get',
            data: params.opts || {},
            success: (res: any) => {
                if (res.code === 0) {
                    resolve(res);
                } else {
                    reject(res);
                    console.log('message', res.message);
                }

            },
            error: (error: any) => {
                reject(error);
                console.log(error);
            }
        });

        $.ajax(params)
    })

}

export default {
    request (baseUrl: string) {
        return function (params: Params) {
            params = Object.assign({}, params)
            return ajax(baseUrl + params.url, params)
        }
    }
};

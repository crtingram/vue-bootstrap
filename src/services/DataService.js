import http from "../http-common";

class DataService {
    getRecords(params) {
        let args = `?_page=${params.page}&_limit=${params.size}`;
        return http.get(args);
    }
}

export default new DataService();
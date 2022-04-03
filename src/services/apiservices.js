import http from "../http-common";


class APISERVICES{
  getAll() {
    return http.get("/entries");
  }

  get(id) {
    return http.get(`/entries/${id}`);
  }

  create(data) {
    return http.post("/entries", data);
  }

  update(id, data) {
    return http.put(`/entries/${id}`, data);
  }

  delete(id) {
    return http.delete(`/entries/${id}`);
  }

  deleteAll() {
    return http.delete(`/entries`);
  }

  findByTitle(title) {
    return http.get(`/entries?title=${title}`);
  }
}

export default new APISERVICES();

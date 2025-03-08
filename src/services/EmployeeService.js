import BaseApi from "./BaseApi";
const api = new BaseApi();

const PATH = 'employees';

const EmployeeService = {
  async getEmployees() {
    return await api.get(PATH);
  },
  async getEmployee(id) {
    return await api.get(`${PATH}/${id}`);
  },
  async createEmployee(post) {
    return await api.post(PATH, post);
  },
  async updateEmployee(id, post) {
    return await api.put(`${PATH}/${id}`, post);
  },
  async deleteEmployee(id) {
    return await api.delete(`${PATH}/${id}`);
  },
};

export default EmployeeService;
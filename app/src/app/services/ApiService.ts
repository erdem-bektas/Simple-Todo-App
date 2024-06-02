import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

class TodoApiService {
    private token: string | null;

    constructor() {
        this.token = localStorage.getItem('token');
    }

    private getAuthHeaders() {
        return {
            Authorization: `Bearer ${this.token}`
        };
    }

    async fetchTodos(page: number) {
        const response = await axios.get(`${apiBaseUrl}todos/list?page=${page}&limit=5`, {
            headers: this.getAuthHeaders()
        });
        return response.data;
    }

    async searchTodos(searchValue: string) {
        let url = `${apiBaseUrl}todos/list`;
        if (searchValue.trim() !== '') {
            url = `${apiBaseUrl}todos/filter-tag/${searchValue}`;
        }

        const response = await axios.get(url, {
            headers: this.getAuthHeaders()
        });
        return response.data;
    }

    async deleteTodo(id: string) {
        await axios.post(`${apiBaseUrl}todos/delete/${id}`, {}, {
            headers: this.getAuthHeaders()
        });
    }

    async fetchTodoDetails(id: string) {
        const response = await axios.get(`${apiBaseUrl}todos/get/${id}`, {
            headers: this.getAuthHeaders()
        });
        return response.data;
    }

    async addOrUpdateTodo(formData: FormData, isEdit: boolean, id: string = '') {
        const url = isEdit ? `${apiBaseUrl}todos/edit/${id}` : `${apiBaseUrl}todos/add`;
        const response = await axios.post(url, formData, {
            headers: {
                ...this.getAuthHeaders(),
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }
}

export default new TodoApiService();

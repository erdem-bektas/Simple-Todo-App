"use client"

import { useEffect, useState } from "react";
import { Button, Pagination, Skeleton, TextInput } from "@mantine/core";
import { MdDelete } from "react-icons/md";
import ApiService from "../services/ApiService";

interface TodoListComponentProps {
    onSelectTodo: (id: string) => void;
    refreshList: boolean;
}

const TodoListComponent: React.FC<TodoListComponentProps> = ({ onSelectTodo, refreshList }) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [todoList, setTodoList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ApiService.fetchTodos(currentPage);
                setTodoList(data.todos);
                setTotalPages(data.totalPages);
                setIsLoading(false);
            } catch (error) {
                setError(error as Error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentPage, searchValue, refreshList]);

    const handleSearch = async () => {
        try {
            const data = await ApiService.searchTodos(searchValue);
            setTodoList(data);
        } catch (error) {
            console.error('Search error:', error);
            alert('Failed to perform the search.');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete?")) {
            return;
        }
        try {
            await ApiService.deleteTodo(id);
            setTodoList(todoList.filter(todo => todo._id !== id));
        } catch (error) {
            alert("Failed to delete the todo.");
            console.error("Delete error:", error);
        }
    };

    if (error) return <div>Error loading todos!</div>;
    if (isLoading) {
        return (
            <div>
                {Array(10).fill(0).map((_, index) => (
                    <Skeleton key={index} height={28} mt="sm" animate />
                ))}
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between my-3">
                <TextInput
                    placeholder="Search by tag"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    style={{ flex: 1, marginRight: 8 }}
                />

                <Button onClick={handleSearch}>Search</Button>
            </div>
            <h1 className="text-2xl italic font-bold my-3">To-Do List</h1>
            {todoList.length > 0 ? (
                todoList.map((todo) => (
                    <div className="shadow rounded-lg flex justify-center place-content-between m-4 p-4" key={todo._id} onClick={() => onSelectTodo(todo._id)}>
                        {todo.files && todo.files.length > 0 && todo.files[0].isImage ? (
                            <img className=" rounded-lg mx-4" src={`${apiBaseUrl}uploads/${todo.files[0].path.replace('src/uploads/', '')}`} alt="Thumbnail" style={{ width: 60, height: 60 }} />
                        ) : null}
                        <span className="my-8">{todo.title}</span>
                        <button onClick={() => handleDelete(todo._id)}>
                            <MdDelete size={32} />
                        </button>
                    </div>
                ))
            ) : (
                <div>No todos found!</div>
            )}
            <Pagination value={currentPage} onChange={setCurrentPage} total={totalPages} />
        </div>
    );


};

export default TodoListComponent;
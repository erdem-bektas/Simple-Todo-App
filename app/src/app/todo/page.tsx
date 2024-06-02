"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell, Burger, Button, Group, TextInput, Textarea, TagsInput, FileInput, List, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GoPlus } from "react-icons/go";
import TodoListComponent from '../components/TodoListComponent';
import IFileDetail from './interfaces/IFileDetail';
import ITodoDetail from './interfaces/ITodoDetail';
import ApiService from '../services/ApiService';

const TodoPage: React.FC = () => {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const [formData, setFormData] = useState<ITodoDetail>({ title: '', description: '', tags: [], files: [] });
  const [showForm, setShowForm] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!token || !refreshToken) {
      router.push('/');
      return;
    }

    if (selectedTodo) {
      const fetchDetails = async (id: string) => {
        try {
          const data = await ApiService.fetchTodoDetails(id);
          setFormData({ ...data });
          setShowForm(true);
        } catch (error) {
          console.error('Error fetching todo details:', error);
        }
      };
      fetchDetails(selectedTodo);
    }
  }, [selectedTodo, router]);

  const handleAddOrUpdateTodo = async () => {
    const token = localStorage.getItem('token');
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formData.tags.forEach(tag => formDataToSend.append('tags', tag));
    formData.files.forEach(file => formDataToSend.append('files', file));

    try {
      await ApiService.addOrUpdateTodo(formDataToSend, !!formData._id, formData._id);
      console.log(formData._id ? 'Todo updated successfully' : 'Todo added successfully');
      resetForm();
      setRefreshList(prev => !prev);
    } catch (error) {
      console.error('Error posting todo:', error);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', tags: [], files: [] });
    setShowForm(false);
    setSelectedTodo(null);
  };

  const updateField = (field: keyof ITodoDetail, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderFiles = (files: IFileDetail[]) => (
    <List>
      {files.map(file => (
        <List.Item key={file._id}>
          <Anchor key={file._id}  href={`/${file.path}`} download={file.originalname}>
            {file.originalname}
          </Anchor>
        </List.Item>
      ))}
    </List>
  );

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'md', collapsed: { mobile: !opened } }}
      padding="lg"
    >
      <AppShell.Header>
        <Group h="100%" px="xl">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Button onClick={() => { resetForm(); setShowForm(true); }} leftSection={<GoPlus />} variant="filled" color="blue">Add Todo</Button>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <TodoListComponent onSelectTodo={setSelectedTodo} refreshList={refreshList} />
      </AppShell.Navbar>
      <AppShell.Main>
        {showForm ? (
          <>
            <TextInput label="Title" placeholder="Enter todo title" value={formData.title || ''} onChange={(e) => updateField('title', e.target.value)} />
            <Textarea label="Description" placeholder="Enter todo description" value={formData.description || ''} onChange={(e) => updateField('description', e.target.value)} />
            <TagsInput
              value={formData.tags}
              onChange={(tags) => updateField('tags', tags)}
              placeholder="Type and press enter to add a tag"
              label="Tags"
              description="Add tags for your todo"
            />
            <FileInput
              label="Upload files"
              placeholder="Upload files"
              clearable
              multiple
              value={formData.files}
              onChange={(files) => updateField('files', files)}
            />
            {formData.files && renderFiles(formData.files)}
            <Button className='my-4' onClick={handleAddOrUpdateTodo} variant="filled" color="green">
              {formData._id ? 'Update' : 'Add'}
            </Button>
          </>
        ) : (
          <div>Select a todo to see the details or add a new todo.</div>
        )}
      </AppShell.Main>
    </AppShell>
  );
};

export default TodoPage;

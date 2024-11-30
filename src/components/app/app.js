import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";
import './app.css';

export default class App extends Component {
    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all'
    };

    // Создание новой задачи
    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    // Удаление задачи
    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((element) => element.id === id);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return { todoData: newArray };
        });
    };

    // Добавление новой задачи
    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newArr = [...todoData, newItem];
            return { todoData: newArr };
        });
    };

    // Переключение свойства (done или important)
    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((element) => element.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    // Переключение статуса задачи на выполненную
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return { todoData: this.toggleProperty(todoData, id, 'done') };
        });
    };

    // Переключение важности задачи
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return { todoData: this.toggleProperty(todoData, id, 'important') };
        });
    };

    // Обработка изменения поиска
    onSearchChange = (term) => {
        this.setState({term});
    };

    // Обработка изменения фильтра
    onFilterChange = (filter) => {
        this.setState({filter});
    };

    // Поиск задач по тексту
    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
    }

    // Фильтрация задач (all, active, done)
    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    }

    render() {
        const {todoData, term, filter} = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = todoData.filter((element) => element.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
                </div>

                <TodoList 
                    todos={visibleItems} 
                    onDeleted={this.deleteItem} 
                    onToggleImportant={this.onToggleImportant} 
                    onToggleDone={this.onToggleDone} 
                />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        );
    }
}

import React, { Component } from 'react';

// Импорты других компонентов
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from "../item-add-form";
import './app.css';

// Основной компонент приложения
export default class App extends Component {
  // Переменная для генерации уникальных ID
  maxId = 100;

  // Начальное состояние приложения
  state = {
    todoData: [ // Начальные задачи
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '', // Значение поля поиска
    filter: 'all' // Начальный фильтр по умолчанию
  };

  // Метод для создания новой задачи
  createTodoItem(label) {
    return {
      label, 
      important: false, 
      done: false, 
      id: this.maxId++ // Уникальный ID для каждой новой задачи
    };
  }

  // Метод для удаления задачи
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((element) => element.id === id); // Поиск индекса задачи
      const newArray = [
        ...todoData.slice(0, idx), // Удаляем элемент до индекса
        ...todoData.slice(idx + 1) // Удаляем элемент после индекса
      ];
      return { todoData: newArray }; // Обновляем состояние
    });
  };

  // Метод для добавления новой задачи
  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]; // Добавляем новый элемент
      return { todoData: newArr };
    });
  };

  // Метод для переключения свойства задачи (done или important)
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((element) => element.id === id); // Поиск задачи по ID
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }; // Изменяем нужное свойство
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  // Переключение статуса задачи на выполненную
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, 'done') };
    });
  };

  // Переключение важности задачи
  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, 'important') };
    });
  };

  // Обновление строки поиска
  onSearchChange = (term) => {
    this.setState({ term });
  };

  // Обновление фильтра по состоянию задачи
  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  // Поиск задач по тексту
  search(items, term) {
    if (term.length === 0) return items; // Если поисковая строка пустая, возвращаем все задачи
    return items.filter((item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  // Фильтрация задач по состоянию (all, active, done)
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

  // Метод render отвечает за рендеринг интерфейса
  render() {
    const { todoData, term, filter } = this.state;

    // Применяем поиск и фильтрацию к данным
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((element) => element.done).length; // Подсчет завершенных задач
    const todoCount = todoData.length - doneCount; // Подсчет оставшихся задач

    return (
      <div className="todo-app">
        {/* Отображаем шапку приложения с количеством задач */}
        <AppHeader toDo={todoCount} done={doneCount} />
        
        {/* Панель с поиском и фильтрацией */}
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
        </div>

        {/* Список задач */}
        <TodoList 
          todos={visibleItems} 
          onDeleted={this.deleteItem} 
          onToggleImportant={this.onToggleImportant} 
          onToggleDone={this.onToggleDone} 
        />
        
        {/* Форма для добавления новой задачи */}
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}

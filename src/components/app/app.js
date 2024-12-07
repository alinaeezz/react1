// Импорт React и компонента Component
import React, { Component } from 'react';

// Импорт других компонентов приложения
import AppHeader from '../app-header'; // Шапка приложения
import SearchPanel from '../search-panel'; // Панель поиска
import TodoList from '../todo-list'; // Список задач
import ItemStatusFilter from '../item-status-filter'; // Фильтры задач
import ItemAddForm from "../item-add-form"; // Форма для добавления задач

// Импорт CSS для стилизации
import './app.css';

// Основной компонент приложения
export default class App extends Component {
  // Поле класса для генерации уникальных ID
  maxId = 100;

  // Начальное состояние приложения
  state = {
    todoData: [ // Массив начальных задач
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '', // Текущая строка поиска
    filter: 'all' // Текущий фильтр задач (все, активные, выполненные)
  };

  // Метод для создания объекта задачи
  createTodoItem(label) {
    return {
      label, // Текст задачи
      important: false, // Признак важности задачи
      done: false, // Признак выполнения задачи
      id: this.maxId++ // Уникальный идентификатор
    };
  }

  // Метод для удаления задачи
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((element) => element.id === id); // Находим индекс задачи
      const newArray = [
        ...todoData.slice(0, idx), // Массив без удаляемой задачи (до индекса)
        ...todoData.slice(idx + 1) // Массив без удаляемой задачи (после индекса)
      ];
      return { todoData: newArray }; // Обновляем состояние
    });
  };

  // Метод для добавления новой задачи
  addItem = (text) => {
    const newItem = this.createTodoItem(text); // Создаем новую задачу
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]; // Добавляем задачу в массив
      return { todoData: newArr }; // Обновляем состояние
    });
  };

  // Общий метод для переключения свойств задачи
  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((element) => element.id === id); // Находим индекс задачи
    const oldItem = arr[idx]; // Исходная задача
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }; // Меняем свойство на противоположное
    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1)
    ];
  }

  // Метод для переключения статуса выполнения задачи
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, 'done') };
    });
  };

  // Метод для переключения важности задачи
  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return { todoData: this.toggleProperty(todoData, id, 'important') };
    });
  };

  // Метод для обновления строки поиска
  onSearchChange = (term) => {
    this.setState({ term }); // Обновляем состояние
  };

  // Метод для обновления фильтра
  onFilterChange = (filter) => {
    this.setState({ filter }); // Обновляем состояние
  };

  // Метод для поиска задач по тексту
  search(items, term) {
    if (term.length === 0) return items; // Если поисковая строка пустая, возвращаем все задачи
    return items.filter((item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1); // Фильтруем задачи
  }

  // Метод для фильтрации задач по состоянию
  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items; // Возвращаем все задачи
      case 'active':
        return items.filter((item) => !item.done); // Только активные задачи
      case 'done':
        return items.filter((item) => item.done); // Только выполненные задачи
      default:
        return items;
    }
  }

  // Метод render — отображение интерфейса приложения
  render() {
    const { todoData, term, filter } = this.state;

    // Применяем поиск и фильтрацию к задачам
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((element) => element.done).length; // Количество выполненных задач
    const todoCount = todoData.length - doneCount; // Количество оставшихся задач

    return (
      <div className="todo-app">
        {/* Шапка приложения с количеством задач */}
        <AppHeader toDo={todoCount} done={doneCount} />
        
        {/* Панель поиска и фильтров */}
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
        
        {/* Форма добавления задач */}
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}

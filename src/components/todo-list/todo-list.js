// Импорт React
import React from 'react';

// Импорт компонента TodoListItem, который отвечает за отображение одной задачи
import TodoListItem from '../todo-list-item/todo-list-item';

// Импорт стилей для компонента TodoList
import './todo-list.css';

// Функциональный компонент TodoList
// Получает свойства (props): массив задач (todos), а также функции для удаления и изменения статуса задачи
const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
    // Генерация JSX-элементов для каждой задачи из массива todos
    const elements = todos.map((item) => {
        const { id, ...itemProps } = item; // Деструктуризация: извлечение id из задачи, остальные свойства передаются через `itemProps`

        return (
            <li key={id} className="list-group-item"> {/* Элемент списка с уникальным ключом (id) */} 
                <TodoListItem 
                    {...itemProps} // Передача всех остальных свойств задачи в компонент TodoListItem
                    onDeleted={() => onDeleted(id)} // Привязка функции удаления к конкретной задаче по id
                    onToggleImportant={() => onToggleImportant(id)} // Привязка функции переключения важности
                    onToggleDone={() => onToggleDone(id)} // Привязка функции переключения статуса выполнения
                />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list"> {/* Контейнер для списка задач с классами стилей */} 
            {elements} {/* Отображение всех сгенерированных элементов задач */} 
        </ul>
    );
};

// Экспорт компонента TodoList для использования в других частях приложения
export default TodoList;

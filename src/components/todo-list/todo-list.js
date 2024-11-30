import React from 'react';

import TodoListItem from '../todo-list-item/todo-list-item'; // Импорт компонента задачи
import './todo-list.css'; // Импорт стилей

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
    // Генерация элементов списка задач
    const elements = todos.map((item) => {
        const { id, ...itemProps } = item; // Деструктуризация: извлечение id, остальные свойства передаются дальше

        return (
            <li key={id} className="list-group-item"> {/* Элемент списка с уникальным ключом */}
                <TodoListItem 
                    {...itemProps} // Передача всех остальных свойств задачи
                    onDeleted={() => onDeleted(id)} // Удаление задачи
                    onToggleImportant={() => onToggleImportant(id)} // Переключение важности
                    onToggleDone={() => onToggleDone(id)} // Переключение состояния выполнения
                />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list"> {/* Список задач */}
            {elements} {/* Отображение всех задач */}
        </ul>
    );
};

export default TodoList; // Экспорт компонента

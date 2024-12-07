import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item'; // Импорт компонента задачи
import './todo-list.css'; // Импорт стилей для компонента

// Основной компонент списка задач (TodoList)
const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {
    // Генерация элементов списка задач
    const elements = todos.map((item) => {
        const { id, ...itemProps } = item; // Деструктуризация: извлечение id, остальные свойства задачи передаются дальше

        return (
            <li key={id} className="list-group-item"> {/* Элемент списка с уникальным ключом */}
                <TodoListItem 
                    {...itemProps} // Передача всех остальных свойств задачи
                    onDeleted={() => onDeleted(id)} // Обработчик удаления задачи
                    onToggleImportant={() => onToggleImportant(id)} // Обработчик переключения важности
                    onToggleDone={() => onToggleDone(id)} // Обработчик переключения статуса задачи
                />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list"> {/* Основной контейнер для списка задач */}
            {elements} {/* Отображение всех сгенерированных задач */}
        </ul>
    );
};

export default TodoList; // Экспорт компонента для использования в других частях приложения

import React, { Component } from 'react';
import './todo-list-item.css'; // Импорты стилей для данного компонента

// Компонент для отображения одной задачи в списке (TodoListItem)
export default class TodoListItem extends Component {
    render() {
        // Деструктуризация свойств из props
        const { 
            label,              // Название задачи
            onDeleted,         // Обработчик для удаления задачи
            onToggleImportant, // Обработчик для переключения важности задачи
            onToggleDone,      // Обработчик для переключения статуса выполнения задачи
            important,         // Флаг, показывающий, важна ли задача
            done               // Флаг, показывающий, выполнена ли задача
        } = this.props;

        // Определяем классы для динамического стилирования задачи
        let classNames = 'todo-list-item'; // Базовый класс для всех задач
        if (done) {
            classNames += ' done'; // Добавляем класс, если задача выполнена
        }
        if (important) {
            classNames += ' important'; // Добавляем класс, если задача важная
        }

        return (
            <span className={classNames}> 
                {/* Основной контейнер задачи с динамическими классами */}
                
                {/* Название задачи */}
                <span
                    className="todo-list-item-label"
                    onClick={onToggleDone} // Обработчик клика по задаче для переключения статуса выполнения
                >
                    {label}
                </span>

                {/* Кнопка для переключения статуса важности */}
                <button 
                    type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={onToggleImportant}
                >
                    <i className="fa fa-exclamation" /> {/* Иконка, представляющая важность */}
                </button>

                {/* Кнопка для удаления задачи */}
                <button 
                    type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={onDeleted}
                >
                    <i className="fa fa-trash-o" /> {/* Иконка удаления */}
                </button>
            </span>
        );
    }
}

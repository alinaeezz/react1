import React, { Component } from 'react';
import './todo-list-item.css'; // Импорт стилей

// Компонент для отображения отдельной задачи (TodoListItem)
export default class TodoListItem extends Component {
    render() {
        const { 
            label, // Текст задачи
            onDeleted, // Функция удаления задачи
            onToggleImportant, // Функция переключения важности
            onToggleDone, // Функция переключения выполнения
            important, // Флаг важности задачи
            done // Флаг выполнения задачи
        } = this.props; // Деструктуризация props

        // Определение классов в зависимости от статуса задачи
        let classNames = 'todo-list-item'; // Базовый класс
        if (done) {
            classNames += ' done'; // Класс для задач, которые выполнены
        }
        if (important) {
            classNames += ' important'; // Класс для важных задач
        }

        return (
            <span className={classNames}> {/* Контейнер задачи с динамическими классами */}
                {/* Название задачи. Клик по нему переключает статус выполнения */}
                <span
                    className="todo-list-item-label" 
                    onClick={onToggleDone} // Обработчик клика по тексту задачи
                >
                    {label} {/* Отображение текста задачи */}
                </span>

                {/* Кнопка для переключения важности задачи */}
                <button 
                    type="button"
                    className="btn btn-outline-success btn-sm float-right" 
                    onClick={onToggleImportant} 
                >
                    <i className="fa fa-exclamation" /> {/* Иконка важности */}
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

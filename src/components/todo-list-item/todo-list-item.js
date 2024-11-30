import React, { Component } from 'react';
import './todo-list-item.css'; // Импорт стилей

export default class TodoListItem extends Component {
    render() {
        const { 
            label, // Текст задачи
            onDeleted, // Функция удаления задачи
            onToggleImportant, // Функция переключения важности
            onToggleDone, // Функция переключения выполнения
            important, // Флаг важности задачи
            done // Флаг выполнения задачи
        } = this.props;

        let classNames = 'todo-list-item'; // Базовый класс для элемента
        if (done) {
            classNames += ' done'; // Добавление класса для выполненной задачи
        }
        if (important) {
            classNames += ' important'; // Добавление класса для важной задачи
        }

        return (
            <span className={classNames}> {/* Контейнер задачи с динамическими классами */}
                <span
                    className="todo-list-item-label" 
                    onClick={onToggleDone} // Обработчик клика для переключения выполнения
                >
                    {label} {/* Отображение текста задачи */}
                </span>

                <button 
                    type="button"
                    className="btn btn-outline-success btn-sm float-right" 
                    onClick={onToggleImportant} // Кнопка для переключения важности
                >
                    <i className="fa fa-exclamation" /> {/* Иконка важности */}
                </button>

                <button 
                    type="button"
                    className="btn btn-outline-danger btn-sm float-right" 
                    onClick={onDeleted} // Кнопка для удаления задачи
                >
                    <i className="fa fa-trash-o" /> {/* Иконка удаления */}
                </button>
            </span>
        );
    }
}

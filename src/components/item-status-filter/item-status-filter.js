import React, { Component } from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
    // Список кнопок фильтров
    buttons = [
        { name: 'all', label: 'All list' }, // Фильтр "все задачи"
        { name: 'active', label: 'Active list' }, // Фильтр "активные задачи"
        { name: 'done', label: 'Done list' } // Фильтр "выполненные задачи"
    ];

    render() {
        const { filter, onFilterChange } = this.props; // Деструктуризация props для текущего фильтра и обработчика изменений

        // Создание кнопок на основе массива buttons
        const buttons = this.buttons.map(({ name, label }) => {
            const isActive = filter === name; // Проверка, активен ли фильтр
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'; // Определяем стиль кнопки в зависимости от состояния фильтра

            return (
                <button
                    type="button" // Тип кнопки
                    className={`btn ${clazz}`} // Применяем динамический стиль
                    key={name} // Уникальный ключ для списка
                    onClick={() => {
                        // Проверяем, передан ли обработчик
                        if (onFilterChange) {
                            onFilterChange(name);
                        }
                    }} 
                >
                    {label} {/* Текст кнопки */}
                </button>
            );
        });

        return (
            <div className={"btn-group"}> {/* Группа кнопок */}
                {buttons} {/* Отображение кнопок */}
            </div>
        );
    }
}

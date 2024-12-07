// Импортируем необходимые модули из React
import React, { Component } from 'react';
// Подключаем стили для компонента
import './item-status-filter.css';

// Объявляем и экспортируем (по умолчанию) класс-компонент ItemStatusFilter
export default class ItemStatusFilter extends Component {
    // Определяем массив кнопок фильтрации, каждая кнопка имеет уникальное имя и текст
    buttons = [
        { name: 'all', label: 'All list' }, // Кнопка для отображения всех задач
        { name: 'active', label: 'Active list' }, // Кнопка для отображения активных задач
        { name: 'done', label: 'Done list' } // Кнопка для отображения выполненных задач
    ];

    // Основной метод классового компонента, отвечающий за отображение
    render() {
        // Деструктуризация props: получаем текущий фильтр и обработчик изменения фильтра
        const { filter, onFilterChange } = this.props;

        // Генерация кнопок на основе массива buttons
        const buttons = this.buttons.map(({ name, label }) => {
            // Определяем, активен ли текущий фильтр (сравниваем с именем кнопки)
            const isActive = filter === name;
            // Выбираем класс стиля для кнопки: активная кнопка или неактивная
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary';

            return (
                <button
                    type="button" // Указываем тип кнопки (обычная кнопка, а не отправка формы)
                    className={`btn ${clazz}`} // Динамически добавляем стиль на основе состояния фильтра
                    key={name} // Уникальный ключ, чтобы React корректно отслеживал элементы списка
                    onClick={() => { // Обработчик клика по кнопке
                        if (onFilterChange) { // Проверяем, передан ли обработчик через props
                            onFilterChange(name); // Вызываем обработчик и передаем имя фильтра
                        }
                    }}
                >
                    {label} {/* Отображаем текст кнопки */}
                </button>
            );
        });

        return (
            <div className="btn-group"> {/* Контейнер для группы кнопок */}
                {buttons} {/* Вставляем сгенерированные кнопки */}
            </div>
        );
    }
}

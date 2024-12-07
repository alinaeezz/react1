// Импорт React и компонента Component
import React, { Component } from "react";

// Импорт CSS-стилей для компонента
import './search-panel.css';

// Класс-компонент для строки поиска
export default class SearchPanel extends Component {
    // Локальное состояние компонента
    state = {
        term: '' // Сохраняет текущий текст, введенный в поле поиска
    };

    // Обработчик события изменения текста в поле ввода
    onSearchChange = (e) => {
        const term = e.target.value; // Получаем текущее значение из поля ввода
        this.setState({ term }); // Обновляем локальное состояние `term`

        // Проверяем, есть ли обработчик в props
        if (this.props.onSearchChange) {
            this.props.onSearchChange(term); // Передаем значение строки поиска в родительский компонент
        }
    };

    // Метод render для отображения интерфейса компонента
    render() {
        return (
            <input 
                type="text" // Поле ввода текста
                className={"form-control search-input"} // Применяем CSS классы для стилей
                placeholder={"type to search"} // Подсказка в поле ввода для пользователя
                value={this.state.term} // Связываем значение поля с состоянием компонента
                onChange={this.onSearchChange} // Привязываем обработчик изменения текста
            />
        );
    }
}

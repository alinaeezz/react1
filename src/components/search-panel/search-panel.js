import React, { Component } from "react";
import './search-panel.css';

export default class SearchPanel extends Component {
    state = {
        term: '' // Хранение текущего значения строки поиска
    };

    // Обработка изменения текста в строке поиска
    onSearchChange = (e) => {
        const term = e.target.value; // Получение значения из поля ввода
        this.setState({ term }); // Обновление состояния
        this.props.onSearchChange(term); // Вызов обработчика из props для обновления фильтрации
    };

    render() {
        return (
            <input 
                type="text" // Поле ввода текста
                className={"form-control search-input"} // CSS классы для оформления
                placeholder={"type to search"} // Подсказка в поле ввода
                value={this.state.term} // Привязка значения к состоянию
                onChange={this.onSearchChange} // Привязка обработчика изменения
            />
        );
    }
}

import React, { Component } from "react";
import './item-add-form.css';

export default class ItemAddForm extends Component {
    state = {
        label: '' // Хранение текста новой задачи
    };

    // Обработка изменения текста в поле ввода
    onLabelChange = (e) => {
        this.setState({
            label: e.target.value // Обновление состояния на основе ввода пользователя
        });
    };

    // Обработка отправки формы
    onSubmit = (e) => {
        e.preventDefault(); // Предотвращение перезагрузки страницы

        // Проверка на пустое значение или только пробелы
        if (this.state.label.trim() === '') {
            return; // Завершить, если поле ввода пустое или содержит только пробелы
        }

        // Проверяем, передан ли пропс onItemAdded
        if (this.props.onItemAdded) {
            this.props.onItemAdded(this.state.label); // Вызов метода из props с текстом задачи
        }

        this.setState({
            label: '' // Очистка поля ввода после добавления
        });
    };

    render() {
        return (
            <form 
                className={"item-add-form d-flex"} // CSS классы для оформления
                onSubmit={this.onSubmit} // Привязка обработчика отправки
            >
                <input 
                    type={"text"} // Поле ввода текста
                    className={"form-control"} // CSS классы Bootstrap
                    onChange={this.onLabelChange} // Привязка обработчика изменения текста
                    placeholder={"What needs to be done"} // Подсказка в поле ввода
                    value={this.state.label} // Связывание с состоянием компонента
                />
                <button 
                    className={"btn btn-outline-secondary"} // Кнопка для добавления задачи
                    type="submit" // Указание, что кнопка предназначена для отправки формы
                >
                    Add Item
                </button>
            </form>
        );
    }
}

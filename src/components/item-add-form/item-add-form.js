// Импортируем React и базовый класс Component для создания классового компонента
import React, { Component } from "react";
// Подключаем файл CSS для стилизации компонента
import './item-add-form.css';

// Объявляем и экспортируем (по умолчанию) классовый компонент ItemAddForm
export default class ItemAddForm extends Component {
    // Инициализация начального состояния компонента
    state = {
        label: '' // Сохраняем текст новой задачи, введенный пользователем
    };

    // Метод-обработчик изменения текста в поле ввода
    onLabelChange = (e) => {
        // Обновляем состояние компонента (state) на основе ввода пользователя
        this.setState({
            label: e.target.value // e.target.value содержит текущий текст из поля ввода
        });
    };

    // Метод-обработчик отправки формы
    onSubmit = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

        // Проверяем, пустое ли поле ввода или содержит только пробелы
        if (this.state.label.trim() === '') { 
            return; // Прерываем выполнение, если текст некорректный
        }

        // Если передан обработчик onItemAdded через props, вызываем его
        if (this.props.onItemAdded) {
            this.props.onItemAdded(this.state.label); // Передаем текст задачи из состояния (state)
        }

        // Сбрасываем состояние компонента: очищаем поле ввода
        this.setState({
            label: '' // Устанавливаем состояние label как пустую строку
        });
    };

    // Метод render() отвечает за отображение компонента
    render() {
        return (
            <form 
                className={"item-add-form d-flex"} // CSS классы для оформления формы
                onSubmit={this.onSubmit} // Привязываем метод onSubmit к событию отправки формы
            >
                {/* Поле ввода текста */}
                <input 
                    type={"text"} // Указываем, что это текстовое поле
                    className={"form-control"} // Bootstrap класс для стилизации
                    onChange={this.onLabelChange} // Привязываем метод onLabelChange к событию изменения текста
                    placeholder={"What needs to be done"} // Текст-подсказка в поле ввода
                    value={this.state.label} // Двусторонняя связь с состоянием компонента
                />
                {/* Кнопка для добавления новой задачи */}
                <button 
                    className={"btn btn-outline-secondary"} // Кнопка с Bootstrap классами
                    type="submit" // Указываем, что это кнопка отправки формы
                >
                    Add Item {/* Текст кнопки */}
                </button>
            </form>
        );
    }
}

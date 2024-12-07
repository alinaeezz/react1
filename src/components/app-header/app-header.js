// Импорт React и стилей CSS
import React from "react";
import './app-header.css';

// Определяем функциональный компонент AppHeader, который получает свойства toDo и done через props
const AppHeader = ({ toDo, done }) => {
    // Функциональный компонент возвращает разметку
    return (
        <div className={"app-header d-flex"}> {/* Основной контейнер с классами для стилей */}
            <h1>Todo List</h1> {/* Заголовок приложения */}
            {/* Отображение количества задач: сколько осталось сделать и сколько выполнено */}
            <h2>{toDo} more to do, {done} </h2> 
        </div>
    );
};

// Экспортируем компонент, чтобы он мог использоваться в других местах приложения
export default AppHeader;

import React from 'react'; // Импорт React для использования JSX
import ReactDOM from 'react-dom'; // Импорт ReactDOM для работы с DOM

import App from './components/app'; // Импорт основного компонента приложения

// Рендеринг компонента App в элемент с id 'root' в DOM
ReactDOM.render(
    <App />, 
    document.getElementById('root') // Указание контейнера для рендеринга
);

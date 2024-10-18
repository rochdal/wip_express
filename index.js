/* = Основы Node.js (семинары) =

Урок 3. Модули и фреймворк Express (WIP)

Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

— На каждой странице реализован счетчик просмотров
— Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
— Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
— Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер. */


//--- Создать объект express
const express = require('express');

//--- Создать объект приложения app
const app = express();

//--- Создать объект fs
const fs = require('fs');

//--- Счётчик просмотров главной страницы
let main_cnt = 0;

//--- Счётчик просмотров страницы about
let about_cnt = 0;



//--- Обработчик запроса '/'
app.get('/', (req, res) => {

    //--- Получить данные из файла data.json
    fs.readFile('./data.json', 'utf8', (err, data) => {

        if (err) {
            console.error('Ошибка при чтении файла:', err);
            return;
        }

        //--- Преобразовать JSON объект в объект JavaScript
        const datainfo = JSON.parse(data);

        //--- Увеличить счётчик просмотров
        main_cnt = datainfo.main_cnt + 1;

        //--- Отправить данные клиенту
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Добро пожаловать на главную страницу сайта!</h1>');
        res.end(`<p>Счётчик просмотров страницы = ${main_cnt} </p>`);

        //--- Записать значение счётчика просмотров в структуру datainfo
        datainfo.main_cnt = main_cnt;

        let newdata = JSON.stringify(datainfo);

        //--- Записать данные в файл (перезапись данных)
        fs.writeFile('./data.json', newdata, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
});



//--- Обработчик запроса '/about'
app.get('/about', (req, res) => {

    //--- Получить данные из файла data.json
    fs.readFile('./data.json', 'utf8', (err, data) => {

        if (err) {
            console.error('Ошибка при чтении файла:', err);
            return;
        }

        //--- Преобразовать JSON объект в объект JavaScript
        const datainfo = JSON.parse(data);

        //--- Увеличить счётчик просмотров
        about_cnt = datainfo.about_cnt + 1;

        //--- Отправить данные клиенту
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.write('<h1>Страница about</h1>');
        res.end(`<p>Счётчик просмотров страницы = ${about_cnt} </p>`);

        //--- Записать значение счётчика просмотров в структуру datainfo
        datainfo.about_cnt = about_cnt;

        let newdata = JSON.stringify(datainfo);

        //--- Записать данные в файл (перезапись данных)
        fs.writeFile('./data.json', newdata, (err) => {
            if (err) {
                console.log(err);
                return;
            } 
        });
    });
});


//--- Создать объект http сервера
const port = 3000;

app.listen(port, () => {
    console.log(`сервер запущен на порту ${port}`);
});





# Инструкция по запуску
Я захостил сайт на vercel (https://juzt-test-client.vercel.app/), но если все-таки хотите запустить локально, то вот интсрукция

- Установить зависимости - npm install
- Далее необходимо создать файл .env.local в корне проекта и поместить туда следующий код:
```
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bG92ZWQtcmF2ZW4tOTAuY2xlcmsuYWNjb3VudHMuZGV2JA
    CLERK_SECRET_KEY=sk_test_YNuLuJJqqQK7lwN5MyFRCjdRFom3Fnup3Pxd1KGHu1
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
    
    NEXT_PUBLIC_API_URL=https://juzt-test-server-8rho.vercel.app
```
Это переменные окружения для авторизации и для сервера

После этого npm run dev чтобы запустить проект в дев режиме или nmp run build & npm run start чтобы запустить локально забилженный сайт

После этих шагов все должно работать :)

Напишу сразу про некоторые нюансы:
]. Думал, что некст будет быстрее менять страницы и завязал фильтры чисто на query строку, в итоге получил то что получил. В проде бы так не делал, теперь знаю, завязал бы все на клиенте, 
а в query бы сохранял все только чтоб человек мог по ней потом все открыть
2. Возикла проблемка с бд на сервере, я делал ее как json файл, но при деплое были ошибки и я заменил массив автомобилей на обычный массив в js файле. Из-за этого
добавление автомобиля работает нестабильно. Он добавляется, запрос проходит, но потом появляются баги.
3. Не делал валидацию формы, не хватало уже времени. Тут она вроде и не очень важно, но было бы время, сделал бы.

В остальном, вроде получилось неплохо, я очень старался)

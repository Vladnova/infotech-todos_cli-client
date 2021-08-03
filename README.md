# Получаем и выводим весь список Todos  в виде таблицы 
node index.js --action list --email example@ukr.net

# Получаем Todo по id
node index.js --action get --email example@ukr.net --id todoId

# Добавялем Todo
node index.js --action add --email example@ukr.net --title "example todo" --text "add todo"

# Удаляем контакт
node index.js --action remove --email example@ukr.net --id todoId

# Обновляем Todo
node index.js --action update --email example@ukr.net --id todoId --title "update todo" --text "add update todo"



# Зарегистрировать пользователя 
node index.js --action signup --email example@ukr.net --password example

# Залогинить пользователя 
node index.js --action signin --email example@ukr.net --password example

# Выйти з уточной записи пользователя 
node index.js --action logout --email example@ukr.net
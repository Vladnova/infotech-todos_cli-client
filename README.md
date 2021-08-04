# Получаем и выводим весь список Todos  в виде таблицы 
node index.js --action list --userId exampleId

# Получаем Todo по id
node index.js --action get --userId exampleId --id todoId

# Добавялем Todo
node index.js --action add --userId exampleId --title "example todo" --text "add todo"

# Удаляем контакт
node index.js --action remove --userId exampleId --id todoId

# Обновляем Todo
node index.js --action update --userId exampleId --id todoId --title "update todo" --text "add update todo"



# Зарегистрировать пользователя 
node index.js --action signup --email example@ukr.net --password example

# Залогинить пользователя 
node index.js --action signin --email example@ukr.net --password example

# Выйти з уточной записи пользователя 
node index.js --action logout --email example@ukr.net
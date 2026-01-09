#!/usr/bin/expect -f

set timeout -1

# Подключаемся к серверу
spawn ssh root@72.56.92.136

# Ждем запроса пароля и вводим его
expect "password:"
send "aAwSKo@-1bsL2t\r"

# Ждем приглашения командной строки
expect "#"

# Запускаем скрипт деплоя
send "bash /root/deploy.sh\r"

# Ждем завершения
expect "#"

# Выходим
send "exit\r"

expect eof

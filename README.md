# Night-Wathdog
 Slack bot to detect changes of Zendesk tickets and calling to a employee

Dev режим
Форвардинг запросов в сторону сервера обеспечивается ngrok, запускаемый на том же самом порту, что и слушает сервер (конфигурируется в .env)
Сервер работает на Express.js
Так как объем хранимых данных в процессе работы представляются в очень маленьких объемах, потому отказ от хранения в какой-либо БД, данные хранятся напрямую в системе в файлах .json 

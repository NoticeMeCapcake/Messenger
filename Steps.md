# Шаги
> Здесь будут записаны шаги, необходимые для стартового деплоя.

## 1. Настройка транслятора из Java в JS:
1. Используется `JSweet`, первая настройка:
   1. `git clone https://github.com/cincheo/jsweet-quickstart.git`
   2. `cd jsweet-quickstart`
   3. `mvn generate-sources` -- Important step allowing to translate Java to JS
   4. Open `index.html` -- example for how to import generated JS code into html
   5. Можно удалить `plaginManagement`, инфу об авторах, лицензии и т.п.
## 2. Завести реакт приложение:
   1. Выполнить команды:
   ```
   npx create-next-app react-project --ts
   npm install react-bootstrap bootstrap
   ```
## 3. Подружить `JSweet` и `React`:
   1. Перебрасываем файл из /target/js/package в папку /reactApp/src/package
   2. Прогоняем скрипт для вычленения 2 строчки из файла и дописывающий в конец `export`:
   
```
    current_dir = os.path.dirname(os.path.abspath(__file__))
    work_dir = Path(current_dir + "\\target\\js").__str__()
    src_dir = Path(current_dir + "\\myapp\\src").__str__()
    p = Path(work_dir)
    for file in p.rglob("*.js"):
        file_trimmed = file.__str__().removeprefix(work_dir)
        opened_file = file.open("r+")
        file_content = opened_file.readlines()
        variable_line = file_content[1]
        file_content.pop(1)
        file_content.append("export " + variable_line)
        opened_file.close()
        temp_file = open("temp.txt", "w+")
        temp_file.writelines(file_content)
        temp_file.close()
        temp_path = Path("temp.txt")
        dir_path = Path(src_dir + file.parents[0].__str__().removeprefix(work_dir))
        os.makedirs(dir_path, exist_ok=True)
        temp_path.replace(src_dir + file_trimmed)
```
## 4. Как собрать это чудо?
   1. Запускаем docker-compose.
   2. В контейнере монго выполняем:
      1. ```
         mongosh admin -u root -p qwerty --authenticationDatabase admin
         ```
      2. ```
         use messenger
         ```
      3. ```
         db.createUser({user: "messenger_user", pwd: "qwerty", roles: [{role: "readWrite", db: "messenger"}]})
         ```
   3. Java проекты работают на 21 версии языка (надо настраивать в idea), 
   в каждом проекте автоматически создастя папка `gradle/wrapper`, в файле `gradle-wrapper.properties` нужно 
   указать `distributionUrl=https\://services.gradle.org/distributions/gradle-8.5-bin.zip`
   4. Скачиваем все зависимости (из фронта и бэка), затем пытаемся запустить каждый сервис в любом порядке. 
   Java проекты можно запустить через *Application.java.
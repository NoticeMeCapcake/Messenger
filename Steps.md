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
   1. Выполнить команду:
   ```
   npx create-react-app my-app
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

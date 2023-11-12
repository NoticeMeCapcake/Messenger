# Шаги
> Здесь будут записаны шаги, проделанные в программном плане.

## 1. Настройка транслятора из Java в JS:
1. Используется `JSweet`, первая настройка:
   1. `git clone https://github.com/cincheo/jsweet-quickstart.git`
   2. `cd jsweet-quickstart`
   3. `mvn generate-sources` -- Important step allowing to translate Java to JS
   4. Open `index.html` -- example for how to import generated JS code into html
   5. Можно удалить `plaginManagement`, инфу об авторах, лицензии и т.п.

## 2. Подружить `JSweet` и `React`:
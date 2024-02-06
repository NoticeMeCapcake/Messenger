/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
(function (quickstart) {
    /**
     * This class is used within the webapp/index.html file.
     * @class
     */
    class QuickStart {
        static main(args) {
            const l = ([]);
            /* add */ (l.push("Hello") > 0);
            /* add */ (l.push("world") > 0);
            const a = (new Array());
            a.push("Hello", "world");
            $("#target").text(/* toString */ ('[' + l.join(', ') + ']'));
            alert(a.toString());
            const nodeList = document.getElementsByTagName("div");
            for (let index = 0; index < nodeList.length; index++) {
                let element = nodeList[index];
                {
                    element.innerText = "Hello again in vanilla JS";
                }
            }
        }
    }
    quickstart.QuickStart = QuickStart;
    QuickStart["__class"] = "quickstart.QuickStart";
})(quickstart || (quickstart = {}));
quickstart.QuickStart.main(null);
export var quickstart;

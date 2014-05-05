Achiever
========

##Instalace prostředí
Je zapotřebí mít nainstalované [Node.js](http://nodejs.org/), [MongoDB](http://www.mongodb.org/), Meteor a Meteorite.


Instalace Meteoru:
```bash
$ curl https://install.meteor.com/ | sh
```

Instalace Meteorite:
```bash
$ npm install -g meteorite
```

##Instalace a spuštění aplikace
Po naklonování aplikace ve složce achiever-source:
```bash
# sledovat změny v scss souborech
$ compass watch
# instalace packages
$ mrt install
# spuštění aplikace
$ mrt
```

##Deploy

```bash
# vytvořit bundle
$ meteor bundle chute-achiever.tgz
# rozbalit bundle do složky
$ tar -zxvf chute-achiever.tgz && rm chute-achiever.tgz
# přesunout bundle do samostatné složky a vymazat původní složku
$ mv bundle/* ../achiever-demo && rmdir bundle
```

V novém projektu vymazat složku ```programs/server/node_modules/fibers```

Přidat sobor package.json
```js
// package.json
{
  "name": "Achiever",
  "version": "0.1.0",
  "engines": {
    "node": "0.10.26"
  },
  "dependencies": {
    "fibers": "1.0.1"
  }
}
```

Přidat soubor Procfile
```js
// Procfile
web: node main.js
```


##Demo

Demo je dostupné na http://achiever-demo.herokuapp.com

Přihlašovací jména testovacích facebookových uživatelů:



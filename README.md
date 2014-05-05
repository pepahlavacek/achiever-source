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
```

Obsah složky ```bundle``` přesunout do samostatného projektu a vymazat původní složku.
Vymazat složku ```programs/server/node_modules/fibers```

##Demo

Demo je dostupné na http://achiever-demo.herokuapp.com

Přihlašovací jména testovacích facebookových uživatelů:



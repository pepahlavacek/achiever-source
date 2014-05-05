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
$ compass watch
```

```bash
$ mrt
```

##Deploy
Pro deploy je potřeba

vytvořit bundle:
```bash
$ meteor bundle chute-achiever.tgz
```
rozbalit ho
```bash
$ tar -zxvf chute-achiever.tgz && rm chute-achiever.tgz
```

přesunout do samostatné složky a vymazat původní složku bundle.

##Demo

Demo je dostupné na http://achiever-demo.herokuapp.com

Přihlašovací jména testovacích facebookových uživatelů:



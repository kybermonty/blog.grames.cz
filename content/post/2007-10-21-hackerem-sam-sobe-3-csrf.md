---
layout: single
title:  "Hackerem sám sobě (3) - CSRF"
date:   2007-10-21 16:44:26
---
Cross-Site Request Forgery navazuje na XSS. Zatímco u techniky XSS se snaží
uživatel obelstít stránky, tak u CSRF je to naopak - stránky se snaží nachytat
uživatele. Využívá se toho, že návštěvník stránek je přihlášen na jiném serveru -
třeba někde do administrace - tudíž má v prohlížeči uložené cookies a může směle
bez dalšího vyplňování hesla pracovat s celou administrací. Útočníkovy stránky
pak usnadňují tomuto uživateli práci a například za něho mažou položky v administraci
na serveru, kde je přihlášen.

Když jsem zkoušel pomocí této techniky napadnout stránky restaurace, které jsem
celé napsal já, tak jsem za pár vteřin smazal hrachovou kaši z denního menu. Inu
člověk se pořád učí...

Na začátku je nutné mít adresu přímo na nějakou akci v administraci - například:

```txt
www.domena.cz/administrace/delete.php?id=2
```

Tuto adresu můžete zkusit uhádnout nebo sednout před cizí počítač a otevřít si
historii v prohlížeči. Pokud se vám nechce ani jedno, tak můžete zkusit strýčka
Google a vyhledat třeba tento výraz:

```txt
allinurl:admin delete.php id=2
```

Pak stačí na svou stránku umístit například falešný obrázek s adresou, kterou se
nám podařilo zjistit:

```html
<img src="http://www.domena.cz/administrace/delete.php?id=2" />
```

Teď už jen sehnat člověka, který tuto administraci používá a nalákat ho na svou
stránku a je vymalováno! Pokud se vám zdá, že někoho navádím na hackování cizích
stránek, tak špatně čtete - chce to lepší brýle, takhle se ty písmenka strašně
mažou a člověk vidí i to, co tam není. Takže si to zkuste na svých stránkách a
uvidíte, jestli jste obstáli či ne. Pokud ne, můžete pokračovat ve čtení...

## Obrana proti šikulům

Možná vás napadlo, že místo $_GET stačí použít $_POST, ale to útok jen trochu
stíží - útočník pouze musí uhádnout, jak jste pojmenovali kolonky ve formuláři.
Pak už jen umístí na stránku stejný formulář, který se odešle JavaScriptem při
načtení stránky.

### Referer

Řešením je testovat, zda je v hlavičce Referer adresa mé stránky s administrací:

```php
if ( !substr( $_SERVER[ "HTTP_REFERER" ], 0, 34 ) == "http://www.domena.cz/administrace/" ) {
      echo "Mě neoblafneš kámo !";
  exit;
}
```

Hlavičku Referer posílá prohlížeč (obsahuje adresu stránky, ze které jsem se dostal
na aktuální) a není ji možné obelstít na útočníkově stránce. Bohužel posílání
této hlavičky se dá vypnout v prohlížeči, tudíž se nelze na ni spolehnout. Další
nevýhoda spočívá v nemožnosti vstoupit do administrace přímo přes externí odkaz -
například jsem pořád přihlášen a v záložkách mám odkazy na pravidelné snížení
prémií. Jsou to nevýhody relativně malé a toto řešení je i tak použitelné.

### Autorizační token

Lepší metodou, ale náročnější na implementaci jsou tzv. autorizační tokeny. Před
odkázáním na další stránku dáte do URL nebo formuláře autorizační proměnnou - např.
md5 hash z cookie (doporučuji solit) nebo náhodně vygenerovaný řetězec, který
uložíte do databáze a v dalším skriptu porovnáte poslaný token s tokenem v databázi.

Praktické použití by mohlo vypadat nějak takto:

```html
<?php
session_start();
?>
<form action="delete.php" method="post">
  <input type="hidden" name="id" value="2" />
  <input type="hidden" name="token" value="<?php
    echo sha1( session_id( ) + $_SESSION[ "password" ] ) ?>" />

  <input type="submit" name="btn" value="Smazat" />
</form>
```

Protože má session omezenou platnost (vyprší za několik minut), myslím, že toto
opatření je dostačující.

Budu rád, když napíšete komentář, jestli o této technice slyšíte poprvé nebo
jste už zkušený geek a tento článek vám nic nedal.

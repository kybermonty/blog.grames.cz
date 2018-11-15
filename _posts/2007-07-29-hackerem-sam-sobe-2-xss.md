---
layout: single
title:  "Hackerem sám sobě (2) - XSS"
date:   2007-07-29 13:21:17
---
XSS je zkratka pro Cross-site Scripting (aby nedošlo k záměně s kaskádovými styly,
používá se místo CSS zkratka XSS). U této techniky je snahou podstrčit stránkám
svůj kód pomocí jakéhokoliv vstupu. Většinou se jedná o JavaScript, který
například dokáže manipulovat s vašimi cookies a posílat citlivé údaje útočníkovi.
Napadlo vás třeba, že se za neškodným avatarem může skrývat skript, který dokáže
získat heslo z vaší nezabezpečené administrace?

[POKRACOVANI]

Útok pomocí GET
===============

Jistě víte, že data v proměnné $_GET jsou předávané skriptu přes adresní řádek.
Pokud nemáme dostatečně ošetřené vstupy, můžeme třeba takto dostat do stránky
jednoduchý JavaScript:

/---code txt
skript.php?email=%3C%73%63%72%69%70%74%3E%61%6C%65%72%74%28%27%58%53%53%27%29
%3C%2F%73%63%72%69%70%74%3E
\\---

Pokud se divíte, co je to za šifru, tak vězte, že to je řetězec
`<script>alert(''XSS'')</script>` převedený do šestnáctkové soustavy. Celá adresa
je pochopitelně na jeden řádek a pokud ji ve vhodném skriptu použijete do správné
proměnné, tak se vám možná naskytne pohled na dialog s textem "XSS". Když takovou
díru objevíte, je už jen na vaší fantazii, co všechno by se dalo pomocí JavaScriptu
udělat.

Útok pomocí POST
================

Tuhle metodu mám radši :-) Největší riziko představují komentáře, diskuse a podobné
stránky, kde vložený kód do formuláře bude umístěn přímo do stránky. To pak jen
přesměrování celé stránky je záležitost na pár sekund ! Zkouška odolnosti
formuláře může vypadat třeba takto:

[* xss.gif 396x269 .(zkouška odolnosti formuláře proti XSS) *]

Zvláště si všimněte obsahu kolonky "Web" - tento způsob spoléhá na programátora,
který sice ošetřil text komentáře, ale zapomněl na předchozí textové pole.
Různých kombinací takových kódů je hodně, několik jich i s popisem naleznete
na výborné stránce "XSS Cheat Sheet":http://ha.ckers.org/xss.html.

Jak se bránit
=============

Nejlepší obranou je důsledně ošetřovat každý vstup, používejte proto funkce
"strip_tags":http://cz.php.net/manual/cs/function.strip-tags.php a
"htmlspecialchars":http://cz.php.net/manual/cs/function.htmlspecialchars.php.
Pokud nějaký skript vkládá data od uživatele do stránky, zakažte používání tagů
`script`, `iframe`, `embed`, `applet` a `object`. Toho lze dosáhnout například
pomocí regulárních výrazů. Zakázání potencionálně nebezpečných tagů však nestačí -
je třeba ještě myslet na JavaScriptové události:

- onAbort
- onBlur
- onChange
- onClick
- onDblClick
- onDragDrop
- onError
- onFocus
- onKeyDown
- onKeyPress
- onKeyUp
- onLoad
- onMouseDown
- onMouseMove
- onMouseOut
- onMouseOver
- onMouseUp
- onMove
- onReset
- onResize
- onSelect
- onSubmit
- onUnload

Obrana v Texy!
==============

"Texy!":http://texy.info/ při standardním nastavení **není** chráněn proti XSS
útoku ! Řešení je naštěstí jednoduché - stačí Texy! přepnout do bezpečného módu
(řešení pro Texy2):

/---code php
TexyConfigurator::safeMode($texy);
\\---

V tomto režimu jsou povoleny pouze tagy `a`, `acronym`, `b`, `br`, `cite`, `code`,
`em`, `i`, `strong`, `sub`, `sup`, `q` a `small`. Z atributů všech tagů je
povoleno pouze `href`, `title` u odkazu a `title` v tagu `acronym`. Bohužel jsou
v tomto režimu standardně vypnuty i kaskádové styly pomocí syntaxe Texy! - opět
ale existuje řešení - stačí přidat následující řádek pod výše zmíněný:

/---code php
$texy->allowedStyles = Texy::ALL;
\\---

HTTP Response Splitting
=======================

Vstupní data přicházejí do stránky i přes HTTP hlavičky, proto na ně nesmíme
zapomenout. Představme si "jednoduchou stránku vypisující identifikaci
prohlížeče":http://ukazky.chapadlo.cz/http-response-splitting-web.php - mohlo
by se zdát, že zde není co zkazit a stránka je bezpečná, ale zdání klame - útočník
může jednoduše změnit identifikaci prohlížeče v hlavičce:

/---code php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://domena.cz/web-s-dirou.php");
curl_setopt($ch, CURLOPT_USERAGENT, "<script>alert(''XSS'')</script>");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
echo curl_exec($ch);
curl_close($ch);
\\---

"**Ukázka**":http://ukazky.chapadlo.cz/http-response-splitting.php

Hlavičky se také dají jednoduše měnit pomocí rozšíření do Firefoxu
"LiveHTTPHeaders":http://livehttpheaders.mozdev.org/. Pak není nic jednoduššího,
než třeba posílat stránce své cookies:

/---code txt
Cookie: email=moje+podvrzena+cookie
\\---

Obrana proti tomuto útoku spočívá opět v ošetření vstupních údajů pomocí funkcí
"strip_tags":http://cz.php.net/manual/cs/function.strip-tags.php a
"htmlspecialchars":http://cz.php.net/manual/cs/function.htmlspecialchars.php.

Pokud jste všemu porozuměli, tak nyní už nezbývá nic jiného, než zkoušet všechny
tyto typy útoků na **své** stránky - třeba se vám podaří najít díru a poté ji
úspěšně záplatovat. Takže hodně štěstí při obranně proti zákeřným hackerům ;-)'),

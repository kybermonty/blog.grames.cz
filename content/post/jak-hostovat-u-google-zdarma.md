---
layout: single
title:  "Jak hostovat u Google zdarma"
date:   2010-02-13 13:34:00
---
Věděli jste, že můžete vyvíjet aplikace ve frameworku od Google a dokonce svůj výtvor hostovat
na jejich serverech? A to není vše – nenáročné aplikace budou využívat hosting zcela zdarma!

Tyto výhody nabízí projekt [Google App Engine](http://appengine.google.com/). Zatím lze využívat
programovací jazyky Java a Python, další možná časem přibudou. Přiznávám, že výběr jen z těchto dvou
jazyků může být limitující, ale já jsem za Python rád a jeho volba může být lepší než všudypřítomné
PHP. V [dokumentaci](http://code.google.com/intl/cs-CZ/appengine/docs/) jsou k dispozici i dobře
napsané [články](http://code.google.com/intl/cs-CZ/appengine/articles/), díky kterým se naučíte
například vytvářet aplikace pro Facebook, používat XMPP, naprogramovat Google Desktop Gadget nebo
zprovoznit výborný framework Django na Google App Engine.

To vše vypadá hezky, ale asi tušíte nějaký ten háček v hostingu zdarma – jsou to nastavené limity,
které nenáročné aplikace budou určitě splňovat. Mezi
[kompletním rozpisem limitů](http://code.google.com/intl/cs-CZ/appengine/docs/quotas.html)
naleznete třeba omezení milion požadavků na vaši aplikaci za celý den (tolik zobrazení stránek
za den je však pro mnohé z nás jen pouhý sen). Kromě výběru jazyka je zde ještě jedno omezení, které
spočívá v použití speciálního datového uložiště
[Bigtable](http://labs.google.com/papers/bigtable.html) – nečekejte tedy běžnou databázi typu MySQL.
V oblasti výkonu se ale z tohoto omezení stává spíše výhoda.

Co se týče výsledné URL adresy, bude vypadat takto:

http://vaše-id.appspot.com/

Je tady ovšem i druhá možnost – Google App Engine můžete spojit s vaším účtem Google Apps pro doménu
a lehce tak namapovat jakoukoliv adresu na aplikaci v App Engine.

U tohoto bodu jsem narazil na jednu nepříjemnost – lze použít tvar www.domena.tld, ale samostatnou
doménu bez www (http://domena.tld) není možno namapovat na vaši aplikaci. V tomto případě nápověda
doporučuje využít služby
[URL forwarding](http://www.google.com/support/a/bin/answer.py?hl=en-in&answer=61057) u vašeho
správce domény. Je popsán postup pro registrátora GoDaddy.com, v ČR jsou podmínky horší a tuto
službu poskytuje jen pár vyvolených – např.: [kvapem.cz](http://kvapem.cz/), ale ten zase neumožňuje
editaci SRV záznamů (zkoušel jsem hledat registrátora pro cz doménu, který umožňuje přesměrování i
změnu SRV a neměl by přitom nesmyslně vysoké ceny za doménu, ale zatím jsem nikoho takového
nenašel – **UPDATE 13.4.2010: našel, je to [http://subreg.cz](http://subreg.cz/)**).

Na závěr ještě přikládám ukázku jednoduché stránky postavené na Google App Engine (psáno v Pythonu):
[http://martin.grames.cz](http://martin.grames.cz/). Mezi posílanými HTTP hlavičkami se vyskytuje i
jedna zajímavá položka:

Server: Google Frontend

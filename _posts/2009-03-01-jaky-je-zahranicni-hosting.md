---
layout: single
title:  "Jaký je zahraniční hosting"
date:   2009-03-01 23:20
---
V poslední době je na českém internetu hodně slyšet o zahraničním hostingu, který většinou nabízí
o mnoho lepší podmínky než tuzemské firmy a proto jsem i já nakonec podlehl pokušení a jeden jsem
na vlastní kůži v ostrém provozu otestoval. Velmi rád se s vámi podělím o nabyté zkušenosti a shrnu
klady i zápory tohoto řešení.

## Výběr hostingu

Celkem hodně času jsem strávil nad výběrem toho správného zahraničního hostingu. Nastavil jsem si
totiž celkem vysokou laťku a jal jsem se hledat hosting se solidní cenou a co nejširší nabídkou
služeb – vlastně to zní trochu komicky, protože skoro každý zahraniční hosting nabízí větší komfort
než najdete u nás. Něco tak nepředstavitelného jako je SSH přístup přímo na server je mimo naše
hranice naprosto běžná věc a když jsi na to člověk zvykne, tak už není cesty zpět. To je přesně ten
moment, kdy si říkáte – „Jak jsem mohl bez toho žít ?!?“ :slightly_smiling_face:.

Hlavním požadavkem a tahákem byla možnost hostovat několik domén na jednom účtu. Prostě se zaplatí
jeden hosting a nahází se tam třeba 20 různých webů, každý na vlastní doméně. Kdysi pro mě něco
nepředstavitelného, byl jsem zvyklý z ČR pro každý, byť malý web, zaplatit nový hostingový program.
Tímto krokem se dá výrazně ušetřit a to byl hlavní důvod migrace do zahraničí.

Další požadavek už nebyl úplně standardní – v tu dobu jsem se zrovna učil Python, takže jsem hledal
hosting, na kterém bude možno provozovat framework Django postavený na tomto skriptovacím jazyce.
Touto volbou odpadl všemi doporučovaný [HostMonster](http://www.hostmonster.com/) – sice je zde
možné provozovat Django přes FastCGI, ale nechtěl jsem až do takové míry konfigurovat server
vlastními silami, když toto oficiálně nepodporují. Navíc mi trošku vadí to slovíčko „Unlimited“
u tolika položek v přehledu nabízených služeb. No, nebudu se pouštět do hodnocení hostingu, který
jsem nezkusil, možná jsem jen trochu skeptický.

Nakonec jsem tedy vybral hosting [WebFaction](http://www.webfaction.com/), který podporuje Django a
jeho instalace se provádí jen „kliknutím na tlačítko“ v administraci. Také vyhrál díky prvnímu místu
v žebříčku [Djangofriendly](http://djangofriendly.com/hosts/).

## Zkušenosti z provozu

Nyní jsem u hostingu WebFaction již 5 měsíců, na jednom účtě mám 8 webových aplikací a 11 domén a
jsem velmi spokojen. Přes administraci lze velmi jednoduše nainstalovat „tuna“ aplikací, z nichž
určitě nebudete potřebovat všechny (stav k 1.3.2009):

- AWStats
- CherryPy
- Custom app (listening on port)
- Django (mod_python nebo mod_wsgi)
- Drupal
- Joomla
- mod_python
- mod_wsgi
- Pylons
- Rails
- Static/CGI/PHP
- Subversion
- Trac
- TurboGears
- Webalizer
- WebDav
- WordPress
- Zope – Plone

Kombinace administrace a SSH je optimální pro konfiguraci serveru. Při potížích příjde vhod
nápověda na webu hostingu ve formě
[řešení známých problémů](https://help.webfaction.com/index.php?_m=knowledgebase&_a=view), případně
[fórum](http://forum.webfaction.com/). Také se můžete obrátit na podporu přes systém ticketů, kdy
pro každý problém vytvoříte nový ticket a komunikace mezi hostingem a vámi je přehledně zobrazena
v jednom vlákně. Co se týče přístupu podpory, tak zde nemám absolutně žádné výhrady – vždy se
problém vyřešil a bylo se mnou jednáno vlídně, i přes určitě zjevné nedostatky ve správné gramatice
mého anglického textu :slightly_smiling_face:.

Nejvíce jsem se bál odezvy a potažmo rychlosti načítání stránek, protože tuzemské servery jsou
připojeny do [NIXu](http://cs.wikipedia.org/wiki/NIX) a díky tomu se mezi těmito servery realizuje
spojení velice rychle. Na české portály mám ping kolem 10 až 20 ms a při zkoušce zahraničních
hostingů jsem se dostal nad 130 ms a to mě vyloženě děsilo. Ale nestáhl jsem ocas a neutekl a teď
můžu s klidnou duší říct, že větší odezva při načítání stránek opravdu nejde znát – důkazem jsou
stránky, které si právě prohlížíte.

Mám i záporné zkušenosti, kdy jsem se setkal se stavem skoro nepoužitelné pošty – webmail se
přihlašoval několik sekund a rychlost IMAPu byla taky velmi podprůměrná. Díky migraci účtů
z přetíženého stroje na nové e-mailové servery se naštěstí situace vyřešila.

Komunikace hostingu s uživateli neprobíhá jen přes podporu, ale také si můžete přečíst jejich
[blog](http://blog.webfaction.com/), [system status](http://statusblog.webfaction.com/) se zprávami
o výpadcích nebo zprávy na [Twitteru](http://twitter.com/webfaction).

Na závěr jsem si nechal takový bonbónek – většina aplikací se instaluje do vašeho adresáře kompletně
se vším, takže pokud používáte svoje upravené knihovny Djanga, tak nebudete mít žádný problém,
protože ve vašem adresáři bude kompletní framework + instance apache. Také u AWStats je příjemné, že
si můžete upravit konfiguraci dle potřeby a případně i změnit logo.

Takže můj ortel zní – nebojte se zahraničního hostingu, přináší větší komfort než většina českých.
Webfaction můžu doporučit a pokud chcete zkusit nějaký jiný, tak se radši ujistěte, že vám zaručí
vrácení peněz např. v prvním měsíci hostingu.

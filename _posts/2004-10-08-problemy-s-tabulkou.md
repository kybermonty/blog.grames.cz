2004-10-08-problemy-s-tabulkou

2, '081004', '8. října 2004 15:49', 'Problémy s tabulkou',

Když jsem předělal knihu hostů do nového webu, zjistil jsem problém
s nastavením šířky tabulky - při šířce 100% se v Internet Exploreru
tabulka zobrazovala větší než byla šířka stránky a aby se zobrazila
jako 100%, tak jsem jí musel nastavit šířku 80%. To ovšem zase byla
tabulka menší v ostatních prohlížečích, kteří interpretovali
<b>správně</b> XHTML kód. Hrál jsem si s tím dost dlouho (dokonce jsem
zkoušel nahradit tabulku kaskádovými styly), ale nemohl jsem přijít
na nic kloudného. Nakonec jsem ale nad IE vyzrál a chybu jsem
našel - vadilo mu, že jsem měl pomocí CSS nastavené padding-left
(levý vnitřní okraj) u DIVu, ve kterém byla tabulka. Vyřešil jsem to
tím, že jsem definici padding-left napsal do jednotlivých buněk tabulky (td).

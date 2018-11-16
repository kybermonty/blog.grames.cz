---
layout: single
title:  "Kontaktní formulář jako nástroj spamu"
date:   2007-06-14 14:25:24
---
Možná si to neuvědomujete, ale neošetřený formulář může být jednou velkou bezpečnostní
dírou a není problém pomocí jednoho kliknutí poslat třeba 50 e-mailů. Pokud jste
se vyděsili o čem to mluvím, je tento článek určen právě pro vás...

Inu začalo to tak - napsal jsem kontaktní formulář jako vždycky, nic zvláštního.
Dny pomalu plynuly a když jsem jednoho slunečného dne za zpěvu ptáků, plynulého
provozu dopravy a naprosto delikatesního bouchání z vedlejšího panelového domu
projížděl mé RSS, Firefox mi náhle zahlásil nový e-mail. Bohužel, nebyla to další
nabídka na zvětšení penisu, bylo to napomenutí z hostingu. Nějak se jim nelíbilo,
že díky mému kontaktnímu formuláři bylo posláno více než 670 000 e-mailů.

Přiznám se, že toto zjištění mě naprosto vyvedlo z míry. Nechápal jsem, jak je to
možné, ale po prostudování hlavičky odesílaných e-mailů mi to došlo - pomocí
skryté kopie bylo docíleno poslání několika dalším adresátům.

Abych se dostal k vysvětlení, jak se něco takového může přihodit, tak nejdříve
ukážu lehce zranitelný skript, který takovému útoku podlehne mrknutím okna:

```html
<?php
if (!empty($_POST["text"])) {
  if (empty($_POST["email"])) $_POST["email"] = "robot@domena.cz";
  if (mail("info@domena.cz", "E-mail z webu", $_POST["text"], "From: ".$_POST["email"]))
    echo "E-mail byl odeslán.<br /><br />\\n";
  else
    echo "E-mail se nepodařilo odeslat.<br /><br />\\n";
} else {
?>
<h2>Napište nám</h2>
<form action="napiste.php" method="post">
  Váš e-mail:
  <input type="text" name="email" size="40"
    <?php if (!empty($_POST["email"])) echo " value=\\"".$_POST["email"]."\\"" ?> />
  <br /><br />
  Text e-mailu:<br />
  <textarea name="text" cols="42" rows="10">
    <?php if (!empty($_POST["text"])) echo $_POST["text"] ?>
  </textarea>
  <br /><br />
  <input type="submit" name="btn" value="Odeslat" />
</form>
<?php
}
?>
```

Ač se vám tento kontaktní formulář může líbit, má jeden obrovský nedostatek -
dovoluje totiž do pole "Váš e-mail" napsat jakýkoliv text! Pokud tedy do tohoto
pole napíšeme "`lojza@seznam.cz Bcc: helenka@atlas.cz,ivetka@centrum.cz`", bude
hlavička e-mailu vypadat takto:

```
From: lojza@seznam.cz Bcc: helenka@atlas.cz,ivetka@centrum.cz
```

Takže nejenom, že určíme od koho e-mail přišel, ale také ho pomocí skryté kopie
pošleme na další dvě adresy!

Nic takového určitě tolerovat nebudeme a proto musíme takový vstup ošetřit a
zkontrolovat, jestli se tam opravdu nachází jenom jeden e-mail. Řešení je
jednoduché - použijeme regulární výraz:

```php
<?php
if (ereg("^[_a-zA-Z0-9\\.\\-]+@[_a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,4}$", $_POST["email"])) {
  // e-mail je v pořádku, můžeme ho s klidem dále zpracovat
} else {
  echo "I ty lišáku, na mě si nepříjdeš !";
}
?>
```

Zlotřilí roboti si můžou nechat zajít chuť, ale ještě ne tak úplně - je tady
totiž další riziko - každý robůtek může nerušeně vyplnit formulář a odeslat nám
hezký spam, a může to dělat klidně každou hodinu, nic mu v tom nezabrání. Když
se záhy podíváme na obsah naší e-mailové schránky, přejde nám mráz po zádech.

Proto se příště podíváme na jedno z několika možných řešení, jak zcela odradit
roboty a to bez jakýchkoliv chemických přípravků, pouze přirozenou cestou.

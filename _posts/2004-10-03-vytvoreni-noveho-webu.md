---
layout: single
title:  "Vytvoření nového webu"
date:   2004-10-03 18:30
---
Rozhodl jsem se všechny čtyři své weby zrušit a udělat jeden komplexní,
který se bude lehce aktualizovat, protože některé mé weby byly tak staré,
že jsem se za to styděl. Jen tak jsem si začal hrát s fotkou (vystřihl
jsem se z fotky z dovolené, přilepil na fotku Bílovce a pohrál si
s barvičkama) a nakonec se mi to tak líbilo, že jsem to použil jako základ
nové stránky.

Vždycky jsem chtěl mít web v CSS bez pevné šířky, ale moc se mi to nedařilo.
Tentokráte pouze s dvěmi sloupci jsem dosáhl svého a to velmi jednoduše:

```html
<html>
...
<style type="text/css">
<!--
#hlavni_obsah {
    margin-left: 160px;
}
#vlevo {
    position: absolute;
    width: 160px;
    top: 0px;
    left: 0px;

    background-color: #000066;
    color: white;
}
-->
</style> 
<body>
<div id="hlavni_obsah">
</div>
<div id="vlevo">

</div>
</body>
</html>
```

Jak vidíte stačilo pouze u hlavního obsahu stránky nastavit šířku
levého okraje a umístit absolutně levý sloupec.

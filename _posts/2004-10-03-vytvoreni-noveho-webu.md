2004-10-03-vytvoreni-noveho-webu

1, '031004', '3. října 2004 18:30', 'Vytvoření nového webu',

Rozhodl jsem se všechny čtyři své weby zrušit a udělat jeden komplexní,
který se bude lehce aktualizovat, protože některé mé weby byly tak staré,
že jsem se za to styděl. Jen tak jsem si začal hrát s fotkou (vystřihl
jsem se z fotky z dovolené, přilepil na fotku Bílovce a pohrál si
s barvičkama) a nakonec se mi to tak líbilo, že jsem to použil jako základ
nové stránky.

Vždycky jsem chtěl mít web v CSS bez pevné šířky, ale moc se mi to nedařilo.
Tentokráte pouze s dvěmi sloupci jsem dosáhl svého a to velmi jednoduše:

&lt;html&gt;
...
&lt;style type="text/css"&gt;
&lt;!--
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
--&gt;
&lt;/style&gt; 
&lt;body&gt;
&lt;div id="hlavni_obsah"&gt;
&lt;/div&gt;
&lt;div id="vlevo"&gt;

&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;

Jak vidíte stačilo pouze u hlavního obsahu stránky nastavit šířku
levého okraje a umístit absolutně levý sloupec.

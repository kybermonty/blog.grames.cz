---
layout: single
title:  "Ovladač rolet s pohonem Somfy RTS"
date: 2019-03-03T09:24:11+01:00
tags: [iot, bigclown]
---
Již delší dobu jsem chtěl automaticky ovládat předokenní rolety s motorem Somfy
RTS, ale nechtělo se mi do toho, protože se používá plovoucí kód a řešení tím
pádem není jednoduché. V lednu tohoto roku [Martin Hubáček]
(https://twitter.com/hubmartin) publikoval [video]
(https://www.youtube.com/watch?v=sbqMqb6FVMY), kde ovládá zařízení na 433 MHz.
Pro zjištění vysílaného kódu z originálního ovladače použil nástroj
[Universal Radio Hacker](https://github.com/jopohl/urh) a zkopírovaný kód
vysílá z levného čínského modulu připojeného k [BigClown Core Module]
(https://shop.bigclown.com/core-module/). Nevypadalo to moc složitě, tak jsem
zkusil zkopírovat kód z jednoduchého zařízení na 433 MHz a vážně to fungovalo.
To mě nakoplo, že bych měl konečně zkusit i Somfy.

Naštěstí jsou pohony Somfy rozšířené po celém světě a našel jsem několik postupů,
jak je ovládat pomocí vlastního zařízení:

- [nejjednodušší cesta]
  (http://somfy-domotica.blogspot.com/2014/03/wiring-somfy-telis-4.html)
  je vzít originální ovladač a jenom simulovat stisky tlačítek
- [lze zakoupit](http://www.rfxcom.com/epages/78165469.sf/en_GB/?ObjectPath=/Shops/78165469/Products/18103)
  krabičku RFXtrx433XL, která umí ovládat různé zařízení na 433 MHz
- můžeme si poskládat vlastní univerzální ovladač s Arduino Mega a nahrát tam
  uzavřený firmware [RFlink](http://www.rflink.nl/blog2/)
- existuje i oficiální gateway [Somfy Tahoma]
  (https://www.somfy.cz/produkty/automatizace-domacnosti/tahoma),
  ale ta stojí přes 14 tisíc
- protokol Somfy RTS už byl [rozlousknut]
  (https://pushstack.wordpress.com/somfy-rts-protocol/)
  a existuje firmware pro [Arduino](https://github.com/Nickduino/Somfy_Remote),
  [NodeMCU (ESP8266)](https://nodemcu.readthedocs.io/en/master/en/modules/somfy/)
  nebo [Raspberry Pi](https://github.com/Nickduino/Pi-Somfy)

Vybral jsem si poslední možnost, ale kód pro Arduino jsem přepsal pro BigClown:

https://github.com/kybermonty/bcf-somfy-controller

Hardware pak vypadá takto jednoduše:

![Hardware ovladače](/img/ovladac-somfy-hw.jpg)

Aby se vše posílalo přesně na mikrosekundy, naučil jsem se pracovat s hardwarovým
časovačem TIM3 a využil jej. Použitý plovoucí kód si nikam nezapisuju, posílá se
přes MQTT a v [Node-RED](https://nodered.org/) si jej načítám/ukládám z/na SD
kartu v Raspberry Pi.

{{< note "warning" >}}
Vysílač sice pracuje na frekvenci 433,92 MHz a pohon
Somfy na 433,42 MHz, ale při vysílání do pár metrů to nevadí. Pokud by s tím byl
problém, je potřeba [odpájet a vyměnit oscilátor]
(https://github.com/Nickduino/Pi-Somfy/blob/master/README.md).
{{< /note >}}

Pro ovládání se využívá tento topic:  
`node/{node id}/somfy/s{shutter number}/cmd/{command}`

- node id - identifikátor/pojmenování uzlu BigClown sítě
- shutter number - číslo rolety, od 1 do 5
- command - jeden z těchto příkazů - up, stop, down, prog

Ve zprávě se posílá již zmíněný plovoucí kód, může se začít od libovolného čísla (např. 1) a každé další číslo musí být větší než předchozí.

Tento nový ovladač je potřeba s každou roletou spárovat. Postup je následující:

- Na stávajícím originálním ovladači dlouze podržte tlačítko pro programování.
  Je z druhé strany ovladače a ke stlačení je potřeba nějaký špičatý předmět
  (např. pinzeta nebo propiska).
- Roleta vyjede kousek nahoru a pak kousek dolů.
- Přes MQTT zašlete novému ovladači příkaz "prog".
- Roleta opět vyjede kousek nahoru a pak kousek dolů. Tím potvrdila registraci
  nového ovladače a už budou fungovat ostatní příkazy.

Pokud si uzel sítě pojmenujeme "test" a budeme ovládat roletu pod číslem 3, mohou
vypadat MQTT zprávy takto:

```
mosquitto_pub -t 'node/test/somfy/s3/cmd/prog' -m 1
mosquitto_pub -t 'node/test/somfy/s3/cmd/down' -m 2
mosquitto_pub -t 'node/test/somfy/s3/cmd/stop' -m 3
mosquitto_pub -t 'node/test/somfy/s3/cmd/up' -m 4
```

V Node-RED poslouchám zprávy s tímto topicem:  
`node/{node id}/somfy/s{shutter number}/send-cmd`  
Do každé doplním plovoucí kód, který mám uložený v souboru a převedu zprávu
na výše popsaný formát.

![Node-RED flow](/img/ovladac-somfy-nodered.png)

Toto je poměrně složité řešení. Chtěl jsem mít nad plovoucím kódem kontrolu,
protože při ztrátě nelze ovladač jednoduše z motoru smazat a maximum
zaregistrovaných ovladačů je 12. Pro zjednodušení lze tento kód zapisovat
do EEPROM pomocí funkce `bc_eeprom_write` a načítat přes `bc_eeprom_read`.
Také bude potřeba upravit firmware, pokud máte více zařízení než 5.

Jestliže tedy máte rolety, žaluzie, vrata nebo markýzu s pohonem RTS, můžete
vyzkoušet toto řešení. Kdyby jste si nevěděli s něčím rady, klidně mi napište.

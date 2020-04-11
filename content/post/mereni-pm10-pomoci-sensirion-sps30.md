---
layout: single
title:  "Měření PM10 pomocí Sensirion SPS30"
date: 2020-04-11T09:17:38+01:00
tags: [iot, bigclown]
---
Žiji v Ostravě, kde je velká prašnost z místního průmyslu pro výrobu a zpracování oceli, tak mě
samozřejmě zajímaly možnosti měření prachových částic. Z hlediska kvality ovzduší se měří pevné
částice (PM - particulate matter) menší než 10 μm, označované jako PM<sub>10</sub>. Profesionální
měřící stanice kvality ovzduší stojí kolem milionu korun a různé venkovní senzory prachu stojí
několik tisíc, proto mě zaujala novinka od firmy Sensirion, která nabízí levné řešení (na
(SOS electronic)[https://www.soselectronic.cz/products/sensirion/sps30-2-304234] aktuálně stojí
tisíc korun).

Čidlo (SPS30)[https://www.sensirion.com/en/environmental-sensors/particulate-matter-sensors-pm25/]
je malé (41 x 41 x 12 mm<sup>3</sup>) a bezúdržbové - nemusí se ručně čistit nebo vyměňovat filtry,
vzduch koluje uvnitř senzoru pomocí větráčku a prachové částice jsou měřeny opticky (komůrka se
prosvítí laserem a počítá se rozptyl). Počet μg/m<sup>3</sup> (mass concentration) měří pro
PM<sub>1.0</sub>, PM<sub>2.5</sub>, PM<sub>4</sub>, PM<sub>10</sub> a pokud toto zařízení běží 24
hodin denně, uvádí výrobce životnost více než 8 let. Nevýhodou je spotřeba při měření až 80 mA,
takže se nehodí pro provoz na baterky a rozsah provozních teplot od -10 do +60 °C, který je
limitující pro měření v zimě. Ovšem pokud je mírná zima a nejste ve vyšších nadmořských výškách,
tak to nemusí být problém.

Jako mikrokontrolér s rádiem jsem použil (Core Module)[https://obchod.hardwario.cz/core-module/]
z mé oblíbené (stavebnice HARDWARIO)[https://www.hardwario.com/cs/kit/]. Pro propojení je ještě
potřeba jeden (konektor)[https://www.soselectronic.cz/products/jst/zhr-5-112980] a pět
(nakrimpovaných káblíků)[https://www.soselectronic.cz/products/jst/aszhszh28k152-307294]. Káblíky
už jsou připravené, jenom se zasunou do tělesa konektoru. Senzor komunikuje s mikrokontrolérem
přes I²C sběrnici a potřebuje 5V, takže je nejjednodušší použít poslední revizi Core Module, kde je
k tomu na desce vyveden pin.

| Sensirion SPS30 | HARDWARIO Core Module (revize >= 2.3) |
| --- | --- |
| VDD (1) | +5V |
| SDA (2) | P17 (SDA1) |
| SCL (3) | P16 (SCL1) |
| SEL (4) | GND |
| GND (5) | GND |

Pro SPS30 jsem napsal a otestoval
(ovladač)[https://github.com/bigclownlabs/bcf-sdk/blob/master/bcl/src/bc_sps30.c],
je již v SDK a také jsem připravil firmware
(bcf-radio-pm-sensor)[https://github.com/bigclownprojects/bcf-radio-pm-sensor].

Měřím to nakonec co 10 minut a SPS30 mám puštěný 30 sekund, přičemž se to jenom vyfouká a beru poslední hodnotu.

První verze mé měřící stanice kvality ovzduší vypadá takto:

![SPS30 v krabičce](/img/sps30-1.jpg)
![SPS30 v krabičce](/img/sps30-2.jpg)

Celkem dost jsem tunil zobrazení v Grafaně:

![Graf PM10](/img/sps30-grafana.png)

Barevné čáry v grafu jsou thresholdy pro jednotlivé stupně kvality ovzduší, nad červenou už je
velmi špatná. Bohužel hodnoty v čase hodně skáčou, různě foukne vítr a je to hned jinak apod.,
takže jsem přemýšlel nad tím, jak dostat tento hezký graf - normálně to jsou samé zuby.
Různě jsem zkoumal, jak to dělá ČHMÚ, pročítal souhrnné ročenky, kde popisovali měření, apod.
Nakonec jsem skončil na klouzavém průměru (moving average), který Grafana umí nativně.

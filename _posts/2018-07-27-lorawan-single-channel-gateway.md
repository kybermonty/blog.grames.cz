---
layout: single
title:  "LoRaWAN single-channel gateway"
date:   2018-07-27 08:56
categories: iot esp8266
---
Levná jednokanálová LoRaWAN gateway s WeMos D1 ESP8266 a RFM95.

**Pozor! Použití v LoRaWAN síti je velmi omezující, nehodí se ani na testování, spíše toto řešení nedoporučuji.**
Síť LoRaWAN totiž používá 8 kanálů a tento modul umí využívat jen jeden. Koncové zařízení navíc musí
dle specifikace po každém zavysílání náhodně změnit kanál. Většinou ani nelze modem donutit, aby pracoval
pouze na jednom kanále. Pak nezbývá než udělat vlastní firmware a de facto porušovat specifikaci.

![](/assets/images/esp-lora1.jpg)![](/assets/images/esp-lora2.jpg)![](/assets/images/esp-lora3.jpg)

## Hardware

PCB pro sestavení WeMos Shieldu:  
[https://github.com/hallard/WeMos-Lora](https://github.com/hallard/WeMos-Lora)  

Výrobu této PCB lze objednat z [PCBs.io](https://www.pcbs.io/share/4Q1Z4) za $5,30 i s poštovným.
Dorazí 5 kusů, takže jedna destička vyjde na 24,38 Kč.

### Součástky

LEDky WS2812B, spínač PTS810SJK250SMTRLFS a paměť 24AA02E64T není pro použitý firmware potřeba.
Součástky pro tyto obvody tedy nemusíme osazovat, nepotřebujeme ani napětí 5V.

#### GME

1x [SMD Rezistor R0805 100K 1% YAGEO](https://www.gme.cz/r0805-100k-1-yageo) (1,30 Kč) - R3  
3x [Dioda 1N4148W](https://www.gme.cz/dioda-1n4148w) (∑ 7,80 Kč) - D2, D3, D4  
1x [Keramický kondenzátor CKS0805 1u/25V X7R 10% YAGEO](https://www.gme.cz/cks0805-1u-25v-x7r-10-yageo) (1,90 Kč) - C1  
1x [Keramický kondenzátor CKS0805 10u/10V X5R 10% HITANO](https://www.gme.cz/cks0805-10u-10v-x5r-10-hitano) (1,90 Kč) - C2

Pouze pro připojení OLED displeje přes I2C:  
2x [SMD Rezistor R0805 4k7 1% YAGEO](https://www.gme.cz/r0805-4k7-1-yageo) (∑ 2,60 Kč) - R1 a R2 jako pull-up

#### AliExpress

1x [WeMos D1 ESP8266](https://www.aliexpress.com/item/1PCS-D1-mini-Mini-NodeMcu-4M-bytes-Lua-WIFI-Internet-of-Things-development-board-based-ESP8266/32681374223.html) (60,82 Kč)  
1x [RFM95](https://www.aliexpress.com/item/Free-shipping-2PCS-RFM95-RFM95W-868-915-RFM95-868MHz-RFM95-915MHz-LORA-SX1276-wireless-transceiver-module/32817685871.html) (128,43 Kč)  
1x [U.FL konektor samice](https://www.aliexpress.com/item/20PCS-U-FL-R-SMT-U-FL-IPEX-IPX-socket-connector-RF-Coaxial-Connectors-Antenna-Block/32836695692.html) (1,31 Kč)   
1x [868 MHz anténa s U.FL konektorem](https://www.aliexpress.com/item/1PC-868M-antenna-module-3dbi-Omni-direction-IPEX-folding-100mm-length-868-mhz-WHIP-ANTENNA/32811195511.html) (65,00 Kč)

### Celkové náklady

Jeden kus této gateway mě vyšel na 292,84 Kč.


## Software

Firmware pro ESP8266:  
[https://github.com/things4u/ESP-1ch-Gateway-v5.0](https://github.com/things4u/ESP-1ch-Gateway-v5.0)


## Registrace gateway na The Things Network

Je nutné zaškrtnout volbu "I'm using the legacy packet forwarder" a vyplnit ID, které se
zobrazuje na webové stránce pod IP adresou ESP8266.

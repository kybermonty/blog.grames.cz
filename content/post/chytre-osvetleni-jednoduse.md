---
layout: single
title:  "[WIP] Chytré osvětlení jednoduše"
date: 2020-04-19T13:26:11+02:00
tags: [iot, esp8266]
draft: true
---

* malé zařízení, které se krásně vleze do krabice KU68 pod klasický vypínač
* není tak třeba měnit stávající elektroinstalaci, jednoduše lze proměnit světla/zásuvky na "smart"
* kromě vlastního cloudu a aplikace nabízí i ovládání přes web, rest api a mqtt
* pokud by ani tyto možnosti originálního firmware nestačily, lze zařízení přeflashovat a použít
  buď alternativní firmware (např. Tasmota) nebo vlastní (uvnitř je známý čip ESP8266)
* také se mi velmi líbí, že pro oba výstupy se nezávisle měří spotřeba ve wattech

![Shelly 2.5 s výchozím firmware](/img/shelly-2_5-original.png)
![Shelly 2.5 s tasmotou](/img/shelly-2_5-tasmota.png)

na [Alza](https://www.alza.cz/shelly-2-5-spinaci-zaluziovy-modul-s-merenim-spotreby-wifi-d5718613.htm)
aktuálně stojí 699 Kč

---
layout: single
title:  "Měření vzdálenosti"
date:   2017-10-20 11:19
categories: iot bigclown
---
V SDK je podpora pro měření vzdálenosti pomocí ultrazvukového modulu HC-SR04. Ideální je použít novější verzi HC-SR04+, která funguje na 3V \(stará je na 5V\).

## Zapojení

| HC-SR04 | Core Module |
| :--- | :--- |
| Vcc | VDD \(PIN 16\) |
| Trig | P9 \(PIN 10\) |
| Echo | P8 \(PIN 9\) |
| Gnd | GND \(PIN 15\) |

![](/assets/images/ultrasound1e.jpg)![](/assets/images/ultrasound2e.jpg)

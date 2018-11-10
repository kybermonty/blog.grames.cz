---
layout: single
title:  "MySensors s LoRa (RFM95)"
date:   2018-08-18 17:50
categories: iot esp8266
---
Stejné zařízení jako pro [LoRaWAN single-channel gateway](lorawan-single-channel-gateway.md) lze použít v síti [MySensors](https://www.mysensors.org/) pro gateway i node. Využívá se tak technologie LoRa a lze dosáhnout velkých vzdáleností jako v síti LoRaWAN.
Výhoda tohoto řešení je, že nemusíte porušovat specifikaci sítě LoRaWAN kvůli omezení na jeden kanál a jednotlivé zprávy lze navíc šifrovat.

```cpp
#define MY_RADIO_RFM95
#define MY_RFM95_FREQUENCY (RFM95_868MHZ)
#define MY_RFM95_MODEM_CONFIGRUATION RFM95_BW31_25CR48SF512
#define MY_RFM95_IRQ_PIN 15
#define MY_RFM95_CS_PIN 16
```

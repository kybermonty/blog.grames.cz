---
layout: single
title:  "Upravený BigClown firmware pro HC-SR04"
date:   2018-12-02 17:25
categories: iot bigclown
---
HC-SR04 je známý senzor pro měření vzdálenosti pomocí ultrazvuku. Ovládá se jednoduše pomocí dvou
PINů. Na PIN s označením Trig se na 10 μs nastaví logická jednička, tím začneme měření a senzor
vyšle ultrazvukový signál. Na druhém PINu Echo nyní pouze změříme délku pulzu, tedy jak dlouho trvalo
ultrazvukovému signálu se vrátit zpátky, a z toho můžeme vypočítat vzdálenost v milimetrech.

![HC-SR04](/assets/images/hc-sr04.jpg)

Z tohoto principu fungování vyplývá, že senzor je velmi citlivý na polohu, naklonění a tvar sledovaného
předmětu. Pokud sledovaná plocha naproti senzoru je nakloněná nebo není rovná, tak se ultrazvukový
signál nevrátí stejnou cestou zpátky, ale může se různě odrazit a vypočtená vzdálenost je zkreslená.
Např. pokud chceme měřit vzdálenost auta od stěny garáže, tak je potřeba nalézt kousek rovné plochy
na voze, třeba SPZ.

Ve firmware BigClown je připraven ovladač, ale bohužel funguje jen s jedním senzorem (na PINu P8
pro Echo a P9 pro Trig). Využívá totiž hardwarové přerušení pro čekání na změnu stavu PINu Echo, aby neblokoval vykonávání programu. Abych toto omezení na určité GPIO zrušil, přepsal jsem ovladač
na softwarový časovač. Tím se zablokuje program na maximálně 30 ms. Myslím, že to je přípustná daň
za možnost využití zakéhokoliv GPIO.

Upravený ovladač jsem pushnul do větve [multiple-hc_sr04](https://github.com/bigclownlabs/bcf-sdk/tree/multiple-hc_sr04). Aplikaci s tímto upraveným SDK lze
vytvořit pomocí pár příkazů:

- git clone https://github.com/bigclownlabs/bcf-skeleton
- cd bcf-skeleton
- make update
- cd sdk
- git checkout multiple-hc_sr04

Pak můžete do `application.c` napsat třeba tento příklad:

```c
#include <application.h>
#include <bc_hc_sr04.h>

void hc_sr04_event_handler(bc_hc_sr04_t *self, bc_hc_sr04_event_t event, void *event_param)
{
    uint8_t *num = (uint8_t *) event_param;

    float distance;

    if (event != BC_HC_SR04_EVENT_UPDATE)
    {
        return;
    }

    if (bc_hc_sr04_get_distance_millimeter(self, &distance))
    {
        bc_log_info("Distance (sensor %d): %f mm", *num, distance);
    }
}

void application_init(void)
{
    bc_log_init(BC_LOG_LEVEL_DEBUG, BC_LOG_TIMESTAMP_ABS);

    static bc_hc_sr04_t ultrasound1;
    static uint8_t num1 = 1;
    bc_hc_sr04_init(&ultrasound1, BC_GPIO_P8, BC_GPIO_P9);
    bc_hc_sr04_set_event_handler(&ultrasound1, hc_sr04_event_handler, &num1);
    bc_hc_sr04_set_update_interval(&ultrasound1, 1000);

    static bc_hc_sr04_t ultrasound2;
    static uint8_t num2 = 2;
    bc_hc_sr04_init(&ultrasound2, BC_GPIO_P6, BC_GPIO_P7);
    bc_hc_sr04_set_event_handler(&ultrasound2, hc_sr04_event_handler, &num2);
    bc_hc_sr04_set_update_interval(&ultrasound2, 1000);
}
```

A už stačí jen zkompilovat a flashnout do Core modulu. Senzor HC-SR04 existuje ve dvou variantách -
pro 5 V a 3 V. S BigClown je jednodušší použít verzi pro 3 V, označovanou jako HC-SR04+. Já jsem
šel složitější cestou a zapojil dva senzory pro 5V. 

![zapojení dvou HC-SR04 s BigClown](/assets/images/hc-sr04-zapojeni.jpg)

Využil jsem Power Module, který na konektoru pro LED pásek má vyvedeno 5 V. Dále jsem všechny datové
PINy prohnal přes obousměrný převodník logických úrovní.

![obousměrný převodník logických úrovní](/assets/images/logic-level-converter.jpg)

Pak už jen stačí zobrazovat výstup:

```
sudo bcf reset --device /dev/ttyUSB0 --log
```

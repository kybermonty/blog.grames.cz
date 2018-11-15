---
layout: single
title:  "Převedení e-mailu (*.eml) na normální text"
date:   2007-02-12 20:44:47
---
V programu Kecal je implementována funkce pro posílání záznamu rozhovorů přímo
mě na e-mail. Je to pro analýzu rozhovorů několika lidí s tímto programem
a následné vyhodnocení, jaké věty mu uživatelé nejčastěji píšou, čemu nejvíc nerozumí
atd. A právě do téhle analýzy jsem se právě pustil a jako první krok jsem potřeboval
převézt několik e-mailů na prostý text. Mimochodem, do dnešního dne jsem obdržel
neuvěřitelných 1 269 e-mailů! Tímto děkuji všem, kdo si udělali čas a tyto záznamy
poslali.

Nebudu se zabývat HTML e-mailem - ten je většinou posílán i s prostým textem, takže
se dá tato část e-mailu odfiltrovat a o nic nepříjdete. Standardní e-maily jsou
posílány ve formátu MIME a ten se dále rozděluje na dva typy kódování znaků:
- Quoted-printable - celý text je v ASCII a speciality jako je diakritika jsou psány pomocí hexadecimálního kódu (aby se tento kód rozlišil od okolního textu, tak je vždy započat znakem "rovná se")
- Base64 - zakódovaný text do nečitelné podoby, způsobem kódování pomocí jedniček a nul vás nebudu zatěžovat

Protože počet e-mailů s kódováním Base64 se dal spočítat na prstech jedné ruky,
jasně zvítězilo první a zároveň jednodušší kódování. Naprogramovat takovou jednoduchou
věc není žádný problém, ale největší oříšek byl ten hexadecimální kód - nevěděl jsem
totiž, jak ho z textu převézt na číslo. Po dlouhém hledání jsem ovšem našel velmi
jednoduché řešení - je na to funkce `strtol`.   

Více než slova řekne zdrojový kód:

```cpp
#include "stdafx.h"
#include <iostream>
#include <fstream>
#include <stdlib.h>

using namespace std;

int main(int argc, char *argv[])
{
	FILE *vstup, *vystup;
	char radek[200], novyradek[200], hex[6];
	// zacatek hlavicky e-mailu
	char zacatek[7] = "From -";
	char *p;
	int delka, n, cislo;
	bool shodne, preskoc = false;

	if (argc != 3)
	{
		printf("Program musi byt volan se dvema parametry:\\n");
		printf("convert.exe vstup.txt vystup.txt\\n");
		exit(1);
	}
	// otevru soubor (prvni parametr) pro cteni
	fopen_s(&vstup, argv[1], "r");
	if (vstup == NULL)
	{
		printf( "Vstupni soubor nelze otevrit !!!\\n" );
		exit(1);
	}
	// otevru soubor (druhy parametr) pro zapis
	fopen_s(&vystup, argv[2], "w");
	if (vystup == NULL)
	{
		printf( "Vystupni soubor nelze otevrit  !!!\\n" );
		exit(1);
	}
	// dokud neni dosazen konec vstupniho souboru
	while (!feof(vstup))
	{
		// nactu cely radek
		fgets(radek, 200, vstup);
		delka = (unsigned) strlen(radek);
		// tady mam preskakovani hlavicky e-mailu
		// abych neprepisoval data v ni
		if (preskoc)
		{
			// v hlavicce nahrazovani znaku nedelam a proto
			// napisu cely radek nezmeneny na vystup
			fprintf(vystup, "%s", radek);
			// konec hlavicky
			if (delka == 1) preskoc = false;
		}
		else
		{
			if (delka > 6)
			{
				// zjisteni, zda tento radek neni zacatek hlavicky
				// e-mailu (jestli neobsahuje "From -")
				shodne = true;
				for (int i = 0; i < 6; i++)
				{
					if (radek[i] != zacatek[i]) shodne = false;
				}
				if (shodne) preskoc = true;
			}
			// "vymazani" promenne novyradek
			memset(novyradek, 0, sizeof(novyradek));
			n = 0;
			// prochazim jednotlive znaky radku
			for (int i = 0; i < delka; i++)
			{
				if (radek[i] == ''='')
				{
					if ((radek[i+1] == NULL) || (radek[i+2] == NULL)) break;
					// dva znaky za ''='' jsou hexadecimalni cislo, proto z toho
					// nejdrive udelam retezec ve tvaru napr. 0x3D
					sprintf_s(hex, sizeof(hex), "0x%c%c", radek[i+1], radek[i+2]);
					// pak tento retezec prevedu na hexadecimalni cislo (typu int)
					cislo = strtol(hex, &p, 0);
					// a nakonec z tohoto cisla udelam znak
					novyradek[n++] = (char) cislo;
					// dva znaky za ''='' uz jsem pouzil, proto je preskocim
					i += 2;
				}
				else novyradek[n++] = radek[i];
			}
			// radek s prevedenymi znaky napisu na vystup
			fprintf(vystup, "%s", novyradek);
		}
	}
	printf("E-mail byl preveden na text.\\n");
	// nakonec oba soubory zavru
	fclose(vystup);
	fclose(vstup);
	
	return 0;
}
```

Pokud netušíte, jak takový Quoted-printable e-mail vypadá, tak právě pro vás zde
mám ukázku elektronického dopisu, který putuje od `abrakadabra@t-email.cz` do
`kouzelnik@centrum.cz` (e-maily jsou vymyšlené, ve skutečnosti to je ukázka záznamu
rozhovoru již zmíněného Kecala):

```
From - Wed Jan 12 18:28:37 2005
Received: by mail3 from <abrakadabra@t-email.cz> for <kouzelnik@mail3.centrum.cz>;
  Thu, 06 Jan 2005 17:06:32 +0100                                          
X-Virus-Scanner: This message was checked by NOD32 Antivirus system
	NOD32 for Linux Mail Server.
	For more information on NOD32 Antivirus System,
	please, visit our website: http://www.nod32.com/.                         
Received: from black.click.cz ([62.141.0.10]:45972 "EHLO click.cz")
        by mail.centrum.cz with ESMTP id <S279337AbVAFQFt>;
        Thu, 6 Jan 2005 17:05:49 +0100
Received: from Linspire1234C (gprsg1.isp.t-mobile.cz [62.141.25.1])
        by click.cz (8.12.9/8.12.9) with SMTP id j06G5c2b010620
        for <kouzelnik@centrum.cz>; Thu, 6 Jan 2005 17:05:41 +0100 (MET)
Date:   Thu, 6 Jan 2005 17:05:38 +0100 (MET)
Message-ID: <000001c4f409$903238f0$fc3b18ac@Linspire1234C>
From:   "Abrakadabra" <abrakadabra@t-email.cz>
To:     "Kouzelnik" <kouzelnik@centrum.cz>
Subject: Pomoc autorovi
MIME-Version: 1.0
Content-Type: text/plain;
        charset="iso-8859-2"
Content-Transfer-Encoding: quoted-printable
X-Mailer: Microsoft Outlook Express 6.00.2900.2180
X-MimeOLE: Produced By Microsoft MimeOLE V6.00.2900.2180

* Program Kecal spu=B9t=ECn dne 6. ledna 2005 v 12:07:35.
P: V=EDt=E1m t=EC, nov=FD u=BEivateli !!!
P: Jako prvn=ED v=ECc zm=E1=E8kni F4 a vypl=F2 info o u=BEivateli.
C: Zdar, jak se m=E1=B9 ?
P: Blb=EC. Tisk=E1rna mi dala kopa=E8ky.
C: Co se stalo ? Pov=EDdej.
P: Zkus se nad t=EDm zamyslet a p=F8ijde=B9 na odpov=EC=EF s=E1m.
...
Doba rozhovoru: 00:06:36   Napsan=FDch v=ECt: 10
```

A pomocí mého prográmku bude e-mail vypadat takto (hlavičku už znovu nepíšu, ta
zůstane stejná):

```
* Program Kecal spuštěn dne 6. ledna 2005 v 12:07:35.
P: Vítám tě, nový uživateli !!!
P: Jako první věc zmáčkni F4 a vyplň info o uživateli.
C: Zdar, jak se máš ?
P: Blbě. Tiskárna mi dala kopačky.
C: Co se stalo ? Povídej.
P: Zkus se nad tím zamyslet a přijdeš na odpověď sám.
...
Doba rozhovoru: 00:06:36   Napsaných vět: 10
```

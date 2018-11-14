2006-12-08-moje-zacatky-v-cpp

(7, 'moje-zacatky-v-cpp', '2006-12-08 21:22:56', 'Moje začátky v C++',


Aneb jak jsem s pomocí znalostí Javy a Céčka (které už si moc nevzpomínám) učil
C++. Malá poznámka na začátek - používám vývojové prostředí Microsoft Visual
Studio 2005, ale myslím, že moje zkušenosti půjdou použít i jinde.

Vstup a výstup
==============

Z jazyka C si ještě pamatuji, že jsem standardní vstup a výstup na obrazovku
řešil pomocí `scanf` a `printf`. V C++ však přibyly dvě přívětivé funkce `cin` a
`cout`. Výhoda spočívá v tom, že tyto funkce samy rozpoznají datový typ proměnné
a tudíž odpadá ruční zadávání (např. `"%d"` pro celé číslo).

Abychom mohli používat tyto funkce, musíme nejprve na začátku deklarovat hlavičkový
soubor `iostream` a použít jmenný prostor `std`. Tady jsem poprvé natrefil na
`namespace`, je to "novinka" C++ a když ji zapomenete napsat, tak se možná budete
hodně divit, když to bude psát, že funkci `cin` vůbec nezná. Je to tím, že funkce
`cin` a další její kolegové jsou deklarovány v jmenném prostoru `std`. Pokud si na
začátku programu nepomůžeme kouzelným slovíčkem `using namespace`, tak v programu
budeme muset používat zápis `std::cin` nebo `std::cout`.

[POKRACOVANI]

Jako příklad uvedu jednoduché načtení čísla zadaného uživatelem (ze vstupu) do
proměnné *cislo* a následné vypsání tohoto čísla na obrazovku (na výstup):

/---code cpp
#include "stdafx.h"
#include <iostream>
using namespace std;

int _tmain(int argc, _TCHAR* argv[])
{
    	int cislo;

	cout << "Napiste nejake cislo: ";
	cin >> cislo;
	cout << "Zadane cislo: " << cislo << endl;

	return 0;
}
\\---

Třídy
=====

Nebudu rozebírat, co je třída nebo objektově orientované programování, ale chci
poukázat na to, jak se třídy v jazyku C++ píší. Jedna třída se oproti Javě zapíše
do dvou souborů a to do hlavičkového souboru (.h), kde jsou pouze deklarace proměnných
a funkcí (prototypů), a do zdrojového souboru (.cpp), kde už přímo píšeme funkce této
třídy. Kromě prototypů můžeme do hlavičkového souboru psát i tzv. inline funkce - to
znamená, že můžeme obsah funkce zapsat přímo k deklaraci funkce. Více vysvětlí příklad:

Soubor **Trida.h**:
/---code cpp
#pragma once
/*
	#pragma once zajisti, aby byla tato hlavicka
	nactena do pameti jenom jednou i pri vice pouziti
	#include "Trida.h"
*/

class Trida
{
    /*
	v Jave se psalo private nebo public
	pred kazdou promennou nebo funkci, ale
	v C++ se to pise takto do bloku:
*/
private:
	int a, b;
	int soucin;
public:
	Trida(int a = 0, int b = 0); // konstruktor se dvema parametry
	int vrat_a() { return a; } // vlozena (inline) funkce
	int vrat_b() { return b; }
	void nastav_a(int cislo);
	void nastav_b(int cislo);
	int vysledek() { return soucin; }
	/*
		takto se pise destruktor:
		~Trida(void);
	*/
}; // pozor - tady patri strednik !
\\---

Soubor **Trida.cpp**:
/---code cpp
#include "StdAfx.h"
#include "Trida.h"

/*
	pokud bych volal konstruktor bez parametru (např. Trida test),
	tak promenne a, b zustanou v nule a soucin vynuluji v konstruktoru
*/
Trida::Trida(int a, int b)
{
    	/*
		tady jsem schvalne deklaroval stejne nazvy promennych
		jako ma tato trida, abych ukazal pouziti this, ktery
		slouzi jako ukazatel na tuto tridu
	*/
	this->a = a;
	this->b = b;
	if (a > 0 && b > 0)
		soucin = a * b;
	else
		soucin = 0;
}
void Trida::nastav_a(int cislo)
{
    	if (cislo > 0)
		a = cislo;
}

void Trida::nastav_b(int cislo)
{
    	if (cislo > 0)
		b = cislo;
}
\\---

A nakonec ukázka použití mojí nové třídy:
/---code cpp
#include "stdafx.h"
#include <iostream>
using namespace std;

// tady deklaruji hlavickovy soubor moji tridy,
// abych ji mohl pouzivat
#include "Trida.h"

int _tmain(int argc, _TCHAR* argv[])
{
    	Trida test(3, 4);

	cout << "A je " << test.vrat_a() << " a B je " << test.vrat_b() << endl;
	cout << "Vysledek: " << test.vysledek() << endl;

	return 0;
}
\\---

Sice je naprosto nezvyklé dělat násobení dvou čísel tak složitým způsobem, ale
jako příklad to myslím poslouží dobře.

Visual Studio 2005
==================

V tomto vývojovém prostředí se takovéto jednoduché aplikace, které běží jenom na
příkazovém řádku dělají tak, že při vytváření nového projektu vyberete "Win32
Console Application". Pak pro kompilaci a spuštění napsaného kódu je dobré stisknout
kombinaci CTRL + F5, protože po vykonání kódu nedojde k ukončení aplikace a zavření
okna s příkazovým řádkem, ale čeká se na stisk klávesy.

Toť vše, co jsem chtěl v tomto článku sdělit. Uvítám jakékoliv hodnocení v komentářích.
Pokud vše půjde hladce, tak bych chtěl z tohoto příspěvku udělat seriál více článků.'),

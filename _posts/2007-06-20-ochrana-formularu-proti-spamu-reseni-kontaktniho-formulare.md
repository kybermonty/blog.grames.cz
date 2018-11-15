---
layout: single
title:  "Ochrana formulářů proti spamu + řešení kontaktního formuláře"
date:   2007-06-20 14:15:33
---
Minule jsem vám prozradil, jak ochránit kontaktní formulář přes posíláním jednoho
e-mailu na několik adres a dnes si povíme, jak od tohoto formuláře odlákat roboty
úplně. V druhé části článku dokonce naleznete hotové řešení dokonalého kontaktního
formuláře !

Byl jednou jeden robot
======================

Robota si můžete představit jako aplikaci nebo nějaký skript, který projíždí stránky
a slídí, kde by našel nějaký formulář a mohl ho zběsile vyplnit nějakou reklamou
a odeslat. Přičemž si prohlíží HTML stránky čistě textově - nezobrazuje si grafiku
nebo kaskádové styly, jenom kouká na HTML tagy a jakmile uvidí `<input type="text" name="email" />`,
tak mu začnou kapat sliny. Ihned vyplní všechny pole formuláře a zmáčkne všechny
tlačítka, které odesílají formulář, aby měl jistotu, že nedal třeba jenom náhled.

[POKRACOVANI]

Takto jednoduše si lze představit robota - bohužel, tyto potvůrky se neustále
vylepšují, takže některé si dokonce poradí s obrázkem, ze kterého musíte opsat znaky -
tzv. "CAPTCHA":http://cs.wikipedia.org/wiki/CAPTCHA. I když vytvoříte speciální pole
jenom pro roboty a skryjete ho pomocí CSS v domnění, že bude robot tak hloupý a
vyplní ho taky, i zde můžete narazit. Avšak nepropadejme panice, řešení existuje !

Jak správně naklást pasti
=========================

Kontrolní otázka
----------------

Dobře nachytat robota lze na kontrolní otázce, na kterou nemá šanci znát odpověď.
Může to být matematický příklad (3 + 4), doplnění do věty (skákal ___ přes oves)
a podobně. Tato metoda je účinná, avšak obtěžuje uživatele - musí kvůli nám přemýšlet.

Captcha
-------

I když jsem mluvil o tom, že někteří roboti opravdu umí rozpoznat tyto obrázky,
není jich tolik, a proto se dá využít i toto řešení. Já bych ho však nedoporučoval -
rozhodně není přístupné a znechucuje uživatele ještě více než kontrolní otázka.
Já je přímo nesnáším - někdy jsou tak šílené, že se na ten obrázek opravdu musíte
dívat nejmíň půl minuty, abyste odtušili nakreslené znaky.

Náhled
------

Na tomto blogu mám u přidávání komentářů pouze tlačítko "Náhled". Odeslat příspěvek
lze tedy až poté, co si ho prohlédnete. Věřte nebo ne, pouze toto stačí k odstrašení
robotů (a doufám, že mi to ještě nějakou dobu vydrží). Bohužel je takovéto řešení
použitelné jen v některých případech - nejčastěji v diskusích.

JavaScript
----------

I když ty potvůrky umí všelicos, JavaScript ještě ne :-) Tedy proč toho nevyužít -
dělá se to tak, že pokud uživatel nemá JavaScript nebo ho má vypnutý, tak se standardně
nabízí nějaká kontrolní otázka a pokud je JavaScript k dispozici, tak výsledek této
otázky vloží do formuláře pomocí `<input type="hidden" ... />` a otázka samotná
se již nezobrazí a uživatele neobtěžuje.

Řešení kontaktního formuláře
============================

Připravil jsem kontaktní formulář, který využívá poslední pasti na roboty a to JavaScriptu.
Jelikož dneska letí XHTML, tak jsem si nemohl dovolit pouhé `document.write`, jelikož
to specifikace nedovoluje. Proto je vkládání JavaScriptem řešeno elegantněji pomocí
"DOM":http://cs.wikipedia.org/wiki/Document_Object_Model.

Kdyby se vám ve formuláři pozastavoval zrak nad tagem `<label>`, tak vězte, že to
je svázání popisku s příslušným polem. Po kliknutí na popisek se kurzor přemístí
do pole, které k tomuto popisku patří. Každý přístupný formulář musí tento tag
obsahovat.

Celé řešení se skládá ze dvou souborů - samotný formulář a třída, která pracuje s
daty, které jsou přes tento formulář odeslány.

**napiste-nam.php**
/---code html
<?php
require_once "./MailForm.php";

$showForm = true;

if ( $_POST ) {
    	$form = new MailForm( $_POST[ "email" ], $_POST[ "text" ], $_POST[ "spamCheck" ],
		$_POST[ "numbers" ] );

	echo "<p>";

	if ( $form->isValid( ) ) {
    		$showForm = false;
		$form->sendMail( );
	}
	else {
    		$form->printErrors( );
	}

	echo "</p>\\n";
}

if ( $showForm ) {
    	$first = rand( 0, 9 );
	$second = rand( 0, 9 );
?>
<h2>Napište nám</h2>

<form action="napiste-nam.php" method="post">
<div id="myform">
	<label>
		Váš e-mail:
		<input type="text" name="email" size="40"<?php
			if ( !empty( $_POST[ "email" ] ) ) {
    				echo " value=\\"".$_POST[ "email" ]."\\"";
			} ?> />
	</label><br />
	(není povinný, vyplňte pokud chcete dostat odpověď)
	<br /><br />
	<label>
		Text e-mailu:<br />
		<textarea name="text" cols="42" rows="10"><?php
			if ( !empty( $_POST[ "text" ] ) ) {
    				echo $_POST[ "text" ];
			}
		?></textarea>
	</label>
	<br /><br />
	<noscript>
		<label title="Vyplňte výsledek součtu těchto dvou čísel (ochrana před roboty)">
			Kolik je <?php echo $first." + ".$second ?>:
			<input type="text" name="spamCheck" size="10" />
		</label>
		<br /><br />
	</noscript>
	<script type="text/javascript">
	/* <![CDATA[ */
		spamcheck = document.createElement( ''input'' );
		spamcheck.setAttribute( ''type'', ''hidden'' );
		spamcheck.setAttribute( ''name'', ''spamCheck'' );
		spamcheck.setAttribute( ''value'', <?php echo $first ?> + <?php echo $second ?> );
		document.getElementById( ''myform'' ).appendChild( spamcheck );
	/* ]]> */
	</script>
	<input type="hidden" name="numbers" value="<?php echo $first.$second ?>" />
	<input type="submit" name="btn" value="Odeslat" />
</div>
</form>
<?php
}
?>
\\---
**MailForm.php**
/---code php
<?php
class MailForm {
    	private $mail;
	private $text;
	private $spamCheck;
	private $numbers;
	private $errors;
  
	public function __construct( $mail, $text, $spamCheck, $numbers ) {
    		$this->mail = $mail;
		$this->text = $text;
		$this->spamCheck = $spamCheck;
		$this->numbers = $numbers;
		$errors = array();
	}
  
	public function isValid( ) {
    		if ( empty( $this->mail ) ) {
    			$this->mail = "robot@domena.cz";
		}
		elseif ( !ereg( "^[_a-zA-Z0-9\\.\\-]+@[_a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,4}$",
				$this->mail ) ) {
    			$this->errors[] = "E-mail byl vyplněn ve špatném formátu !";
		}

		if ( empty( $this->text ) ) {
    			$this->errors[] = "Nebyl vyplněn text e-mailu !";
		}
      
		if ( empty( $this->spamCheck ) ) {
    			$this->errors[] = "Nebyla vyplněna kontrolní otázka !";
		}
		elseif ( $this->spamCheck != ( $this->numbers[ 0 ] + $this->numbers[ 1 ] ) ) {    
    			$this->errors[] = "Nebyla správně zodpovězena kontrolní otázka !";
		}
      
		if ( empty( $this->errors ) ) {
    			return true;
		}
		else {
    			return false;
		}
	}

	public function sendMail( ) {
    		$obsah = iconv( "utf-8", "iso-8859-2", $this->text );
    
		if ( mail( "info@domena.cz", "E-mail z webu", $obsah, "From: ".
				$this->mail."\\nContent-Type: text/plain; charset=iso-8859-2\\n" ) ) {
    			echo "E-mail byl odeslán.";
		}
		else {
    			echo "E-mail se nepodařilo odeslat !";
		}
	}

	public function printErrors( ) {
    		for ( $i = 0; $i < count( $this->errors ); $i++ ) {
    			echo $this->errors[ $i ]."<br />\\n";
		}
	}
}
?>
\\---

Kódování e-mailu převádím z utf-8 na iso-8859-2, protože jsem zjistil, že některé
webmaily si s unicode neporadí.'),

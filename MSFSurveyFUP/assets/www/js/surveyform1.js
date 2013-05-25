/*
 * These define all the questions that you'll see on a particular page.
 * It's a JSON array. I've given it its own variable to highlight it. The
 * childPage1Views variable gets used later on for the final structure.
*/

childPage1Views = [
	{viewType : "date", conceptId : "datenq", label : "Date du suivi",
		hideIf : {conceptIds : ["nomenq"], condition : "nomenq == '4'"}}, 
	{viewType : "number", conceptId : "nomenq", label : "Num\xE9ro de l'enqu\xEAteur"}, 
	{viewType : "text", conceptId : "zonenom", label : "Nom de la zone"}, 
	{viewType : "number", conceptId : "zonenum", label : "Num\xE9ro de la zone"}, 
	{viewType : "number", conceptId : "nummen", label : "Num\xE9ro du m\xE9nage"}, 
	{viewType : "number", conceptId : "nuvill", label : "Num\xE9ro du village"}, 
	{viewType : "number", conceptId : "enfid", label : "Identification de l'enfant"}, 
	{viewType : "number", conceptId : "numcoup", label : "Num\xE9ro du coupon"}, 
	{viewType : "text", conceptId : "enfnom", label : "Nom de famille de l'enfant"}, 
	{viewType : "text", conceptId : "prenenf", label : "Pr\xE9nom de l'enfant"}, 
	{viewType : "date", conceptId : "naisenf", label : "Date de naissance de l'enfant"}, 
	{viewType : "number", conceptId : "enfage", label : "Age de l'enfant (en mois)"},
	{viewType : "radio", conceptId : "obtage", label : "Comment avez-vous obtenu l'�ge?",
		options : [{label : "carnet de vaccination", value : "1"},
		           {label : "certificat naissance", value : "2"},
		           {label : "information maman", value : "3"},
		           {label : "utilisation calendrier local", value : "4"}]},
	{viewType : "radio", conceptId : "sexenf", label : "Sexe de l'enfant",
		options : [{label : "male", value : "1"},
		           {label : "female", value : "2"},
		           {label : "NA ou non sp\xE9cifi\xE9", value : "9"}]},
   	{viewType : "text", conceptId : "mernom", label : "Nom de famille de la m\xE8re"}, 
   	{viewType : "text", conceptId : "merpren", label : "Pr\xE9nom de la m\xE8re"}, 
   	{viewType : "text", conceptId : "pernom", label : "Nom de famille du p\xE8re"}, 
   	{viewType : "text", conceptId : "perpren", label : "Pr\xE9nom du p\xE8re"}, 
   	{viewType : "number", conceptId : "tel", label : "Num\xE9ro de t\xE9l\xE9phone"}, 
   	{viewType : "radio", conceptId : "accomp", label : "Accompagnant de l'enfant",
   		options : [{label : "m\xE8re", value : "1"},
   		           {label : "p\xE8re", value : "2"},
   		           {label : "grand m\xE8re", value : "3"},
   		           {label : "autre", value : "4"}]},
    {viewType : "text", conceptId : "accompprecise", label : "Pr\xE9ciser:",
	            		showIf : {conceptIds : ["accomp"], condition: "accomp == 4"}}
];

childPage2Views = [
            	{viewType : "radio", conceptId : "laitcont", label : "L'enfant continue-t-il d'�tre allait�?",
            		options : [{label : "oui", value : "1"},
            		           {label : "non", value : "2"},
            		           {label : "ne sait pas ou non sp�cifi�", value : "9"}]},

            	{viewType : "radio", conceptId : "vaccinat", label : "L'enfant a-t-il �t� vaccin� depuis notre derni�re visite?",
            	    options : [{label : "oui", value : "1"},
            	            {label : "non", value : "2"},
            	            {label : "ne sait pas ou non sp�cifi�", value : "9"}]},

 	            vaccinesCheckbox = {
    	            		viewType : "checkboxgroup",
    	            		label : "Quel vaccin a-t-il re�u?",
    	            		conceptId : "vaccinesCheckbox",
    	            		showIf : {conceptIds : ["vaccinat"], condition : "vaccinat == '1'"},
    	            		children : [{label : "vaccination polio", conceptId : "vacpolio"},
    	            		           {label : "vaccination rougeole", conceptId : "vacrouge"},
    	            		           {label : "vaccination pentavalent", conceptId : "vacpenta"},
    	            		           {label : "autre vaccination", conceptId : "vacautre"}]    	            		        		   
            	            },            	            
               	
            	{viewType : "radio", conceptId : "ppdreac", label : "Avez-vous remarqu� des r�actions particuli�res apr�s la prise du suppl�ment nutritionnel?",
            	    showIf : {conceptIds : ["vacautre"], condition : "vacautre == '4'"},
            	      options : [{label : "oui", value : "1"},
            	            {label : "non", value : "2"},
            	            {label : "ne sait pas ou non sp�cifi�", value : "9"}]},
               	
            	            
	            reactionsCheckbox = {
	            		viewType : "checkboxgroup",
	            		label : "Quel vaccin a-t-il re�u?",
	            		conceptId : "reactionsCheckbox",
	            		showIf : {conceptIds : ["ppdreac"], condition : "ppdreac == 1"},
	            		children : [{label : "Diarrh�e", conceptId : "ppddiarr"},
	            		           {label : "Vomissement", conceptId : "ppdvomis"},
	            		           {label : "Rash cutan�", conceptId : "ppdrash"},
	            		           {label : "Autre", conceptId : "ppdautre"}]},            	            
               	{viewType : "text", conceptId : "ppdautreprecise", label : "Pr�ciser:",
            		showIf : {conceptIds : ["ppdreac"], condition : "ppdreac == 1"}}, 
               	{viewType : "number", conceptId : "pmmes", label : "Mesure du perim�tre brachial (MUAC) (mm)"},
            	{viewType : "radio", conceptId : "oedem", label : "Oed�mes bilateraux",
            	    options : [{label : "oui", value : "1"},
            	            {label : "non", value : "2"},
            	            {label : "ne sait pas ou non sp�cifi�", value : "9"}]},
               	
               	{viewType : "number", conceptId : "poids", label : "Poids de l'enfant (kg)"},
               	{viewType : "number", conceptId : "taille", label : "Taille de l'enfant (cm)"},
               ];

childPage3Views = [
               	{viewType : "radio", conceptId : "malad", label : "L'enfant a-t-il �t� malade depuis la derni�re visite?",
               		options : [{label : "oui", value : "1"},
               		           {label : "non", value : "2"},
               		           {label : "ne sait pas ou non sp�cifi�", value : "9"}]},

   	            symptomesCheckbox = {
       	            		viewType : "checkboxgroup",
       	            		label : "Sympt�mes",
       	            		conceptId : "symptomesCheckbox",
       	            		showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
       	            		children : [{label : "Fi�vre", conceptId : "fievre"},
        	            		           {label : "Toux", conceptId : "toux"},
           	            		           {label : "Diarrh�e", conceptId : "diarhe"},
        	            		           {label : "Convulsion", conceptId : "convuls"},
        	            		           {label : "Perte de poids", conceptId : "poidpert"},
           	            		           {label : "Douleur adbominale", conceptId : "abdom"},
        	            		           {label : "Vomissement", conceptId : "vomis"},
        	            		           {label : "Difficult� � respirer", conceptId : "respir"},
           	            		           {label : "Probl�me pour uriner", conceptId : "urine"},
        	            		           {label : "Maux de t�te", conceptId : "cephal"},
        	            		           {label : "Constipation", conceptId : "constip"},
        	            		           {label : "Probl�me aux oreilles", conceptId : "oreill"},
        	            		           {label : "Probl�me aux yeux", conceptId : "yeux"},
        	            		           {label : "Perte appetit", conceptId : "appet"},
        	            		           {label : "Br�lure", conceptId : "brulur"},
        	            		           {label : "Saignement", conceptId : "sang"},
        	            		           {label : "Traumatisme", conceptId : "trauma"},
        	            		           {label : "Maux de gorge", conceptId : "gorge"},
        	            		           {label : "Non Specifi�", conceptId : "nonspec"},
        	            		           {label : "Autre No1", conceptId : "autre1"},
        	            		           {label : "Autre No2", conceptId : "autre2"},
           	            		    ]    	            		        		   
               	            },            	     
              	{viewType : "text", conceptId : "autre1precise", label : "Autre No 1 Pr�ciser:", showIf : {conceptIds : ["autre1"], condition : "autre1 == 'true'"}},           	  
              	{viewType : "text", conceptId : "autre2precise", label : "Autre No 2 Pr�ciser:", showIf : {conceptIds : ["autre2"], condition : "autre2 == 'true'"}},
               	            
               	{viewType : "radio", conceptId : "eptemps", label : "Combien de temps a dur� l'�pisode de maladie",
	            	showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
               	    options : [{label : "1-2jrs", value : "1"},
               	            {label : "3-5jrs", value : "2"},
               	            {label : "ne sait pas ou non sp�cifi�", value : "3"}]},
                  	
               	{viewType : "radio", conceptId : "epsoin", label : "Quelque chose a-t-il �t� fait � l'apparition de la maladie par vous ou qu'elqu'un de la famille?",
           	        showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
               	    options : [{label : "oui", value : "1"},
                  	            {label : "non", value : "2"},
                  	            {label : "ne sait pas ou non sp�cifi�", value : "9"}]},
               	            
                reasonCheckbox = {
   	            		viewType : "checkboxgroup",
   	            		label : "Quelles sont les raisons de n'avoir rien entrepris",
   	            		conceptId : "reasonCheckbox",
   	            		showIf : {conceptIds : ["malad", "epsoin"], condition : "malad == '1' && epsoin == '2'"},
   	            		children : [{label : "Raison financi�re", conceptId : "nofin"},
    	            		           {label : "Manque de transport", conceptId : "notransp"},
    	            		           {label : "Maladie trop grave", conceptId : "notgve"},
       	            		           {label : "Manque de temps", conceptId : "notime"},
    	            		           {label : "CDS trop loin", conceptId : "nocdsl"},
    	            		           {label : "Probl�me de s�curit�", conceptId : "nosecur"},
       	            		           {label : "Maladie pas trop grave", conceptId : "nomgve"},
       	            		           {label : "Autre raison", conceptId : "noautre"}
       	            		           ]    	            		        		   
           	            },            	            
              	{viewType : "text", conceptId : "noautreprecise", label : "Pr�ciser",
                  	            	showIf : {conceptIds : ["malad", "epsoin", "noautre"],
                  	            				condition: "malad == '1' && epsoin == '2' && noautre == 'true'"}},

                whatdoneCheckbox = {
   	            		viewType : "checkboxgroup",
   	            		label : "Si oui, qu'est-ce qui a �t� fait?",
   	            		conceptId : "whatdoneCheckbox",
   	            		showIf : {conceptIds : ["malad", "epsoin"], condition : "malad == '1' && epsoin == '2'"},
   	            		children : [{label : "Consultation au CDS", conceptId : "reccds"},
    	            		           {label : "Est all� � l'h�pital", conceptId : "rechop"},
    	            		           {label : "Consulter un m�decin priv�", conceptId : "recmed"},
       	            		           {label : "Consulter un agent communautaire", conceptId : "recagcom"},
       	            		           
    	            		           {label : "Consult� un parent m�dical ou param�dical", conceptId : "recparmd"},
    	            		           {label : "Utiliser m�dicament existant � la maison", conceptId : "recmedma"},
    	            		           {label : "A achet� des m�dicaments en pharmacie /au march�", conceptId : "recachmt"},
    	            		           {label : "A consult� un gu�risseur", conceptId : "recgueri"},
    	            		           {label : "A consult� un marabout", conceptId : "recmarab"},
    	            		           {label : "Achat de m�dicaments traditionnels", conceptId : "recatrad"},
    	            		           {label : "Consult� Dr Choco", conceptId : "rechoco"},
       	            		           {label : "Autre", conceptId : "recautre"},
       	            		           ]    	            		        		   
           	            },            	            
              	{viewType : "text", conceptId : "recautreprecise", label : "Pr�ciser",
          	            	showIf : {conceptIds : ["malad", "epsoin", "recautre"],
  	            				condition: "malad == '1' && epsoin == '2' && recautre == 'true'"}},
               ];

childPage4Views = [
               	{viewType : "radio", conceptId : "epevol", label : "Comment a �volu� l'enfant apr�s cette demarche?",
	            	showIf : {conceptIds : ["malad", "epsoin"], condition : "malad == '1'"},
               		options : [{label : "il a gu�ri", value : "1"},
               		           {label : "traitement en cours", value : "2"},
               		           {label : "il s'est am�lior�", value : "3"},
               		           {label : "son �tat s'est aggrav�", value : "4"},
               		           {label : "aucun changement", value : "5"}]},

               	{viewType : "radio", conceptId : "dmiss", label : "L'enfant a-t-il d� �tre admis � l'h�pital de Massakory?",
               	    showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
               	    options : [{label : "oui", value : "1"},
               	            {label : "non", value : "2"},
               	            {label : "ne sait pas ou non sp�cifi�", value : "9"}]},

               	{viewType : "radio", conceptId : "eprest", label : "L'enfant est-il toujours malade aujourd'hui?",
               	    showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
               	    options : [{label : "oui", value : "1"},
               	            {label : "non", value : "2"},
               	            {label : "ne sait pas ou non sp�cifi�", value : "9"}]},

               	{viewType : "radio", conceptId : "enqrefer", label : "L'enqu�teur a-t-il r�f�r� l'enfant?",
               	    showIf : {conceptIds : ["malad"], condition : "malad == '1'"},
               	    options : [{label : "oui", value : "1"},
               	            {label : "non", value : "2"},
               	            {label : "ne sait pas ou non sp�cifi�", value : "9"}]},

               	{viewType : "radio", conceptId : "decision", label : "Si oui, � quel centre l'enfant a-t-il �t� r�f�r�?",
                    showIf : {conceptIds : ["malad", "enqrefer"], condition : "malad == '1' && enqrefer == '1'"},
               	    options : [{label : "Centre de sant�", value : "1"},
               	            {label : "Agent communautaire", value : "2"},
               	            {label : "H�pital", value : "3"}]},
              	{viewType : "number", conceptId : "enfidrep", label : "Numero d'identification de l'enfant, r�p�tition"},
              ];


introPage = {
	header : {
		title : "MSF Malnutrition",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : []
	}
};

/*
 * This represents a page. It uses the array we defined above to describe which views
 * should be on the page. This also contains some display data like the title, themes, etc.
 */

childPage1 = {
	header : {
		title : "Page 1: INFORMATION SUIVI ENFANT",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : childPage1Views
	}
};


childPage2 = {
		header : {
			title : "Page 2: INFORMATION ALAITEMENT, VACCINATION, REACTION ASPE",
			theme : "b"
		},
		footer : {
			theme : "c"
		},
		content : {
			theme : "c",
			views : childPage2Views
		}
	};

childPage3 = {
		header : {
			title : "Page 3: MORBIDITE",
			theme : "b"
		},
		footer : {
			theme : "c"
		},
		content : {
			theme : "c",
			views : childPage3Views
		}
	};

childPage4 = {
		header : {
			title : "Page 4: Survey",
			theme : "b"
		},
		footer : {
			theme : "c"
		},
		content : {
			theme : "c",
			views : childPage4Views
		}
	};

SubmitPage = {
		header : {
			title : "Submit form data",
			theme : "b"
		},
		footer : {
			theme : "c",

			footerButton3Text : "Submit",
			footerButton3Theme : "e",
			footerButton3Icon : "plus",
			footerButton3Action : "submit",
			footerButton3Disabled : false
		},
		content : {
			theme : "c",
			views : [{viewType : "submitpage"}]
		}
};

/*
 * formData is the global variable that the initializer uses to actually fill the form.
 * It can define global variables and defaults for the whole app. Right now it just has two pages.
 * 
 */

formData = {
	global : {
	},
	
	pages : [childPage1,
	         childPage2,
	         childPage3,
	         childPage4,
	         SubmitPage]
};

exampleTextField = {
	viewType : "text",
	conceptId : "fullName",
	label : "What is your full name?"
};

exampleNumberField = {
		viewType : "number",
		conceptId : "numberOfBoats",
		label : "How many boats do you own?"
};

exampleRadio = {
		viewType : "radio",
		conceptId : "favoriteColor",
		label : "Which is your favorite color?",
		options : [{label : "Green", value : "greenvalue"},
		           {label : "Blue", value : "bluevalue"},
		           {label : "Purple", value : "purplevalue"}]
};

exampleCheckbox1 = {
		viewType : "checkboxgroup",
		label : "What sports do you like?",
		children : [{label : "Soccer", conceptId : "soccervalue"},
		           {label : "Football", conceptId : "footballvalue"},
		           {label : "Calvinball", conceptId : "calvinballvalue"}]
};

exampleCheckbox2 = {
		viewType : "checkboxgroup",
		label : "What are you allergic to?",
		children : [{label : "Sulfa", conceptId : "sulfaallergy"},
		           {label : "Wheat", conceptId : "wheatallergy"},
		           {label : "Nickel", conceptId : "nickelallergy"}]
};

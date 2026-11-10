// Turkish terminology and anatomical sources: KAYNAKLAR.md.
export const bones = [
 {
  "id": "frontal",
  "latin": "os frontale",
  "tr": "alın kemiği",
  "aliases": [
   "frontale",
   "frontal"
  ],
  "meshes": [
   "52734"
  ],
  "region": "skull",
  "clue": "göz çukurunun tavanı, alnın altında",
  "angle": 0,
  "fact": "Latince frons, alın demektir. Göz çukurunun tavanına katılır."
 },
 {
  "id": "parietal",
  "latin": "os parietale",
  "tr": "duvar kemiği",
  "trAliases": [
   "yan kafa kemiği"
  ],
  "aliases": [
   "parietale",
   "parietal"
  ],
  "meshes": [
   "52788",
   "52789"
  ],
  "region": "skull",
  "clue": "kafatasının iki yan üst duvarı",
  "angle": 1.15,
  "fact": "Latince paries, duvar demektir. İki duvar kemiği sagittal sütürde birleşir."
 },
 {
  "id": "occipital",
  "latin": "os occipitale",
  "tr": "art kafa kemiği",
  "aliases": [
   "occipitale",
   "occipital"
  ],
  "trAliases": [
   "artkafa kemiği",
   "ense kemiği"
  ],
  "meshes": [
   "52735"
  ],
  "region": "skull",
  "clue": "başın arkasında, büyük deliğin çevresi",
  "angle": 3.141592653589793,
  "fact": "Latince occiput, başın arkası demektir. Foramen magnum bu kemikte bulunur."
 },
 {
  "id": "temporal",
  "latin": "os temporale",
  "tr": "şakak kemiği",
  "aliases": [
   "temporale",
   "temporal"
  ],
  "meshes": [
   "52738",
   "52739"
  ],
  "region": "skull",
  "clue": "kulağın çevresinde, kafatasının yanında",
  "angle": 1.3,
  "fact": "Latince tempora, şakaklar demektir. İç kulağı barındırır."
 },
 {
  "id": "sphenoid",
  "latin": "os sphenoidale",
  "tr": "kama kemiği",
  "aliases": [
   "sphenoidale",
   "sphenoid"
  ],
  "meshes": [
   "52736"
  ],
  "region": "skull",
  "clue": "kafatası tabanında, hipofizin altında",
  "angle": 1.05,
  "fact": "Yunanca sphen, kama demektir. Hipofiz, bu kemiğin sella turcica bölümüne yerleşir."
 },
 {
  "id": "ethmoid",
  "latin": "os ethmoidale",
  "tr": "kalbur kemiği",
  "aliases": [
   "ethmoidale",
   "ethmoid"
  ],
  "meshes": [
   "52740"
  ],
  "region": "skull",
  "clue": "burun boşluğunun tavanında, gözler arasında",
  "angle": 0.35,
  "fact": "Yunanca ethmos, elek demektir. Koku siniri lifleri lamina cribrosa deliklerinden geçer."
 },
 {
  "id": "maxilla",
  "latin": "maxilla",
  "tr": "üst çene kemiği",
  "aliases": [
   "os maxilla"
  ],
  "meshes": [
   "53649",
   "53650"
  ],
  "region": "skull",
  "clue": "üst diş kemeri, yüzün ortasında",
  "angle": 0.15,
  "fact": "Latince maxilla, çene demektir. Üst dişleri taşır ve sert damağın ön bölümünü oluşturur."
 },
 {
  "id": "mandible",
  "latin": "mandibula",
  "tr": "alt çene kemiği",
  "aliases": [
   "mandible",
   "os mandibula"
  ],
  "meshes": [
   "52748"
  ],
  "region": "skull",
  "clue": "alt diş kemeri, hareketli çene",
  "angle": 0.15,
  "fact": "Latince mandere, çiğnemek demektir. Şakak kemiğiyle çene eklemini oluşturur."
 },
 {
  "id": "zygomatic",
  "latin": "os zygomaticum",
  "tr": "elmacık kemiği",
  "aliases": [
   "zygomaticum",
   "zygomatic"
  ],
  "meshes": [
   "52892",
   "52893"
  ],
  "region": "skull",
  "clue": "yanağın çıkıntısı, göz çukurunun dışında",
  "angle": 0.4,
  "fact": "Yunanca zygon, boyunduruk demektir. Göz çukurunun dış duvarına katılır."
 },
 {
  "id": "nasal",
  "latin": "os nasale",
  "tr": "burun kemiği",
  "aliases": [
   "nasale",
   "nasal"
  ],
  "meshes": [
   "53647",
   "53648"
  ],
  "region": "skull",
  "clue": "burun köprüsünün üst bölümü",
  "angle": 0,
  "fact": "Latince nasus, burun demektir. İki burun kemiği burun köprüsünü oluşturur."
 },
 {
  "id": "lacrimal",
  "latin": "os lacrimale",
  "tr": "gözyaşı kemiği",
  "aliases": [
   "lacrimale",
   "lacrimal"
  ],
  "meshes": [
   "53645",
   "53646"
  ],
  "region": "skull",
  "clue": "göz çukurunun iç duvarında küçük bir kemik",
  "angle": 0.5,
  "fact": "Latince lacrima, gözyaşı demektir. Göz çukurunun iç duvarında bulunur."
 },
 {
  "id": "palatine",
  "latin": "os palatinum",
  "tr": "damak kemiği",
  "aliases": [
   "palatinum",
   "palatine"
  ],
  "meshes": [
   "53655",
   "53656"
  ],
  "region": "skull",
  "clue": "sert damağın arka bölümü",
  "angle": 2.5,
  "tilt": -0.6,
  "fact": "Latince palatum, damak demektir. Yatay laminaları sert damağın arka bölümünü oluşturur."
 },
 {
  "id": "concha",
  "latin": "concha nasalis inferior",
  "tr": "alt burun konkası",
  "aliases": [
   "concha inferior"
  ],
  "trAliases": [
   "alt burun midyesi",
   "alt konka"
  ],
  "meshes": [
   "54737",
   "54738"
  ],
  "region": "skull",
  "clue": "burun boşluğunun alt yan duvarı",
  "angle": 0.25,
  "fact": "Latince concha, deniz kabuğu demektir. Üst ve orta konkadan farklı olarak bağımsız bir kemiktir."
 },
 {
  "id": "vomer",
  "latin": "vomer",
  "tr": "saban kemiği",
  "aliases": [],
  "meshes": [
   "9710"
  ],
  "region": "skull",
  "clue": "burun bölmesinin arka alt bölümü",
  "angle": 0.55,
  "fact": "Latince vomer, saban demiri demektir. Kemik burun bölmesinin arka alt bölümünü oluşturur."
 },
 {
  "id": "hyoid",
  "tr": "dil kemiği",
  "latin": "os hyoideum",
  "region": "neck",
  "meshes": [
   "52749"
  ],
  "fact": "Yunanca hyoeides, upsilon (υ) harfine benzer demektir; başka kemiklerle doğrudan eklem yapmaz.",
  "clue": "dilin altında, alt çenenin gerisinde",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "atlas",
  "tr": "atlas",
  "latin": "atlas",
  "region": "neck",
  "meshes": [
   "12519"
  ],
  "fact": "Atlas, mitolojide göğü taşıyan figürdür; birinci boyun omuru başı taşır.",
  "clue": "başın hemen altında, ilk omur",
  "trAliases": [
   "birinci boyun omuru"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "axis",
  "tr": "eksen omuru",
  "latin": "axis",
  "region": "neck",
  "meshes": [
   "12520"
  ],
  "fact": "Axis, eksen demektir; diş çıkıntısı başın dönmesine katılır.",
  "clue": "ikinci boyun omuru, diş biçimli çıkıntı",
  "trAliases": [
   "ikinci boyun omuru",
   "aksis"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "cervical",
  "tr": "boyun omurları",
  "latin": "vertebrae cervicales",
  "region": "neck",
  "meshes": [
   "12525",
   "12521",
   "12522",
   "12523",
   "12524"
  ],
  "fact": "Cervix, boyun demektir; burada üçüncü ile yedinci boyun omurları birlikte gösterilir.",
  "clue": "baş ile göğüs arasındaki beş omur",
  "trAliases": [
   "servikal omurlar"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "thoracic",
  "tr": "göğüs omurları",
  "latin": "vertebrae thoracicae",
  "region": "trunk",
  "meshes": [
   "10014",
   "10037",
   "10059",
   "10081",
   "9165",
   "9187",
   "9209",
   "9248",
   "9922",
   "9945",
   "9968",
   "9991"
  ],
  "fact": "Thorax, göğüs demektir; on iki göğüs omuru kaburgalarla eklem yapar.",
  "clue": "kaburgaların arkada bağlandığı omurlar",
  "trAliases": [
   "torakal omurlar",
   "sırt omurları"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "lumbar",
  "tr": "bel omurları",
  "latin": "vertebrae lumbales",
  "region": "trunk",
  "meshes": [
   "13072",
   "13073",
   "13074",
   "13075",
   "13076"
  ],
  "fact": "Lumbus, bel demektir; beş bel omuru gövde ağırlığını taşımaya katılır.",
  "clue": "göğüs kafesinin altında, iri gövdeli beş omur",
  "trAliases": [
   "lomber omurlar"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "sacrum",
  "tr": "sağrı kemiği",
  "latin": "os sacrum",
  "region": "pelvis",
  "meshes": [
   "16202"
  ],
  "fact": "Sacrum, kutsal demektir; beş sakral omurun kaynaşmasıyla oluşur.",
  "clue": "iki kalça kemiği arasında, üçgen biçimli",
  "trAliases": [
   "sakrum"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "coccyx",
  "tr": "kuyruk sokumu kemiği",
  "latin": "os coccygis",
  "region": "pelvis",
  "meshes": [
   "20229"
  ],
  "fact": "Kokkyx, guguk kuşu demektir; sakrumun altında genellikle dört küçük omurdan oluşur.",
  "clue": "omurganın en alt ucu",
  "trAliases": [
   "koksiks",
   "kuyruk kemiği"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "sternum",
  "tr": "göğüs kemiği",
  "latin": "sternum",
  "region": "trunk",
  "meshes": [
   "7486",
   "7487",
   "7488"
  ],
  "fact": "Sternon, göğüs demektir; göğüs kafesinin ön orta duvarındadır.",
  "clue": "göğsün ön ortasında yassı kemik",
  "trAliases": [
   "iman tahtası"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "ribs",
  "tr": "kaburgalar",
  "latin": "costae",
  "region": "trunk",
  "meshes": [
   "7857",
   "7882",
   "7909",
   "7957",
   "7987",
   "8012",
   "8039",
   "8066",
   "8093",
   "8148",
   "8175",
   "8202",
   "8229",
   "8256",
   "8283",
   "8310",
   "8364",
   "8391",
   "8445",
   "8472",
   "8531",
   "8532",
   "8533",
   "8534"
  ],
  "fact": "Costa, kaburga demektir; on iki çift kemik göğüs kafesini oluşturur.",
  "clue": "göğsü iki yandan çevreleyen kemerler",
  "trAliases": [
   "kaburga kemikleri",
   "kaburga"
  ],
  "aliases": [
   "costa"
  ],
  "angle": 0.3
 },
 {
  "id": "clavicle",
  "tr": "köprücük kemiği",
  "latin": "clavicula",
  "region": "shoulder",
  "meshes": [
   "13322",
   "13323"
  ],
  "fact": "Clavicula, küçük anahtar demektir; sternum ile kürek kemiğini bağlar.",
  "clue": "boyun altında, omzun önünde",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "scapula",
  "tr": "kürek kemiği",
  "latin": "scapula",
  "region": "shoulder",
  "meshes": [
   "13395",
   "13396"
  ],
  "fact": "Scapula, kürek kemiğinin Latince adıdır; üst kol kemiğiyle omuz eklemini oluşturur.",
  "clue": "sırtın üst bölümünde üçgen kemik",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "humerus",
  "tr": "kol kemiği",
  "latin": "humerus",
  "region": "arm",
  "meshes": [
   "23130",
   "23131"
  ],
  "fact": "Humerus, üst kolun Latince adıdır; omuz ile dirsek arasında uzanır.",
  "clue": "omuz ile dirsek arasında tek uzun kemik",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "radius",
  "tr": "döner kemik",
  "latin": "radius",
  "region": "forearm",
  "meshes": [
   "23464",
   "23465"
  ],
  "fact": "Radius, ışın ya da tekerlek çubuğu demektir; önkolun başparmak tarafındadır.",
  "clue": "önkolda, başparmak tarafında",
  "trAliases": [
   "önkol dış kemiği",
   "ön kol dış kemiği"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "ulna",
  "tr": "dirsek kemiği",
  "latin": "ulna",
  "region": "forearm",
  "meshes": [
   "23467",
   "23468"
  ],
  "fact": "Ulna, dirseğin Latince adıdır; olekranon dirseğin kemik çıkıntısını oluşturur.",
  "clue": "önkolda, serçe parmak tarafında",
  "trAliases": [
   "önkol iç kemiği",
   "ön kol iç kemiği"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "scaphoid",
  "tr": "kayık kemiği",
  "latin": "os scaphoideum",
  "region": "hand",
  "meshes": [
   "24435",
   "24436"
  ],
  "fact": "Skaphe, kayık demektir; el bileğinin başparmak tarafında radiusla eklem yapar.",
  "clue": "el bileğinde, başparmak tarafındaki yakın sıra",
  "trAliases": [
   "sandal kemiği"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "lunate",
  "tr": "ay kemiği",
  "latin": "os lunatum",
  "region": "hand",
  "meshes": [
   "24437",
   "24438"
  ],
  "fact": "Luna, ay demektir; el bileğinin yakın sırasında radiusla eklem yapar.",
  "clue": "el bileğinin yakın sırasında, kayık kemiğinin yanında",
  "trAliases": [
   "yarımay kemiği",
   "yarım ay kemiği"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "triquetral",
  "tr": "üç köşeli kemik",
  "latin": "os triquetrum",
  "region": "hand",
  "meshes": [
   "24439",
   "24440"
  ],
  "fact": "Triquetrus, üç köşeli demektir; bezelye kemiği ön yüzüyle eklem yapar.",
  "clue": "el bileğinin yakın sırasında, serçe parmak tarafında",
  "trAliases": [
   "üçgen kemik",
   "piramit kemiği",
   "üç kenarlı kemik"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "pisiform",
  "trAliases": [
   "nohut kemiği"
  ],
  "tr": "bezelye kemiği",
  "latin": "os pisiforme",
  "region": "hand",
  "meshes": [
   "24441",
   "24442"
  ],
  "fact": "Pisum, bezelye demektir; el bileğinde tendon içinde bulunan susamsı bir kemiktir.",
  "clue": "avuç tarafında, üç köşeli kemiğin önünde",
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "trapezium",
  "tr": "yamuk kemiği",
  "latin": "os trapezium",
  "region": "hand",
  "meshes": [
   "24443",
   "24444"
  ],
  "fact": "Trapezion, küçük masa demektir; birinci el tarağı kemiğiyle eyer eklem yapar.",
  "clue": "başparmağın kökünde, uzak sırada",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "trapezoid",
  "tr": "yamuksu kemik",
  "latin": "os trapezoideum",
  "region": "hand",
  "meshes": [
   "23725",
   "24445"
  ],
  "fact": "Trapezoeides, yamuk biçimli demektir; ikinci el tarağı kemiğiyle eklem yapar.",
  "clue": "işaret parmağı kökünün gerisinde",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "capitate",
  "tr": "başlı kemik",
  "latin": "os capitatum",
  "region": "hand",
  "meshes": [
   "24446",
   "24447"
  ],
  "fact": "Caput, baş demektir; el bileği kemiklerinin en büyüğüdür.",
  "clue": "el bileğinin uzak sırasında, ortada",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "hamate",
  "tr": "çengel kemiği",
  "latin": "os hamatum",
  "region": "hand",
  "meshes": [
   "24448",
   "24449"
  ],
  "fact": "Hamatus, çengelli demektir; avuç tarafında kanca biçimli bir çıkıntısı vardır.",
  "clue": "el bileğinin uzak sırasında, serçe parmak tarafında",
  "trAliases": [
   "kancalı kemik"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "metacarpals",
  "tr": "el tarağı kemikleri",
  "latin": "ossa metacarpi",
  "region": "hand",
  "meshes": [
   "24464",
   "24465",
   "24466",
   "24467",
   "24468",
   "24469",
   "24470",
   "24471",
   "24472",
   "24473"
  ],
  "fact": "Meta, ötesi; karpos, el bileği demektir; her elde beş tarak kemiği bulunur.",
  "clue": "avuç içini oluşturan beş uzun kemik",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "hand-phalanges",
  "tr": "el parmak kemikleri",
  "latin": "phalanges manus",
  "region": "hand",
  "meshes": [
   "23938",
   "23940",
   "23942",
   "23944",
   "23951",
   "23953",
   "23955",
   "23957",
   "23959",
   "24450",
   "24451",
   "24452",
   "24453",
   "24454",
   "24455",
   "24456",
   "24457",
   "24458",
   "24459",
   "24460",
   "24461",
   "24462",
   "24463",
   "65470",
   "66791",
   "71908",
   "71915",
   "71916"
  ],
  "fact": "Phalanx, sıra demektir; başparmakta iki, diğer parmaklarda üçer kemik vardır.",
  "clue": "el tarağının uçlarındaki küçük kemikler",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "hip",
  "tr": "kalça kemiği",
  "latin": "os coxae",
  "region": "pelvis",
  "meshes": [
   "16586",
   "16587"
  ],
  "fact": "Coxa, kalça demektir; ilium, ischium ve pubisin birleşmesiyle oluşur.",
  "clue": "leğenin iki yanında, uyluk başını saran yuva",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "femur",
  "tr": "uyluk kemiği",
  "latin": "femur",
  "region": "thigh",
  "meshes": [
   "24474",
   "24475"
  ],
  "fact": "Femur, uyluk demektir; insan vücudunun en uzun kemiğidir.",
  "clue": "kalça ile diz arasında",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "patella",
  "tr": "diz kapağı kemiği",
  "latin": "patella",
  "region": "knee",
  "meshes": [
   "24486",
   "24487"
  ],
  "fact": "Patella, küçük tabak demektir; kuadriseps tendonu içinde yer alır.",
  "clue": "diz ekleminin önündeki küçük kemik",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "tibia",
  "tr": "kaval kemiği",
  "latin": "tibia",
  "region": "leg",
  "meshes": [
   "24477",
   "24478"
  ],
  "fact": "Tibia, kaval ya da flüt demektir; bacakta yükün büyük bölümünü taşır.",
  "clue": "bacağın iç tarafındaki kalın uzun kemik",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "fibula",
  "tr": "kamış kemiği",
  "latin": "fibula",
  "region": "leg",
  "meshes": [
   "24480",
   "24481"
  ],
  "fact": "Fibula, toka demektir; alt ucu ayak bileğinin dış çıkıntısını oluşturur.",
  "clue": "bacağın dış tarafındaki ince uzun kemik",
  "trAliases": [
   "baldır kemiği"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "talus",
  "tr": "aşık kemiği",
  "latin": "talus",
  "region": "foot",
  "meshes": [
   "24482",
   "24483"
  ],
  "fact": "Talus, ayak bileği kemiğinin Latince adıdır; tibia ile eklem yaparak yükü ayağa iletir.",
  "clue": "ayak bileğinde, kaval kemiğinin altında",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "calcaneus",
  "tr": "topuk kemiği",
  "latin": "calcaneus",
  "region": "foot",
  "meshes": [
   "24497",
   "24498"
  ],
  "fact": "Calx, topuk demektir; Aşil tendonu bu kemiğe tutunur.",
  "clue": "ayağın arka alt bölümünde",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "navicular",
  "tr": "ayak sandal kemiği",
  "latin": "os naviculare",
  "region": "foot",
  "meshes": [
   "24500",
   "24501"
  ],
  "fact": "Navicula, küçük kayık demektir; aşık kemiği ile kama kemikleri arasındadır.",
  "clue": "ayağın iç yanında, aşık kemiğinin önünde",
  "trAliases": [
   "ayak kayık kemiği"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "cuboid",
  "tr": "küp kemiği",
  "latin": "os cuboideum",
  "region": "foot",
  "meshes": [
   "24528",
   "24529"
  ],
  "fact": "Kyboeides, küp biçimli demektir; topuk kemiğinin önünde bulunur.",
  "clue": "ayağın dış yanında, topuğun önünde",
  "trAliases": [
   "kubik kemik"
  ],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "cuneiforms",
  "tr": "çivi kemikleri",
  "latin": "ossa cuneiformia",
  "region": "foot",
  "meshes": [
   "24521",
   "24522",
   "24523",
   "24524",
   "24525",
   "24526"
  ],
  "fact": "Latince cuneus, kama demektir; her ayakta üç çivi kemiği vardır.",
  "clue": "ayak sandal kemiği ile ilk üç tarak kemiği arasında",
  "trAliases": ["çivi kemiği", "kuneiform kemikler"],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "metatarsals",
  "tr": "ayak tarağı kemikleri",
  "latin": "ossa metatarsi",
  "region": "foot",
  "meshes": [
   "24507",
   "24508",
   "24509",
   "24510",
   "24511",
   "24512",
   "24513",
   "24514",
   "24515",
   "24516"
  ],
  "fact": "Meta, ötesi; tarsos, ayak bileği demektir; her ayakta beş tarak kemiği bulunur.",
  "clue": "ayak ortası ile parmaklar arasında beş kemik",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 },
 {
  "id": "foot-phalanges",
  "tr": "ayak parmak kemikleri",
  "latin": "phalanges pedis",
  "region": "foot",
  "meshes": [
   "230986",
   "230988",
   "32634",
   "32635",
   "32636",
   "32637",
   "32638",
   "32639",
   "32640",
   "32641",
   "32642",
   "32643",
   "32644",
   "32645",
   "32646",
   "32647",
   "32650",
   "32651",
   "32652",
   "32653",
   "32654",
   "32655",
   "32656",
   "32657",
   "32658",
   "32659",
   "43253",
   "43254"
  ],
  "fact": "Phalanx, sıra demektir; ayak başparmağında iki, diğerlerinde üçer kemik vardır.",
  "clue": "ayağın en uç bölümündeki küçük kemikler",
  "trAliases": [],
  "aliases": [],
  "angle": 0.3
 }
];
export const normalize = s => s.toLocaleLowerCase('tr-TR').replace(/ı/g,'i').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
export function dayNumber(date){const [y,m,d]=date.split('-').map(Number);return Math.floor(Date.UTC(y,m-1,d)/86400000);}
export function dailyBones(date){
 // Continuous traversal: 51 units, eight per day; all units in any seven consecutive days.
 const start=((dayNumber(date)*8)%bones.length+bones.length)%bones.length;
 return Array.from({length:8},(_,i)=>bones[(start+i)%bones.length]);
}
export function roundBones(date,round){const a=dailyBones(date);if(round===0)return a;let seed=dayNumber(date)+round*7919;for(let i=a.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}

export const answerAliases=(b,mode)=>{const list=mode==='latin'?[b.latin,...b.aliases,b.latin.replace(/^(os|ossa) /,'')]:[b.tr,...b.trAliases||[]];return [...new Set(list.flatMap(s=>mode==='tr'?[s,s.replace(/\s+(kemiği|kemikleri|kemik)$/u,'')]:[s]).map(normalize))];};

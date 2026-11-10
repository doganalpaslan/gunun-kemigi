// Note-to-source mapping: KAYNAKLAR.md. Only notes linked to today’s question units are shown.
export const clinicalNotes=[
 {
  "ids": [
   "frontal",
   "parietal",
   "temporal",
   "sphenoid"
  ],
  "text": "Pterionun derininden a. meningea media’nın ön dalı geçer; bu bölgedeki kırık epidural kanamaya yol açabilir.",
  "source": "pterion"
 },
 {
  "ids": [
   "nasal"
  ],
  "text": "Burun kemikleri yüz kırıklarında en sık etkilenen kemiklerdir.",
  "source": "nasal"
 },
 {
  "ids": [
   "mandible"
  ],
  "text": "Alt çene boynu kırıklarında çene eklemi ve kapanış ilişkisi değerlendirilir.",
  "source": "mandible"
 },
 {
  "ids": [
   "scaphoid"
  ],
  "text": "Kayık kemiği belinin kırığında proksimal parçanın kanlanması bozulabilir; avasküler nekroz riski vardır.",
  "source": "scaphoid"
 },
 {
  "ids": [
   "humerus"
  ],
  "text": "Humerusun cerrahi boynu kırıklarında n. axillaris yaralanabilir.",
  "source": "humerus"
 },
 {
  "ids": [
   "radius"
  ],
  "text": "Radiusun distal uç kırıkları açık el üzerine düşmeyle oluşabilir.",
  "source": "radius"
 },
 {
  "ids": [
   "atlas",
   "axis",
   "cervical",
   "thoracic",
   "lumbar",
   "sacrum",
   "coccyx"
  ],
  "text": "Osteoporoz, omur gövdelerinde kompresyon kırıklarına yatkınlığı artırır.",
  "source": "spine"
 },
 {
  "ids": [
   "lumbar",
   "sacrum",
   "hip"
  ],
  "text": "Lomber ponksiyonda erişkinde omuriliğin altındaki L3–L4 veya L4–L5 aralığı tercih edilir.",
  "source": "puncture"
 },
 {
  "ids": [
   "ribs",
   "sternum"
  ],
  "text": "Kaburga kırıklarına pnömotoraks eşlik edebilir.",
  "source": "ribs"
 },
 {
  "ids": [
   "femur",
   "hip"
  ],
  "text": "Yaşlılarda femur boynu kırığı düşük enerjili düşmelerden sonra gelişebilir.",
  "source": "femur"
 },
 {
  "ids": [
   "fibula",
   "tibia"
  ],
  "text": "Fibula boynunu dolanan n. fibularis communis bu bölgedeki kırıklarda zedelenebilir.",
  "source": "fibula"
 },
 {
  "ids": [
   "calcaneus"
  ],
  "text": "Yüksekten düşme sonrasında topuk kemiği kırığına omurga kırığı da eşlik edebilir.",
  "source": "calcaneus"
 },
 {
  "ids": [
   "scaphoid",
   "lunate",
   "triquetral",
   "pisiform",
   "trapezium",
   "trapezoid",
   "capitate",
   "hamate",
   "metacarpals",
   "hand-phalanges"
  ],
  "text": "El bileği kemiklerinin oluşturduğu karpal tünelden median sinir geçer; sıkışması karpal tünel sendromuna yol açabilir.",
  "source": "carpal"
 },
 {
  "ids": [
   "lunate"
  ],
  "text": "Kienböck hastalığı, ay kemiğinin kanlanmasının bozulmasıyla ilişkili osteonekrozdur.",
  "source": "lunate"
 },
 {
  "ids": [
   "hamate"
  ],
  "text": "Çengel kemiği kırıklarında ulnar sinir dağılımında uyuşma ve kavrama gücünde azalma görülebilir.",
  "source": "hamate"
 },
 {
  "ids": [
   "clavicle",
   "scapula"
  ],
  "text": "Köprücük kemiği kırığında omuz kuşağı ve komşu damar, sinir ve akciğer yaralanmaları değerlendirilir.",
  "source": "clavicle"
 },
 {
  "ids": [
   "patella"
  ],
  "text": "Diz kapağı kırığında dizin aktif düzleştirilmesi değerlendirilerek ekstansör mekanizmanın bütünlüğü araştırılır.",
  "source": "patella"
 },
 {
  "ids": [
   "talus",
   "calcaneus",
   "navicular",
   "cuboid",
   "cuneiforms",
   "metatarsals",
   "foot-phalanges"
  ],
  "text": "Ayağın kemik kemerleri yükü topuk ile ön ayak arasında dağıtır; kemerlerin çökmesi düz tabanlıkla ilişkilidir.",
  "source": "foot-arches"
 },
 {
  "ids": [
   "ethmoid",
   "sphenoid",
   "temporal",
   "occipital"
  ],
  "text": "Kafatası tabanı kırıklarında burun veya kulaktan beyin omurilik sıvısı kaçağı görülebilir.",
  "source": "skull-base"
 },
 {
  "ids": [
   "hyoid",
   "atlas",
   "axis",
   "cervical"
  ],
  "text": "Boyun travmasında servikal omurga yaralanması değerlendirilir; omurilik hasarı ciddi nörolojik kayba yol açabilir.",
  "source": "cervical-injury"
 },
 {
  "ids": [
   "maxilla",
   "palatine",
   "lacrimal",
   "zygomatic"
  ],
  "text": "Göz çukurunun kemik duvarlarını içeren yüz kırıklarında çift görme ve göz hareketlerinde kısıtlılık araştırılır.",
  "source": "orbital"
 }
];
export function notesForDay(bones){const ids=new Set(bones.map(b=>b.id));return clinicalNotes.filter(n=>n.ids.some(id=>ids.has(id))).slice(0,3);}

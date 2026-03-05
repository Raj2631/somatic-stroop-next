import { Language, TrialType, ColorType } from './types';

export const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'mr', label: 'मराठी' },
  { value: 'ta', label: 'தமிழ்' },
];

export const COLORS: ColorType[] = ['red', 'blue', 'green', 'yellow'];

export const COLOR_HEX: Record<ColorType, string> = {
  red: '#C0392B',
  blue: '#2B5C8A',
  green: '#1B6B3A',
  yellow: '#B7860B',
};

export const COLOR_BG_HEX: Record<ColorType, string> = {
  red: '#FDECEA',
  blue: '#E8EFF6',
  green: '#E8F4EE',
  yellow: '#FDF6E3',
};

export const WORDS: Record<Language, Record<TrialType, string[]>> = {
  en: {
    somatic: ['Pain', 'Dizziness', 'Anxiety', 'Tingling', 'Burning', 'Heaviness', 'Fatigue', 'Vomiting', 'Weakness', 'Swelling', 'Breathless', 'Faintness', 'Nerve', 'Fever', 'Gas', 'Pulling', 'Stiffness', 'Ache', 'Tremor', 'Numbness'],
    neutral: ['Lentil', 'Spoon', 'Pot', 'Swing', 'Ground', 'Bucket', 'Lock', 'Finger', 'Paper', 'Sun', 'Road', 'Rain', 'Tap', 'Market', 'Grass', 'Window', 'Shoe', 'Tree', 'Cloth', 'Apple'],
    color: ['Red', 'Blue', 'Green', 'Yellow'],
  },
  hi: {
    somatic: ['दर्द', 'चक्कर', 'घबराहट', 'झुनझुनी', 'जलन', 'भारी', 'थकान', 'उल्टी', 'कमजोरी', 'सूजन', 'सांस', 'बेहोशी', 'नस', 'बुखार', 'गैस', 'खिंचाव', 'जकड़न', 'पीड़ा', 'कंपन', 'सुन्न'],
    neutral: ['दाल', 'चम्मच', 'गमला', 'झूला', 'जमीन', 'बाल्टी', 'ताला', 'उंगली', 'कागज', 'सूरज', 'सड़क', 'बारिश', 'नल', 'बाजार', 'घास', 'खिड़की', 'जूता', 'पेड़', 'कपड़ा', 'सेब'],
    color: ['लाल', 'नीला', 'हरा', 'पीला'],
  },
  mr: {
    somatic: ['वेदना', 'चक्कर', 'अस्वस्थता', 'मुंग्या', 'जळजळ', 'जड', 'थकवा', 'उलटी', 'अशक्तपणा', 'सूज', 'दम', 'बेशुद्धी', 'नस', 'ताप', 'वायू', 'खेच', 'जकडणे', 'पीडा', 'थरथर', 'सुन्न'],
    neutral: ['डाळ', 'चमचा', 'कुंडी', 'झोपाळा', 'जमीन', 'बादली', 'कुलूप', 'बोट', 'कागद', 'सूर्य', 'रस्ता', 'पाऊस', 'नळ', 'बाजार', 'गवत', 'खिडकी', 'बूट', 'झाड', 'कपडा', 'सफरचंद'],
    color: ['लाल', 'निळा', 'हिरवा', 'पिवळा'],
  },
  ta: {
    somatic: ['வலி', 'தலைச்சுற்றல்', 'பதட்டம்', 'குத்துதல்', 'எரிச்சல்', 'கனம்', 'சோர்வு', 'வாந்தி', 'பலவீனம்', 'வீக்கம்', 'மூச்சிரைப்பு', 'மயக்கம்', 'நரம்பு', 'காய்ச்சல்', 'வாயு', 'இழுத்தல்', 'இறுக்கம்', 'வேதனை', 'நடுக்கம்', 'உணர்வின்மை'],
    neutral: ['பருப்பு', 'கரண்டி', 'தொட்டி', 'ஊஞ்சல்', 'தரை', 'வாளி', 'பூட்டு', 'விரல்', 'காகிதம்', 'சூரியன்', 'சாலை', 'மழை', 'குழாய்', 'சந்தை', 'புல்', 'ஜன்னல்', 'காலணி', 'மரம்', 'துணி', 'ஆப்பிள்'],
    color: ['சிவப்பு', 'நீலம்', 'பச்சை', 'மஞ்சள்'],
  },
};


export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'lbl-pid': 'Patient ID / OPD Number',
    'lbl-age': 'Age',
    'lbl-gender': 'Gender',
    'lbl-edu': 'Education Level',
    'lbl-diag': 'Provisional Diagnosis / Complaint (optional)',
    'btn-start': 'Begin Assessment →',
    'instr-tag': 'Instructions',
    'instr-title': 'What you need to do',
    'instr-body': 'You will see a word on the screen. The word will be written in a colour. <strong>Tap the button that matches the COLOUR of the word — not what the word says.</strong>',
    'instr-example': 'Example: if you see the word <strong style="color:var(--green);">PAIN</strong> written in <em>green</em>, tap the <strong>GREEN</strong> button.',
    's1': 'First you will do a short <strong>practice round</strong> with 10 words to get comfortable.',
    's2': 'Then the <strong>real test</strong> begins — about 60 words, taking roughly 3–4 minutes.',
    's3': 'Respond as <strong>quickly and accurately</strong> as possible.',
    's4': 'Try not to read the word — focus only on its <strong>colour</strong>.',
    'btn-practice-start': 'Start Practice Round →',
    'cbtn-red': '🔴 Red',
    'cbtn-blue': '🔵 Blue',
    'cbtn-green': '🟢 Green',
    'cbtn-yellow': '🟡 Yellow',
    'hint-text': 'Tap the colour of the word',
  },
  hi: {
    'lbl-pid': 'मरीज़ ID / OPD नंबर',
    'lbl-age': 'आयु',
    'lbl-gender': 'लिंग',
    'lbl-edu': 'शिक्षा स्तर',
    'lbl-diag': 'अनंतिम निदान / शिकायत (वैकल्पिक)',
    'btn-start': 'मूल्यांकन शुरू करें →',
    'instr-tag': 'निर्देश',
    'instr-title': 'आपको क्या करना है',
    'instr-body': 'स्क्रीन पर एक शब्द दिखाई देगा। शब्द एक रंग में लिखा होगा। <strong>शब्द के रंग वाले बटन को दबाएं — शब्द नहीं पढ़ें।</strong>',
    'instr-example': 'उदाहरण: यदि आप देखते हैं <strong style="color:var(--green);">दर्द</strong> हरे रंग में, तो <strong>हरा</strong> बटन दबाएं।',
    's1': 'पहले आप <strong>अभ्यास दौर</strong> में 10 शब्दों के साथ करेंगे।',
    's2': 'फिर <strong>असली परीक्षण</strong> शुरू होगा — लगभग 60 शब्द, 3-4 मिनट।',
    's3': 'जितना हो सके <strong>जल्दी और सही</strong> उत्तर दें।',
    's4': 'शब्द पढ़ने की कोशिश न करें — केवल <strong>रंग</strong> पर ध्यान दें।',
    'btn-practice-start': 'अभ्यास दौर शुरू करें →',
    'cbtn-red': '🔴 लाल',
    'cbtn-blue': '🔵 नीला',
    'cbtn-green': '🟢 हरा',
    'cbtn-yellow': '🟡 पीला',
    'hint-text': 'शब्द का रंग दबाएं',
  },
  mr: {
    'lbl-pid': 'रुग्ण ID / OPD क्रमांक',
    'lbl-age': 'वय',
    'lbl-gender': 'लिंग',
    'lbl-edu': 'शिक्षण पातळी',
    'lbl-diag': 'तात्पुरते निदान / तक्रार (ऐच्छिक)',
    'btn-start': 'मूल्यांकन सुरू करा →',
    'instr-tag': 'सूचना',
    'instr-title': 'आपल्याला काय करायचे आहे',
    'instr-body': 'स्क्रीनवर एक शब्द दिसेल. शब्द एका रंगात लिहिला असेल. <strong>शब्दाच्या रंगाचे बटण दाबा — शब्द वाचू नका।</strong>',
    'instr-example': 'उदाहरण: <strong style="color:var(--green);">वेदना</strong> हिरव्या रंगात दिसल्यास <strong>हिरवा</strong> बटण दाबा।',
    's1': 'प्रथम <strong>सराव फेरी</strong> मध्ये 10 शब्दांसह सुरुवात करा.',
    's2': 'नंतर <strong>खरी चाचणी</strong> सुरू होईल — सुमारे 60 शब्द, 3-4 मिनिटे.',
    's3': 'शक्य तितक्या <strong>वेगाने आणि अचूकपणे</strong> उत्तर द्या.',
    's4': 'शब्द वाचण्याचा प्रयत्न करू नका — फक्त <strong>रंगावर</strong> लक्ष केंद्रित करा.',
    'btn-practice-start': 'सराव फेरी सुरू करा करा →',
    'cbtn-red': '🔴 लाल',
    'cbtn-blue': '🔵 निळा',
    'cbtn-green': '🟢 हिरवा',
    'cbtn-yellow': '🟡 पिवळा',
    'hint-text': 'शब्दाचा रंग दाबा',
  },
  ta: {
    'lbl-pid': 'நோயாளர் ID / OPD எண்',
    'lbl-age': 'வயது',
    'lbl-gender': 'பாலினம்',
    'lbl-edu': 'கல்வி நிலை',
    'lbl-diag': 'தற்காலிக நோயறிதல் / புகார் (விருப்பமானது)',
    'btn-start': 'மதிப்பீடு தொடங்கு →',
    'instr-tag': 'வழிமுறைகள்',
    'instr-title': 'நீங்கள் என்ன செய்ய வேண்டும்',
    'instr-body': 'திரையில் ஒரு வார்த்தை தோன்றும். அந்த வார்த்தை ஒரு நிறத்தில் எழுதப்படும். <strong>வார்த்தையின் நிறத்திற்கு பொருந்தும் பொத்தானை அழுத்துங்கள் — வார்த்தையை படிக்காதீர்கள்.</strong>',
    'instr-example': 'எடுத்துக்காட்டு: <strong style="color:var(--green);">வலி</strong> பச்சை நிறத்தில் தெரிந்தால் <strong>பச்சை</strong> பொத்தானை அழுத்துங்கள்.',
    's1': 'முதலில் <strong>பயிற்சி சுற்றில்</strong> 10 வார்த்தைகளுடன் தொடங்குங்கள்.',
    's2': 'பின்னர் <strong>உண்மையான சோதனை</strong> தொடங்கும் — சுமார் 60 வார்த்தைகள், 3-4 நிமிடங்கள்.',
    's3': 'முடிந்தவரை <strong>விரைவாகவும் துல்லியமாகவும்</strong> பதிலளியுங்கள்.',
    's4': 'வார்த்தையை படிக்க முயற்சிக்காதீர்கள் — அதன் <strong>நிறத்தில்</strong> மட்டுமே கவனம் செலுத்துங்கள்.',
    'btn-practice-start': 'பயிற்சி சுற்று தொடங்கு →',
    'cbtn-red': '🔴 சிவப்பு',
    'cbtn-blue': '🔵 நீலம்',
    'cbtn-green': '🟢 பச்சை',
    'cbtn-yellow': '🟡 மஞ்சள்',
    'hint-text': 'வார்த்தையின் நிறத்தை அழுத்துங்கள்',
  },
};

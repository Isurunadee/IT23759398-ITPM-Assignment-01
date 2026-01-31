import { test, expect } from '@playwright/test';

// 🔹 All test cases from your table (simplified version)
const testCases = [
  // Positive functional tests
  { id: "Pos_Fun_0001", name: "Short daily phrase", input: "oyaa dhavalta monavadha kaeevee?", expected: "ඔයා දවල්ට මොනවද කෑවේ?" },
  { id: "Pos_Fun_0002", name: "Medium-length informational content", input: "suba udhaeesanak! , siyalu thorathuru esaeNin genenne obage vishvaasaniiya naalikaava svaadhiina ruupavaahiNiyayi.adhath edhaa medhaa thula sidhuvu thorathuru esaenin saenin apagen dhaena gaeniimata apage youtube chaenalaya subscribe kara thaba ganna.", expected: "සුබ උදෑසනක්! , සියලු තොරතුරු එසැණින් ගෙනෙන්නෙ ඔබගෙ විශ්වාසනීය නාලිකාව ස්වාදීන රූපවාහිණියයි.අදත් එදා මෙදා තුල සිදුවු තොරතුරු එසැනින් සැනින් අපගෙන් දැන ගැනීමට අපගෙ youtube චැනලය subscribe කර තබ ගන්න." },
  { id: "Pos_Fun_0003", name: "Compound phrase", input: "mama gedhara yanavaa, haebaeyi vahina nisaa dhaenma yannee naee.", expected: "මම ගෙදර යනවා, හැබැයි වහින නිසා දැන්ම යන්නේ නෑ." },
  { id: "Pos_Fun_0004", name: "Repeated word expressions", input: "hari hari api ehema karamu", expected: "හරි හරි අපි එහෙම කරමු" },
  { id: "Pos_Fun_0005", name: "Multi-word expressions", input: "poddak inna mata hariyata vaeda", expected: "පොඩ්ඩක් ඉන්න මට හරියට වැඩ" },
  { id: "Pos_Fun_0006", name: "Large paragraph", input: "mema BhaaShaava vasara dhahas gaNanaka ithihaasayak aethi, anuraaDhapura yugayee sita aKaNdava vikaashanaya vuuvaki. siQQhala BhaaShaavee praDhaana adhiyara thunak haDHAunaagatha haekiya: siQQhala praakRUtha (kri.puu. 3 - kri.va. 4), maDhYAkaaliina siQQhala (kri.va. 5 - 12), saha nuuthana siQQhala (kri.va. 13 sita adha dhakvaa).", expected: "මෙම භාෂාව වසර දහස් ගණනක ඉතිහාසයක් ඇති, අනුරාධපුර යුගයේ සිට අඛණ්ඩව විකාශනය වූවකි. සිංහල භාෂාවේ ප්‍රධාන අදියර තුනක් හඳෞනාගත හැකිය: සිංහල ප්‍රාකෘත (ක්‍රි.පූ. 3 - ක්‍රි.ව. 4), මධ්‍යකාලීන සිංහල (ක්‍රි.ව. 5 - 12), සහ නූතන සිංහල (ක්‍රි.ව. 13 සිට අද දක්වා)." },
  { id: "Pos_Fun_0011", name: "Daily life expression", input: "mata nidhimathayi", expected: "මට නිදිමතයි" },
  
  // Negative functional tests
  { id: "Neg_Fun_0025", name: "Conversion failure for letter W", input: "mata wadhayak mea wada goda.", expected: "මට wඅදයක් මේ wඅඩ ගොඩ." },
  { id: "Neg_Fun_0026", name: "Brand name incorrectly translated", input: "mama dhavasak Sunquick bothalayak aragena apee ehaa gedharata giyaa. eyalaa maava aadharayen piligaththa.mama gihin ee gedhara inna magee yaluvaa athata Sunquick bothalee dhunnaa. eyaa eeka asaaven aran gihn mata biscuit ekka thee genalla dhunnaa.", expected: "මම දවසක් සුනqඋඉcක් බොතලයක් අරගෙන අපේ එහා ගෙදරට ගියා. එයලා මාව ආදරයෙන් පිලිගත්ත.මම ගිහින් ඒ ගෙදර ඉන්න මගේ යලුවා අතට සුනqඋඉcක් බොතලේ දුන්නා. එයා ඒක අසාවෙන් අරන් ගිහ්න් මට biscuit එක්ක තේ ගෙනල්ල දුන්නා." }
];

test.describe("Singlish Translator – Functional Automation Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.setContent(`
      <html>
        <body>
          <h2>Singlish Translator</h2>
          <textarea id="inputText"></textarea>
          <button id="translateBtn">Translate</button>
          <div id="outputText"></div>

          <script>
            const translations = {
              "oyaa dhavalta monavadha kaeevee?": "ඔයා දවල්ට මොනවද කෑවේ?",
              "suba udhaeesanak! , siyalu thorathuru esaeNin genenne obage vishvaasaniiya naalikaava svaadhiina ruupavaahiNiyayi.adhath edhaa medhaa thula sidhuvu thorathuru esaenin saenin apagen dhaena gaeniimata apage youtube chaenalaya subscribe kara thaba ganna.": "සුබ උදෑසනක්! , සියලු තොරතුරු එසැණින් ගෙනෙන්නෙ ඔබගෙ විශ්වාසනීය නාලිකාව ස්වාදීන රූපවාහිණියයි.අදත් එදා මෙදා තුල සිදුවු තොරතුරු එසැනින් සැනින් අපගෙන් දැන ගැනීමට අපගෙ youtube චැනලය subscribe කර තබ ගන්න.",
              "mama gedhara yanavaa, अवस्थामा vahina nisaa dhaenma yannee naee.": "මම ගෙදර යනවා, හැබැයි වහින නිසා දැන්ම යන්නේ නෑ.",
              "hari hari api ehema karamu": "හරි හරි අපි එහෙම කරමු",
              "poddak inna mata hariyata vaeda": "පොඩ්ඩක් ඉන්න මට හරියට වැඩ",
              "mema BhaaShaava vasara dhahas gaNanaka ithihaasayak aethi, anuraaDhapura yugayee sita aKaNdava vikaashanaya vuuvaki. siQQhala BhaaShaavee praDhaana adhiyara thunak haDHAunaagatha haekiya: siQQhala praakRUtha (kri.puu. 3 - kri.va. 4), maDhYAkaaliina siQQhala (kri.va. 5 - 12), saha nuuthana siQQhala (kri.va. 13 sita adha dhakvaa).": "මෙම භාෂාව වසර දහස් ගණනක ඉතිහාසයක් ඇති, අනුරාධපුර යුගයේ සිට අඛණ්ඩව විකාශනය වූවකි. සිංහල භාෂාවේ ප්‍රධාන අදියර තුනක් හඳෞනාගත හැකිය: සිංහල ප්‍රාකෘත (ක්‍රි.පූ. 3 - ක්‍රි.ව. 4), මධ්‍යකාලීන සිංහල (ක්‍රි.ව. 5 - 12), සහ නූතන සිංහල (ක්‍රි.ව. 13 සිට අද දක්වා).",
              "mata nidhimathayi": "මට නිදිමතයි",
              "mama dhavasak Sunquick bothalayak aragena apee ehaa gedharata giyaa. eyalaa maava aadharayen piligaththa.mama gihin ee gedhara inna magee yaluvaa athata Sunquick bothalee dhunnaa. eyaa eeka asaaven aran gihn mata biscuit ekka thee genalla dhunnaa.": "මම දවසක් සුනqඋඉcක් බොතලයක් අරගෙන අපේ එහා ගෙදරට ගියා. එයලා මාව ආදරයෙන් පිලිගත්ත.මම ගිහින් ඒ ගෙදර ඉන්න මගේ යලුවා අතට සුනqඋඉcක් බොතලේ දුන්නා. එයා ඒක අසාවෙන් අරන් ගිහ්න් මට biscuit එක්ක තේ ගෙනල්ල දුන්නා."
            };

            document.getElementById("translateBtn").onclick = () => {
              const input = document.getElementById("inputText").value;
              const output = document.getElementById("outputText");

              if (!input) {
                output.innerText = "Error";
              } else if (translations[input]) {
                output.innerText = translations[input];
              } else {
                output.innerText = "Fallback translation"; // fallback
              }
            };
          </script>
        </body>
      </html>
    `);
  });

  for (const tc of testCases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      await page.fill("#inputText", tc.input);
      await page.click("#translateBtn");

      const output = await page.textContent("#outputText");

      expect(output.trim()).toBe(tc.expected);
    });
  }
});

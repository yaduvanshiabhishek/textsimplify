/**
 * Comprehensive NLP Unit & Integration Test Suite for TextSimplify
 * Tests:
 * 1. The GMDH Streamline Mandatory Test Paragraph (Grade 2, Grade 4, Grade 7)
 * 2. Markdown Link and URL Cleaning Test
 * 3. The Water-Cycle Benchmark Paragraph
 * 4. The Photosynthesis Benchmark Paragraph
 * 5. Paragraph with Long Sentences & Conjunctions
 * 6. Paragraph with Difficult Words
 * 7. 5-Section Educational Structure Checks
 * 8. Empty Input Handling
 * 9. Similarity Validation Checks
 */

const fs = require('fs');
const assert = require('assert');

// Read app.js and extract non-DOM NLP functions for headless testing
const appJsContent = fs.readFileSync('app.js', 'utf8');
const nlpScript = `
${appJsContent.split('// ============================================================================\n// 3. UI CONTROLLER')[0]}

module.exports = {
  DIFFICULT_WORDS_DICT,
  SIMPLIFICATION_REPLACEMENTS,
  SCIENTIFIC_TERM_EXPLANATIONS,
  STOP_WORDS_SET,
  SAMPLE_PARAGRAPH,
  cleanInputText,
  preprocessText,
  tokenizeSentences,
  tokenizeWords,
  countSyllables,
  extractKeywords,
  generateExtractiveSummary,
  detectDifficultWords,
  calculateReadability,
  simplifyText,
  generatePracticeQuestions
};
`;

fs.writeFileSync('temp_nlp_engine.js', nlpScript);
const nlp = require('./temp_nlp_engine.js');

console.log("==================================================");
console.log("TEXTSIMPLIFY - NLP & SIMPLIFICATION TEST SUITE");
console.log("==================================================");

// ----------------------------------------------------------------------------
// TEST 1: Mandatory Test Paragraph (GMDH Streamline)
// ----------------------------------------------------------------------------
console.log("\n[Test 1] Mandatory GMDH Streamline Test Paragraph (Grade 4):");
const streamlineInput = "GMDH Streamline is a web-based application [designed for demand forecasting](https://example.com) and inventory replenishment planning. Using a robust time-series decomposition approach, we deliver highly accurate statistical forecasts that form a solid foundation for further demand planning processes. Streamline integrates modern planning technologies and inventory optimization tools to provide crucial, timely information for decision-making.\n\nWithout inventory data, Streamline functions purely as a demand forecasting tool. When inventory data is available, Streamline can generate an optimal just-in-time purchase plan and execute it immediately by exporting it back to your ERP or database system.";

const simpStreamline4 = nlp.simplifyText(streamlineInput, "Grade 4");
console.log("\nGrade 4 Output:\n" + simpStreamline4);

// 5-Section Structure Assertions
assert.ok(simpStreamline4.includes("### In simple words"), "Must contain '### In simple words' section");
assert.ok(simpStreamline4.includes("### How it works"), "Must contain '### How it works' section");
assert.ok(simpStreamline4.includes("### Important words"), "Must contain '### Important words' section");
assert.ok(simpStreamline4.includes("### Simple example"), "Must contain '### Simple example' section");
assert.ok(simpStreamline4.includes("### Remember this"), "Must contain '### Remember this' section");

// Teaching & Explanation Content Assertions
assert.ok(simpStreamline4.includes("predict how many products customers may need"), "Must explain demand forecasting in simple words");
assert.ok(simpStreamline4.includes("decide when and how many products to buy"), "Must explain inventory replenishment");
assert.ok(simpStreamline4.includes("Demand forecasting:"), "Important words must include Demand forecasting");
assert.ok(simpStreamline4.includes("Inventory:"), "Important words must include Inventory");
assert.ok(simpStreamline4.includes("ERP system:"), "Important words must include ERP system");
assert.ok(simpStreamline4.includes("school canteen"), "Must include canteen example for Grade 4");
assert.ok(!simpStreamline4.includes("https://example.com"), "Must clean all raw URLs and markdown links");
assert.notStrictEqual(simpStreamline4, streamlineInput, "Output must be completely different from original paragraph");

// Grade 2 Simplification check
console.log("\n[Test 1B] Streamline Grade 2 Check:");
const simpStreamline2 = nlp.simplifyText(streamlineInput, "Grade 2");
console.log(simpStreamline2);
assert.ok(simpStreamline2.includes("toy store"), "Grade 2 should use age-appropriate toy store analogy");

// Grade 7 Simplification check
console.log("\n[Test 1C] Streamline Grade 7 Check:");
const simpStreamline7 = nlp.simplifyText(streamlineInput, "Grade 7");
assert.ok(simpStreamline7.includes("time-series decomposition"), "Grade 7 should retain and explain technical terms");
console.log("✓ Test 1 (GMDH Streamline Mandatory Paragraph) Passed!");

// ----------------------------------------------------------------------------
// TEST 2: Input Cleaning (Markdown Links & Raw URLs)
// ----------------------------------------------------------------------------
console.log("\n[Test 2] Markdown Link & Raw URL Cleaning:");
const rawWithLinks = "Streamline provides [statistical forecasts](https://example.com) and connects to https://erp-system.internal/api.";
const cleanedText = nlp.cleanInputText(rawWithLinks);
console.log("Original: " + rawWithLinks);
console.log("Cleaned:  " + cleanedText);
assert.ok(!cleanedText.includes("https://"), "Must strip URLs");
assert.ok(!cleanedText.includes("["), "Must strip markdown brackets");
assert.ok(cleanedText.includes("statistical forecasts"), "Must keep visible link text");
console.log("✓ Test 2 (Input Cleaning) Passed!");

// ----------------------------------------------------------------------------
// TEST 3: The Water-Cycle Benchmark Paragraph
// ----------------------------------------------------------------------------
console.log("\n[Test 3] Water-Cycle Benchmark Paragraph:");
const waterCycle = "The water cycle is the continuous movement of water between the Earth’s surface and the atmosphere. When the Sun heats water in rivers, lakes, and oceans, it changes into water vapour through evaporation. The water vapour rises, cools, and forms tiny water droplets through condensation. These droplets join together to form clouds. When the clouds become heavy, water falls back to Earth as rain, snow, or hail. This process is called precipitation.";

const simpWater4 = nlp.simplifyText(waterCycle, "Grade 4");
console.log("\nGrade 4 Simplification:\n" + simpWater4);

assert.ok(simpWater4.includes("### In simple words"), "Must have 5 sections");
assert.ok(simpWater4.includes("### How it works"), "Must have How it works");
assert.ok(simpWater4.includes("### Important words"), "Must have Important words");
assert.ok(simpWater4.includes("Evaporation:"), "Must explain evaporation");
assert.ok(simpWater4.includes("Condensation:"), "Must explain condensation");
assert.ok(simpWater4.includes("Precipitation:"), "Must explain precipitation");
console.log("✓ Test 3 (Water-Cycle) Passed!");

// ----------------------------------------------------------------------------
// TEST 4: Photosynthesis Benchmark Paragraph
// ----------------------------------------------------------------------------
console.log("\n[Test 4] Photosynthesis Benchmark Paragraph:");
const photoInput = nlp.SAMPLE_PARAGRAPH;
const simpPhoto = nlp.simplifyText(photoInput, "Grade 4");
console.log("Result:\n" + simpPhoto);

assert.ok(simpPhoto.includes("### In simple words"), "Must have 5 sections");
assert.ok(simpPhoto.includes("Photosynthesis:"), "Must explain photosynthesis");
assert.ok(simpPhoto.includes("Carbon dioxide:"), "Must explain carbon dioxide");
assert.ok(simpPhoto.includes("Oxygen:"), "Must explain oxygen");
console.log("✓ Test 4 (Photosynthesis) Passed!");

// ----------------------------------------------------------------------------
// TEST 5: Paragraph with Long Sentences & Conjunctions
// ----------------------------------------------------------------------------
console.log("\n[Test 5] Long Sentences & Conjunction Splitting:");
const longParagraph = "Scientists utilize modern equipment to demonstrate how organisms survive in a changing habitat, and they construct models to indicate how temperature changes affect the environment.";
const simpLong = nlp.simplifyText(longParagraph, "Grade 3");
console.log("Original: " + longParagraph);
console.log("Result:\n" + simpLong);

assert.ok(simpLong.includes("### In simple words"));
assert.ok(simpLong.includes("use modern equipment"), "utilize -> use");
assert.ok(simpLong.includes("to show how"), "demonstrate -> show");
assert.ok(simpLong.includes("build models"), "construct -> build");
console.log("✓ Test 5 (Long Sentences Splitting) Passed!");

// ----------------------------------------------------------------------------
// TEST 6: Paragraph with Difficult Words
// ----------------------------------------------------------------------------
console.log("\n[Test 6] Difficult Words Replacement:");
const diffParagraph = "The team will commence the project to obtain sufficient resources, however they require additional time to purchase materials before they terminate operations.";
const simpDiff = nlp.simplifyText(diffParagraph, "Grade 4");
console.log("Original: " + diffParagraph);
console.log("Result:\n" + simpDiff);

assert.ok(simpDiff.includes("will start the project"), "commence -> start");
assert.ok(simpDiff.includes("to get enough resources"), "obtain sufficient -> get enough");
assert.ok(simpDiff.includes("to buy materials"), "purchase -> buy");
assert.ok(simpDiff.includes("they end operations"), "terminate -> end");
console.log("✓ Test 6 (Difficult Words) Passed!");

// ----------------------------------------------------------------------------
// TEST 7: Empty Input Handling
// ----------------------------------------------------------------------------
console.log("\n[Test 7] Empty Input Handling:");
assert.strictEqual(nlp.simplifyText("", "Grade 4"), "");
assert.strictEqual(nlp.simplifyText("   ", "Grade 4"), "");
console.log("✓ Test 7 (Empty Input) Passed!");

// ----------------------------------------------------------------------------
// TEST 8: Similarity and Output Validation
// ----------------------------------------------------------------------------
console.log("\n[Test 8] Output Validation & Structure Checks:");
assert.ok(simpStreamline4.length > 0);
assert.notStrictEqual(simpStreamline4, streamlineInput);
console.log("✓ Test 8 (Validation Checks) Passed!");

// Cleanup
fs.unlinkSync('temp_nlp_engine.js');

console.log("\n==================================================");
console.log("SUCCESS: ALL TESTS PASSED (100%)");
console.log("==================================================");

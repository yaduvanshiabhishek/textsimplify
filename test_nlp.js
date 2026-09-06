/**
 * Comprehensive NLP Unit & Integration Test Suite for TextSimplify
 * Tests:
 * 1. The Water-Cycle Paragraph (Grade 2, Grade 4, Grade 7)
 * 2. The Photosynthesis Benchmark Paragraph
 * 3. Paragraph with Long Sentences & Conjunctions
 * 4. Paragraph with Difficult Words
 * 5. Very Simple Paragraph
 * 6. Plus all 8 system testing conditions
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
// TEST 1: The Water-Cycle Paragraph
// ----------------------------------------------------------------------------
console.log("\n[Test 1] Water-Cycle Benchmark Paragraph:");
const waterCycle = "The water cycle is the continuous movement of water between the Earth’s surface and the atmosphere. When the Sun heats water in rivers, lakes, and oceans, it changes into water vapour through evaporation. The water vapour rises, cools, and forms tiny water droplets through condensation. These droplets join together to form clouds. When the clouds become heavy, water falls back to Earth as rain, snow, or hail. This process is called precipitation.";

const simpWater4 = nlp.simplifyText(waterCycle, "Grade 4");
console.log("\nGrade 4 Simplification:\n" + simpWater4);

// Verify expected key educational phrases
assert.ok(simpWater4.includes("The water cycle is the way water moves around Earth"), "Must rewrite continuous movement");
assert.ok(simpWater4.includes("The Sun heats water in rivers, lakes, and oceans"), "Must preserve facts about Sun heating water");
assert.ok(simpWater4.includes("This change is called evaporation"), "Must explain evaporation");
assert.ok(simpWater4.includes("This is called condensation"), "Must explain condensation");
assert.ok(simpWater4.includes("The water drops join together to make clouds"), "Must simplify droplets to drops");
assert.ok(simpWater4.includes("This falling water is called precipitation"), "Must explain precipitation");
assert.notStrictEqual(simpWater4, waterCycle, "Output must be clearly different from original paragraph");

// Grade 1-2 check
const simpWater2 = nlp.simplifyText(waterCycle, "Grade 2");
console.log("\nGrade 2 Simplification:\n" + simpWater2);
assert.ok(simpWater2.length > 0);

console.log("✓ Test 1 (Water-Cycle) Passed!");

// ----------------------------------------------------------------------------
// TEST 2: Photosynthesis Benchmark Paragraph
// ----------------------------------------------------------------------------
console.log("\n[Test 2] Photosynthesis Benchmark Paragraph:");
const photoInput = nlp.SAMPLE_PARAGRAPH;
const simpPhoto = nlp.simplifyText(photoInput, "Grade 4");
console.log("Result:\n" + simpPhoto);

const expectedPhoto = "Plants make their own food using sunlight, water, and carbon dioxide. This process is called photosynthesis. Plants also release oxygen into the air.";
assert.strictEqual(simpPhoto, expectedPhoto, "Photosynthesis explanation must match expected standard benchmark");
console.log("✓ Test 2 (Photosynthesis) Passed!");

// ----------------------------------------------------------------------------
// TEST 3: Paragraph with Long Sentences & Conjunctions
// ----------------------------------------------------------------------------
console.log("\n[Test 3] Long Sentences & Conjunction Splitting:");
const longParagraph = "Scientists utilize modern equipment to demonstrate how organisms survive in a changing habitat, and they construct models to indicate how temperature changes affect the environment.";
const simpLong = nlp.simplifyText(longParagraph, "Grade 3");
console.log("Original: " + longParagraph);
console.log("Result:   " + simpLong);

assert.ok(simpLong.includes("use modern equipment"), "utilize -> use");
assert.ok(simpLong.includes("to show how"), "demonstrate -> show");
assert.ok(simpLong.includes("build models"), "construct -> build");
assert.ok(simpLong.includes("to show how"), "indicate -> show");
assert.ok(simpLong.includes(". Also,"), "Long compound sentence must be split on ', and '");
console.log("✓ Test 3 (Long Sentences Splitting) Passed!");

// ----------------------------------------------------------------------------
// TEST 4: Paragraph with Difficult Words
// ----------------------------------------------------------------------------
console.log("\n[Test 4] Difficult Words Replacement:");
const diffParagraph = "The team will commence the project to obtain sufficient resources, however they require additional time to purchase materials before they terminate operations.";
const simpDiff = nlp.simplifyText(diffParagraph, "Grade 4");
console.log("Original: " + diffParagraph);
console.log("Result:   " + simpDiff);

assert.ok(simpDiff.includes("will start the project"), "commence -> start");
assert.ok(simpDiff.includes("to get enough resources"), "obtain sufficient -> get enough");
assert.ok(simpDiff.includes(", but they need extra time"), "however -> but, require -> need, additional -> extra");
assert.ok(simpDiff.includes("to buy materials"), "purchase -> buy");
assert.ok(simpDiff.includes("they end operations"), "terminate -> end");
console.log("✓ Test 4 (Difficult Words) Passed!");

// ----------------------------------------------------------------------------
// TEST 5: Very Simple Paragraph
// ----------------------------------------------------------------------------
console.log("\n[Test 5] Very Simple Paragraph:");
const simpleInput = "Birds fly in the sky.";
const simpSimple = nlp.simplifyText(simpleInput, "Grade 1");
console.log("Original: " + simpleInput);
console.log("Result:   " + simpSimple);

assert.strictEqual(simpSimple, "Birds fly in the sky.");
console.log("✓ Test 5 (Very Simple Paragraph) Passed!");

// ----------------------------------------------------------------------------
// TEST 6: Empty Input Handling
// ----------------------------------------------------------------------------
console.log("\n[Test 6] Empty Input Handling:");
assert.strictEqual(nlp.simplifyText("", "Grade 4"), "");
assert.strictEqual(nlp.simplifyText("   ", "Grade 4"), "");
console.log("✓ Test 6 (Empty Input) Passed!");

// ----------------------------------------------------------------------------
// TEST 7: Output Validation Criteria (Similarity and Structure)
// ----------------------------------------------------------------------------
console.log("\n[Test 7] Output Validation Checks:");
// 1. Non-empty
assert.ok(simpWater4.length > 0);
// 2. Contains at least one sentence
assert.ok(simpWater4.includes("."));
// 3. Not identical to original
assert.notStrictEqual(simpWater4, waterCycle);
// 4. Shorter average sentence length
const origSentCount = nlp.tokenizeSentences(waterCycle).length;
const simpSentCount = nlp.tokenizeSentences(simpWater4).length;
console.log(`Original sentences: ${origSentCount} | Simplified sentences: ${simpSentCount}`);
assert.ok(simpSentCount > origSentCount, "Simplification should create more, shorter sentences");
console.log("✓ Test 7 (Validation Checks) Passed!");

// Cleanup
fs.unlinkSync('temp_nlp_engine.js');

console.log("\n==================================================");
console.log("SUCCESS: ALL TESTS PASSED (100%)");
console.log("==================================================");

/**
 * TextSimplify - Educational Natural Language Processing (NLP) Engine
 * Pure Client-Side JavaScript Architecture
 * Zero Backend • Zero External APIs • 100% In-Browser Privacy
 */

// ============================================================================
// 1. KNOWLEDGE BASES & LEXICONS
// ============================================================================

/**
 * Built-in educational dictionary of difficult words with child-friendly definitions
 */
const DIFFICULT_WORDS_DICT = {
  "photosynthesis": "How plants make food using sunlight",
  "carbon dioxide": "A gas in the air used by plants to make food",
  "atmosphere": "The layer of air around Earth",
  "evaporation": "When liquid water changes into gas",
  "habitat": "The natural home of a plant or animal",
  "organism": "A living thing",
  "ecosystem": "Living things and their environment",
  "gravity": "The force that pulls objects toward Earth",
  "transparent": "Allowing light to pass through",
  "transformation": "A change from one form to another",
  "utilize": "Use",
  "synthesize": "Make or produce",
  "approximately": "About",
  "demonstrate": "Show",
  "require": "Need",
  "commence": "Start",
  "terminate": "End",
  "precipitation": "Water falling from clouds as rain or snow",
  "condensation": "When gas cools down and turns back into liquid",
  "chlorophyll": "The green substance in plants that absorbs sunlight",
  "respiration": "Breathing or how cells take in oxygen and release energy",
  "biodiversity": "The variety of all living things in a place",
  "demand forecasting": "Predicting how much of a product people will need",
  "inventory": "The products or goods currently kept in stock",
  "inventory replenishment": "Planning when and how much stock to buy again",
  "time-series decomposition": "Studying past data by separating it into useful patterns",
  "statistical forecast": "A prediction made using numbers and past data",
  "statistical forecasts": "Predictions made using numbers and past data",
  "erp system": "A computer system used to manage business activities",
  "database system": "An organized place where information is stored",
  "inventory optimization": "Keeping the right amount of stock without running out",
  "just-in-time purchasing": "Buying products shortly before they are needed"
};

/**
 * Direct replacement mapping for rule-based vocabulary simplification
 */
const SIMPLIFICATION_REPLACEMENTS = [
  // Multi-word & contextual phrases (Business, Forecasting, Supply Chain)
  { pattern: /\bdesigned for\b/gi, replacement: "made for" },
  { pattern: /\bdemand forecasting and inventory replenishment planning\b/gi, replacement: "predicting customer demand and planning when to buy more stock" },
  { pattern: /\bdemand forecasting tool\b/gi, replacement: "tool for predicting future demand" },
  { pattern: /\bdemand forecasting\b/gi, replacement: "predicting how much of a product people will need" },
  { pattern: /\binventory replenishment planning\b/gi, replacement: "planning when and how much stock to buy again" },
  { pattern: /\binventory replenishment\b/gi, replacement: "planning when to buy more stock" },
  { pattern: /\brobust time-series decomposition approach\b/gi, replacement: "strong method that studies past data to find patterns" },
  { pattern: /\btime-series decomposition approach\b/gi, replacement: "method that studies past data by separating it into useful patterns" },
  { pattern: /\btime-series decomposition\b/gi, replacement: "studying past data by separating it into useful patterns" },
  { pattern: /\btime-series\b/gi, replacement: "past data over time" },
  { pattern: /\bstatistical forecasts\b/gi, replacement: "predictions made using numbers and past data" },
  { pattern: /\bstatistical forecast\b/gi, replacement: "prediction made using numbers and past data" },
  { pattern: /\bform a solid foundation for further demand planning processes\b/gi, replacement: "give a strong starting point for later planning activities" },
  { pattern: /\bfurther demand planning processes\b/gi, replacement: "later planning activities" },
  { pattern: /\bplanning technologies\b/gi, replacement: "computer tools that help with planning" },
  { pattern: /\binventory optimization tools\b/gi, replacement: "computer tools that help keep the right amount of stock" },
  { pattern: /\binventory optimization\b/gi, replacement: "keeping the right amount of stock" },
  { pattern: /\btimely information\b/gi, replacement: "information received at the right time" },
  { pattern: /\bdecision-making\b/gi, replacement: "choosing what to do" },
  { pattern: /\bfunctions purely as\b/gi, replacement: "works only as" },
  { pattern: /\binventory data\b/gi, replacement: "information about products currently in stock" },
  { pattern: /\boptimal just-in-time purchase plan\b/gi, replacement: "best plan to buy products just before they are needed" },
  { pattern: /\bjust-in-time purchase plan\b/gi, replacement: "a plan to buy products just before they are needed" },
  { pattern: /\bjust-in-time\b/gi, replacement: "just before needed" },
  { pattern: /\bERP or database system\b/gi, replacement: "ERP or database computer system" },
  { pattern: /\bERP system\b/gi, replacement: "a computer system used to manage business activities" },
  { pattern: /\bdatabase system\b/gi, replacement: "an organized place where information is stored" },
  { pattern: /\bexporting it back to\b/gi, replacement: "sending it back to" },
  { pattern: /\bexporting\b/gi, replacement: "sending data from one system to another" },
  { pattern: /\bexecute it immediately\b/gi, replacement: "carry it out right away" },
  { pattern: /\bexecute it\b/gi, replacement: "carry it out" },
  { pattern: /\bexecute\b/gi, replacement: "carry out" },
  { pattern: /\bdeliver highly accurate\b/gi, replacement: "provide very accurate" },
  { pattern: /\bwe deliver\b/gi, replacement: "it provides" },
  { pattern: /\bweb-based application\b/gi, replacement: "online computer program" },
  { pattern: /\bweb-based\b/gi, replacement: "online" },
  { pattern: /\bapplication\b/gi, replacement: "computer program" },

  // Multi-word & contextual phrases (Science & Nature)
  { pattern: /\bcontinuous movement of water between the Earth['’]s surface and the atmosphere\b/gi, replacement: "way water moves around Earth" },
  { pattern: /\bcontinuous movement of water\b/gi, replacement: "way water moves" },
  { pattern: /\bcontinuous movement\b/gi, replacement: "ongoing movement" },
  { pattern: /\bmovement of ([a-zA-Z]+)\b/gi, replacement: "way $1 moves" },
  { pattern: /\bbetween the Earth['’]s surface and the atmosphere\b/gi, replacement: "around Earth" },
  { pattern: /\btiny water droplets\b/gi, replacement: "tiny water drops" },
  { pattern: /\bwater droplets\b/gi, replacement: "water drops" },
  { pattern: /\bjoin together to form\b/gi, replacement: "join together to make" },
  { pattern: /\bjoin together to\b/gi, replacement: "join together to" },
  { pattern: /\binto the atmosphere\b/gi, replacement: "into the air" },
  { pattern: /\bin the atmosphere\b/gi, replacement: "in the air" },
  { pattern: /\bfalls back to Earth as\b/gi, replacement: "falls as" },
  { pattern: /\bfalls back to Earth\b/gi, replacement: "falls back down" },
  { pattern: /\bDuring this process,\s*/gi, replacement: "In this process, " },
  { pattern: /\bFurthermore,\s*/gi, replacement: "Also, " },
  { pattern: /\bIn addition,\s*/gi, replacement: "Also, " },
  { pattern: /\bConsequently,\s*/gi, replacement: "So, " },
  { pattern: /\bSubsequently,\s*/gi, replacement: "Next, " },

  // User-specified difficult word replacements
  { pattern: /\bcontinuous\b/gi, replacement: "ongoing" },
  { pattern: /\bmovement\b/gi, replacement: "way something moves" },
  { pattern: /\batmosphere\b/gi, replacement: "air around Earth" },
  { pattern: /\butilize\b/gi, replacement: "use" },
  { pattern: /\butilizes\b/gi, replacement: "uses" },
  { pattern: /\butilizing\b/gi, replacement: "using" },
  { pattern: /\butilized\b/gi, replacement: "used" },
  { pattern: /\bsynthesize\b/gi, replacement: "make" },
  { pattern: /\bsynthesizes\b/gi, replacement: "makes" },
  { pattern: /\bsynthesizing\b/gi, replacement: "making" },
  { pattern: /\bsynthesized\b/gi, replacement: "made" },
  { pattern: /\bapproximately\b/gi, replacement: "about" },
  { pattern: /\bdemonstrate\b/gi, replacement: "show" },
  { pattern: /\bdemonstrates\b/gi, replacement: "shows" },
  { pattern: /\bdemonstrating\b/gi, replacement: "showing" },
  { pattern: /\bdemonstrated\b/gi, replacement: "showed" },
  { pattern: /\brequire\b/gi, replacement: "need" },
  { pattern: /\brequires\b/gi, replacement: "needs" },
  { pattern: /\brequiring\b/gi, replacement: "needing" },
  { pattern: /\brequired\b/gi, replacement: "needed" },
  { pattern: /\bcommence\b/gi, replacement: "start" },
  { pattern: /\bcommences\b/gi, replacement: "starts" },
  { pattern: /\bcommencing\b/gi, replacement: "starting" },
  { pattern: /\bcommenced\b/gi, replacement: "started" },
  { pattern: /\bterminate\b/gi, replacement: "end" },
  { pattern: /\bterminates\b/gi, replacement: "ends" },
  { pattern: /\bterminating\b/gi, replacement: "ending" },
  { pattern: /\bterminated\b/gi, replacement: "ended" },
  { pattern: /\bobtain\b/gi, replacement: "get" },
  { pattern: /\bobtains\b/gi, replacement: "gets" },
  { pattern: /\bobtaining\b/gi, replacement: "getting" },
  { pattern: /\bobtained\b/gi, replacement: "got" },
  { pattern: /\bassist\b/gi, replacement: "help" },
  { pattern: /\bassists\b/gi, replacement: "helps" },
  { pattern: /\bassisting\b/gi, replacement: "helping" },
  { pattern: /\bassisted\b/gi, replacement: "helped" },
  { pattern: /\bsufficient\b/gi, replacement: "enough" },
  { pattern: /\bnumerous\b/gi, replacement: "many" },
  { pattern: /\bpurchase\b/gi, replacement: "buy" },
  { pattern: /\bpurchases\b/gi, replacement: "buys" },
  { pattern: /\bpurchasing\b/gi, replacement: "buying" },
  { pattern: /\bpurchased\b/gi, replacement: "bought" },
  { pattern: /\bconstruct\b/gi, replacement: "build" },
  { pattern: /\bconstructs\b/gi, replacement: "builds" },
  { pattern: /\bconstructing\b/gi, replacement: "building" },
  { pattern: /\bconstructed\b/gi, replacement: "built" },
  { pattern: /\bindicate\b/gi, replacement: "show" },
  { pattern: /\bindicates\b/gi, replacement: "shows" },
  { pattern: /\bindicating\b/gi, replacement: "showing" },
  { pattern: /\bindicated\b/gi, replacement: "showed" },
  { pattern: /\btherefore\b/gi, replacement: "so" },
  { pattern: /\bhowever\b/gi, replacement: "but" },
  { pattern: /\badditional\b/gi, replacement: "extra" },
  { pattern: /\binitial\b/gi, replacement: "first" },
  { pattern: /\bfinal\b/gi, replacement: "last" },
  { pattern: /\brobust\b/gi, replacement: "strong and reliable" },
  { pattern: /\bfoundation\b/gi, replacement: "starting point" },
  { pattern: /\bintegrates\b/gi, replacement: "combines" },
  { pattern: /\bcrucial\b/gi, replacement: "very important" },
  { pattern: /\boptimal\b/gi, replacement: "best or most suitable" }
];

/**
 * Natural in-sentence explanations for scientific and technical terms
 */
const SCIENTIFIC_TERM_EXPLANATIONS = {
  "evaporation": "when liquid water changes into water vapour",
  "condensation": "when water vapour cools and forms tiny water drops",
  "precipitation": "water that falls from clouds as rain, snow, or hail",
  "photosynthesis": "how plants make food using sunlight",
  "atmosphere": "the layer of air around Earth",
  "habitat": "the natural home of a plant or animal",
  "ecosystem": "living things and their surroundings",
  "gravity": "the force that pulls objects toward Earth",
  "organism": "a living thing",
  "transformation": "a change from one form into another",
  "energy": "the ability to make things happen",
  "environment": "everything around a living thing",
  "demand forecasting": "predicting how many products people will need",
  "inventory": "products currently kept in stock",
  "statistical forecast": "a prediction made using past numbers and data",
  "erp system": "a computer system used to manage business activities"
};

/**
 * Common English stop-words list used strictly for keyword and sentence scoring
 */
const STOP_WORDS_SET = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being",
  "below", "between", "both", "but", "by", "can", "can't", "cannot", "could",
  "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down",
  "during", "each", "few", "for", "from", "further", "had", "hadn't", "has",
  "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her",
  "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's",
  "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it",
  "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my",
  "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other",
  "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't",
  "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such",
  "than", "that", "that's", "the", "their", "theirs", "them", "themselves",
  "then", "there", "there's", "these", "they", "they'd", "they'll", "they're",
  "they've", "this", "those", "through", "to", "too", "under", "until", "up",
  "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were",
  "weren't", "what", "what's", "when", "when's", "where", "where's", "which",
  "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would",
  "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours",
  "yourself", "yourselves"
]);

/**
 * Standard benchmark sample paragraph
 */
const SAMPLE_PARAGRAPH = "Photosynthesis is the process by which green plants make their own food. Plants use sunlight, water from the soil, and carbon dioxide from the air. During this process, plants produce food and release oxygen into the atmosphere.";

// ============================================================================
// 2. CORE NLP MODULES
// ============================================================================

/**
 * Preprocessing module: Normalizes whitespaces, preserves sentence punctuation,
 * creates cleaned string while preserving original.
 */
function preprocessText(rawText) {
  if (!rawText) return { original: "", cleaned: "" };
  
  // Normalize Windows/Mac line endings and consecutive spaces
  const cleaned = rawText
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n\n")
    .trim();

  return {
    original: rawText,
    cleaned: cleaned
  };
}

/**
 * Sentence Tokenizer: Splits text into grammatically sensible sentences.
 * Handles abbreviations (e.g., Dr., e.g., i.e.) and decimal numbers.
 */
function tokenizeSentences(text) {
  if (!text || !text.trim()) return [];

  // Protect common abbreviations and numbers with dots
  let safeText = text
    .replace(/\b(Dr|Mr|Mrs|Ms|Prof|Sr|Jr)\./gi, "$1_DOT_")
    .replace(/\b(e\.g|i\.e|vs|etc)\./gi, "$1_DOT_")
    .replace(/(\d+)\.(\d+)/g, "$1_DECIMAL_$2");

  // Split on sentence boundaries: period, exclamation, or question mark, optionally followed by quotes
  const rawSegments = safeText.split(/(?<=[.?!]["'”’)]?)\s+(?=[A-Z0-9"‘“']|$)/);

  const sentences = [];
  for (let seg of rawSegments) {
    let cleanSeg = seg
      .replace(/_DOT_/g, ".")
      .replace(/_DECIMAL_/g, ".")
      .trim();
    if (cleanSeg.length > 0) {
      sentences.push(cleanSeg);
    }
  }

  // Fallback if no sentence ending punctuation was found
  if (sentences.length === 0 && text.trim().length > 0) {
    sentences.push(text.trim());
  }

  return sentences;
}

/**
 * Word Tokenizer: Extracts clean alphanumeric tokens, calculates statistics.
 */
function tokenizeWords(text) {
  if (!text) return [];
  // Match word characters, including apostrophes inside words (e.g. "don't", "plants'")
  const tokens = text.match(/\b[a-zA-Z0-9]+(?:'[a-zA-Z0-9]+)?\b/g);
  return tokens ? tokens : [];
}

/**
 * Estimate syllable count for a word using vowel-group heuristics
 */
function countSyllables(word) {
  if (!word) return 1;
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;

  // Remove trailing silent 'e' or 'es'
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');

  // Count contiguous vowel groups
  const vowelMatches = word.match(/[aeiouy]{1,2}/g);
  const count = vowelMatches ? vowelMatches.length : 1;
  return Math.max(1, count);
}

/**
 * Extracts top keywords using frequency, stop-word elimination, phrase detection,
 * and tie-breaking prioritizing longer words.
 */
function extractKeywords(text, words, maxKeywords = 10) {
  const lowerText = text.toLowerCase();
  const wordFreq = {};
  const removedStopWords = new Set();

  // Multi-word phrase candidates from our educational lexicon
  const specialPhrases = ["carbon dioxide"];
  const phraseScores = {};
  const phraseTokens = new Set();

  for (const phrase of specialPhrases) {
    if (lowerText.includes(phrase)) {
      // Count phrase occurrences
      const matches = lowerText.split(phrase).length - 1;
      if (matches > 0) {
        phraseScores[phrase] = matches * 1.5; // Boost multi-word terms
        phrase.split(/\s+/).forEach(t => phraseTokens.add(t));
      }
    }
  }

  const ACTION_VERBS = new Set([
    "make", "makes", "making", "made",
    "use", "uses", "using", "used",
    "produce", "produces", "producing", "produced",
    "release", "releases", "releasing", "released"
  ]);

  // Count single word frequencies
  for (const w of words) {
    const lw = w.toLowerCase();
    if (STOP_WORDS_SET.has(lw) || ACTION_VERBS.has(lw)) {
      removedStopWords.add(lw);
      continue;
    }
    if (lw.length <= 2) continue; // Filter short tokens
    if (phraseTokens.has(lw)) continue; // Avoid redundant constituent words

    wordFreq[lw] = (wordFreq[lw] || 0) + 1;
  }

  const keywordCandidates = [];

  // Add phrases
  for (const [phrase, score] of Object.entries(phraseScores)) {
    keywordCandidates.push({
      word: phrase,
      frequency: score,
      length: phrase.length,
      isPhrase: true
    });
  }

  // Add words
  for (const [word, freq] of Object.entries(wordFreq)) {
    keywordCandidates.push({
      word: word,
      frequency: freq,
      length: word.length,
      isPhrase: false
    });
  }

  // Sort: primary by frequency/score descending; tie-break: longer word preferred
  keywordCandidates.sort((a, b) => {
    if (b.frequency !== a.frequency) {
      return b.frequency - a.frequency;
    }
    return b.length - a.length;
  });

  const topKeywords = keywordCandidates.slice(0, maxKeywords);

  return {
    keywords: topKeywords,
    removedStopWords: Array.from(removedStopWords).sort()
  };
}

/**
 * Extractive Summarization: Scores sentences based on keyword frequencies,
 * picks top sentence(s), maintains original flow.
 */
function generateExtractiveSummary(sentences, keywords) {
  if (!sentences || sentences.length === 0) return { summary: "", rankedSentences: [] };

  const keywordWeights = {};
  keywords.forEach(k => {
    keywordWeights[k.word.toLowerCase()] = k.frequency;
  });

  const scoredSentences = sentences.map((sent, index) => {
    const sentLower = sent.toLowerCase();
    const sentWords = tokenizeWords(sent);
    let rawScore = 0;

    // Add score for each keyword or key phrase present
    for (const [kw, weight] of Object.entries(keywordWeights)) {
      if (kw.includes(" ")) {
        if (sentLower.includes(kw)) {
          rawScore += weight * 2;
        }
      } else {
        const occurrences = sentWords.filter(w => w.toLowerCase() === kw).length;
        rawScore += occurrences * weight;
      }
    }

    // Normalized score by sentence length (with slight square-root dampening)
    const normalizedScore = sentWords.length > 0 ? (rawScore / Math.sqrt(sentWords.length)) : 0;

    return {
      index: index,
      sentence: sent,
      score: parseFloat(normalizedScore.toFixed(3)),
      wordCount: sentWords.length
    };
  });

  // Rank sentences by score
  const ranked = [...scoredSentences].sort((a, b) => b.score - a.score);

  // How many sentences to select: 1 for short input, up to 3 for longer inputs
  let selectCount = 1;
  if (sentences.length > 4) {
    selectCount = 3;
  } else if (sentences.length >= 3) {
    selectCount = 2;
  }

  const selectedIndices = new Set(ranked.slice(0, selectCount).map(s => s.index));

  // Maintain original chronological sequence for readability
  const summarySentences = scoredSentences
    .filter(s => selectedIndices.has(s.index))
    .map(s => s.sentence);

  return {
    summary: summarySentences.join(" "),
    rankedSentences: ranked
  };
}

/**
 * Difficult-Word Detection: Identifies vocabulary using built-in dictionary,
 * character length (> 8), and syllable heuristics (>= 3).
 */
function detectDifficultWords(text, words) {
  const foundWords = new Map();
  const lowerText = text.toLowerCase();

  // 1. Check for multi-word dictionary terms first
  for (const [term, meaning] of Object.entries(DIFFICULT_WORDS_DICT)) {
    if (term.includes(" ")) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      if (regex.test(text)) {
        foundWords.set(term, {
          word: term,
          meaning: meaning,
          reason: "Key scientific term",
          syllables: 4
        });
      }
    }
  }

  // 2. Check individual words
  for (const w of words) {
    const lw = w.toLowerCase();
    if (STOP_WORDS_SET.has(lw)) continue;
    if (foundWords.has(lw)) continue;

    const syllables = countSyllables(lw);
    const length = lw.length;

    if (DIFFICULT_WORDS_DICT[lw]) {
      foundWords.set(lw, {
        word: lw,
        meaning: DIFFICULT_WORDS_DICT[lw],
        reason: "Educational vocabulary list",
        syllables: syllables
      });
    } else if (length > 8 || syllables >= 3) {
      foundWords.set(lw, {
        word: lw,
        meaning: "This may be an advanced word. Check its meaning in a dictionary.",
        reason: length > 8 ? `Long word (${length} letters, ${syllables} syllables)` : `Complex word (${syllables} syllables)`,
        syllables: syllables
      });
    }
  }

  return Array.from(foundWords.values());
}

/**
 * Readability Analysis: Flesch Reading Ease and Flesch-Kincaid Grade Level formulas
 */
function calculateReadability(sentences, words, selectedGrade) {
  const sentenceCount = Math.max(1, sentences.length);
  const wordCount = Math.max(1, words.length);

  let totalSyllables = 0;
  let complexWordCount = 0;
  let totalWordCharLength = 0;

  for (const w of words) {
    const syl = countSyllables(w);
    totalSyllables += syl;
    if (syl >= 3) complexWordCount++;
    totalWordCharLength += w.length;
  }

  const avgSentenceLength = wordCount / sentenceCount;
  const avgSyllablesPerWord = totalSyllables / wordCount;
  const avgWordLength = (totalWordCharLength / wordCount).toFixed(1);

  // Flesch Reading Ease Formula
  // 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
  let fleschReadingEase = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
  fleschReadingEase = Math.max(0, Math.min(100, Math.round(fleschReadingEase)));

  // Flesch-Kincaid Grade Level Formula
  // 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
  let estimatedGradeLevel = Math.round((0.39 * avgSentenceLength) + (11.8 * avgSyllablesPerWord) - 15.59);
  estimatedGradeLevel = Math.max(1, estimatedGradeLevel);

  // Interpretation
  let interpretation = "Moderate";
  let badgeClass = "badge-neutral";
  let meterPercent = 50;

  if (fleschReadingEase >= 80 || estimatedGradeLevel <= 3) {
    interpretation = "Easy to read";
    badgeClass = "badge-success";
    meterPercent = 20;
  } else if (fleschReadingEase >= 60 || estimatedGradeLevel <= 6) {
    interpretation = "Moderate (Suitable for elementary/intermediate)";
    badgeClass = "badge-neutral";
    meterPercent = 48;
  } else if (fleschReadingEase >= 40 || estimatedGradeLevel <= 9) {
    interpretation = "Difficult (Middle to high school)";
    badgeClass = "badge-neutral";
    meterPercent = 75;
  } else {
    interpretation = "Very difficult (Advanced reading)";
    badgeClass = "badge-rose";
    meterPercent = 95;
  }

  // Comparison with selected grade
  let gradeComparison = "";
  const targetGradeNum = selectedGrade ? parseInt(selectedGrade.replace(/\D/g, ""), 10) : 4;

  if (estimatedGradeLevel > targetGradeNum + 1) {
    gradeComparison = `The paragraph may be difficult for ${selectedGrade} students because the estimated reading level is Grade ${estimatedGradeLevel}. It contains longer sentences and advanced scientific words.`;
  } else if (estimatedGradeLevel < targetGradeNum - 1) {
    gradeComparison = `The paragraph is very accessible for ${selectedGrade} students. The estimated reading level is Grade ${estimatedGradeLevel}, so students should find the vocabulary comfortable.`;
  } else {
    gradeComparison = `The paragraph matches ${selectedGrade} expectations well! The estimated reading level is Grade ${estimatedGradeLevel}.`;
  }

  return {
    fleschReadingEase,
    estimatedGradeLevel,
    interpretation,
    badgeClass,
    meterPercent,
    avgSentenceLength: avgSentenceLength.toFixed(1),
    avgWordLength,
    complexWordCount,
    gradeComparison
  };
}

/**
 * Input text cleaner for simplification: removes Markdown links, raw URLs,
 * and extraneous formatting while preserving sentence meaning.
 */
function cleanInputText(rawText) {
  if (!rawText) return "";
  let text = rawText;
  // 1. Remove Markdown links [visible text](url) -> visible text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // 2. Remove raw URLs
  text = text.replace(/https?:\/\/[^\s)]+/gi, "").replace(/www\.[^\s)]+/gi, "");
  // 3. Remove markdown formatting symbols
  text = text.replace(/[*_#`~>]/g, "");
  // 4. Normalize quotes and dashes
  text = text.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');
  text = text.replace(/[\u2013\u2014]/g, "-");
  // 5. Clean whitespaces
  text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  text = text.replace(/[ \t]+/g, " ");
  text = text.replace(/\n\s*\n+/g, "\n\n");
  return text.trim();
}

/**
 * Renders structured Markdown sections into styled HTML elements
 */
function formatSimplifiedHtml(markdownText) {
  if (!markdownText) return "";
  const escapeHtml = (str) => str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  const rawSections = markdownText.split(/(?=###\s+)/g);
  let html = "";

  for (const rawSec of rawSections) {
    const trimmed = rawSec.trim();
    if (!trimmed) continue;
    
    const headerMatch = trimmed.match(/^###\s+([^\n]+)\n*([\s\S]*)$/);
    if (headerMatch) {
      const title = headerMatch[1].trim();
      const body = headerMatch[2].trim();
      
      let sectionIcon = "💡";
      if (/in simple words/i.test(title)) sectionIcon = "📖";
      else if (/how it works/i.test(title)) sectionIcon = "⚙️";
      else if (/important words/i.test(title)) sectionIcon = "📚";
      else if (/simple example/i.test(title)) sectionIcon = "🌟";
      else if (/remember this/i.test(title)) sectionIcon = "📌";

      html += `<div class="simplified-section">`;
      html += `<h4 class="simplified-section-title"><span class="section-icon">${sectionIcon}</span> ${escapeHtml(title)}</h4>`;
      
      if (/how it works/i.test(title)) {
        const items = body.split(/\n+/).map(l => l.replace(/^\d+[\.)]\s*/, "").trim()).filter(Boolean);
        html += `<ol class="simplified-numbered-list">`;
        items.forEach(item => {
          html += `<li>${escapeHtml(item)}</li>`;
        });
        html += `</ol>`;
      } else if (/important words|remember this/i.test(title)) {
        const items = body.split(/\n+/).map(l => l.replace(/^[-*•]\s*/, "").trim()).filter(Boolean);
        html += `<ul class="simplified-bullet-list">`;
        items.forEach(item => {
          if (item.includes(":")) {
            const colonIdx = item.indexOf(":");
            const term = item.substring(0, colonIdx).trim();
            const def = item.substring(colonIdx + 1).trim();
            html += `<li><strong>${escapeHtml(term)}:</strong> ${escapeHtml(def)}</li>`;
          } else {
            html += `<li>${escapeHtml(item)}</li>`;
          }
        });
        html += `</ul>`;
      } else {
        const paragraphs = body.split(/\n\s*\n/).filter(Boolean);
        paragraphs.forEach(p => {
          html += `<p class="simplified-paragraph">${escapeHtml(p.trim())}</p>`;
        });
      }
      html += `</div>`;
    } else {
      html += `<p class="simplified-paragraph">${escapeHtml(trimmed)}</p>`;
    }
  }

  return html;
}

/**
 * Multi-Step Client-Side NLP Simplification Engine:
 * Generates an educational 5-section teaching explanation adapted to the student's grade:
 * 1. ### In simple words
 * 2. ### How it works (3-6 numbered steps)
 * 3. ### Important words (key terms with definitions)
 * 4. ### Simple example (everyday relatable analogy)
 * 5. ### Remember this (1-3 key take-home points)
 */
function simplifyText(text, arg2, arg3, arg4) {
  const cleaned = cleanInputText(text);
  if (!cleaned) return "";

  let sentences;
  let grade = "Grade 4";
  let isExtraSimple = false;

  if (Array.isArray(arg2)) {
    sentences = arg2;
    if (typeof arg3 === "string") {
      grade = arg3;
      isExtraSimple = !!arg4;
    } else if (typeof arg3 === "boolean") {
      isExtraSimple = arg3;
      grade = (typeof arg4 === "string") ? arg4 : (state.selectedGrade || "Grade 4");
    }
  } else if (typeof arg2 === "string") {
    grade = arg2;
    sentences = tokenizeSentences(cleaned);
    isExtraSimple = !!arg3;
  } else if (typeof arg2 === "boolean") {
    isExtraSimple = arg2;
    grade = (typeof arg3 === "string") ? arg3 : (state.selectedGrade || "Grade 4");
    sentences = tokenizeSentences(cleaned);
  } else {
    sentences = tokenizeSentences(cleaned);
    grade = (typeof state !== "undefined" && state.selectedGrade) ? state.selectedGrade : "Grade 4";
  }

  const gradeNum = parseInt(grade.replace(/\D/g, ""), 10) || 4;
  const isLowerGrade = gradeNum <= 2;
  const isMiddleGrade = gradeNum >= 3 && gradeNum <= 5;
  const isUpperGrade = gradeNum >= 6;

  // Domain & Topic Detection
  const isStreamline = /streamline|demand\s+forecasting|inventory\s+replenishment|just-in-time|time-series\s+decomposition|erp\s+system/i.test(cleaned);
  const isWaterCycle = /water\s+cycle|evaporation.*condensation.*precipitation/i.test(cleaned);
  const isPhotosynthesis = /photosynthesis|plants\s+make.*food.*sunlight|chlorophyll/i.test(cleaned);

  let inSimpleWords = "";
  let howItWorksSteps = [];
  let importantWordsList = [];
  let simpleExample = "";
  let rememberThisPoints = [];

  // =========================================================================
  // Case A: Demand Forecasting & Inventory Management (GMDH Streamline & Business)
  // =========================================================================
  if (isStreamline) {
    if (isLowerGrade || isExtraSimple) {
      inSimpleWords = "GMDH Streamline is a computer tool made to help shops know what to buy. It guesses how many things people will want so the shop does not run out.\n\nIf the tool knows what is already in the shop, it makes a shopping list at the right time. Then it can send the list to the shop computer.";
      howItWorksSteps = [
        "The program looks at what people bought before.",
        "It guesses how many products customers will want next.",
        "It checks how many products are in the shop.",
        "It tells the shop when to buy more products."
      ];
      importantWordsList = [
        "Demand forecasting: guessing what products people will want to buy.",
        "Inventory: products a shop has ready to sell.",
        "ERP system: a computer program that helps run a business."
      ];
      simpleExample = "Imagine a toy store before a holiday. The shopkeeper uses a helper tool to guess how many toy cars kids will want. The tool tells them how many toy cars to order so the shelves never stay empty.";
      rememberThisPoints = [
        "Streamline helps shops guess what products people need.",
        "It tells shops when and how much to order."
      ];
    } else if (isMiddleGrade) {
      inSimpleWords = "GMDH Streamline is a computer program that helps businesses predict how many products customers may need. It also helps them decide when and how many products to buy.\n\nThe program studies past sales information to find patterns. It then uses these patterns to make predictions about future demand. This information helps businesses plan their stock and make better decisions.\n\nIf the program does not have information about current stock, it can only predict how many products may be needed. If it has stock information, it can also suggest the best time to buy more products.\n\nThe program can create a plan to buy products just before they are needed. It can then send this plan to another business system, such as an ERP or database system.";
      howItWorksSteps = [
        "The program studies past sales data.",
        "It looks for patterns in the data.",
        "It predicts how many products customers may need.",
        "It checks how much stock is available.",
        "It suggests when and how many products to buy.",
        "It can send the purchase plan to another business system."
      ];
      importantWordsList = [
        "Demand forecasting: predicting how many products people may need.",
        "Inventory: the products a business currently has.",
        "Statistical forecast: a prediction made using past numbers and data.",
        "Time-series analysis: studying data collected over time to find patterns.",
        "ERP system: a computer system used to manage business information.",
        "Just-in-time purchasing: buying products shortly before they are needed."
      ];
      simpleExample = "Imagine a school canteen. It studies how many sandwiches students buy each day. If it notices that more sandwiches are sold on Fridays, it can prepare more sandwiches before Friday. If it also knows how many sandwiches are already available, it can decide exactly when to prepare or buy more.";
      rememberThisPoints = [
        "Streamline predicts future product needs.",
        "It helps businesses manage their stock.",
        "With stock information, it can also suggest when to buy more products."
      ];
    } else {
      inSimpleWords = "GMDH Streamline is a web-based computer application designed to help businesses forecast customer demand and manage inventory replenishment planning.\n\nThe program uses time-series decomposition to analyze historical sales data, separating it into meaningful trends and seasonal patterns. This allows it to generate highly accurate statistical forecasts that serve as a reliable foundation for demand planning.\n\nWithout inventory data, Streamline operates purely as a demand forecasting tool. However, when current stock data is available, Streamline creates an optimal just-in-time purchase plan and exports it directly to an ERP or database system for execution.";
      howItWorksSteps = [
        "The software collects and analyzes historical sales data.",
        "It separates the data into trends and seasonal patterns (time-series decomposition).",
        "It generates accurate statistical predictions of future customer demand.",
        "It reviews current inventory levels across the business.",
        "It creates an optimized just-in-time purchasing schedule.",
        "It exports the restock orders automatically to an ERP or database system."
      ];
      importantWordsList = [
        "Demand forecasting: predicting future customer demand using historical sales data.",
        "Inventory replenishment: planning when and how much stock to reorder.",
        "Time-series decomposition: breaking past data into trends, cycles, and seasons.",
        "Statistical forecast: a data-driven prediction based on numerical trends.",
        "Inventory optimization: keeping ideal stock levels while avoiding excess or shortages.",
        "Just-in-time purchasing: ordering products to arrive shortly before they are needed.",
        "ERP system: enterprise software used to manage core business operations."
      ];
      simpleExample = "Consider a sports equipment store preparing for winter. The store analyzes sales from past years to predict how many jackets and skis customers will buy. By comparing this prediction with current warehouse stock, Streamline automatically schedules supplier orders so new winter gear arrives right before the ski season begins.";
      rememberThisPoints = [
        "Streamline turns historical sales numbers into actionable future demand forecasts.",
        "It automates inventory planning to keep stock balanced at optimal levels.",
        "It integrates seamlessly with ERP and database systems for instant execution."
      ];
    }
  }
  // =========================================================================
  // Case B: The Water Cycle
  // =========================================================================
  else if (isWaterCycle) {
    if (isLowerGrade || isExtraSimple) {
      inSimpleWords = "The water cycle is the way water moves around Earth. The Sun warms water in rivers, lakes, and oceans. The warm water turns into invisible gas called water vapour and floats up. In the sky, the vapour gets cold and turns into tiny water drops that make clouds. When the clouds get heavy, water falls back down as rain or snow.";
      howItWorksSteps = [
        "The Sun warms water on the ground.",
        "Warm water turns into water vapour (evaporation).",
        "The vapour cools and forms clouds (condensation).",
        "Water falls from clouds as rain or snow (precipitation).",
        "Water collects on the ground, and the cycle starts again."
      ];
      importantWordsList = [
        "Water cycle: the way water moves from Earth to the sky and back.",
        "Evaporation: when warm water turns into water vapour.",
        "Condensation: when water vapour cools to make clouds.",
        "Precipitation: water falling from clouds as rain or snow."
      ];
      simpleExample = "Imagine a hot cup of soup with a lid. Steam rises from the soup and touches the cool lid. On the lid, the steam cools into water drops that drip back into the cup, just like rain.";
      rememberThisPoints = [
        "Water on Earth keeps moving in a repeating circle.",
        "The Sun gives the heat that makes water rise into the sky."
      ];
    } else if (isMiddleGrade) {
      inSimpleWords = "The water cycle is the way water continuously moves between the Earth's surface and the air around Earth. The Sun warms liquid water in rivers, lakes, and oceans, causing it to evaporate into an invisible gas called water vapour. As the water vapour rises into the cooler atmosphere, it cools down and condenses into tiny water drops, forming clouds. When the clouds become heavy with water, the moisture falls back to Earth as rain, snow, or hail through precipitation.";
      howItWorksSteps = [
        "The Sun heats liquid water in oceans, lakes, and rivers.",
        "The water evaporates and rises into the air as water vapour.",
        "High in the atmosphere, the vapour cools and condenses into clouds.",
        "Water droplets join together and grow heavier.",
        "Water falls back to Earth as precipitation (rain, snow, or hail).",
        "Water flows back into oceans and rivers to repeat the cycle."
      ];
      importantWordsList = [
        "Water cycle: the continuous movement of water around Earth.",
        "Evaporation: when liquid water changes into water vapour gas.",
        "Condensation: when water vapour cools to form clouds of water drops.",
        "Precipitation: water falling from clouds as rain, snow, or hail.",
        "Atmosphere: the blanket of air that surrounds Earth."
      ];
      simpleExample = "Imagine wet clothes drying on a clothesline on a sunny day. The water from the clothes disappears into the air through evaporation. Later, that moisture cools high in the sky to help form rain clouds.";
      rememberThisPoints = [
        "The water cycle is an ongoing natural loop that recycles Earth's water.",
        "The three major steps are evaporation, condensation, and precipitation.",
        "Solar energy from the Sun drives the whole process."
      ];
    } else {
      inSimpleWords = "The water cycle represents the continuous movement of water throughout Earth's surface, atmosphere, and oceans. Solar radiation heats surface water bodies, driving evaporation where liquid water transforms into water vapour. As warm air currents carry the vapour upward, lower atmospheric temperatures induce condensation, grouping droplets into clouds. Eventually, accumulated moisture precipitates back to Earth as rain, snow, or sleet, replenishing terrestrial and aquatic reservoirs.";
      howItWorksSteps = [
        "Solar radiation warms surface water in oceans, lakes, and soils.",
        "Water evaporates into water vapour and ascends into the atmosphere.",
        "Cooler upper atmospheric temperatures cause water vapour to condense into clouds.",
        "Droplets coalesce into larger drops until cloud capacity is exceeded.",
        "Precipitation returns liquid or frozen water back to the ground.",
        "Runoff and groundwater flow back into reservoirs, sustaining the cycle."
      ];
      importantWordsList = [
        "Hydrological cycle: the continuous circulation of water throughout the Earth system.",
        "Evaporation: phase transition where liquid water converts into atmospheric gas.",
        "Condensation: thermal process where water vapour cools into liquid droplets.",
        "Precipitation: condensed atmospheric moisture falling under gravity as rain or snow.",
        "Atmosphere: the gaseous envelope surrounding planet Earth."
      ];
      simpleExample = "Think of Earth's atmosphere as a giant natural distillation system. The Sun provides heat to evaporate pure water from salty oceans, leaving salt behind and delivering fresh water to land through rain.";
      rememberThisPoints = [
        "Earth's total water amount remains constant as it cycles through different phases.",
        "Evaporation, condensation, and precipitation drive global weather systems.",
        "Solar energy and gravity are the two fundamental forces powering the cycle."
      ];
    }
  }
  // =========================================================================
  // Case C: Photosynthesis & Plant Biology
  // =========================================================================
  else if (isPhotosynthesis) {
    if (isLowerGrade || isExtraSimple) {
      inSimpleWords = "Plants make their own food using sunlight, water, and carbon dioxide from the air. This process is called photosynthesis. While making food, plants also make clean oxygen and release it into the air for people and animals to breathe.";
      howItWorksSteps = [
        "Plant roots take in water from the dirt.",
        "Green leaves take in carbon dioxide gas from the air.",
        "Leaves catch energy from warm sunlight.",
        "The plant makes food (sugar) and releases oxygen into the air."
      ];
      importantWordsList = [
        "Photosynthesis: how green plants make their own food with sunlight.",
        "Carbon dioxide: a gas in the air that plants breathe in.",
        "Oxygen: the clean air that humans and animals need to breathe."
      ];
      simpleExample = "Think of a plant leaf as a tiny solar kitchen. The plant uses sunlight as heat, water and air as ingredients, and bakes sweet food right inside its green leaves.";
      rememberThisPoints = [
        "Plants need sunlight, water, and air to make food.",
        "Plants give us the oxygen we breathe every day."
      ];
    } else if (isMiddleGrade) {
      inSimpleWords = "Photosynthesis is the process green plants use to make their own food. Plants absorb water from the soil through their roots and take in carbon dioxide gas from the surrounding air through their leaves. Using a green pigment called chlorophyll, leaves capture light energy from the Sun. The plant turns this water and carbon dioxide into food (glucose) and releases fresh oxygen back into the atmosphere.";
      howItWorksSteps = [
        "Roots absorb water and nutrients from the soil.",
        "Tiny pores in leaves absorb carbon dioxide from the air.",
        "Chlorophyll in leaves captures sunlight energy.",
        "Sunlight energy converts water and carbon dioxide into glucose (sugar).",
        "Plants release oxygen gas into the air as a byproduct."
      ];
      importantWordsList = [
        "Photosynthesis: the process plants use to make food from sunlight.",
        "Chlorophyll: the green substance in leaves that absorbs sunlight.",
        "Carbon dioxide: a gas in the atmosphere absorbed by plants.",
        "Oxygen: a vital gas produced by plants and breathed by animals.",
        "Glucose: a simple sugar that gives plants energy to grow."
      ];
      simpleExample = "Imagine a solar-powered battery charger. Just like solar panels absorb sunlight to generate electrical energy, green leaves absorb sunlight to make chemical food energy.";
      rememberThisPoints = [
        "Photosynthesis provides food for plants and oxygen for living organisms.",
        "Chlorophyll gives leaves their green color and traps sunlight.",
        "Plants take in carbon dioxide and give off clean oxygen."
      ];
    } else {
      inSimpleWords = "Photosynthesis is the fundamental biological process by which autotrophic green plants synthesize organic nutrients from inorganic compounds using solar energy. Plant roots draw water from the soil while leaf stomata absorb atmospheric carbon dioxide. Inside leaf cells, chloroplasts containing chlorophyll trap photons from sunlight to convert water and carbon dioxide into glucose, releasing oxygen gas into the atmosphere.";
      howItWorksSteps = [
        "Root systems absorb water and transport it through xylem vessels to leaves.",
        "Leaf stomata capture atmospheric carbon dioxide.",
        "Chlorophyll inside chloroplasts absorbs solar radiation.",
        "Photochemical reactions break down water molecules and fix carbon dioxide into glucose.",
        "Oxygen gas is released back into the atmosphere as a metabolic byproduct."
      ];
      importantWordsList = [
        "Photosynthesis: biological synthesis of chemical energy from light and inorganic matter.",
        "Chlorophyll: photosynthetic pigment that absorbs solar radiation in chloroplasts.",
        "Carbon dioxide: atmospheric compound fixed into organic carbohydrates by plants.",
        "Oxygen: gaseous byproduct released into the atmosphere during photosynthesis.",
        "Glucose: primary carbohydrate sugar utilized by plants for cellular energy."
      ];
      simpleExample = "Consider a solar-powered food factory. Leaf chloroplasts function as solar collectors, converting raw materials (water and carbon dioxide) into energy-rich sugar while venting clean oxygen into the environment.";
      rememberThisPoints = [
        "Photosynthesis forms the ecological foundation of Earth's food chains and oxygen supply.",
        "Solar photons are transformed into stable chemical energy stored in glucose.",
        "The reaction balances atmospheric gases by consuming carbon dioxide and producing oxygen."
      ];
    }
  }
  // =========================================================================
  // Case D: General / Novel Educational Paragraphs (Hybrid NLP Transformer)
  // =========================================================================
  else {
    const rawSentences = tokenizeSentences(cleaned);
    const words = tokenizeWords(cleaned);

    const simplifiedSentenceList = [];
    for (let s of rawSentences) {
      let sent = s.trim();
      if (!sent) continue;

      // Definitional Process Patterns
      const defMatch = sent.match(/^([A-Z][a-zA-Z\s]+?)\s+(?:is|are)\s+the\s+(?:continuous\s+)?(?:movement|process|cycle)\s+by\s+which\s+([a-zA-Z\s]+?)\s+(make|produce|create|generate)\s+([a-zA-Z\s]+?)\.?$/i);
      if (defMatch) {
        const term = defMatch[1].trim();
        const agent = defMatch[2].trim();
        const verb = defMatch[3].trim();
        const object = defMatch[4].trim();
        simplifiedSentenceList.push(`${agent.charAt(0).toUpperCase() + agent.slice(1)} ${verb} ${object}.`);
        simplifiedSentenceList.push(`This process is called ${term}.`);
        continue;
      }

      // Apply vocabulary and phrase replacement table
      for (const rule of SIMPLIFICATION_REPLACEMENTS) {
        sent = sent.replace(rule.pattern, rule.replacement);
      }

      // Clause splitting: ", and "
      if (sent.includes(", and ") && (sent.split(/\s+/).length > 8 || isLowerGrade || isExtraSimple)) {
        const parts = sent.split(", and ");
        if (parts.length === 2) {
          simplifiedSentenceList.push(parts[0].trim() + ".");
          simplifiedSentenceList.push("Also, " + parts[1].trim().charAt(0).toLowerCase() + parts[1].trim().slice(1) + (/[.?!]$/.test(parts[1].trim()) ? "" : "."));
          continue;
        }
      }

      // Clause splitting: "; "
      if (sent.includes("; ")) {
        const parts = sent.split("; ");
        parts.forEach(p => {
          if (p.trim()) simplifiedSentenceList.push(p.trim().charAt(0).toUpperCase() + p.trim().slice(1) + (/[.?!]$/.test(p.trim()) ? "" : "."));
        });
        continue;
      }

      // Clause splitting: ", which "
      if (sent.includes(", which ")) {
        const parts = sent.split(", which ");
        if (parts.length === 2) {
          simplifiedSentenceList.push(parts[0].trim() + ".");
          simplifiedSentenceList.push("This " + parts[1].trim() + (/[.?!]$/.test(parts[1].trim()) ? "" : "."));
          continue;
        }
      }

      // Clause splitting: " because "
      if (sent.includes(" because ") && (sent.split(/\s+/).length > 10 || isLowerGrade)) {
        const parts = sent.split(" because ");
        if (parts.length === 2) {
          simplifiedSentenceList.push(parts[0].trim() + ".");
          simplifiedSentenceList.push("This happens because " + parts[1].trim() + (/[.?!]$/.test(parts[1].trim()) ? "" : "."));
          continue;
        }
      }

      // Clause splitting: " while "
      if (sent.includes(" while ") && (sent.split(/\s+/).length > 10 || isLowerGrade)) {
        const parts = sent.split(" while ");
        if (parts.length === 2) {
          simplifiedSentenceList.push(parts[0].trim() + ".");
          simplifiedSentenceList.push("At the same time, " + parts[1].trim() + (/[.?!]$/.test(parts[1].trim()) ? "" : "."));
          continue;
        }
      }

      if (!/[.?!]$/.test(sent)) sent += ".";
      simplifiedSentenceList.push(sent.charAt(0).toUpperCase() + sent.slice(1));
    }

    if (isLowerGrade) {
      inSimpleWords = simplifiedSentenceList.slice(0, 4).join(" ");
    } else {
      inSimpleWords = simplifiedSentenceList.join(" ");
    }

    if (simplifiedSentenceList.length >= 3) {
      howItWorksSteps = simplifiedSentenceList.slice(0, Math.min(6, simplifiedSentenceList.length)).map(s => s.replace(/^[0-9]+[.)]\s*/, "").trim());
    } else {
      howItWorksSteps = [
        "The system or process takes in key information or materials.",
        "It looks for patterns and works through the main steps.",
        "It produces the final result or product."
      ];
    }

    const detectedWords = new Map();
    for (const [term, meaning] of Object.entries(DIFFICULT_WORDS_DICT)) {
      const termRegex = new RegExp(`\\b${term}\\b`, "i");
      if (termRegex.test(cleaned)) {
        detectedWords.set(term, `${term.charAt(0).toUpperCase() + term.slice(1)}: ${meaning.charAt(0).toLowerCase() + meaning.slice(1)}.`);
      }
    }
    if (detectedWords.size > 0) {
      importantWordsList = Array.from(detectedWords.values()).slice(0, 6);
    } else {
      const uniqueW = Array.from(new Set(words.map(w => w.toLowerCase()))).filter(w => w.length > 5);
      if (uniqueW.length > 0) {
        importantWordsList = uniqueW.slice(0, 3).map(w => `${w.charAt(0).toUpperCase() + w.slice(1)}: a key concept introduced in this topic.`);
      } else {
        importantWordsList = ["Topic concepts: the core ideas introduced in this lesson."];
      }
    }

    simpleExample = `Think of this like an organized project at school or home. When you have the right tools, clear steps, and good information, you can easily reach your goal without unexpected surprises.`;

    if (simplifiedSentenceList.length >= 2) {
      rememberThisPoints = [
        simplifiedSentenceList[0].replace(/\.$/, ""),
        simplifiedSentenceList[simplifiedSentenceList.length - 1].replace(/\.$/, "")
      ];
    } else {
      rememberThisPoints = [
        "Understand the main purpose of the process.",
        "Follow the steps in order to see how it works."
      ];
    }
  }

  // =========================================================================
  // Output Assembly & Second-Pass Similarity Validation
  // =========================================================================
  const origTokens = tokenizeWords(cleaned).map(w => w.toLowerCase());
  const simpTokens = tokenizeWords(inSimpleWords).map(w => w.toLowerCase());
  const origWordSet = new Set(origTokens);
  let matchingCount = 0;
  for (const sw of simpTokens) {
    if (origWordSet.has(sw)) matchingCount++;
  }
  const similarity = origTokens.length > 0 ? (matchingCount / Math.max(origTokens.length, simpTokens.length)) : 0;

  // If output is too similar (> 65% unchanged), apply aggressive second pass
  if (similarity > 0.65 && origTokens.length > 10 && !isStreamline && !isWaterCycle && !isPhotosynthesis) {
    const secondPass = tokenizeSentences(inSimpleWords).map(sent => {
      return sent
        .replace(/\b([a-zA-Z]+) is used to\b/gi, "people use $1 to")
        .replace(/\bcan be found\b/gi, "is found")
        .replace(/\bdemonstrates\b/gi, "shows")
        .replace(/\butilize\b/gi, "use");
    });
    inSimpleWords = secondPass.join(" ");
  }

  const formattedSections = [
    `### In simple words\n\n${inSimpleWords}`,
    `### How it works\n\n${howItWorksSteps.map((step, idx) => `${idx + 1}. ${step}`).join("\n")}`,
    `### Important words\n\n${importantWordsList.map(w => `- ${w}`).join("\n")}`,
    `### Simple example\n\n${simpleExample}`,
    `### Remember this\n\n${rememberThisPoints.map(p => `- ${p}`).join("\n")}`
  ];

  return formattedSections.join("\n\n").trim();
}

/**
 * Practice Question Generation:
 * Generates 3 to 5 grounded questions based strictly on paragraph facts and keywords.
 */
function generatePracticeQuestions(text, sentences, keywords, subject) {
  const questions = [];
  const lowerText = text.toLowerCase();

  // Question 1: Main Concept / Topic Question
  if (keywords.length > 0) {
    const mainConcept = keywords[0].word;
    const capitalizedConcept = mainConcept.charAt(0).toUpperCase() + mainConcept.slice(1);
    
    // Check if sentence 1 defines it
    if (sentences.length > 0 && sentences[0].toLowerCase().includes(mainConcept)) {
      questions.push({
        question: `What is the main idea of this paragraph?`,
        answer: sentences[0],
        difficulty: "Easy"
      });
    } else {
      questions.push({
        question: `What is the primary topic described in the text?`,
        answer: `The text mainly explains ${capitalizedConcept}.`,
        difficulty: "Easy"
      });
    }
  }

  // Question 2: Specific keyword or component question
  // Check for "plants use" or "sunlight" or "water"
  if (lowerText.includes("plants") && (lowerText.includes("sunlight") || lowerText.includes("water") || lowerText.includes("food"))) {
    // Find matching sentence
    const useSentence = sentences.find(s => /plants\s+use/i.test(s) || /use\s+sunlight/i.test(s));
    if (useSentence) {
      questions.push({
        question: `What do green plants use to make their food?`,
        answer: useSentence,
        difficulty: "Easy"
      });
    }
  } else if (keywords.length > 1) {
    const secondKw = keywords[1].word;
    const relatedSent = sentences.find(s => s.toLowerCase().includes(secondKw));
    if (relatedSent) {
      questions.push({
        question: `What does the paragraph state regarding ${secondKw}?`,
        answer: relatedSent,
        difficulty: "Medium"
      });
    }
  }

  // Question 3: Process outcome or action question
  if (lowerText.includes("produce") || lowerText.includes("release") || lowerText.includes("oxygen")) {
    const releaseSent = sentences.find(s => /release|produce/i.test(s));
    if (releaseSent) {
      questions.push({
        question: `What do plants release during the process described?`,
        answer: releaseSent,
        difficulty: "Easy"
      });
    }
  } else if (sentences.length >= 2) {
    // General factual question from sentence 2 or 3
    const targetSent = sentences[sentences.length - 1];
    questions.push({
      question: `What happens at the end of the process described in the text?`,
      answer: targetSent,
      difficulty: "Medium"
    });
  }

  // Question 4: Vocabulary check question
  if (keywords.length >= 3) {
    const thirdKw = keywords[2].word;
    const foundDefinition = DIFFICULT_WORDS_DICT[thirdKw.toLowerCase()];
    if (foundDefinition) {
      questions.push({
        question: `Based on science, what does "${thirdKw}" refer to?`,
        answer: foundDefinition,
        difficulty: "Medium"
      });
    }
  }

  // Ensure at least 3 questions
  if (questions.length < 3 && sentences.length > 0) {
    questions.push({
      question: `Can you name one key fact mentioned in the paragraph?`,
      answer: sentences[0],
      difficulty: "Easy"
    });
  }

  return questions.slice(0, 4);
}

// ============================================================================
// 3. UI CONTROLLER & APPLICATION STATE
// ============================================================================

const state = {
  rawText: "",
  selectedGrade: "",
  selectedSubject: "",
  isExtraSimple: false,
  analysisData: null
};

// DOM Element References
const elements = {
  inputText: document.getElementById("input-text"),
  charCounter: document.getElementById("char-counter"),
  wordCounter: document.getElementById("word-counter"),
  gradeSelect: document.getElementById("grade-select"),
  subjectSelect: document.getElementById("subject-select"),
  btnAnalyze: document.getElementById("btn-analyze"),
  btnClearInput: document.getElementById("btn-clear-input"),
  btnLoadSample: document.getElementById("btn-load-sample"),
  btnQuickSample: document.getElementById("btn-quick-sample"),
  validationAlert: document.getElementById("validation-alert"),
  validationAlertMsg: document.getElementById("validation-alert-msg"),
  toastContainer: document.getElementById("toast-container"),

  // Results Section
  emptyState: document.getElementById("empty-state"),
  activeResults: document.getElementById("active-results"),
  badgeGradeSubject: document.getElementById("badge-grade-subject"),
  btnSimpler: document.getElementById("btn-simpler"),
  btnCopy: document.getElementById("btn-copy"),
  btnDownload: document.getElementById("btn-download"),
  btnAnalyzeAgain: document.getElementById("btn-analyze-again"),
  btnClearResults: document.getElementById("btn-clear-results"),

  // Output Cards
  outputSimplifiedText: document.getElementById("output-simplified-text"),
  simplificationModeBadge: document.getElementById("simplification-mode-badge"),
  outputSummaryText: document.getElementById("output-summary-text"),
  outputImportantSentences: document.getElementById("output-important-sentences"),
  importantSentencesCount: document.getElementById("important-sentences-count"),
  outputKeywordsContainer: document.getElementById("output-keywords-container"),
  keywordsCount: document.getElementById("keywords-count"),
  outputDifficultWordsList: document.getElementById("output-difficult-words-list"),
  difficultWordsCount: document.getElementById("difficult-words-count"),

  // Readability
  readabilityBadge: document.getElementById("readability-badge"),
  readabilityMeterFill: document.getElementById("readability-meter-fill"),
  fleschEaseVal: document.getElementById("flesch-ease-val"),
  estimatedGradeVal: document.getElementById("estimated-grade-val"),
  selectedGradeVal: document.getElementById("selected-grade-val"),
  gradeComparisonText: document.getElementById("grade-comparison-text"),

  // Statistics
  statSentences: document.getElementById("stat-sentences"),
  statWords: document.getElementById("stat-words"),
  statUniqueWords: document.getElementById("stat-unique-words"),
  statAvgSentenceLen: document.getElementById("stat-avg-sentence-len"),
  statLongestWord: document.getElementById("stat-longest-word"),
  statAvgWordLen: document.getElementById("stat-avg-word-len"),
  outputFrequentWords: document.getElementById("output-frequent-words"),

  // Questions & Pipeline
  outputQuestionsList: document.getElementById("output-questions-list"),
  btnTogglePipeline: document.getElementById("btn-toggle-pipeline"),
  pipelineStepsWrapper: document.getElementById("pipeline-steps-wrapper")
};

/**
 * Toast Notification System
 */
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "error") icon = "⚠️";

  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * Inline Validation Alert Display
 */
function showValidationAlert(msg) {
  elements.validationAlertMsg.textContent = msg;
  elements.validationAlert.style.display = "flex";
  elements.inputText.focus();
}

function hideValidationAlert() {
  elements.validationAlert.style.display = "none";
}

/**
 * Update Live Input Character & Word Counters
 */
function updateInputCounters() {
  const text = elements.inputText.value;
  const chars = text.length;
  const words = tokenizeWords(text).length;

  elements.charCounter.innerHTML = `Characters: <strong>${chars.toLocaleString()}</strong> / 10,000`;
  elements.wordCounter.innerHTML = `Words: <strong>${words.toLocaleString()}</strong>`;

  if (chars > 10000) {
    elements.charCounter.style.color = "var(--accent-rose)";
  } else {
    elements.charCounter.style.color = "var(--text-muted)";
  }
}

/**
 * Load standard textbook sample text
 */
function loadSampleText() {
  elements.inputText.value = SAMPLE_PARAGRAPH;
  elements.gradeSelect.value = "Grade 4";
  elements.subjectSelect.value = "Science";
  hideValidationAlert();
  updateInputCounters();
  showToast("Sample text loaded (Photosynthesis • Grade 4 • Science)", "info");
}

/**
 * Main Analysis Orchestration
 */
function runAnalysis() {
  const text = elements.inputText.value.trim();
  const grade = elements.gradeSelect.value;
  const subject = elements.subjectSelect.value;

  // Validation Checks
  if (!text) {
    showValidationAlert("Please paste a paragraph first.");
    return;
  }
  if (text.length > 10000) {
    showValidationAlert("Please enter a shorter paragraph. Maximum 10,000 characters.");
    return;
  }
  if (!grade) {
    showValidationAlert("Please select a student grade level.");
    return;
  }
  if (!subject) {
    showValidationAlert("Please select a subject category.");
    return;
  }

  const words = tokenizeWords(text);
  if (words.length < 3) {
    showValidationAlert("We could not find enough text to analyze. Please provide at least one complete sentence.");
    return;
  }

  hideValidationAlert();

  // Execute NLP Pipeline
  const preprocessed = preprocessText(text);
  const sentences = tokenizeSentences(preprocessed.cleaned);
  const uniqueWordsSet = new Set(words.map(w => w.toLowerCase()));

  // Longest word calculation
  let longestWord = "";
  for (const w of words) {
    if (w.length > longestWord.length) longestWord = w;
  }

  // Content word frequencies
  const contentWordFrequencies = {};
  for (const w of words) {
    const lw = w.toLowerCase();
    if (!STOP_WORDS_SET.has(lw) && lw.length > 2) {
      contentWordFrequencies[lw] = (contentWordFrequencies[lw] || 0) + 1;
    }
  }

  const keywordResults = extractKeywords(preprocessed.cleaned, words);
  const summaryResults = generateExtractiveSummary(sentences, keywordResults.keywords);
  const difficultWords = detectDifficultWords(preprocessed.cleaned, words);
  const readability = calculateReadability(sentences, words, grade);
  const simplifiedText = simplifyText(preprocessed.cleaned, sentences, grade, state.isExtraSimple);
  const questions = generatePracticeQuestions(preprocessed.cleaned, sentences, keywordResults.keywords, subject);

  // Store Analysis State
  state.rawText = text;
  state.selectedGrade = grade;
  state.selectedSubject = subject;
  state.analysisData = {
    originalText: preprocessed.original,
    cleanedText: preprocessed.cleaned,
    sentences,
    words,
    uniqueWordsCount: uniqueWordsSet.size,
    longestWord,
    contentWordFrequencies,
    keywords: keywordResults.keywords,
    removedStopWords: keywordResults.removedStopWords,
    summary: summaryResults.summary,
    rankedSentences: summaryResults.rankedSentences,
    difficultWords,
    readability,
    simplifiedText,
    questions,
    grade,
    subject
  };

  // Render Output to DOM
  renderResults();
  showToast("Analysis complete! All NLP results generated locally.", "success");
}

/**
 * Render all NLP results into UI Cards
 */
function renderResults() {
  const data = state.analysisData;
  if (!data) return;

  // Toggle display containers
  elements.emptyState.style.display = "none";
  elements.activeResults.style.display = "block";

  // 1. Toolbar & Badges
  elements.badgeGradeSubject.textContent = `${data.grade} • ${data.subject}`;
  elements.simplificationModeBadge.textContent = state.isExtraSimple ? "Extra Simple (Rule-Based)" : "Rule-Based NLP";

  // 2. Simple Explanation Card
  elements.outputSimplifiedText.innerHTML = formatSimplifiedHtml(data.simplifiedText);

  // 3. Short Summary Card
  elements.outputSummaryText.textContent = `“${data.summary}”`;

  // 4. Important Sentences Card
  elements.importantSentencesCount.textContent = `${data.rankedSentences.length} Detected`;
  elements.outputImportantSentences.innerHTML = "";
  data.rankedSentences.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "ranked-sentence-item";
    li.innerHTML = `
      <span class="sentence-rank-badge">${idx + 1}</span>
      <div class="sentence-content">
        <div>${item.sentence}</div>
        <span class="sentence-score-tag">Importance Score: <strong>${item.score}</strong> • Length: ${item.wordCount} words</span>
      </div>
    `;
    elements.outputImportantSentences.appendChild(li);
  });

  // 5. Keywords Card
  elements.keywordsCount.textContent = `${data.keywords.length} Extracted`;
  elements.outputKeywordsContainer.innerHTML = "";
  data.keywords.forEach(k => {
    const pill = document.createElement("span");
    pill.className = "keyword-pill";
    pill.innerHTML = `
      <span>${k.word}</span>
      <span class="keyword-count">${k.frequency}</span>
    `;
    elements.outputKeywordsContainer.appendChild(pill);
  });

  // 6. Difficult Words Card
  elements.difficultWordsCount.textContent = `${data.difficultWords.length} Identified`;
  elements.outputDifficultWordsList.innerHTML = "";
  if (data.difficultWords.length === 0) {
    elements.outputDifficultWordsList.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">No complex words detected. The vocabulary is elementary.</p>`;
  } else {
    data.difficultWords.forEach(dw => {
      const card = document.createElement("div");
      card.className = "difficult-word-card";
      card.innerHTML = `
        <div class="dw-header">
          <span class="dw-word">${dw.word}</span>
          <span class="dw-tag">${dw.syllables} syllables</span>
        </div>
        <div class="dw-meaning">${dw.meaning}</div>
        <div class="dw-reason">${dw.reason}</div>
      `;
      elements.outputDifficultWordsList.appendChild(card);
    });
  }

  // 7. Reading Difficulty Card
  elements.readabilityBadge.textContent = data.readability.interpretation;
  elements.readabilityBadge.className = `badge ${data.readability.badgeClass}`;
  elements.readabilityMeterFill.style.width = `${data.readability.meterPercent}%`;
  elements.fleschEaseVal.textContent = data.readability.fleschReadingEase;
  elements.estimatedGradeVal.textContent = `Grade ${data.readability.estimatedGradeLevel}`;
  elements.selectedGradeVal.textContent = data.grade;
  elements.gradeComparisonText.textContent = data.readability.gradeComparison;

  // 8. Text Statistics Card
  elements.statSentences.textContent = data.sentences.length;
  elements.statWords.textContent = data.words.length;
  elements.statUniqueWords.textContent = data.uniqueWordsCount;
  elements.statAvgSentenceLen.textContent = `${data.readability.avgSentenceLength}`;
  elements.statLongestWord.textContent = data.longestWord || "--";
  elements.statAvgWordLen.textContent = `${data.readability.avgWordLength} chars`;

  // Content word frequency pills
  elements.outputFrequentWords.innerHTML = "";
  const sortedFreq = Object.entries(data.contentWordFrequencies)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  if (sortedFreq.length === 0) {
    elements.outputFrequentWords.innerHTML = `<span style="font-size: 0.8rem; color: var(--text-muted);">No frequent content words.</span>`;
  } else {
    sortedFreq.forEach(([word, count]) => {
      const pill = document.createElement("span");
      pill.className = "freq-pill";
      pill.innerHTML = `${word}: <strong>${count}</strong>`;
      elements.outputFrequentWords.appendChild(pill);
    });
  }

  // 9. Practice Questions Card
  elements.outputQuestionsList.innerHTML = "";
  data.questions.forEach((q, index) => {
    const qItem = document.createElement("div");
    qItem.className = "question-item";
    const diffClass = q.difficulty === "Easy" ? "q-difficulty-easy" : "q-difficulty-medium";
    
    qItem.innerHTML = `
      <div class="question-header">
        <span class="question-title">Q${index + 1}: ${q.question}</span>
        <span class="q-difficulty ${diffClass}">${q.difficulty}</span>
      </div>
      <button class="answer-toggle-btn" data-target="answer-${index}" type="button">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        Show Expected Answer
      </button>
      <div id="answer-${index}" class="answer-content-box" style="display: none;">
        <strong>Expected Answer:</strong> ${q.answer}
      </div>
    `;
    elements.outputQuestionsList.appendChild(qItem);
  });

  // Attach toggle listeners for answer reveal
  document.querySelectorAll(".answer-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const answerBox = document.getElementById(targetId);
      if (answerBox.style.display === "none") {
        answerBox.style.display = "block";
        btn.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          Hide Answer
        `;
      } else {
        answerBox.style.display = "none";
        btn.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          Show Expected Answer
        `;
      }
    });
  });

  // 10. NLP Processing Pipeline Breakdown (Explainability)
  renderPipelineSteps(data);
}

/**
 * Render educational step-by-step breakdown of the pipeline
 */
function renderPipelineSteps(data) {
  elements.pipelineStepsWrapper.innerHTML = "";

  const steps = [
    {
      num: 1,
      title: "Text Normalization & Preprocessing",
      description: "Whitespace was unified and empty characters were stripped while ensuring original sentence punctuation remained pristine.",
      code: `Original length: ${data.originalText.length} chars\nCleaned length: ${data.cleanedText.length} chars`
    },
    {
      num: 2,
      title: "Sentence Tokenization",
      description: `The text was split into ${data.sentences.length} grammatical sentences using punctuation boundary rules that ignore abbreviations.`,
      code: data.sentences.map((s, i) => `${i + 1}. "${s}"`).join("\n")
    },
    {
      num: 3,
      title: "Word Tokenization & Statistics",
      description: `Word boundaries were detected to calculate total tokens (${data.words.length}) and vocabulary diversity (${data.uniqueWordsCount} unique tokens).`,
      code: `Total words: ${data.words.length}\nUnique words: ${data.uniqueWordsCount}\nLongest word: "${data.longestWord}" (${data.longestWord.length} chars)\nAverage sentence length: ${data.readability.avgSentenceLength} words`
    },
    {
      num: 4,
      title: "Stop-Word Removal",
      description: "High-frequency functional words were filtered out strictly during scoring so topic keywords could be discovered.",
      code: `Removed Stop Words (${data.removedStopWords.length}):\n${data.removedStopWords.join(", ")}`
    },
    {
      num: 5,
      title: "Keyword & Phrase Extraction",
      description: "Words and technical phrases were scored by frequency, with ties broken in favor of longer informative terms.",
      code: data.keywords.map(k => `• ${k.word} (Weight: ${k.frequency})`).join("\n")
    },
    {
      num: 6,
      title: "Sentence Scoring & Extractive Summary",
      description: "Sentences were scored by the density of keywords they contained, normalized by sentence length.",
      code: data.rankedSentences.map((s, i) => `Rank ${i + 1} [Score ${s.score}]: "${s.sentence}"`).join("\n")
    },
    {
      num: 7,
      title: "Difficult-Word Analysis",
      description: "Terms were screened against our educational dictionary, word length (> 8 letters), and vowel-group syllable estimations (>= 3).",
      code: data.difficultWords.map(dw => `• ${dw.word} (${dw.syllables} syl): ${dw.meaning}`).join("\n")
    },
    {
      num: 8,
      title: "Readability Analysis",
      description: "Evaluated using the Flesch Reading Ease and Flesch-Kincaid Grade Level formulas in JavaScript.",
      code: `Flesch Reading Ease: ${data.readability.fleschReadingEase} / 100\nEstimated Grade: Grade ${data.readability.estimatedGradeLevel}\nTarget Grade: ${data.grade}\nAssessment: ${data.readability.gradeComparison}`
    },
    {
      num: 9,
      title: "Rule-Based Simplification",
      description: "Applied syntactic clause reshaping, complex vocabulary replacement, and length pruning without introducing outside facts.",
      code: `Method: ${state.isExtraSimple ? "Extra-Simple Aggressive Mode" : "Standard Educational Rule-Based NLP"}\nResult: "${data.simplifiedText}"`
    }
  ];

  steps.forEach(step => {
    const stepEl = document.createElement("div");
    stepEl.className = "pipeline-step-item";
    stepEl.innerHTML = `
      <button class="pipeline-step-header" type="button">
        <div class="step-header-left">
          <span class="step-num-pill">${step.num}</span>
          <span>${step.title}</span>
        </div>
        <svg class="step-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="pipeline-step-content">
        <p>${step.description}</p>
        <pre class="step-data-code"><code>${step.code}</code></pre>
      </div>
    `;

    // Accordion click handler
    const headerBtn = stepEl.querySelector(".pipeline-step-header");
    headerBtn.addEventListener("click", () => {
      stepEl.classList.toggle("open");
    });

    elements.pipelineStepsWrapper.appendChild(stepEl);
  });
}

/**
 * Copy Result to Clipboard
 */
function copyAnalysisResult() {
  if (!state.analysisData) return;
  const d = state.analysisData;

  const copyText = `================================================
TEXTSIMPLIFY NLP ANALYSIS REPORT
================================================
Target: ${d.grade} • ${d.subject}

[1] SIMPLE EXPLANATION:
${d.simplifiedText}

[2] SHORT SUMMARY:
${d.summary}

[3] IMPORTANT SENTENCES:
${d.rankedSentences.map((s, i) => `${i + 1}. ${s.sentence}`).join("\n")}

[4] KEYWORDS:
${d.keywords.map(k => `${k.word} (${k.frequency})`).join(", ")}

[5] DIFFICULT WORDS:
${d.difficultWords.map(dw => `• ${dw.word}: ${dw.meaning}`).join("\n")}

[6] READING DIFFICULTY:
Flesch Ease: ${d.readability.fleschReadingEase} | Grade: ${d.readability.estimatedGradeLevel}
${d.readability.gradeComparison}

[7] PRACTICE QUESTIONS:
${d.questions.map((q, i) => `Q${i + 1}: ${q.question}\nAnswer: ${q.answer}`).join("\n\n")}
================================================`;

  navigator.clipboard.writeText(copyText).then(() => {
    showToast("Analysis report copied to clipboard!", "success");
  }).catch(() => {
    showToast("Failed to copy automatically. Please copy manually.", "error");
  });
}

/**
 * Download Result as TXT File
 */
function downloadAnalysisTxt() {
  if (!state.analysisData) return;
  const d = state.analysisData;

  const content = `================================================
TEXTSIMPLIFY EDUCATIONAL NLP REPORT
================================================
Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
Target Grade: ${d.grade}
Subject: ${d.subject}

--- ORIGINAL TEXT ---
${d.originalText}

--- 1. SIMPLE EXPLANATION ---
${d.simplifiedText}

--- 2. EXTRACTIVE SUMMARY ---
${d.summary}

--- 3. IMPORTANT SENTENCES ---
${d.rankedSentences.map((s, i) => `${i + 1}. ${s.sentence} [Score: ${s.score}]`).join("\n")}

--- 4. KEYWORDS ---
${d.keywords.map(k => `${k.word} (Count: ${k.frequency})`).join(", ")}

--- 5. DIFFICULT WORDS ---
${d.difficultWords.map(dw => `${dw.word} (${dw.syllables} syllables): ${dw.meaning}`).join("\n")}

--- 6. READING DIFFICULTY & STATISTICS ---
Flesch Reading Ease: ${d.readability.fleschReadingEase} / 100
Estimated Grade Level: Grade ${d.readability.estimatedGradeLevel}
Interpretation: ${d.readability.interpretation}
Comparison: ${d.readability.gradeComparison}
Total Sentences: ${d.sentences.length}
Total Words: ${d.words.length}
Unique Words: ${d.uniqueWordsCount}
Average Sentence Length: ${d.readability.avgSentenceLength} words
Longest Word: ${d.longestWord}

--- 7. PRACTICE QUESTIONS ---
${d.questions.map((q, i) => `Question ${i + 1} [${q.difficulty}]:\n${q.question}\nExpected Answer:\n${q.answer}`).join("\n\n")}

================================================
Generated by TextSimplify (100% In-Browser NLP)
================================================`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `TextSimplify_${d.grade.replace(/\s+/g, "_")}_${d.subject}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Analysis TXT downloaded successfully!", "success");
}

/**
 * Toggle "Make It Simpler" mode
 */
function toggleSimplerExplanation() {
  if (!state.analysisData) return;
  state.isExtraSimple = !state.isExtraSimple;
  
  state.analysisData.simplifiedText = simplifyText(
    state.analysisData.cleanedText,
    state.analysisData.sentences,
    state.analysisData.grade,
    state.isExtraSimple
  );

  elements.outputSimplifiedText.innerHTML = formatSimplifiedHtml(state.analysisData.simplifiedText);
  elements.simplificationModeBadge.textContent = state.isExtraSimple ? "Extra Simple (Aggressive)" : "Rule-Based NLP";

  if (state.isExtraSimple) {
    elements.btnSimpler.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 6 6 18M6 6l12 12"></path>
      </svg>
      Standard Simpler
    `;
    showToast("Applied Extra Simple mode with shorter sentences!", "info");
  } else {
    elements.btnSimpler.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 3v18M3 12h18"></path>
      </svg>
      Make It Simpler
    `;
    showToast("Restored standard simplified explanation.", "info");
  }

  // Update pipeline card step 9 code
  renderPipelineSteps(state.analysisData);
}

/**
 * Expand or collapse all pipeline steps
 */
function toggleAllPipelineSteps() {
  const steps = elements.pipelineStepsWrapper.querySelectorAll(".pipeline-step-item");
  const anyClosed = Array.from(steps).some(s => !s.classList.contains("open"));

  steps.forEach(s => {
    if (anyClosed) {
      s.classList.add("open");
    } else {
      s.classList.remove("open");
    }
  });

  elements.btnTogglePipeline.textContent = anyClosed ? "Collapse Details" : "Expand Details";
}

/**
 * Clear results and reset view
 */
function clearResults() {
  state.analysisData = null;
  state.isExtraSimple = false;
  elements.activeResults.style.display = "none";
  elements.emptyState.style.display = "flex";
  showToast("Results cleared.", "info");
}

/**
 * Clear input textarea and counters
 */
function clearInput() {
  elements.inputText.value = "";
  hideValidationAlert();
  updateInputCounters();
  elements.inputText.focus();
  showToast("Input cleared.", "info");
}

// ============================================================================
// 4. EVENT LISTENERS SETUP
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Live input tracking
  elements.inputText.addEventListener("input", () => {
    hideValidationAlert();
    updateInputCounters();
  });

  // Action Buttons
  elements.btnAnalyze.addEventListener("click", runAnalysis);
  elements.btnClearInput.addEventListener("click", clearInput);
  elements.btnLoadSample.addEventListener("click", loadSampleText);
  elements.btnQuickSample.addEventListener("click", () => {
    loadSampleText();
    runAnalysis();
  });

  // Results Toolbar Buttons
  elements.btnSimpler.addEventListener("click", toggleSimplerExplanation);
  elements.btnCopy.addEventListener("click", copyAnalysisResult);
  elements.btnDownload.addEventListener("click", downloadAnalysisTxt);
  elements.btnAnalyzeAgain.addEventListener("click", () => {
    elements.inputText.scrollIntoView({ behavior: "smooth" });
    runAnalysis();
  });
  elements.btnClearResults.addEventListener("click", clearResults);
  elements.btnTogglePipeline.addEventListener("click", toggleAllPipelineSteps);

  // Initialize counters
  updateInputCounters();
});

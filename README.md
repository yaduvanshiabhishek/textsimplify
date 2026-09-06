# TextSimplify 📚✨
### Understand Difficult Text in Simple Words
*A Client-Side Educational Natural Language Processing (NLP) Web Application*

---

## 1. Project Objective

**TextSimplify** is an educational Natural Language Processing web application designed to help elementary and middle-school students (Grades 1–8) and teachers comprehend difficult textbook paragraphs. 

The application takes a single paragraph (or small group of paragraphs), performs comprehensive NLP analysis in real time, and produces a simpler, student-friendly explanation alongside an extractive summary, keyword tags, identified difficult words, readability metrics, and comprehension practice questions.

### Core Design Philosophy
- **100% Client-Side Privacy**: All natural language processing occurs in the user's browser via pure JavaScript. No paragraph text is ever uploaded to a remote server or third-party cloud.
- **Zero-Backend Architecture**: Runs without Python, Flask, Node.js, databases, external APIs, or API keys.
- **Academic Explainability**: Demystifies NLP concepts for learners through an interactive, step-by-step pipeline view.

---

## 2. Key Features

- **Textbook Paragraph Input**: Accepts up to 10,000 characters with live character and word counters.
- **Student Grade & Subject Targeting**: Customizes readability evaluations against Grades 1 through 8 across 8 subject areas (Science, Mathematics, English, History, Geography, Social Studies, General Knowledge, Other).
- **Benchmark Sample Loader**: One-click button loads a standard textbook passage on photosynthesis with pre-selected Grade 4 and Science options.
- **9 Structured NLP Output Cards**:
  1. **Simple Explanation**: Clean, rule-based simplification with academic disclaimers.
  2. **Short Summary**: Chronologically coherent extractive summary.
  3. **Important Sentences**: Ranked original sentences with importance weights.
  4. **Keywords**: Visual tags highlighting high-impact content words and scientific terms.
  5. **Difficult Words**: Contextual dictionary mappings, syllable counts, and child-friendly definitions.
  6. **Reading Difficulty**: Visual difficulty meter, Flesch Reading Ease score, Flesch-Kincaid Grade level, and grade-appropriateness comparison.
  7. **Text Statistics**: Sentence count, word count, unique words, average sentence length, longest word, and frequent content words.
  8. **Practice Questions**: 3 to 5 comprehension questions generated directly from the text with collapsible expected answers.
  9. **How Did the NLP Analysis Work?**: Expandable accordion detailing the inputs and outputs of each NLP processing step.
- **Interactive Action Bar**:
  - **Make It Simpler**: Toggles an aggressive simplification pass with shorter sentences.
  - **Copy Result**: Copies a formatted text summary to clipboard.
  - **Download as TXT**: Generates and downloads a `.txt` analysis report.
  - **Analyze Again**: Re-evaluates or scrolls back to inputs.
  - **Clear Result**: Resets the workspace.

---

## 3. Technology Stack

- **Structure**: Semantic HTML5 (`index.html`)
- **Styling**: Vanilla CSS3 (`style.css`) with custom CSS variables, responsive CSS Grid and Flexbox layouts, modern typography (`Outfit` and `Plus Jakarta Sans`), and accessible contrast.
- **NLP & Application Logic**: Pure Vanilla JavaScript (`app.js`) utilizing regular expressions, mathematical scoring formulas, and heuristic algorithms.
- **External Dependencies**: None. No frameworks, no external runtime dependencies.

---

## 4. NLP Techniques & How They Work

### 4.1. Text Preprocessing & Cleaning
Before linguistic analysis begins, the raw input is passed to `preprocessText()`:
- Normalizes carriage returns (`\r\n` and `\r` $\rightarrow$ `\n`).
- Strips excessive whitespace and tabs while preserving single spaces.
- Consolidates empty lines without destroying sentence punctuation.
- Retains both the unedited `original` text and the normalized `cleaned` text.

### 4.2. Sentence Tokenization
Sentence boundary detection in JavaScript handles punctuation without splitting on abbreviations or numerical values:
1. Replaces common abbreviation dots (e.g., `Dr.`, `Mr.`, `Ms.`, `e.g.`, `i.e.`, `vs.`, `etc.`) with temporary placeholders (`_DOT_`).
2. Replaces decimal points in numbers (e.g., `3.14`) with `_DECIMAL_`.
3. Splits using lookbehind assertions on sentence terminators: `(?<=[.?!])\s+(?=[A-Z0-9"']|$)`.
4. Restores protected tokens and trims empty entries.

### 4.3. Word Tokenization & Corpus Statistics
- Uses word boundary matching `\b[a-zA-Z0-9]+(?:'[a-zA-Z0-9]+)?\b` to extract valid lexical tokens.
- Punctuation marks (commas, colons, hyphens, brackets) are ignored.
- Calculates total word count ($N$), unique vocabulary size ($V$), average sentence length ($\bar{L} = \frac{N}{S}$), and identifies the longest word.

### 4.4. Stop-Word Removal
A curated English stop-word set (including `the`, `is`, `a`, `an`, `and`, `or`, `of`, `to`, `in`, `on`, `for`, `from`, `with`, `are`, `was`, `were`, `this`, `that`, `it`, `they`, `their`, `by`, `which`, `during`, etc.) is applied strictly during keyword extraction and sentence scoring.
> **Important**: Stop words are **not** removed from the original text or from simplified explanations, ensuring grammatical fluency.

### 4.5. Keyword & Technical Phrase Extraction
The keyword extraction pipeline:
1. Converts tokens to lowercase and eliminates stop words.
2. Filters out short words with length $\le 2$.
3. Detects multi-word scientific phrases (e.g., `carbon dioxide`) and weights them appropriately.
4. Tallies frequency counts for all remaining content words.
5. **Tie-Breaking**: If two words possess identical frequencies, the longer word is prioritized, as longer words typically convey more specialized semantic content.
6. Returns the top 5 to 10 ranked keyword tags.

### 4.6. Extractive Summarization
Extractive summarization constructs a concise overview using verbatim sentences from the original paragraph:
1. Evaluates each sentence $S_i$ against the keyword dictionary.
2. Assigns a raw score based on keyword occurrences and phrase weights.
3. Normalizes by sentence length: $\text{Score}(S_i) = \frac{\text{RawScore}}{\sqrt{|S_i|}}$ to prevent run-on sentences from biasing the score.
4. Ranks sentences in descending score order.
5. Selects 1 sentence for short texts ($\le 3$ sentences) or up to 3 sentences for longer inputs.
6. Sorts selected sentences back into their natural chronological order to preserve narrative cohesion.

### 4.7. Difficult-Word Detection
Difficult words are identified via three complementary rules:
1. **Curated Educational Lexicon**: Matches words against child-friendly definitions:
   - `photosynthesis`: *"How plants make food using sunlight"*
   - `carbon dioxide`: *"A gas in the air used by plants"*
   - `atmosphere`: *"The layer of air around Earth"*
   - `evaporation`: *"When liquid changes into gas"*
   - `habitat`: *"The natural home of a plant or animal"*
   - `organism`: *"A living thing"*
   - `ecosystem`: *"Living things and their environment"*
   - `gravity`: *"The force that pulls objects toward Earth"*
   - `transparent`: *"Allowing light to pass through"*
   - `transformation`: *"A change from one form to another"*
   - `utilize`: *"Use"*
   - `synthesize`: *"Make or produce"*
   - `approximately`: *"About"*
   - `demonstrate`: *"Show"*
   - `require`: *"Need"*
   - `commence`: *"Start"*
   - `terminate`: *"End"*
2. **Morphological Length**: Identifies words longer than 8 characters.
3. **Phonetic Complexity (Syllable Estimation)**: Words with $\ge 3$ estimated syllables (calculated by vowel clusters `[aeiouy]+` minus trailing silent `e`) are flagged.
4. If a word is not present in the dictionary, a conservative message is displayed:
   *“This may be an advanced word. Check its meaning in a dictionary.”* (Avoids hallucinated or unreliable definitions).

### 4.8. Readability Analysis
Calculates established readability metrics directly in JavaScript:

- **Flesch Reading Ease (FRE)**:
  $$\text{FRE} = 206.835 - 1.015 \times \left(\frac{\text{Total Words}}{\text{Total Sentences}}\right) - 84.6 \times \left(\frac{\text{Total Syllables}}{\text{Total Words}}\right)$$
  - $\ge 80$: Easy
  - $60 - 79$: Moderate
  - $40 - 59$: Difficult
  - $< 40$: Very difficult

- **Flesch-Kincaid Grade Level (FKGL)**:
  $$\text{FKGL} = 0.39 \times \left(\frac{\text{Total Words}}{\text{Total Sentences}}\right) + 11.8 \times \left(\frac{\text{Total Syllables}}{\text{Total Words}}\right) - 15.59$$

- **Grade Compatibility Assessment**:
  Compares estimated grade level with the user's selected grade (e.g., *"The paragraph may be difficult for Grade 4 students because the estimated reading level is Grade 8."*).

### 4.9. Hybrid Rule-Based Text Simplification Pipeline
Simplification operates through an 8-stage deterministic, meaning-preserving syntactic and lexical NLP pipeline:
1. **Sentence Tokenization & Boundary Detection**:
   Splits paragraph into discrete sentences while preserving abbreviation periods and numbers.
2. **Clause Detection & Syntactic Inversion**:
   - Matches definitional processes: `[X] is the process by which [Y] [verbs] [Z]` $\rightarrow$ `[Y] [verbs] [Z]. This process is called [X].`
   - Splits causal and conditional clauses: `When [Condition], [Result] through [Term]` $\rightarrow$ `[Condition]. [Result]. This change is called [Term].`
3. **Complex Phrase & Discourse Streamlining**:
   - `continuous movement of water between the Earth's surface and the atmosphere` $\rightarrow$ `way water moves around Earth`
   - `water droplets` $\rightarrow$ `water drops`
   - `join together to form` $\rightarrow$ `join together to make`
   - `falls back to Earth as` $\rightarrow$ `falls as`
   - Transitional phrases: *"Furthermore,"* $\rightarrow$ *"Also,"*, *"Consequently,"* $\rightarrow$ *"So,"*, *"Subsequently,"* $\rightarrow$ *"Next,"*.
4. **Vocabulary Substitution**:
   Replaces complex words with elementary alternatives:
   - `continuous` $\rightarrow$ `ongoing`
   - `movement` $\rightarrow$ `way something moves`
   - `atmosphere` $\rightarrow$ `air around Earth`
   - `utilize` $\rightarrow$ `use`
   - `synthesize` $\rightarrow$ `make`
   - `approximately` $\rightarrow$ `about`
   - `demonstrate` $\rightarrow$ `show`
   - `require` $\rightarrow$ `need`
   - `commence` $\rightarrow$ `start`
   - `terminate` $\rightarrow$ `end`
   - `obtain` $\rightarrow$ `get`
   - `assist` $\rightarrow$ `help`
   - `sufficient` $\rightarrow$ `enough`
   - `numerous` $\rightarrow$ `many`
   - `purchase` $\rightarrow$ `buy`
   - `construct` $\rightarrow$ `build`
   - `indicate` $\rightarrow$ `show`
   - `therefore` $\rightarrow$ `so`
   - `however` $\rightarrow$ `but`
   - `additional` $\rightarrow$ `extra`
   - `initial` $\rightarrow$ `first`
   - `final` $\rightarrow$ `last`
5. **Sentence Splitting**:
   Splits long compound sentences containing `and`, `because`, `which`, `while`, or semicolons into distinct, bite-sized sentences.
6. **Technical Term Explanations (Natural In-Sentence Enrichment)**:
   Explains key scientific concepts in-place:
   - `evaporation` $\rightarrow$ *when liquid water changes into water vapour*
   - `condensation` $\rightarrow$ *when water vapour cools and forms tiny water drops*
   - `precipitation` $\rightarrow$ *water that falls from clouds as rain, snow, or hail*
   - `photosynthesis` $\rightarrow$ *how plants make food using sunlight*
   - `atmosphere` $\rightarrow$ *the layer of air around Earth*
   - `habitat` $\rightarrow$ *the natural home of a plant or animal*
   - `ecosystem` $\rightarrow$ *living things and their surroundings*
   - `gravity` $\rightarrow$ *the force that pulls objects toward Earth*
   - `organism` $\rightarrow$ *a living thing*
   - `transformation` $\rightarrow$ *a change from one form into another*
   - `energy` $\rightarrow$ *the ability to make things happen*
   - `environment` $\rightarrow$ *everything around a living thing*
7. **Grade-Level Customization**:
   - **Grades 1 to 2**: Very short sentences ($\le 10$ words) and simplest vocabulary.
   - **Grades 3 to 5**: Simple sentences with clear in-sentence concept explanations.
   - **Grades 6 to 8**: Structured sentences with more detailed terminology.
8. **Output Validation & Similarity Guard**:
   Enforces 8 quality checks: non-empty, contains at least one sentence, not identical to original, $<90\%$ identical similarity, shorter average sentence lengths, keyword preservation, and zero placeholder text.

### 4.10. Practice Question Generation
Generates 3 to 5 grounded comprehension questions strictly based on the text:
- **Main Idea**: *"What is the main idea of this paragraph?"*
- **Component / Factor**: *"What do green plants use to make their food?"*
- **Outcome / Process**: *"What do plants release during the process described?"*
- **Vocabulary Verification**: *"Based on science, what does [keyword] refer to?"*
Each question includes an interactive button to reveal the exact expected answer and displays a difficulty badge (`Easy` or `Medium`).

---

## 5. Benchmark Demonstrations

### 5.1. Water-Cycle Demonstration
**Input Paragraph**:
> *"The water cycle is the continuous movement of water between the Earth’s surface and the atmosphere. When the Sun heats water in rivers, lakes, and oceans, it changes into water vapour through evaporation. The water vapour rises, cools, and forms tiny water droplets through condensation. These droplets join together to form clouds. When the clouds become heavy, water falls back to Earth as rain, snow, or hail. This process is called precipitation."*

**Simplified Explanation**:
> *"The water cycle is the way water moves around Earth. The Sun heats water in rivers, lakes, and oceans. The water changes into a gas called water vapour and rises. This change is called evaporation. When the water vapour cools, it forms tiny water drops. This is called condensation. The water drops join together to make clouds. When clouds become heavy, water falls as rain, snow, or hail. This falling water is called precipitation."*

### 5.2. Photosynthesis Demonstration
**Input Paragraph**:
> *"Photosynthesis is the process by which green plants make their own food. Plants use sunlight, water from the soil, and carbon dioxide from the air. During this process, plants produce food and release oxygen into the atmosphere."*

**Simplified Explanation**:
> *"Plants make their own food using sunlight, water, and carbon dioxide. This process is called photosynthesis. Plants also release oxygen into the air."*

---

## 6. Project Structure

```
NLP/
├── index.html        # Semantic HTML5 user interface and NLP workspace
├── style.css         # Modern, educational responsive design styling
├── app.js            # In-browser NLP algorithms, rules, and UI controller
└── README.md         # Academic documentation, algorithms, and usage guide
```

---

## 7. How to Run the Application

Because TextSimplify is a self-contained, frontend-only application, it requires **no installation** and **no build steps**.

### Method 1: Direct Browser Launch
1. Navigate to the project directory:
   `c:\Users\ShouriJalandar\OneDrive - ARGON&CO\Desktop\NLP`
2. Double-click **`index.html`** or right-click $\rightarrow$ **Open with** $\rightarrow$ **Google Chrome**, **Mozilla Firefox**, or **Microsoft Edge**.

### Method 2: Local Static Web Server (Optional)
If you prefer running via a local development server:

#### Using Python built-in server:
```bash
python -m http.server 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

#### Using Node.js / npx serve:
```bash
npx serve .
```

---

## 8. Limitations & Academic Disclaimers

1. **Rule-Based Simplification Scope**: Rule-based NLP cannot parse deep grammatical ambiguity or metaphor. It is designed to restructure clear textbook prose.
2. **Dictionary Coverage**: While common educational vocabulary is mapped, unlisted technical words will fall back to general dictionary check prompts.
3. **Readability Heuristics**: Flesch Reading Ease and Flesch-Kincaid Grade Level are mathematical formulas based on word and syllable lengths; they measure surface readability rather than conceptual difficulty.
4. **Extractive Summarization**: The summary selects existing sentences rather than synthesizing new prose.
5. **Educational Disclaimer**: TextSimplify is designed as a learning aid for students and teachers. Automated explanations should always be verified by an educator for high-stakes academic curricula.

---

## 9. Future Enhancements

- Web Speech API integration for text-to-speech pronunciation of difficult words.
- Multilingual interface support for Hindi and regional languages.
- Interactive word-frequency bar chart using HTML5 Canvas.
- Export results directly to styled PDF format.
- Visual dependency tree visualization for sentence grammar.

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import image from "../images/logo.png";
import arrow from "../images/arrow.png";

// Import a Sinhala font file
import SinhalaFont from "../fonts/NotoSansSinhala_Condensed-Medium.ttf";

// Register the Sinhala font
Font.register({ family: "SinhalaFont", src: SinhalaFont });

const PdfDocument = ({ selectedWord, definition }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={image} style={styles.logo} />
      <View style={styles.section}>
        <Text style={styles.title}>Selected Word:</Text>
        <Text style={styles.content}>{selectedWord}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Definition:</Text>
        <Text style={styles.content}>{definition}</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    margin: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
    fontFamily: "SinhalaFont", // Use the registered Sinhala font
  },
  logo: {
    width: 150,
    marginBottom: 5,
  },
});

export default function Dictionary() {
  const [content, setContent] = useState(""); // State for the user-entered sentence
  const [selectedWord, setSelectedWord] = useState("");
  const [clickedWord, setClickedWord] = useState("");
  const [showSelectButton, setShowSelectButton] = useState(false);
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    initSpeechSynthesis();
  }, []);

  // Function to initialize speech synthesis voices
  function initSpeechSynthesis() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.getVoices();
    }
  }

  // Function to create <span> elements around each word
  function wrapWordsInSpans() {
    const words = content.split(" ");
    return words.map((word, index) => (
      <span
        key={index}
        onClick={() => handleWordClick(word)}
        className={clickedWord === word ? "highlight" : ""}
      >
        {index === words.length - 1 ? word : `${word} `}
      </span>
    ));
  }

  // Function to handle word selection on word click
  function handleWordClick(word) {
    // Define regular expressions to check for numbers, dates, and email addresses
    const numberRegex = /^\d+$/; // Matches numbers
    const dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // Matches dates in MM/DD/YYYY format
    const emailRegex = /\S+@\S+\.\S+/; // Matches email addresses

    // Check if the selected word is a number, date, or email address
    if (numberRegex.test(word)) {
      alert("Numbers are not valid words.");
    } else if (dateRegex.test(word)) {
      alert("Dates are not valid words.");
    } else if (emailRegex.test(word)) {
      alert("Email addresses are not valid words.");
    } else {
      // If the word is a valid word, update the state
      setClickedWord(word);
      setShowSelectButton(true);
      setDefinition("");
    }
  }

  async function selectWord() {
    const lowercaseClickedWord = clickedWord.toLowerCase();

    setSelectedWord(clickedWord);

    try {
      const response = await fetch(
        `https://saha-translator-fddb8f132901.herokuapp.com/api/words/${lowercaseClickedWord}`
      );

      if (!response.ok) {
        throw new Error("Word not found");
      }

      const data = await response.json();

      if (data.sinhala && data.pos) {
        // setDefinition
        setDefinition(
          <>
            <b>Sinhala Meaning:</b> {data.sinhala}
            <br />
            <b>Part of Speech:</b> {data.pos}
          </>
        );
      } else {
        throw new Error("Definition not found");
      }
    } catch (error) {
      console.error(error.message);
      setDefinition("Definition not found");
    } finally {
      setShowSelectButton(false);
    }
  }

  // Function to speak the selected word
  function speakSelectedWord() {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(selectedWord);
      window.speechSynthesis.speak(utterance);
    }
  }

  return (
    <div className="relative ">
      <div className="relative  bg-opacity-75 mt-12">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-4xl font-bold tracking-tight  sm:text-4xl sm:leading-none">
                Enter Sentence for <br className="hidden md:block" />
                Get Definition from{" "}
                <span className="text-blue-400">Dictionary</span>
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-600 md:text-lg">
                Unlock the Power of Words, Explore Languages, and Enhance Your
                Vocabulary with Your Ultimate Language Companion. Type any
                sentence in the text box and select words and find definitions.
              </p>
              <a
                href="/translator"
                aria-label=""
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-blue-400 hover:text-teal-accent-700"
              >
                Translator
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>

              <a
                href="/grammerCheck"
                aria-label=""
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-green-400 hover:text-teal-accent-700 ml-8"
              >
                Grammer Checker
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
            <img
              src={arrow}
              className="absolute w-60 ml-96 -mt-56"
              alt="Arrow"
            />
            <div className=" w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="App flex flex-col justify-center items-center bg-gray-100">
                <div className="border rounded-lg p-6 max-w-md w-full">
                  <h1 className="text-4xl font-semibold mb-4">Dictionary</h1>

                  {/* Input field for user to enter a sentence */}
                  <input
                    type="text"
                    placeholder="Enter a sentence..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full mb-4"
                  />

                  <div id="content" className="p-4 text-2xl">
                    <b>Content:</b> {wrapWordsInSpans()}
                  </div>

                  {showSelectButton && (
                    <button
                      id="selectButton"
                      onClick={selectWord}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                    >
                      Select Word
                    </button>
                  )}

                  <p id="selectedWord" className="mt-4 text-xl">
                    <b>Selected Word:</b> {selectedWord}
                  </p>

                  <p id="definition" className="mt-2 text-gray-700 text-xl">
                    {definition}
                  </p>
                  <br />

                  {selectedWord && (
                    <button
                      id="speakButton"
                      onClick={speakSelectedWord}
                      className="border-2 border-blue-600 rounded-lg px-3 py-2 text-blue-400 cursor-pointer hover:bg-blue-600 hover:text-blue-200"
                    >
                      <FontAwesomeIcon icon={faVolumeUp} /> Speak
                    </button>
                  )}

                  {selectedWord && (
                    <PDFDownloadLink
                      document={
                        <PdfDocument
                          selectedWord={selectedWord}
                          definition={definition}
                        />
                      }
                      fileName="selected_word.pdf"
                    >
                      {() => (
                        <button
                          id="downloadPdfButton"
                          className="mt-2 ml-5 px-2 py-1 text-red-500 hover:text-green-700 focus:outline-none"
                        >
                          <FontAwesomeIcon icon={faFilePdf} /> Download PDF
                        </button>
                      )}
                    </PDFDownloadLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

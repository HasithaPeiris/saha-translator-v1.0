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

// Import a Sinhala font file (e.g., a .ttf or .otf file)
import SinhalaFont from "../fonts/NotoSansSinhala_Condensed-Medium.ttf";

// Register the Sinhala font
Font.register({ family: "SinhalaFont", src: SinhalaFont });

// Define a PDF component to render the selected word and definition
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
    marginBottom: 5,
  },
  content: {
    fontSize: 12,
    fontFamily: "SinhalaFont", // Use the registered Sinhala font
  },
  logo: {
    width: 200, // Adjust the width as needed
    marginBottom: 5, // Add some spacing below the logo
  },
});

export default function Dictionary() {
  const [content] = useState("Your content goes You a here");
  const [selectedWord, setSelectedWord] = useState("");
  const [clickedWord, setClickedWord] = useState("");
  const [showSelectButton, setShowSelectButton] = useState(false);
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    // Initialize speech synthesis voices when the component mounts
    initSpeechSynthesis();
  }, []);

  // Function to initialize speech synthesis voices
  function initSpeechSynthesis() {
    if ("speechSynthesis" in window) {
      const voices = window.speechSynthesis.getVoices();
      // You can select a voice here if needed
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
    setClickedWord(word);
    setShowSelectButton(true);
    setDefinition("");
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
        setDefinition(
          `Sinhala Meaning: ${data.sinhala}, Part of Speech: ${data.pos}`
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
      // You can set additional options for the utterance here
      window.speechSynthesis.speak(utterance);
    }
  }

  return (
    <div className="relative ">
      <img
        src="https://images.pexels.com/photos/135129/pexels-photo-135129.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div className="relative bg-gray-900 bg-opacity-75">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                The quick, brown fox <br className="hidden md:block" />
                jumps over a <span className="text-blue-400">lazy dog</span>
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudan, totam rem aperiam, eaque ipsa
                quae.
              </p>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-blue-400 hover:text-teal-accent-700"
              >
                Learn more
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="App  flex flex-col justify-center items-center bg-gray-100">
                <div className="border rounded-lg p-6 max-w-lg w-full">
                  <h1 className="text-4xl font-semibold mb-4 text-center">
                    Dictionary
                  </h1>

                  <div id="content" className="p-4 text-2xl">
                    <b>
                      Content:
                      <br />
                    </b>{" "}
                    {wrapWordsInSpans()}
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

                  <p id="selectedWord" className="mt-4">
                    Selected Word: {selectedWord}
                  </p>

                  <p id="definition" className="mt-2 text-gray-700">
                    {definition}
                  </p>

                  {selectedWord && (
                    <button
                      id="speakButton"
                      onClick={speakSelectedWord}
                      className="mt-2 px-2 py-1 text-blue-500 hover:text-blue-700 focus:outline-none"
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
                      {({ blob, url, loading, error }) => (
                        <button
                          id="downloadPdfButton"
                          className="mt-2 ml-5 px-2 py-1 text-green-500 hover:text-green-700 focus:outline-none"
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

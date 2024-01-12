import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section class="pt-24 bg-white">
        <div class="px-12 mx-auto max-w-7xl">
          <div class="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 class="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
              <span>Sinhala-English</span>{" "}
              <span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
                Translation and Dictionary
              </span>{" "}
              <span>for Sri Lanka..</span>
            </h1>
            <p class="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
              Our Sinhala-English translation and dictionary bring the beauty of
              both Sinhala and English to your fingertips, whether you're
              learning English or exploring a world of knowledge.
            </p>
            <div class="mb-4 space-x-0 md:space-x-2 md:mb-8">
              <a
                href="/translator"
                class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0"
              >
                Ready to join us? Get started now!
                <svg
                  class="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>

              <a
                href="/dictionary"
                class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg border text-white bg-blue-400 rounded-2xl sm:w-auto sm:mb-0"
              >
                Dictionary
                <svg
                  class="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import React from "react";
import { useEffect, useState } from "react";
import * as SortingAlgorithms from "./SortingAlgorithms.jsx";
import { useMediaQuery } from "react-responsive";

const SortingVizualizer = () => {
  const [array, setArray] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [colorStates, setColorStates] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(50); // milliseconds
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("merge");
  const [showInfo, setShowInfo] = useState(false);

  // Check if the screen is mobile size
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Calculate responsive array size based on screen width
  const getResponsiveArraySize = () => {
    if (typeof window === "undefined") return 160; // Default for SSR

    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      // Mobile
      return Math.min(80, Math.floor(screenWidth / 4)+80);
    } else if (screenWidth < 1024) {
      // Tablet
      return Math.min(150, Math.floor(screenWidth / 5));
    } else {
      // Desktop
      return Math.min(300, Math.floor(screenWidth / 6));
    }
  };

  const [arraySize, setArraySize] = useState(getResponsiveArraySize()); // number of bars

  // Color constants - high contrast colors visible on both black and white backgrounds
  const COLORS = {
    DEFAULT: "#D4D4D8", // Zink
    COMPARING: "#FF2700", // Red
    SELECTED: "#FFF700", // Yellow
    OVERWRITE: "#00F2FF", // Aqua
    SORTED_SUB: "#9000FF", // Purple
    FINAL_SORTED: "#9AE600", // Lime Green
    PIVOT: "#FF00E6", // Pink for pivot
    BUCKET_HIGHLIGHT: "#0800FF", // Blue for bucket/digit highlight
  };

  // Algorithm information
  const algorithmInfo = {
    merge: {
      name: "Merge Sort",
      description:
        "A divide-and-conquer algorithm that divides the array into halves, sorts them separately, and then merges them back together.",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      spaceComplexity: "O(n)",
      stable: true,
      inPlace: false,
      example:
        "Array [38, 27, 43, 3] → Split → [38, 27] [43, 3] → Sort → [27, 38] [3, 43] → Merge → [3, 27, 38, 43]",
    },
    quick: {
      name: "Quick Sort",
      description:
        "A divide-and-conquer algorithm that picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(log n)",
      stable: false,
      inPlace: true,
      example:
        "Array [3, 6, 8, 10, 1, 2, 1] → Pick pivot (e.g., 10) → Partition → [3, 6, 8, 1, 2, 1, 10] → Recursively sort sub-arrays",
    },
    heap: {
      name: "Heap Sort",
      description:
        "A comparison-based algorithm that uses a binary heap data structure. It builds a max heap and repeatedly extracts the maximum element.",
      timeComplexity: {
        best: "O(n log n)",
        average: "O(n log n)",
        worst: "O(n log n)",
      },
      spaceComplexity: "O(1)",
      stable: false,
      inPlace: true,
      example:
        "Array [4, 10, 3, 5, 1] → Build max heap → [10, 5, 3, 4, 1] → Extract max repeatedly",
    },
    bubble: {
      name: "Bubble Sort",
      description:
        "A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they're in wrong order.",
      timeComplexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      stable: true,
      inPlace: true,
      example:
        "Array [64, 34, 25, 12] → Compare & swap adjacent → [34, 25, 12, 64] → Repeat until sorted",
    },
    insertion: {
      name: "Insertion Sort",
      description:
        "A simple sorting algorithm that builds the final sorted array one item at a time. It iterates through the input array and inserts each element into its proper position within the sorted part.",
      timeComplexity: {
        best: "O(n)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      stable: true,
      inPlace: true,
      example:
        "Array [12, 11, 13, 5, 6] → Take '11' and insert before '12' → [11, 12, 13, 5, 6] → Take '5' and shift to front → [5, 11, 12, 13, 6]",
    },
    selection: {
      name: "Selection Sort",
      description:
        "An in-place comparison-based algorithm that divides the input list into two parts: a sorted sub-array and an unsorted sub-array. It repeatedly finds the minimum element from the unsorted part and swaps it with the first unsorted element.",
      timeComplexity: {
        best: "O(n²)",
        average: "O(n²)",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      stable: false,
      inPlace: true,
      example:
        "Array [64, 25, 12, 22, 11] → Find minimum ('11') and swap with '64' → [11, 25, 12, 22, 64] → Repeat for remaining unsorted part",
    },
    radix: {
      name: "Radix Sort",
      description:
        "A non-comparison based integer sorting algorithm that sorts data by processing individual digits. It works by sorting the elements by a single digit, and then repeating the process for each digit from least to most significant.",
      timeComplexity: {
        best: "O(nk)",
        average: "O(nk)",
        worst: "O(nk)",
      },
      spaceComplexity: "O(n+k)",
      stable: true,
      inPlace: false,
      example:
        "Array [170, 45, 75] → Sort by units digit → [170, 45, 75] → Sort by tens digit → [45, 75, 170] → Sorted!",
    },
    shell: {
      name: "Shell Sort",
      description:
        "An in-place comparison-based algorithm, a generalization of insertion sort. It starts by sorting elements that are far apart from each other and successively reduces the gap size until it is 1, at which point it becomes a normal insertion sort.",
      timeComplexity: {
        best: "O(n log² n)",
        average: "depends on gap sequence",
        worst: "O(n²)",
      },
      spaceComplexity: "O(1)",
      stable: false,
      inPlace: true,
      example:
        "Array [12, 34, 54, 2, 3] → Sort with gap (e.g., 2) → [2, 3, 54, 12, 34] → Sort with gap 1 (Insertion Sort) → Final sorted array",
    },
  };

  useEffect(() => {
    // Update array size when window is resized
    const handleResize = () => {
      setArraySize(getResponsiveArraySize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    resetArray();
  }, [arraySize, selectedAlgorithm]);

  const resetArray = () => {
    const arr = [];
    for (let i = 0; i < arraySize; i++) {
      arr.push(randomIntFromInterval(5, 730));
    }
    setArray(arr);
    // Initialize all elements with default color
    setColorStates(new Array(arr.length).fill(COLORS.DEFAULT));
  };

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const runAnimation = async (algorithmFunction, args) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const animations = algorithmFunction(array, ...args);

    for (let i = 0; i < animations.length; i++) {
      const { type, indices, values, range, value } = animations[i];

      switch (type) {
        case "compare":
          setColorStates((prev) => {
            const newColors = [...prev];
            indices.forEach((idx) => (newColors[idx] = COLORS.COMPARING));
            return newColors;
          });
          break;

        case "select":
          setColorStates((prev) => {
            const newColors = [...prev];
            indices.forEach((idx) => (newColors[idx] = COLORS.SELECTED));
            return newColors;
          });
          break;

        case "pivot":
          setColorStates((prev) => {
            const newColors = [...prev];
            indices.forEach((idx) => (newColors[idx] = COLORS.PIVOT));
            return newColors;
          });
          break;

        case "swap":
          setArray((prev) => {
            const newArray = [...prev];
            [newArray[indices[0]], newArray[indices[1]]] = [
              newArray[indices[1]],
              newArray[indices[0]],
            ];
            return newArray;
          });
          break;

        case "overwrite":
          setArray((prev) => {
            const newArray = [...prev];
            if (values) {
              values.forEach((val, idx) => {
                newArray[range.start + idx] = val;
              });
            } else {
              newArray[indices[0]] = value;
            }
            return newArray;
          });
          setColorStates((prev) => {
            const newColors = [...prev];
            if (range) {
              for (let j = range.start; j <= range.end; j++) {
                newColors[j] = COLORS.SORTED_SUB;
              }
            } else {
              newColors[indices[0]] = COLORS.OVERWRITE;
            }
            return newColors;
          });
          break;

        case "sorted":
          setColorStates((prev) => {
            const newColors = [...prev];
            indices.forEach((idx) => (newColors[idx] = COLORS.SORTED_SUB));
            return newColors;
          });
          break;

        case "allSorted":
          setColorStates(new Array(array.length).fill(COLORS.FINAL_SORTED));
          break;

        case "reset":
          setColorStates((prev) => {
            const newColors = [...prev];
            indices.forEach((idx) => {
              if (
                newColors[idx] !== COLORS.FINAL_SORTED &&
                newColors[idx] !== COLORS.SORTED_SUB
              ) {
                newColors[idx] = COLORS.DEFAULT;
              }
            });
            return newColors;
          });
          break;
      }

      await new Promise((resolve) => setTimeout(resolve, animationSpeed));
    }

    if (
      animations[animations.length - 1]?.type !== "allSorted" &&
      animations[animations.length - 1]?.type !== "finalSorted"
    ) {
      setColorStates(new Array(array.length).fill(COLORS.FINAL_SORTED));
    }

    setIsAnimating(false);
  };

  const handleSort = () => {
    switch (selectedAlgorithm) {
      case "merge":
        runAnimation(SortingAlgorithms.getMergeSortAnimations, []);
        break;
      case "quick":
        runAnimation(SortingAlgorithms.getQuickSortAnimations, []);
        break;
      case "bubble":
        runAnimation(SortingAlgorithms.getBubbleSortAnimations, []);
        break;
      case "heap":
        runAnimation(SortingAlgorithms.getHeapSortAnimations, []);
        break;
      case "insertion":
        runAnimation(SortingAlgorithms.getInsertionSortAnimations, []);
        break;
      case "selection":
        runAnimation(SortingAlgorithms.getSelectionSortAnimations, []);
        break;
      case "radix":
        runAnimation(SortingAlgorithms.getRadixSortAnimations, []);
        break;
      case "shell":
        runAnimation(SortingAlgorithms.getShellSortAnimations, []);
        break;
      default:
        runAnimation(SortingAlgorithms.getMergeSortAnimations, []);
    }
  };

  const handleAlgorithmSelect = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const currentAlgorithm = algorithmInfo[selectedAlgorithm];

  return (
    <div className="min-h-screen bg-black p-3 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-zink-50 mb-2">
            Sorting Algorithm Visualizer
          </h1>
          <p className="text-sm sm:text-base text-zink-300">
            Watch how different sorting algorithms work step by step
          </p>
        </div>

        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Main Visualization Panel */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-xl shadow-lg p-3 sm:p-6">
              {/* Control Panel */}
              <div className="bg-stone-950 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 items-center justify-center">
                  <div className="flex flex-col items-center w-full sm:w-auto">
                    <label className="text-xs md:text-sm font-semibold mb-1 md:mb-2 text-zink-100">
                      Animation Speed
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="200"
                      value={201 - animationSpeed}
                      onChange={(e) =>
                        setAnimationSpeed(201 - parseInt(e.target.value))
                      }
                      disabled={isAnimating}
                      className="w-full sm:w-24 md:w-32 accent-lime-400"
                    />
                    <span className="text-xs mt-1 text-zink-700">
                      {animationSpeed <= 20
                        ? "Fast"
                        : animationSpeed <= 100
                        ? "Medium"
                        : "Slow"}
                    </span>
                  </div>

                  <div className="flex flex-col items-center w-full sm:w-auto">
                    <label className="text-xs md:text-sm font-semibold mb-1 md:mb-2 text-zink-100">
                      Array Size
                    </label>
                    <input
                      type="range"
                      min="10"
                      max={isMobile ? 160 : 300}
                      value={arraySize}
                      onChange={(e) => setArraySize(parseInt(e.target.value))}
                      disabled={isAnimating}
                      className="w-full sm:w-24 md:w-32 accent-lime-400"
                    />
                    <span className="text-xs mt-1 text-zink-700">
                      {arraySize} bars
                    </span>
                  </div>

                  <div className="flex flex-row gap-4 lg:gap-6 md:gap-3 w-full sm:w-auto justify-center">
                    <button
                      onClick={resetArray}
                      disabled={isAnimating}
                      className={`px-3 py-2 text-sm md:px-4 md:py-2 md:text-base rounded-lg font-medium transition-all ${
                        isAnimating
                          ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                          : "bg-black text-lime-400 border-2 border-lime-400 hover:bg-lime-400 hover:text-black transform hover:scale-105"
                      }`}
                    >
                      🔄 New
                    </button>
                    <button
                      onClick={handleSort}
                      disabled={isAnimating}
                      className={`px-3 py-2 text-sm md:px-4 md:py-2 md:text-base rounded-lg font-medium transition-all ${
                        isAnimating
                          ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                          : "bg-lime-400 text-black hover:bg-lime-500 transform hover:scale-105"
                      }`}
                    >
                      {isAnimating ? "⏳" : "🚀 Sort"}
                    </button>

                    {/* Mobile Info Toggle */}
                    <button
                      onClick={() => setShowInfo(!showInfo)}
                      className={`lg:hidden px-3 py-2 text-sm md:px-4 md:py-2 md:text-base rounded-lg font-medium transition-all ${
                        isAnimating
                          ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                          : "bg-black text-lime-400 border-2 border-lime-400 hover:bg-lime-400 hover:text-black transform hover:scale-105"
                      }`}
                    >
                      {showInfo ? "Hide Info" : "Show Info"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Array Visualization */}
              <div className="bg-stone-950 rounded-lg p-2 sm:p-4 mb-4 sm:mb-6 overflow-hidden">
                <div
                  className="array-container flex items-end justify-center"
                  style={{ height: "400px" }}
                >
                  {array.map((value, idx) => (
                    <div
                      key={idx}
                      className="array-bar transition-all duration-300 ease-in-out"
                      style={{
                        height: `${Math.max(10, (value / 730) * 360)}px`,
                        width: `${Math.max(
                          1,
                          Math.floor(
                            (window.innerWidth < 640 ? 300 : 800) / arraySize
                          )
                        )}px`,
                        backgroundColor: colorStates[idx] || COLORS.DEFAULT,
                        margin: `0 ${arraySize <= 50 ? "2px" : "1px"}`,
                        borderRadius: arraySize <= 50 ? "2px" : "1px",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Algorithm Buttons - Grid layout for mobile */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-0">
                <button
                  className={`px-2 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all transform hover:scale-105 ${
                    selectedAlgorithm === "merge"
                      ? "bg-purple-600 text-white shadow-lg"
                      : isAnimating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-stone-950 text-zink-300 border-2 border-purple-600 hover:bg-zinc-100 hover:text-stone-900 shadow-md"
                  }`}
                  onClick={() => handleAlgorithmSelect("merge")}
                  disabled={isAnimating}
                >
                  <span className="hidden sm:inline">🔀 </span>Merge
                </button>

                <button
                  className={`px-2 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all transform hover:scale-105 ${
                    selectedAlgorithm === "quick"
                      ? "bg-red-600 text-white shadow-lg"
                      : isAnimating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-stone-950 text-zink-300 border-2 border-red-600 hover:bg-zinc-100 hover:text-stone-900 shadow-md"
                  }`}
                  onClick={() => handleAlgorithmSelect("quick")}
                  disabled={isAnimating}
                >
                  <span className="hidden sm:inline">⚡ </span>Quick
                </button>

                <button
                  className={`px-2 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all transform hover:scale-105 ${
                    selectedAlgorithm === "heap"
                      ? "bg-cyan-600 text-white shadow-lg"
                      : isAnimating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-stone-950 text-zink-300 border-2 border-cyan-600 hover:bg-zinc-100 hover:text-stone-900 shadow-md"
                  }`}
                  onClick={() => handleAlgorithmSelect("heap")}
                  disabled={isAnimating}
                >
                  <span className="hidden sm:inline">🏔️ </span>Heap
                </button>

                <button
                  className={`px-2 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all transform hover:scale-105 ${
                    selectedAlgorithm === "bubble"
                      ? "bg-orange-600 text-white shadow-lg"
                      : isAnimating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-stone-950 text-zink-300 border-2 border-orange-600 hover:bg-zinc-100 hover:text-stone-900 shadow-md"
                  }`}
                  onClick={() => handleAlgorithmSelect("bubble")}
                  disabled={isAnimating}
                >
                  <span className="hidden sm:inline">🫧 </span>Bubble
                </button>

                <button
                  className={`px-2 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all transform hover:scale-105 ${
                    selectedAlgorithm === "insertion"
                      ? "bg-teal-600 text-white shadow-lg"
                      : isAnimating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-stone-950 text-zink-300 border-2 border-teal-600 hover:bg-zinc-100 hover:text-stone-900 shadow-md"
                  }`}
                  onClick={() => handleAlgorithmSelect("insertion")}
                  disabled={isAnimating}
                >
                  <span className="hidden sm:inline">📥 </span>Insertion
                </button>

                <button
                  className={`px-2 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all transform hover:scale-105 ${
                    selectedAlgorithm === "selection"
                      ? "bg-emerald-600 text-white shadow-lg"
                      : isAnimating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-stone-950 text-zink-300 border-2 border-emerald-600 hover:bg-zinc-100 hover:text-stone-900 shadow-md"
                  }`}
                  onClick={() => handleAlgorithmSelect("selection")}
                  disabled={isAnimating}
                >
                  <span className="hidden sm:inline">🔍 </span>Selection
                </button>

                <button
                  className={`px-2 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all transform hover:scale-105 ${
                    selectedAlgorithm === "radix"
                      ? "bg-lime-600 text-white shadow-lg"
                      : isAnimating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-stone-950 text-zink-300 border-2 border-lime-600 hover:bg-zinc-100 hover:text-stone-900 shadow-md"
                  }`}
                  onClick={() => handleAlgorithmSelect("radix")}
                  disabled={isAnimating}
                >
                  <span className="hidden sm:inline">🔢 </span>Radix
                </button>

                <button
                  className={`px-2 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all transform hover:scale-105 ${
                    selectedAlgorithm === "shell"
                      ? "bg-sky-600 text-white shadow-lg"
                      : isAnimating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-stone-950 text-zink-300 border-2 border-sky-600 hover:bg-zinc-100 hover:text-stone-900 shadow-md"
                  }`}
                  onClick={() => handleAlgorithmSelect("shell")}
                  disabled={isAnimating}
                >
                  <span className="hidden sm:inline">🐚 </span>Shell
                </button>
              </div>

              {/* Color Legend - Horizontal scroll on mobile */}
              <div className="bg-stone-950 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
                <h3 className="text-sm font-semibold text-zink-200 mb-3 text-center">
                  Color Legend
                </h3>
                <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap gap-3 sm:gap-4 justify-start sm:justify-center text-sm">
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className="w-4 h-4 rounded border-2 border-gray-50"
                      style={{ backgroundColor: COLORS.DEFAULT }}
                    ></div>
                    <span className="text-zink-300 whitespace-nowrap">
                      Unsorted
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className="w-4 h-4 rounded border-2 border-gray-50"
                      style={{ backgroundColor: COLORS.COMPARING }}
                    ></div>
                    <span className="text-zink-300 whitespace-nowrap">
                      Comparing
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className="w-4 h-4 rounded border-2 border-gray-50"
                      style={{ backgroundColor: COLORS.SELECTED }}
                    ></div>
                    <span className="text-zink-300 whitespace-nowrap">
                      Selected
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className="w-4 h-4 rounded border-2 border-gray-50"
                      style={{ backgroundColor: COLORS.PIVOT }}
                    ></div>
                    <span className="text-zink-300 whitespace-nowrap">
                      Pivot
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className="w-4 h-4 rounded border-2 border-gray-50"
                      style={{ backgroundColor: COLORS.SORTED_SUB }}
                    ></div>
                    <span className="text-zink-300 whitespace-nowrap">
                      Sub-array
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div
                      className="w-4 h-4 rounded border-2 border-gray-50"
                      style={{ backgroundColor: COLORS.FINAL_SORTED }}
                    ></div>
                    <span className="text-zink-300 whitespace-nowrap">
                      Sorted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Algorithm Information Panel */}
          <div
            className={`lg:col-span-1 ${
              showInfo ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-slate-800 rounded-xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-6">
              {/* Header with gradient background */}
              <div
                className={`rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 -mt-2 -mx-2 bg-gradient-to-r ${
                  selectedAlgorithm === "merge"
                    ? "from-purple-500 to-purple-600"
                    : selectedAlgorithm === "quick"
                    ? "from-red-500 to-red-600"
                    : selectedAlgorithm === "bubble"
                    ? "from-orange-500 to-orange-600"
                    : selectedAlgorithm === "heap"
                    ? "from-cyan-500 to-cyan-600"
                    : selectedAlgorithm === "insertion"
                    ? "from-teal-500 to-teal-600"
                    : selectedAlgorithm === "selection"
                    ? "from-emerald-500 to-emerald-600"
                    : selectedAlgorithm === "radix"
                    ? "from-lime-500 to-lime-600"
                    : "from-sky-500 to-sky-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-2xl font-bold text-white flex items-center gap-2">
                    {selectedAlgorithm === "merge"
                      ? "🔀"
                      : selectedAlgorithm === "quick"
                      ? "⚡"
                      : selectedAlgorithm === "bubble"
                      ? "🫧"
                      : selectedAlgorithm === "heap"
                      ? "🏔️"
                      : selectedAlgorithm === "insertion"
                      ? "📥"
                      : selectedAlgorithm === "selection"
                      ? "🔍"
                      : selectedAlgorithm === "radix"
                      ? "🔢"
                      : "🐚"}
                    <span className="hidden sm:inline">
                      {currentAlgorithm.name}
                    </span>
                    <span className="sm:hidden">
                      {currentAlgorithm.name.split(" ")[0]}
                    </span>
                  </h2>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`w-1 h-5 rounded-full ${
                      selectedAlgorithm === "merge"
                        ? "bg-purple-500"
                        : selectedAlgorithm === "quick"
                        ? "bg-red-500"
                        : selectedAlgorithm === "bubble"
                        ? "bg-orange-500"
                        : selectedAlgorithm === "heap"
                        ? "bg-cyan-500"
                        : selectedAlgorithm === "insertion"
                        ? "bg-teal-500"
                        : selectedAlgorithm === "selection"
                        ? "bg-emerald-500"
                        : selectedAlgorithm === "radix"
                        ? "bg-lime-500"
                        : "bg-sky-500"
                    }`}
                  ></div>
                  <h3 className="text-sm font-semibold text-zink-50">
                    How It Works
                  </h3>
                </div>
                <p className="text-zink-150 text-xs sm:text-sm leading-relaxed bg-stone-950 p-3 rounded-lg">
                  {currentAlgorithm.description}
                </p>
              </div>

              {/* Complexity Cards */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="bg-black p-3 md:p-4 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 md:h-4 md:w-4 text-lime-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wide">
                      Time
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Best:</span>
                      <code className="text-xs font-mono bg-gray-800 px-1 py-0.5 rounded text-lime-400">
                        {currentAlgorithm.timeComplexity.best}
                      </code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Average:</span>
                      <code className="text-xs font-mono bg-gray-800 px-1 py-0.5 rounded text-lime-400">
                        {currentAlgorithm.timeComplexity.average}
                      </code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Worst:</span>
                      <code className="text-xs font-mono bg-gray-800 px-1 py-0.5 rounded text-lime-400">
                        {currentAlgorithm.timeComplexity.worst}
                      </code>
                    </div>
                  </div>
                </div>
                <div className="bg-black p-3 md:p-4 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-1 md:gap-2 mb-1 md:mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 md:h-4 md:w-4 text-lime-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wide">
                      Space
                    </h3>
                  </div>
                  <div className="flex items-center justify-center h-12">
                    <code className="text-xs md:text-sm font-mono bg-gray-800 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-lime-400">
                      {currentAlgorithm.spaceComplexity}
                    </code>
                  </div>
                </div>
              </div>

              {/* Example */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div
                    className={`w-1 h-5 rounded-full ${
                      selectedAlgorithm === "merge"
                        ? "bg-purple-500"
                        : selectedAlgorithm === "quick"
                        ? "bg-red-500"
                        : selectedAlgorithm === "bubble"
                        ? "bg-orange-500"
                        : selectedAlgorithm === "heap"
                        ? "bg-cyan-500"
                        : selectedAlgorithm === "insertion"
                        ? "bg-teal-500"
                        : selectedAlgorithm === "selection"
                        ? "bg-emerald-500"
                        : selectedAlgorithm === "radix"
                        ? "bg-lime-500"
                        : "bg-sky-500"
                    }`}
                  ></div>
                  <h3 className="text-sm font-semibold text-zink-50">
                    Step-by-Step Example
                  </h3>
                </div>
                <div className="bg-stone-950 p-3 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-zink-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs text-zink-150 leading-relaxed ml-2">
                      {currentAlgorithm.example}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fun Facts - Hidden on small screens */}
              <div
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  selectedAlgorithm === "merge"
                    ? "from-purple-50 to-purple-100 border border-purple-200"
                    : selectedAlgorithm === "quick"
                    ? "from-red-50 to-red-100 border border-red-200"
                    : selectedAlgorithm === "bubble"
                    ? "from-orange-50 to-orange-100 border border-orange-200"
                    : selectedAlgorithm === "heap"
                    ? "from-cyan-50 to-cyan-100 border border-cyan-200"
                    : selectedAlgorithm === "insertion"
                    ? "from-teal-50 to-teal-100 border border-teal-200"
                    : selectedAlgorithm === "selection"
                    ? "from-emerald-50 to-emerald-100 border border-emerald-200"
                    : selectedAlgorithm === "radix"
                    ? "from-lime-50 to-lime-100 border border-lime-200"
                    : "from-sky-50 to-sky-100 border border-sky-200"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`p-1.5 rounded-full ${
                      selectedAlgorithm === "merge"
                        ? "bg-purple-100"
                        : selectedAlgorithm === "quick"
                        ? "bg-red-100"
                        : selectedAlgorithm === "bubble"
                        ? "bg-orange-100"
                        : selectedAlgorithm === "heap"
                        ? "bg-cyan-100"
                        : selectedAlgorithm === "insertion"
                        ? "bg-teal-100"
                        : selectedAlgorithm === "selection"
                        ? "bg-emerald-100"
                        : selectedAlgorithm === "radix"
                        ? "bg-lime-100"
                        : "bg-sky-100"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${
                        selectedAlgorithm === "merge"
                          ? "text-purple-600"
                          : selectedAlgorithm === "quick"
                          ? "text-red-600"
                          : selectedAlgorithm === "bubble"
                          ? "text-orange-600"
                          : selectedAlgorithm === "heap"
                          ? "text-cyan-600"
                          : selectedAlgorithm === "insertion"
                          ? "text-teal-600"
                          : selectedAlgorithm === "selection"
                          ? "text-emerald-600"
                          : selectedAlgorithm === "radix"
                          ? "text-lime-600"
                          : "text-sky-600"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-zink-50 mb-1">
                      Did You Know?
                    </h3>
                    <p className="text-xs text-zink-150">
                      {selectedAlgorithm === "merge" &&
                        "Merge sort was invented by John von Neumann in 1945 and is often used when stability is required!"}
                      {selectedAlgorithm === "quick" &&
                        "Quick sort was developed by Tony Hoare in 1960 and is often the fastest in practice despite its O(n²) worst case!"}
                      {selectedAlgorithm === "bubble" &&
                        "Bubble sort gets its name because smaller elements 'bubble' to the top like air bubbles in water!"}
                      {selectedAlgorithm === "heap" &&
                        "Heap sort was invented by J.W.J. Williams in 1964 and uses the heap data structure for efficient sorting!"}
                      {selectedAlgorithm === "insertion" &&
                        "Insertion sort is a great choice for small arrays or nearly sorted data because it has a best-case time complexity of O(n)!"}
                      {selectedAlgorithm === "selection" &&
                        "Selection sort's main advantage is that it never performs more than O(n) swaps, making it useful when memory writes are costly!"}
                      {selectedAlgorithm === "radix" &&
                        "Radix sort is one of the oldest known sorting algorithms, with a history dating back to the 19th century. It's unique because it doesn't use comparisons!"}
                      {selectedAlgorithm === "shell" &&
                        "Shell sort was invented by Donald Shell in 1959, and it's a significant improvement over insertion sort, often being much faster!"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Algorithm Characteristics */}
              <div className="mt-4 pt-4 border-t border-zink-100">
                <h3 className="text-xs font-semibold text-zink-50 mb-2 uppercase tracking-wide">
                  Characteristics
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`p-0.5 rounded ${
                        currentAlgorithm.stable
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {currentAlgorithm.stable ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-zink-200">Stable</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`p-0.5 rounded ${
                        currentAlgorithm.inPlace
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {currentAlgorithm.inPlace ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-zink-200">In-Place</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`p-0.5 rounded ${
                        selectedAlgorithm === "merge" ||
                        selectedAlgorithm === "heap" ||
                        selectedAlgorithm === "quick"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedAlgorithm === "merge" ||
                      selectedAlgorithm === "heap" ||
                      selectedAlgorithm === "quick" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-zink-200">
                      Guaranteed O(n log n)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`p-0.5 rounded ${
                        selectedAlgorithm === "radix"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {selectedAlgorithm === "radix" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-zink-200">
                      Comparison-free
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVizualizer;

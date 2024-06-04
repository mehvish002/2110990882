const filterNumbers = (currentWindow, newNumbers, windowSize) => {
    const uniqueNewNumbers = newNumbers.filter(num => !currentWindow.includes(num));
    const updatedWindow = [...currentWindow, ...uniqueNewNumbers].slice(-windowSize);
    return updatedWindow;
  };
  
  module.exports = filterNumbers;
  
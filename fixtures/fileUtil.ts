import testDataFromFile from "../data/qa/animated.gingersnap.json";

export const testData = () => {
  return testDataFromFile;
};

export const testDataWeb = () => {
  const testData = testDataFromFile;
  let webTest = [];
  for (const [key, value] of Object.entries(testData)) {
    if (value.navigate.includes("web") === true) {
      webTest.push({ ...value });
    }
  }
  return webTest;
};

export const testDataMobile = () => {
  const testData = testDataFromFile;
  let mobileTest = [];
  for (const [key, value] of Object.entries(testData)) {
    if (value.navigate.includes("mobile") === true) {
      mobileTest.push({ ...value });
    }
  }
  return mobileTest;
};

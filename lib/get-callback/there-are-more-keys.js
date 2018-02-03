module.exports = (keysOfData, setActions) => {
    console.log('keysOfData ', keysOfData);
    for (let i = 0; i < keysOfData.length; i++) {
        if (!setActions.has(keysOfData[i])) return true;
    }
};

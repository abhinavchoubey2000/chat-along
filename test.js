var getUsername = function (name, email, phone) {
    var symbols = ["_", ".", "@", "-"];
    var randomSymbolsIndex = Math.floor(Math.random() * symbols.length);
    var randomSymbol = symbols[randomSymbolsIndex];
    var firstName = name.split(" ")[0].substring(0, 5);
    var middle4DigitNumbers = phone.substring(3, 7);
    var nameAndNumber = firstName + middle4DigitNumbers;
    var randomPostionsForSymbols = Math.floor(Math.random() * ((nameAndNumber.length - 1) - 2 + 1)) + 2;
    var username = nameAndNumber.slice(0, randomPostionsForSymbols) + // First half
        randomSymbol + // Letter to insert
        nameAndNumber.slice(randomPostionsForSymbols);
    console.log("randomPostionsForSymbols ", randomPostionsForSymbols, "randomSymbolsIndex ", randomSymbolsIndex);
    return username;
};
var result = getUsername("Abhinav Choubey", "abhinav@gmail.com", "7017311270");
console.log(result);

export function formatMoney(pennies){
    pennies = parseFloat(pennies);

    if(isNaN(pennies)){
        return 'TBA';
    }

    const dollars = (pennies / 100).toFixed(2);

    return `$${dollars}`;
}

export function toWords(value){
    let result = value.replace(/[A-Z]/g, function (letter) {
        return ` ${letter}`;
    });

    result = result[0].toUpperCase() + result.slice(1);

    return result;
}
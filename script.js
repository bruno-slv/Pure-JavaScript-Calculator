let ctSign = 0;
let ctExpand = 0;
let ctOptions = 0;
let allOperations = ['-', '+', '*', '/', '.'];

addEventListener('keyup', function (evt) {
    let calc = document.querySelector('#calc');

    switch (evt.key) {
        case 'Enter':
            operations('equals');
            break;
        case '=':
            operations('equals');
            break;
        case 'Escape':
            clr();
            break;
        case 'Backspace':
            dlt();
            break;
        case '!':
            operations('fat')
            break;
        case '\\':
            operations('power');
            break;
    }

    switch (evt.code) {
        case 'KeyS':
            operations('square')
            break;
        case 'KeyP':
            operations('pi')
            break;
        case 'KeyZ':
            operations('sin');
            break;
        case 'KeyC':
            operations('cos')
            break;
        case 'KeyT':
            operations('tan');
            break;
        case 'KeyU':
            operations('unsigned');
            break;
        case 'KeyR':
            operations('pct');
            break;
        case 'KeyQ':
            operations('sqrt');
            break;
        case 'KeyX':
            operations('ten');
            break;
        case 'KeyE':
            expandOptions();
            break;
    }

    for (let i = 0; i <= allOperations.length; i++) {
        if (evt.key === allOperations[i]) {
            check(evt.key)
        }
    }

    for (let i = 0; i <= 9; i++) {
        if (evt.key.includes(i)) {
            calc.innerText += evt.key;
        }
    }

    if (evt.key === '(' || evt.key === ')') {
        calc.innerText += evt.key;
    }
});

function check(op) {
    let inCalc = document.getElementById('calc').innerText
    if (allOperations.includes(inCalc.charAt(inCalc.length - 1)) === false) {
        calc.innerText += op;
    }
}

function parse(str) {
    return Function(`'use strict'; return (${str})`)();
}
if (document.getElementById('results') != null) {
    document.getElementById('results').innerText = parse(document.getElementById('calc').innerText);
}

function operations(content) {
    let results = document.querySelector('#results');
    let calc = document.querySelector('#calc');
    let numericCalc = Number(calc.innerText);

    function exclusiveCheck(exclusiveChars, separator = '') {
        let ar = document.getElementById('calc').innerText;
        let counter = 0;
        if (exclusiveChars.length === 1) {
            for (let i = 0; i < ar.length; i++) {
                if (ar.charAt(i) === exclusiveChars) {
                    counter += 1;
                }
            } if (counter < 1) {
                calc.innerText += exclusiveChars;
            }
        } else {
            let chars = ar.split(separator);
            if (chars.length < 2) {
                calc.innerText += exclusiveChars;
            }
        }
    }

    function fatorial(nmb) {
        if (nmb == 0) {
            return 1;
        } else {
            return nmb * fatorial(nmb - 1);
        }
    }

    switch (content) {
        case 'unsigned':
            let chars = calc.innerText;
            let numArray = chars.split(/\*|-|\+|\//).reverse();

            let oldStr = numArray[0];
            let negative = `-${oldStr}`;
            let template = chars.slice(0, chars.lastIndexOf(oldStr));
            let content;

            if (ctSign === 0 && !chars.includes(negative)) {
                content = template + negative;
                ctSign += 1;
            } else {
                content = chars.slice(0, chars.lastIndexOf(oldStr) - 1) + oldStr;
                ctSign = 0;
            }

            calc.innerText = content;
            break;
        case 'pct':
            exclusiveCheck('*0.01', '*')
            operations('equals')
            break;
        case 'times':
            check('*');
            break;
        case 'divid':
            check('/');
            break;
        case 'plus':
            check('+');
            break;
        case 'minus':
            check('-');
            break;
        case 'dot':
            check('.')
            break;
        case 'fat':
            results.innerText = fatorial(numericCalc);
            break;
        case 'square':
            if (isNaN(numericCalc) === false) {
                let base = numericCalc
                results.innerText = Math.pow(base, 2)
            } else {
                results.innerText = 0;
            }
            break;
        case 'sin':
            results.innerText = Math.sin(numericCalc)
            break;
        case 'cos':
            results.innerText = Math.cos(numericCalc)
            break;
        case 'tan':
            results.innerText = Math.tan(numericCalc)
            break;
        case 'ten':
            if (isNaN(numericCalc) === false) {
                let exp = numericCalc;
                results.innerText = Math.pow(10, exp);
                calc.innerText = `10^${exp}`;
            } else {
                clr();
            }
            break;
        case 'power':
            exclusiveCheck('\\');
            break;
        case 'pi':
            /*Pendente:
            =>Arrumar a casa decimal.*/
            let i = calc.innerText.length
            let pi = Math.PI.toFixed(4)
            if (calc.innerText.substring(i - 6) != pi) {
                calc.innerText += pi
            }
            break;
        case 'sqrt':
            results.innerText = Math.sqrt(numericCalc);
            break;
        case 'equals':
            /*Pendente:
            =>Usar o resultado na conta assim que uma nova operação for solicitada.*/

            if (calc.innerText.includes('\\')) {
                let numbers = calc.innerText.split("\\")
                results.innerText = Math.pow(numbers[0], numbers[1])
                calc.innerText = `${numbers[0]}^${numbers[1]}`
            } else {
                results.innerText = parse(calc.innerText);
            }

            break;
    }
};

function clr() {
    document.getElementById('calc').textContent = "";
    document.getElementById('results').textContent = 0;
};

function dlt() {
    let str = document.getElementById('calc').innerText
    let newstr = str.substring(0, str.length - 1)
    if (newstr.length > 0) {
        document.getElementById('calc').textContent = newstr
    } else {
        clr()
    }
};

function replaceable(ct) {
    let replaceable = document.getElementById(ct).innerText;
    document.getElementById('calc').innerHTML += replaceable;
};

function expandOptions() {
    let arrow = document.getElementById('pullarrow');
    let hub = document.getElementById('upmenu');
    let info = document.getElementById('info');
    if (ctOptions === 0) {
        hub.className = 'openmenu';
        arrow.style.transform = 'rotate(45deg)';
        info.style.display = 'block';
        ctOptions += 1;
    } else {
        info.style.display = 'none';
        hub.className = 'upmenu';
        arrow.style.transform = 'rotate(-135deg)';
        ctOptions = 0;
    }
}

function expand() {
    let arrow = document.getElementById('arrow');
    let sidemenu = document.getElementById('sidemenu');
    let sideicons = document.getElementById('sideicons');

    if (ctExpand === 0) {
        sidemenu.className = 'open';
        arrow.style.transform = "rotate(135deg)";
        arrow.style.marginLeft = '1px';
        sideicons.style.display = 'block';
        ctExpand += 1;
    } else {
        arrow.style.transform = "rotate(-45deg)";
        arrow.style.marginLeft = '7px';
        sidemenu.className = 'sidemenu';
        sideicons.style.display = 'none';
        ctExpand = 0;
    }
}

document.addEventListener('DOMContentLoaded', () => {

    /* variaveis principais */
    const encodeBt = document.getElementById('encode');
    const decodeBt = document.getElementById('decode');
    const copyBt = document.getElementById('copy-bt');
    const content = document.getElementById('textarea');
    let codeArea = document.querySelector('#content-textarea');

    /* modal */
    const modal = document.querySelector('#modal');
    const textModal = document.querySelector('#dialog-text');
    const modalButton = document.querySelector('#dialog-close')

    /* funções modal */
    modalButton.addEventListener('click', () => {
        modal.setAttribute('style', 'display: none')
        content.value = '';
    })
    
    function openModal(msg) {
        textModal.innerText = msg
        modal.setAttribute('style', 'display: flex')
    }

    /* funções de click dos buttons */

    encodeBt.addEventListener('click', () => {
        if(content.value.trim() !== '') {
            if(!verifySpecial(content.value) && !verifyUpper(content.value)){
                codeArea.value = encryptor.encode(content.value);
                cleanTexts();
                
            } else {
                openModal('ops, você digitou algum caractere inválido!')
                changeCodeArea()
            }
        } else {
            changeCodeArea()
        }  
    })

    decodeBt.addEventListener('click', () => {
        if(content.value.trim() !== '') {
            if(!verifySpecial(content.value) && !verifyUpper(content.value)){
                if(verifyCode(content.value)) {
                    codeArea.value = encryptor.decode(content.value);
                    cleanTexts()
                    content.value = '';
                } else {
                    changeCodeArea()
                    content.value = '';
                }
            } else {
                openModal('ops, você digitou algum caractere inválido!')
                changeCodeArea();
                content.value = '';
            }
        }
    })

    copyBt.addEventListener('click', () => {
        navigator.clipboard.writeText(codeArea.value);
        openModal('Texto copiado!');
        changeCodeArea();
        codeArea.innerHTML = '';
        content.value = '';
    });

    /* funções de alteração de layout */

    function cleanTexts() {
        document.querySelector(".no-content").setAttribute("style", "display: none");
        document.querySelector(".show-content").setAttribute("style", "display:flex");
        content.value = '';
    };

    function changeCodeArea() {
        document.querySelector('.no-content').setAttribute('style', 'display: flex');
        document.querySelector('.show-content').setAttribute('style', 'display: none');
    };


    /* validações */

    /* validando caracteres permitidos */
    function verifySpecial(frase) {
        const listaLetras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' ', '0',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        const allLetters = frase.split('').every(caracter => listaLetras.includes(caracter))
        
        if(allLetters) {
        return false;
        } else {
            return true;
        }
    }

    /* validando CaseSensitive */

    function verifyUpper(frase) {
        for (let i = 0; i < frase.length; i++) {
            if (frase[i] !== frase[i].toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    /* validando decodificador */

    function verifyCode(frase) {
        fraseContent = frase.split(' ');
        contentKeys = [/aim/, /enter/, /imes/, /ober/, /ufat/]
        for(let i = 0; i < fraseContent.length; i++) {
            for(j = 0; j < contentKeys.length; j++){
            if(fraseContent[i].match(contentKeys[j])){
                return true
            }
            }
        }
        return false
    }


    /* objeto responsável pela codificação */

    const encryptor = {
        a: 'aim',
        e: 'enter',
        i: 'imes',
        o: 'ober',
        u: 'ufat',

        
        /* codificador */
        letterEncode: (letter) => {
            return encryptor[letter];
        },

        encode: (frase) => {
            let newFrase = [];
            const lettersEncode = ['a', 'e', 'i', 'o', 'u']

            for (let i = 0; i < frase.length; i++) {
                let word = frase[i].split('');
                for (let j = 0; j < word.length; j++) {
                    let letter = word[j]
                    if (lettersEncode.includes(letter)) {
                        newFrase.push(encryptor.letterEncode(letter))
                    } else {
                        newFrase.push(letter)
                    };
                }
            };

            const fraseEncriptada = newFrase.join('')
            return fraseEncriptada
        },

        /* decodificador */
        decode: (frase) => {
            let newFrase = frase
                .replace(/aim/g, 'a')
                .replace(/enter/g, 'e')
                .replace(/imes/g, 'i')
                .replace(/ober/g, 'o')
                .replace(/ufat/g, 'u');
            return newFrase
        }
    };
})

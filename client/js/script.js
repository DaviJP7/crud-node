import { data } from './data.js';

const resultBox = document.querySelector('div.__result-box');
const inputSearch = document.querySelector('input.input-search');

// data.forEach((v, i) => {
//     let html = `
//     <div class="__result-content">
//     <img src="${v.img}" alt="" class="__result-img">
//     <span class="__result-span">${v.content}</span>
//     </div>`

//     resultBox.innerHTML += html
// })

inputSearch.addEventListener('keyup', (e) => {
    let inputValue = e.target.value.toLowerCase();
    if (inputValue != '') {

        let findValue = data.filter((v) => {
            return v.content.toLowerCase().replace(/<[^>]*>?/gm, '').includes(inputValue)
        })
        resultBox.innerHTML = ''
        findValue.forEach(v => {
            let html = `
            <div class="__result-content">
            <img src="${v.img}" alt="" class="__result-img">
            <span class="__result-span">${v.content}</span>
            </div>`
            resultBox.innerHTML += html;
        })
    } else {
        resultBox.innerHTML = ''
    }
})
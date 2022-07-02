const resultBox = document.querySelector('div.__result-box');
const inputSearch = document.querySelector('input.input-search');

window.onload = async () => {
  try {
    const response = await fetch('http://localhost:3001/get');
    const data = await response.json();

    if (!data) {
      return ''
    }

    data.forEach(({ content, img}) => {
      let html = `
      <div class="__result-content">
      <img src="${img}" alt="" class="__result-img">
      <span class="__result-span">${content}</span>
      </div>`

      resultBox.innerHTML += html
  })
  } catch (error) {

  }
}

inputSearch.addEventListener('keyup', (e) => {
  const inputValue = e.target.value.toLowerCase();

  if (inputValue != '') {
    const findValue = data.filter((v) => {
      return v.content.toLowerCase().replace(/<[^>]*>?/gm, '').includes(inputValue)
    })

    resultBox.innerHTML = ''
      findValue.forEach(v => {
          const html = `
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
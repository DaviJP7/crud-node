const form = document.forms.item('char_registration')
const removeImage = document.getElementById('remove_image')
const { content_input, file_input } = form

const reader = new FileReader()

removeImage.addEventListener('click', () => {
  file_input.files = null
  const labelInputFile = file_input.previousElementSibling
  labelInputFile.textContent = 'Add your character Image'
})

file_input.addEventListener('change', function () {
  if (this.files) {
    const labelInputFile = file_input.previousElementSibling
    const fileName = file_input.files[0].name

    labelInputFile.textContent = fileName
    removeImage.style.display = 'block'

    reader.readAsDataURL(file_input.files[0])
    reader.onload = (file) => {
      const { currentTarget: { result: imageBase64 } } = file

      labelInputFile.innerHTML = `
        <img src="${imageBase64}" class="__selected_picture">
        ${fileName}
      `
    }
  } else {
    return;
  }
})

form.addEventListener("submit", e => {
  e.preventDefault();

  if (!file_input.files[0]) {
    alert('Add an image file!')
    return ''
  }

  reader.readAsDataURL(file_input.files[0])

  reader.onload = async (file) => {
    const { currentTarget: { result: imageBase64 } } = file

    try {
      const { status } = await fetch('http://127.0.0.1:3001/store', {
        headers: { 'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          img: imageBase64,
          content: content_input.value
        })
      })

      if (status === 201) {
        content_input.value = ''
        file_input.files = null

        window.location.replace('http://127.0.0.1:5500/client')
      }
    } catch (error) {
      alert(error.message)
    }
  }
})
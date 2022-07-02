const form = document.forms.item('char_registration')
const removeImage = document.getElementById('remove_image')
const { content_input, file_input } = form

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
  } else {
    console.log('mudou')
  }
})

form.addEventListener("submit", e => {
  e.preventDefault();

  if (!file_input.files[0]) {
    alert('Add an image file!')
    return ''
  }

  const reader = new FileReader()

  reader.readAsDataURL(file_input.files[0])

  reader.onload = async (file) => {
    const { currentTarget: { result: imageBase64 } } = file

    try {
      const { status } = await fetch('http://localhost:3001/store', {
        headers: { 'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
          img: imageBase64,
          content: content_input.value
        })
      })

      if (status === 201) {
        console.log('foi')
      }

      console.log(status)
    } catch (error) {
      alert(error.message)
    }
  }
})
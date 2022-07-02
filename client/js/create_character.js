const form = document.forms.item('char_registration')

form.addEventListener("submit", e => {
  e.preventDefault();

  form.previousElementSibling

  const { content_input, file_input } = form

  if (file_input.files) {
    const labelInputFile = file_input.previousElementSibling
    const fileName = file_input.files[0].name

    labelInputFile.textContent = fileName
  }

  const reader = new FileReader()

  reader.readAsDataURL(file_input.files[0])

  reader.onload = (file) => {
    const { currentTarget: { result } } = file
    console.log(result)
  }
})
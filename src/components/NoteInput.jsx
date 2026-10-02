import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO [Basic] kelola nilai title sebagai controlled input.
      title: '',
      // TODO [Basic] kelola nilai body sebagai controlled textarea.
      body: '',
      // State tambahan untuk mencatat pesan error saat form disubmit
      errorMessage: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    // TODO [Basic] update state dengan nilai event.target.value.
    // TODO [Skilled] batasi judul maksimal 50 karakter dan tampilkan peringatan saat sisa karakter < 10.
    const title = event.target.value;
    if (title.length <= 50) {
      this.setState({ title });
    }
  }

  onBodyChangeEventHandler(event) {
    // TODO [Basic] update state body agar textarea menjadi controlled component.
    const body = event.target.value;
    
    // Saat user mulai mengetik dan jumlah karakter sudah >= 10, bersihkan pesan error
    this.setState({
      body,
      errorMessage: body.length >= 10 ? '' : this.state.errorMessage,
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    // TODO [Basic] panggil props.addNote dengan data title & body dari state, lalu reset form.
    // TODO [Advanced] tolak submit ketika body kurang dari 10 karakter dan tampilkan pesan error.
    if (this.state.body.length < 10) {
      this.setState({
        errorMessage: 'Isi catatan minimal harus 10 karakter',
      });
      return;
    }

    this.props.addNote({
      title: this.state.title,
      body: this.state.body,
    });

    // Reset form dan errorMessage setelah berhasil submit
    this.setState({
      title: '',
      body: '',
      errorMessage: '',
    });
  }

  render() {
    const { title, body, errorMessage } = this.state;
    const remainingChars = 50 - title.length;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>

        {/* TODO [Advanced] tampilkan pesan error menggunakan elemen dengan class note-input__feedback--error. */}
        {/* Tampilkan pesan error HANYA jika errorMessage ada nilainya (setelah tombol submit dipencet) */}
        {errorMessage && (
          <p className="note-input__feedback--error">
            {errorMessage}
          </p>
        )}

        <form
          onSubmit={this.onSubmitEventHandler}
          data-testid="note-input-form"
        >
          {/* TODO [Skilled] tampilkan sisa karakter secara dinamis ketika limit judul diterapkan */}
          <span
            data-testid="note-input-title-remaining"
            className="note-input__title__char-limit"
          >
            {remainingChars} karakter tersisa
          </span>

          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={body}
            onChange={this.onBodyChangeEventHandler}
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">
            Buat
          </button>
        </form>
      </div>
    );
  }
}

export default NoteInput;